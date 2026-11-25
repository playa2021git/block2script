import assert from 'node:assert/strict';
import {after, before, beforeEach, afterEach, test} from 'node:test';
import {chromium} from './qa/node_modules/playwright/index.mjs';

const url = process.env.BLOCK2SCRIPT_TEST_URL || 'http://127.0.0.1:5175/block2script/';
let browser, page, editor;
before(async () => {
    browser = await chromium.launch({executablePath: process.env.BLOCK2SCRIPT_BROWSER});
});
after(async () => { await browser?.close(); });
beforeEach(async () => {
    page = await browser.newPage({viewport: {width: 1366, height: 768}});
    editor = page.locator('.cm-content');
});
afterEach(async () => { await page?.close(); });

async function openEditor() {
    await page.goto(url);
    await page.waitForFunction(() => document.querySelector('#target')?.textContent.includes('Block2Bot'), null, {timeout: 90000});
}

async function edit(source) {
    await editor.click();
    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.insertText(source);
}

async function selectTarget(isStage) {
    const frame = page.frameLocator('#scratch-frame');
    if (isStage) {
        await frame.locator('[class*="stage-selector_header-title_"]').click();
    } else {
        await frame.locator('[class*="sprite-selector-item_sprite-name_"]').filter({hasText: 'Block2Bot'}).click();
    }
    await page.waitForFunction(label => document.querySelector('#target').textContent.startsWith(label), isStage ? 'ステージ' : 'スプライト');
}

test('keyboard undo on the stage cannot insert the sprite draft', async () => {
    await openEditor();
    const draft = '// スプライトの下書き';
    await edit(draft);
    await page.locator('#validate').click();
    await page.waitForFunction(() => document.querySelector('#backup-status').textContent.includes('保存済み'));
    await selectTarget(true);
    await editor.click();
    await page.keyboard.press('ControlOrMeta+z');
    assert.equal(await editor.innerText().then(text => text.trim()), '');
    await selectTarget(false);
    assert.equal(await editor.innerText(), draft);
    await editor.click();
    await page.keyboard.press('ControlOrMeta+z');
    assert.equal((await editor.innerText()).trim(), '');
});

test('undoing a block apply preserves subsequent Script edits', async () => {
    await openEditor();
    await page.locator('#demo').click();
    await page.locator('#apply').click();
    await page.waitForFunction(() => document.querySelector('#status').textContent.includes('反映しました'));
    const draft = '// 次の実験の下書き';
    await edit(draft);
    await page.locator('#undo').click();
    assert.match(await page.locator('#target').innerText(), /0 ブロック/);
    assert.equal(await editor.innerText(), draft);
    assert.equal(await page.locator('#apply').isDisabled(), true);
});

test('validation rejects a hat or reporter attached below another block', async () => {
    await openEditor();
    for (const opcode of ['event_whenflagclicked', 'motion_xposition']) {
        await edit('scratch.script({}, () => {\n  scratch.motion_movesteps({STEPS: 10});\n  scratch.' + opcode + '({});\n});');
        await page.locator('#validate').click();
        assert.equal(await page.locator('#apply').isDisabled(), true, opcode);
        assert.match(await page.locator('#status').innerText(), /3行目/);
        assert.match(await page.locator('#status').innerText(), new RegExp(opcode));
    }
    // A detached reporter is a valid Scratch script.
    await edit('scratch.script({}, () => { scratch.motion_xposition({}); });');
    await page.locator('#validate').click();
    assert.equal(await page.locator('#apply').isEnabled(), true);
});

test('Script input becomes available when the first sprite is ready', async () => {
    const {promise, resolve} = Promise.withResolvers();
    await page.route('**/stretch3-dist/index.html', async route => {
        await promise;
        await route.continue();
    });
    try {
        await page.goto(url, {waitUntil: 'domcontentloaded'});
        await editor.waitFor();
        await editor.focus();
        assert.equal(await editor.evaluate(el => el === document.activeElement), false);
        assert.equal(await page.locator('#validate').isDisabled(), true);
    } finally {
        resolve();
    }
    await page.waitForFunction(() => document.querySelector('#target').textContent.includes('Block2Bot'));
    await edit('// 最初の下書き');
    assert.equal(await editor.innerText(), '// 最初の下書き');
    assert.equal(await page.locator('#validate').isEnabled(), true);
});
