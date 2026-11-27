# 現行Block2Script構文仕様

対象: https://github.com/playa2021git/block2script

運用更新対象SHA: `9483f680aca238330e5d7227d88102d45278ab0b`  
命令辞書・従来検証の採取SHA: `732e0d4e7a465477168f595ae5d9313764ff8e14`  
調査・更新日: 2026-11-12（日本時間）

## 運用更新：変数・リストの自動作成

運用対象は `9483f680aca238330e5d7227d88102d45278ab0b`（PR #1マージ版）。命令辞書の469登録・348/108/13区分と既存の検証例は、下記の辞書採取SHAで得た記録を保持している。今回の差分には命令定義・拡張本体・固定上流バージョンの変更がない。過去の469件検証を新版で全件再実施したという意味ではない。

必要な変数・リストを、ブロック画面で別に手入力して作成する必要はない。登録済みのdata命令等のVARIABLE／LISTフィールドへ正確な名前を指定する。通常JSのletや配列宣言、架空の作成opcode、推測したIDを追加しない。
「検証」は不足する名前・個数・作成先をプレビューするだけで作品を変更しない。「Scratchへ反映」で不足分を自動作成する。新規分は原則として現在のスプライト専用、ステージを対象にした場合は全体用。参照できる同名・同型の既存資産は値や内容を変えず再利用する。初期値やリストの消去が目的に必要なら、緑の旗などの実行用Scriptにdata命令で明示する。
同名のローカル／全体用が複数あれば勝手に選ばない。エラーを確認し、使う資産を選んだブロックから取り出したScriptと参照メタ情報で区別する。既存IDの不一致・他スプライト専用・空欄や不正な名前は自動作成で回避しない。新規作成を任意の全体用に切り替える構文は創作しない。全体用が必要なら、全体用として用意した資産を再利用するなど対象とスコープを確認する。
拡張の追加、機器の接続、モデルのロード、動的Classメニューの確認は別途必要。これらまで自動準備されるとは説明しない。旧版のMISSING_VARIABLEを受けた場合は、現在の公開版・再読込状態とエラー全文を確認する。

## 1. 現行の実行経路

`.github/workflows/pages.yml` → `scripts/build-pages.mjs` → `stretch3-base/build.mjs` / `prepare.mjs` → `native-scratch/build.mjs` → ルート `index.html` → `native-scratch/main.js` → 同一オリジンiframe内のStretch3 VM・workspace。
Scriptの文字列をJSとしてevalするのではなく、`bridge.js` がAcorn ASTをScratchブロックグラフへ変換し、`main.js` が検証して `applyGraph` でVMへ反映する。
公開サイトの `source/bridge.js` / `source/main.js` は対象SHAのファイルとSHA-256一致。公開サイト全体のデプロイSHAは未取得なので、全配信物のコミット一致とは断定しない。

旧 `src/main.js` / `src/model.js` / `src/runtime.js` は現行の起動経路ではない。
`whenGreenFlag(async () => {...})`、`repeat(n, async()=>{})`、JSのif等を現行へ混入させない。`DEVELOPMENT_AUDIT.md` 自体も旧基盤の記録と明記している。

## 2. スクリプト・イベント・複数スクリプト

1つの `scratch.script` が1本のブロック列。`x`,`y` はブロック配置の座標であり、スプライトの位置ではない。省略されたx/yは30。スプライトの移動にはmotion命令を使う。
複数の `scratch.script` を並べられるが、すべて現在のスプライト／ステージに反映する。対象切替をコードで指定する構文ではない。
イベントはコールバックの先頭にhat命令を置く。開始イベントなしの列は緑の旗で自動開始しない。

```javascript
scratch.script({x:40,y:40},()=>{
  scratch.event_whenflagclicked({});
  scratch.motion_movesteps({STEPS:10});
});
scratch.script({x:300,y:40},()=>{
  scratch.event_whenkeypressed({KEY_OPTION:"space"});
  scratch.looks_say({MESSAGE:"スペース"});
});
```

コード全体は現在対象のスクリプト集合を置き換える。既存の別スクリプトも残すなら、その分を含む現行コードを編集する。

## 3. 呼び出し・引数・型

` scratch.OPCODE({INPUT:value,FIELD:value}) `。opcodeとキー名は大文字小文字を保持する。第1引数のオブジェクトは必須で、引数なしも `{}`。第2引数は既存ID/mutation等のメタデータ用であり、通常の入力値ではない。
識別子にできないopcodeは `scratch["正式opcode"]({...})` の静的表記が可能。辞書にないopcodeを追加してよいという意味ではない。

```javascript
scratch.script({x:40,y:40},()=>{
  scratch.event_whenflagclicked({});
  scratch.looks_say({MESSAGE:scratch.operator_add({NUM1:10,NUM2:20})});
  scratch.motion_gotoxy({X:-20,Y:30});
});
```

値としてパーサーが受理するのは文字列・数値・真偽値・null、数値リテラルへの単項マイナス、静的な配列／オブジェクト。これはすべてのブロックがそれらを意味のある値として使えるという保証ではない。実用生成は宣言型・shadow・接続型に従う。
フィールドは静的なスカラーで指定し、配列・オブジェクト・nullを入れない。数値らしいメニューでも保存値が文字列なら文字列を使う。`PIN:"0"` と `PIN:"P0"` は別。
ブロック入力の `null` は空接続。Boolean定数の専用ブロックと同じではないため、条件には条件レポーターを使う。`undefined` / `NaN` / `Infinity` は識別子として拒否。
SUBSTACK以外の入力は省略不可。フィールドは初期値の保持が起きることもあるが、Gemは必要なフィールドを明示する。

## 4. 分岐・比較・論理演算・繰り返し

通常の `if`, `for`, `while` や `a+b`, `a===b`, `&&`, `!` ではなく、対応ブロックをネストする。

```javascript
scratch.script({x:40,y:40},()=>{
  scratch.event_whenflagclicked({});
  scratch.control_repeat({TIMES:10,SUBSTACK:()=>{
    scratch.control_if_else({
      CONDITION:scratch.operator_and({
        OPERAND1:scratch.operator_lt({OPERAND1:scratch.sensing_timer({}),OPERAND2:5}),
        OPERAND2:scratch.operator_not({OPERAND:scratch.sensing_keypressed({KEY_OPTION:scratch.sensing_keyoptions({KEY_OPTION:"space"})})})
      }),
      SUBSTACK:()=>{scratch.motion_movesteps({STEPS:10});},
      SUBSTACK2:()=>{scratch.control_wait({DURATION:0.1});}
    });
  }});
});
```

`control_forever({SUBSTACK:()=>{...}})`、`control_repeat_until({CONDITION:条件式,SUBSTACK:()=>{...}})`、`control_wait_until({CONDITION:条件式})` を使う。命令列入力は引数なし・非async・ブロック本体のコールバックのみ。`function(){...}` もパーサーは受理するが、Gemは `()=>{...}` に統一。
待ちなし無限ループの負荷は検証機能で十分に検出されない。センサを監視する例では適切な待ち時間を設ける。

## 5. 変数・リスト・メッセージ

必要な変数／リストは別途手入力不要。VARIABLE／LISTへ名前を指定し、検証の作成予定を確認してから反映する。JSのletや配列変数を宣言しない。事前の手動作成を要求せず、検証で変数1個・リスト1個（メッセージは別枠）の作成予定を確認できること。参照解決は `normalizeReferences` から呼ぶ `planReferences` が名前・型・IDで行う。メッセージはbroadcast_msg型でステージに置かれ、不足分は反映時の自動作成対象。

```javascript
scratch.script({x:40,y:40},()=>{
  scratch.event_whenflagclicked({});
  scratch.data_setvariableto({VARIABLE:"回数",VALUE:0});
  scratch.data_changevariableby({VARIABLE:"回数",VALUE:1});
  scratch.data_addtolist({LIST:"記録",ITEM:scratch.data_variable({VARIABLE:"回数"})});
  scratch.event_broadcast({BROADCAST_INPUT:scratch.event_broadcast_menu({BROADCAST_OPTION:"開始"})});
});
scratch.script({x:300,y:40},()=>{
  scratch.event_whenbroadcastreceived({BROADCAST_OPTION:"開始"});
  scratch.looks_say({MESSAGE:scratch.data_lengthoflist({LIST:"記録"})});
});
```

指定する名前は変数「回数」とリスト「記録」。未作成なら反映時に自動作成される。同名のローカル／グローバル変数がある場合は元のメタ情報・IDを保持して確認する。
メッセージの受信イベント `BROADCAST_OPTION` と送信入力 `BROADCAST_INPUT` を混同しない。

## 6. 拡張とメニュー・コメント

```javascript
scratch.script({x:40,y:40},()=>{
  scratch.event_whenflagclicked({});
  scratch.microbitMore_setServo({PIN:"1",ANGLE:90});
  scratch.looks_say({MESSAGE:scratch.microbitMore_getAcceleration({AXIS:"x"})});
});
```

先にmicro:bit Moreを追加する。入力メニューはリテラルの短縮指定が可能な場合と、補助メニューブロックを明示的にネストすべき場合がある。例えばsensing_keypressedのKEY_OPTIONはscratch.sensing_keyoptions({KEY_OPTION:"space"})、broadcastのBROADCAST_INPUTはscratch.event_broadcast_menu({BROADCAST_OPTION:"開始"})をネストする。空のshadowテンプレートに文字列だけを渡すと「ブロック式で指定してください」で失敗する。ブロック本体フィールドの場合とも区別する。正確な位置は辞書／現在の仕様JSONに従う。

```javascript
scratch.script({x:40,y:40},()=>{
  // 普通のコメントはブロックにならない
  scratch.event_whenflagclicked({});
  /* 普通の説明 */
  scratch.looks_say({MESSAGE:"こんにちは"});
});
```

普通のJSコメントはAST変換で無視され、再生成時の保持は保証されない。Scratchのコメント吹き出しを新規作成する構文でもない。
`/*@scratch {...}*/` は呼び出し直後に付く専用メタコメント。ID・mutation・shadow・コメント参照等を保持する。既存コードの編集時は保持する。新規生成でIDを捏造しない。任意の説明をこの形式で書かない。

## 7. 独自ブロックと禁止構文

`procedures_definition`, `procedures_call`, `argument_reporter_*` の存在は、通常のJS関数定義の使用許可ではない。既存のmutation.proccode / argumentids等を持つコードを基に編集する。新しい引数IDやmutationを推測しない。

JS変数宣言・代入・if/for/while/switch/try/return・await・asyncコールバック・通常の関数呼び出し・DOM/fetch/eval/import・式中のJS演算子は対応ASTでない。詳細と検証の隙間は06を参照。
未登録opcodeは原則拒否。全469登録のうち348は実行候補、108は補助・内部、13は非命令登録。親入力に必要な補助メニューは対応箇所へ使い、旧デモ・編集内部・namespaceは実行命令にしない。個別辞書の「用途区分」「新規生成の扱い」を必ず確認する。

根拠: `native-scratch/bridge.js` compileCode/staticValue/callback/stack、`native-scratch/main.js` schema/prepareGraph/normalizeReferences/validateConnections、`native-scratch/lesson-tools.js` buildSpecification、`tests/native-bridge.test.js`。上記例のうち07以外は説明用の辞書構成例であり、GUI反映済みとは表示しない。
