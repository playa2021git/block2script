import assert from 'node:assert/strict';
import {mkdir, writeFile} from 'node:fs/promises';
import {chromium} from '../stretch3-base/qa/node_modules/playwright/index.mjs';
import {loadNative} from '../tests/browser-native-ui.mjs';

const publicURL = 'https://playa2021git.github.io/block2script/';
const url = process.env.BLOCK2SCRIPT_TEST_URL || publicURL;
const browser = await chromium.launch({
    executablePath: process.env.BLOCK2SCRIPT_BROWSER ||
        (process.platform === 'win32' ? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' : undefined)
});
const results = [];
try {
    await mkdir('.public-build', {recursive: true});
    for (let n = 1; n <= 5; n++) {
        const page = await browser.newPage();
        await page.goto(url);
        await page.waitForFunction(() => document.querySelector('#target')?.textContent.includes('Block2Bot'), null, {timeout: 120000});
        await loadNative(page, 'docs/chromebook-tests/テストプログラム' + n + '.sb3');
        await page.locator('#verify').click();
        const roundtrip = await page.locator('#status').innerText();
        assert.match(roundtrip, /差はありません/);
        const blocks = await page.evaluate(() => {
            const vm = document.querySelector('#scratch-frame').contentWindow.scratchNative.vm;
            return Object.keys(vm.editingTarget.blocks._blocks).length;
        });
        await page.screenshot({path: '.public-build/chromebook-test-' + n + '.png'});
        results.push({test: n, load: true, roundtrip, blocks});
        console.log(roundtrip);
        await page.close();
    }
    const report = {
        url, checkedAt: new Date().toISOString(), results,
        deviceExecution: 'UNTESTED: school Chromebook, actual audio/camera/Bluetooth and model inference'
    };
    const output = url === publicURL ? 'docs/chromebook-tests/VALIDATION.json' : '.public-build/chromebook-validation.json';
    await writeFile(output, JSON.stringify(report, null, 2));
} finally {
    await browser.close();
}
