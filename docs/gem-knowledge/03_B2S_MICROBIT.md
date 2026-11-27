# micro:bit More 全登録命令・メニュー

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

## 辞書の読み方と検証範囲

正式なopcode・入力・フィールド・保存値をそのまま記載する。UIの日本語表示と保存値は同一とは限らない。
「入力」はレポーター接続またはリテラル、「フィールド」はブロック本体の選択欄であり、フィールド位置にレポーター式は入れられない。
`checks:null` はB2S仕様JSONの抽出結果であり、任意のJS式を許可する意味ではない。この版ではgetCheck()を持たない接続からnullが出るため、実workspaceのcheck_と出力形状も併記・照合した。条件型はBoolean宣言／六角形出力から区別する。

- ソース確認: 辞書採取版のworkspace定義、VM primitive/hat登録、固定上流ソースを照合。
- 変換・検証: 辞書採取版と一致する `bridge.js` と `main.js` のschema/接続/メニュー検証関数を、公開版workspace上で呼び出した独立ハーネスで確認。各項目のコードを1例ずつ検証した。全引数値・全mutationの試験ではない。
- グラフ往復: 生成グラフ→Script→グラフの同一性を確認。これを全項目のGUI反映成功とは呼ばない。
- GUI反映・GUI往復: `07_B2S_VERIFIED_EXAMPLES.md` の7例に限って、実際の公開画面のボタンで確認。
- 実行・実機: 辞書採取時点では未検証。運用更新では公開版の提示三角形コードのペン描画を確認したが、全命令の実行・実機動作を確認したものではない。検証成功は通信・認識・機器動作成功を意味しない。

初期値は「空のブロックのフィールド値」「現在のtoolbox shadow値」「getInfoの宣言値」を区別する。入力の省略でデフォルトが補われるわけではない。SUBSTACK以外の入力は必ず指定する。
`null` は空の接続を表すパーサー受理値で、命令が正しく動く既定値ではない。実用コード生成では `null` の空接続を適切な値／条件レポーターの代わりに使わない。

動的メニューはモデル未ロード・追加機器なし・既定スプライトでのスナップショットであり、列挙値を普遍的な全候補と扱わない。

## 用途区分と新規コード生成の判定（全資料共通）

全体の469登録は、VM primitive/hatのある348実行候補、実行登録のない108補助・内部・旧デモ、接続を持たない13非命令登録に分かれる。348候補にもイベント・値・条件があり、すべてを命令列へ並べてよいわけではない。
108件のうち、親入力shadow・既存実コードで対応が確認できるメニュー／リテラル補助だけを対応する入力内で使用する。旧デモextension_*、編集用argument_editor_*等を実行命令として新規生成しない。13非命令登録は呼び出さない。独自ブロックの定義・引数等は既存mutationの保持が前提。全候補の実行成功や実機対応は保証していない。
各項目の「用途区分」「新規生成の扱い」が、監査用変換例よりも先に適用される。補助・内部定義のコード例はパーサー受理範囲を記録した監査例であり、生徒用の完成プログラムとしてコピーしない。詳しい選別・回答規則は08を参照する。
採取言語は日本語。ロケールの異なる現在の仕様では入力・フィールド自体が変わる場合もあるため、食い違いを確認せず混用しない。

## 端子・センサ・機器の意味

micro:bit Moreの拡張IDは `microbitMore`。標準micro:bit拡張のID `microbit` とは別で、opcode・端子メニューを交換できない。

| 機能 | 現行の表現・値 | 注意 |
|---|---|---|
| 加速度X/Y/Z | `microbitMore_getAcceleration({AXIS:"x"})`。`"x","y","z","absolute"` | motion-parser.jsで1g相当を1000へ換算。absoluteはベクトル大きさを丸める。機器未接続で0が返る経路があり、0を静止の証拠にしない |
| 明るさ | `microbitMore_getLightLevel({})` | 端末値0〜255を百分率へ換算、小数1桁。授業のしきい値を0〜255のまま使わない |
| 温度 | `microbitMore_getTemperature({})` | 摂氏の機器読取値。室温の精密測定値とは扱わない |
| 音入力 | `microbitMore_getSoundLevel({})` | micro:bit側のマイクを有効化して0〜100相当へ換算。PCマイクやSpeech2Scratchとは別 |
| ボタン | `NAME:"A"` / `"B"`、イベント`"DOWN","UP","CLICK"` | `isButtonPressed`は状態、whenButtonEventはイベント |
| タッチ | `NAME:"LOGO","P0","P1","P2"` | PIN欄とは保存値が異なる。機種・ファームウェアに依存 |
| デジタル・PWM・サーボ | `PIN:"0","1","2","8","12","13","14","15","16"` | 物理端子P0/P1/...。配列の添字や接続の通し番号ではない。`PIN:"P1"`は不正メニュー |
| アナログ入力 | `PIN:"0","1","2"` | 物理P0〜P2。readAnalogInの値を `round(level*1000/1024)/10` へ換算。0〜1023をそのまま返す仕様ではない |
| PWM出力 | `setAnalogOut`の`LEVEL` | parseInt後0〜100へ制限しPWM 0〜1024へ換算。アナログ電圧のDAC命令ではない |
| サーボ | `setServo`の`ANGLE` | parseInt後0〜180へ制限。`PIN`はフィールド、`ANGLE`は値入力。上流getInfoにはRANGE/CENTERの宣言があるが、現行B2Sのworkspace入力・フィールドにはないため追加しない |
| デジタル出力 | `LEVEL:"false"` / `"true"` | toolboxのmenu保存値はこの文字列。実装ではtrue/数値等も解釈するがGemは正規保存値を使う |
| 音出力 | `playTone({FREQ:...,VOL:...})` / `stopTone({})` | PCの音ブロックとは別。周波数・音量の値入力 |
| 方位・傾き・磁気 | getCompassHeading/getPitch/getRoll/getMagneticForce | 方位は0〜359度、pitch/rollは度。日本語採取ではgetMagneticForceのAXISフィールドは"x","y","z","absolute"。英語状態の採取ではAXISなしだったため、現在の言語・仕様に合わせる |

LEDマトリクス `displayMatrix` と外付けLEDのGPIO出力は別。matrixは25セルの専用shadowを使う。
端子イベントは `listenPinEventType` でイベント種類を設定し、`whenPinEvent` / `getPinEventValue` を使用する。パルス・エッジの物理挙動は実機未検証。

## 無線・ラベル付きデータの区別

この公開登録集合には、micro:bit間のradioグループ設定・radio送信・radio受信を表すopcodeは存在しなかった。`radioSend`等を推測して生成しない。
`sendData` / `whenDataReceived` / `getDataLabeled` はラベル付きのホスト↔micro:bit通信であり、micro:bit同士のradio命令として紹介しない。
下位 `microbit-more.js` の `sendData` はBLECommandのデータ送信を使用。ラベルは8文字コード分、文字データは11文字コード分に切られ、数値はfloat32へ変換される。非ASCIIの意味やファーム側との通信は本調査未検証。
物理的な無線接続には拡張の接続操作と対応ファームウェアが必要。構文検証はBluetooth接続を行わない。

根拠: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`、同 `microbit-more.js`、同 `parsers/motion-parser.js`、`stretch3-base/prepare.mjs`。

## micro:bit More（45定義）

- `microbitMore_displayClear` — 画面を消す
- `microbitMore_displayMatrix` — パターン ? を表示する
- `microbitMore_displayText` — 文字 ? を ? ミリ秒間隔で流す
- `microbitMore_getAcceleration` — 加速度 x
- `microbitMore_getAnalogValue` — ピン P0 のアナログレベル
- `microbitMore_getCompassHeading` — 北からの角度
- `microbitMore_getDataLabeled` — ラベル ? のデータ
- `microbitMore_getLightLevel` — 明るさ
- `microbitMore_getMagneticForce` — 磁力 x
- `microbitMore_getPinEventValue` — ピン P0 の ローパルスの期間
- `microbitMore_getPitch` — ピッチ
- `microbitMore_getRoll` — ロール
- `microbitMore_getSoundLevel` — 音の大きさ
- `microbitMore_getTemperature` — 温度
- `microbitMore_isButtonPressed` — ボタン A が押されている
- `microbitMore_isPinHigh` — ピン P0 がハイである
- `microbitMore_isPinTouched` — ピン ロゴ がタッチされている
- `microbitMore_listenPinEventType` — ピン P0 の イベントを受けない
- `microbitMore_menu_analogInPins` — 選択肢を持つ補助レポーター。表示名: P0
- `microbitMore_menu_axis` — 選択肢を持つ補助レポーター。表示名: x
- `microbitMore_menu_buttonEventMenu` — 選択肢を持つ補助レポーター。表示名: 押された
- `microbitMore_menu_buttonIDMenu` — 選択肢を持つ補助レポーター。表示名: A
- `microbitMore_menu_connectionStateMenu` — 選択肢を持つ補助レポーター。表示名: つながった
- `microbitMore_menu_digitalValueMenu` — 選択肢を持つ補助レポーター。表示名: ロー
- `microbitMore_menu_gestures` — 選択肢を持つ補助レポーター。表示名: 上へ傾いた
- `microbitMore_menu_gpio` — 選択肢を持つ補助レポーター。表示名: P0
- `microbitMore_menu_pinEventMenu` — 選択肢を持つ補助レポーター。表示名: ローパルス
- `microbitMore_menu_pinEventTimestampMenu` — 選択肢を持つ補助レポーター。表示名: ローパルスの期間
- `microbitMore_menu_pinEventTypeMenu` — 選択肢を持つ補助レポーター。表示名: イベントを受けない
- `microbitMore_menu_pinMode` — 選択肢を持つ補助レポーター。表示名: 開放
- `microbitMore_menu_touchEventMenu` — 選択肢を持つ補助レポーター。表示名: タッチされた
- `microbitMore_menu_touchIDMenu` — 選択肢を持つ補助レポーター。表示名: ロゴ
- `microbitMore_playTone` — ? Hzの音を ? %の大きさで鳴らす
- `microbitMore_sendData` — micro:bit へデータ ? にラベル ? を付けて送る
- `microbitMore_setAnalogOut` — ピン P0 をアナログ出力 ? %にする
- `microbitMore_setDigitalOut` — ピン P0 をデジタル出力 ? にする
- `microbitMore_setPullMode` — ピン P0 を 開放 入力にする
- `microbitMore_setServo` — ピン P0 をサーボ ? 度にする
- `microbitMore_stopTone` — 音を止める
- `microbitMore_whenButtonEvent` — ボタン A が 押された とき
- `microbitMore_whenConnectionChanged` — micro:bit と つながった とき
- `microbitMore_whenDataReceived` — micro:bit からラベル ? のデータを受け取ったとき
- `microbitMore_whenGesture` — 上へ傾いた とき
- `microbitMore_whenPinEvent` — ピン P0 で ローパルス イベントが起きたとき
- `microbitMore_whenTouchEvent` — ピン ロゴ が タッチされた とき

### `microbitMore_displayClear`

意味: 画面を消す。

- 正式opcode: `microbitMore_displayClear`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_displayClear"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_displayMatrix`

意味: パターン ? を表示する。

- 正式opcode: `microbitMore_displayMatrix`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_displayMatrix"]({"MATRIX":"0101010101100010101000100"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MATRIX | 値接続 checks=`null`／実接続check_=`null`／宣言型 `matrix` | shadow=`matrix`、fields=`{"MATRIX":"0101010101100010101000100"}`。getInfo宣言既定=`"0101010101100010101000100"` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_displayText`

意味: 文字 ? を ? ミリ秒間隔で流す。

- 正式opcode: `microbitMore_displayText`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_displayText"]({"TEXT":"Hello!","DELAY":"120"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TEXT | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text`、fields=`{"TEXT":"Hello!"}`。getInfo宣言既定=`"Hello!"` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| DELAY | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"120"}`。getInfo宣言既定=`120` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_getAcceleration`

意味: 加速度 x。

- 正式opcode: `microbitMore_getAcceleration`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_getAcceleration"]({"AXIS":"x"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| AXIS | フィールド／文字列 | `"x"` | `["x","y","z","absolute"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `microbitMore_getAnalogValue`

意味: ピン P0 のアナログレベル。

- 正式opcode: `microbitMore_getAnalogValue`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_getAnalogValue"]({"PIN":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PIN | フィールド／文字列 | `"0"` | `["0","1","2"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_getCompassHeading`

意味: 北からの角度。

- 正式opcode: `microbitMore_getCompassHeading`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_getCompassHeading"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_getDataLabeled`

意味: ラベル ? のデータ。

- 正式opcode: `microbitMore_getDataLabeled`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_getDataLabeled"]({"LABEL":"label-01"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text`、fields=`{"TEXT":"label-01"}`。getInfo宣言既定=`"label-01"` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_getLightLevel`

意味: 明るさ。

- 正式opcode: `microbitMore_getLightLevel`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_getLightLevel"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `microbitMore_getMagneticForce`

意味: 磁力 x。

- 正式opcode: `microbitMore_getMagneticForce`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_getMagneticForce"]({"AXIS":"x"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| AXIS | フィールド／文字列 | `"x"` | `["x","y","z","absolute"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の端子・単位・通信の区別を参照。 AXISは今回の日本語仕様に存在する。英語採取との差があるためロケール違いでは現在のJSONを確認する。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_getPinEventValue`

意味: ピン P0 の ローパルスの期間。

- 正式opcode: `microbitMore_getPinEventValue`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_getPinEventValue"]({"PIN":"0","EVENT":"PULSE_LOW"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PIN | フィールド／文字列 | `"0"` | `["0","1","2","8","12","13","14","15","16"]` |
| EVENT | フィールド／文字列 | `"PULSE_LOW"` | `["PULSE_LOW","PULSE_HIGH","FALL","RISE"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_getPitch`

意味: ピッチ。

- 正式opcode: `microbitMore_getPitch`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_getPitch"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_getRoll`

意味: ロール。

- 正式opcode: `microbitMore_getRoll`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_getRoll"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_getSoundLevel`

意味: 音の大きさ。

- 正式opcode: `microbitMore_getSoundLevel`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_getSoundLevel"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_getTemperature`

意味: 温度。

- 正式opcode: `microbitMore_getTemperature`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_getTemperature"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_isButtonPressed`

意味: ボタン A が押されている。

- 正式opcode: `microbitMore_isButtonPressed`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_isButtonPressed"]({"NAME":"A"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NAME | フィールド／文字列 | `"A"` | `["A","B"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `microbitMore_isPinHigh`

意味: ピン P0 がハイである。

- 正式opcode: `microbitMore_isPinHigh`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_isPinHigh"]({"PIN":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PIN | フィールド／文字列 | `"0"` | `["0","1","2","8","12","13","14","15","16"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_isPinTouched`

意味: ピン ロゴ がタッチされている。

- 正式opcode: `microbitMore_isPinTouched`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_isPinTouched"]({"NAME":"LOGO"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NAME | フィールド／文字列 | `"LOGO"` | `["LOGO","P0","P1","P2"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_listenPinEventType`

意味: ピン P0 の イベントを受けない。

- 正式opcode: `microbitMore_listenPinEventType`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_listenPinEventType"]({"PIN":"0","EVENT_TYPE":"NONE"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PIN | フィールド／文字列 | `"0"` | `["0","1","2","8","12","13","14","15","16"]` |
| EVENT_TYPE | フィールド／文字列 | `"NONE"` | `["NONE","ON_PULSE","ON_EDGE"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_menu_analogInPins`

意味: 選択肢を持つ補助レポーター。表示名: P0。

- 正式opcode: `microbitMore_menu_analogInPins`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_menu_analogInPins"]({"analogInPins":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| analogInPins | フィールド／文字列 | `"0"` | `["0","1","2"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_menu_axis`

意味: 選択肢を持つ補助レポーター。表示名: x。

- 正式opcode: `microbitMore_menu_axis`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_menu_axis"]({"axis":"x"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| axis | フィールド／文字列 | `"x"` | `["x","y","z","absolute"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_menu_buttonEventMenu`

意味: 選択肢を持つ補助レポーター。表示名: 押された。

- 正式opcode: `microbitMore_menu_buttonEventMenu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_menu_buttonEventMenu"]({"buttonEventMenu":"DOWN"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| buttonEventMenu | フィールド／文字列 | `"DOWN"` | `["DOWN","UP","CLICK"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_menu_buttonIDMenu`

意味: 選択肢を持つ補助レポーター。表示名: A。

- 正式opcode: `microbitMore_menu_buttonIDMenu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_menu_buttonIDMenu"]({"buttonIDMenu":"A"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| buttonIDMenu | フィールド／文字列 | `"A"` | `["A","B"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_menu_connectionStateMenu`

意味: 選択肢を持つ補助レポーター。表示名: つながった。

- 正式opcode: `microbitMore_menu_connectionStateMenu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_menu_connectionStateMenu"]({"connectionStateMenu":"connected"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| connectionStateMenu | フィールド／文字列 | `"connected"` | `["connected","disconnected"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_menu_digitalValueMenu`

意味: 選択肢を持つ補助レポーター。表示名: ロー。

- 正式opcode: `microbitMore_menu_digitalValueMenu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_menu_digitalValueMenu"]({"digitalValueMenu":"false"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| digitalValueMenu | フィールド／文字列 | `"false"` | `["false","true"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_menu_gestures`

意味: 選択肢を持つ補助レポーター。表示名: 上へ傾いた。

- 正式opcode: `microbitMore_menu_gestures`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_menu_gestures"]({"gestures":"TILT_UP"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| gestures | フィールド／文字列 | `"TILT_UP"` | `["TILT_UP","TILT_DOWN","TILT_LEFT","TILT_RIGHT","FACE_UP","FACE_DOWN","FREEFALL","G3","G6","G8","SHAKE"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_menu_gpio`

意味: 選択肢を持つ補助レポーター。表示名: P0。

- 正式opcode: `microbitMore_menu_gpio`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_menu_gpio"]({"gpio":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| gpio | フィールド／文字列 | `"0"` | `["0","1","2","8","12","13","14","15","16"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_menu_pinEventMenu`

意味: 選択肢を持つ補助レポーター。表示名: ローパルス。

- 正式opcode: `microbitMore_menu_pinEventMenu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_menu_pinEventMenu"]({"pinEventMenu":"PULSE_LOW"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| pinEventMenu | フィールド／文字列 | `"PULSE_LOW"` | `["PULSE_LOW","PULSE_HIGH","FALL","RISE"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_menu_pinEventTimestampMenu`

意味: 選択肢を持つ補助レポーター。表示名: ローパルスの期間。

- 正式opcode: `microbitMore_menu_pinEventTimestampMenu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_menu_pinEventTimestampMenu"]({"pinEventTimestampMenu":"PULSE_LOW"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| pinEventTimestampMenu | フィールド／文字列 | `"PULSE_LOW"` | `["PULSE_LOW","PULSE_HIGH","FALL","RISE"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_menu_pinEventTypeMenu`

意味: 選択肢を持つ補助レポーター。表示名: イベントを受けない。

- 正式opcode: `microbitMore_menu_pinEventTypeMenu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_menu_pinEventTypeMenu"]({"pinEventTypeMenu":"NONE"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| pinEventTypeMenu | フィールド／文字列 | `"NONE"` | `["NONE","ON_PULSE","ON_EDGE"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_menu_pinMode`

意味: 選択肢を持つ補助レポーター。表示名: 開放。

- 正式opcode: `microbitMore_menu_pinMode`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_menu_pinMode"]({"pinMode":"NONE"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| pinMode | フィールド／文字列 | `"NONE"` | `["NONE","UP","DOWN"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_menu_touchEventMenu`

意味: 選択肢を持つ補助レポーター。表示名: タッチされた。

- 正式opcode: `microbitMore_menu_touchEventMenu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_menu_touchEventMenu"]({"touchEventMenu":"DOWN"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| touchEventMenu | フィールド／文字列 | `"DOWN"` | `["DOWN","UP","CLICK"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_menu_touchIDMenu`

意味: 選択肢を持つ補助レポーター。表示名: ロゴ。

- 正式opcode: `microbitMore_menu_touchIDMenu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbitMore_menu_touchIDMenu"]({"touchIDMenu":"LOGO"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| touchIDMenu | フィールド／文字列 | `"LOGO"` | `["LOGO","P0","P1","P2"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_playTone`

意味: ? Hzの音を ? %の大きさで鳴らす。

- 正式opcode: `microbitMore_playTone`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_playTone"]({"FREQ":"440","VOL":"100"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| FREQ | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"440"}`。getInfo宣言既定=`440` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| VOL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"100"}`。getInfo宣言既定=`100` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_sendData`

意味: micro:bit へデータ ? にラベル ? を付けて送る。

- 正式opcode: `microbitMore_sendData`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_sendData"]({"DATA":"data","LABEL":"label-01"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DATA | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text`、fields=`{"TEXT":"data"}`。getInfo宣言既定=`"data"` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| LABEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text`、fields=`{"TEXT":"label-01"}`。getInfo宣言既定=`"label-01"` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_setAnalogOut`

意味: ピン P0 をアナログ出力 ? %にする。

- 正式opcode: `microbitMore_setAnalogOut`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_setAnalogOut"]({"PIN":"0","LEVEL":"0"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PIN | フィールド／文字列 | `"0"` | `["0","1","2","8","12","13","14","15","16"]` |
| LEVEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"0"}`。getInfo宣言既定=`0` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_setDigitalOut`

意味: ピン P0 をデジタル出力 ? にする。

- 正式opcode: `microbitMore_setDigitalOut`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_setDigitalOut"]({"PIN":"0","LEVEL":"false"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PIN | フィールド／文字列 | `"0"` | `["0","1","2","8","12","13","14","15","16"]` |
| LEVEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`microbitMore_menu_digitalValueMenu`、fields=`{"digitalValueMenu":"false"}`。getInfo宣言既定=`"false"` | shadowメニュー保存値: `{"digitalValueMenu":["false","true"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `microbitMore_setPullMode`

意味: ピン P0 を 開放 入力にする。

- 正式opcode: `microbitMore_setPullMode`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_setPullMode"]({"PIN":"0","MODE":"NONE"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PIN | フィールド／文字列 | `"0"` | `["0","1","2","8","12","13","14","15","16"]` |
| MODE | フィールド／文字列 | `"NONE"` | `["NONE","UP","DOWN"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_setServo`

意味: ピン P0 をサーボ ? 度にする。

- 正式opcode: `microbitMore_setServo`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_setServo"]({"PIN":"0","ANGLE":"0"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PIN | フィールド／文字列 | `"0"` | `["0","1","2","8","12","13","14","15","16"]` |
| ANGLE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"0"}`。getInfo宣言既定=`0` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の端子・単位・通信の区別を参照。 getInfoだけにあるRANGE/CENTERはB2S入力ではないため出力しない。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `microbitMore_stopTone`

意味: 音を止める。

- 正式opcode: `microbitMore_stopTone`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_stopTone"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_whenButtonEvent`

意味: ボタン A が 押された とき。

- 正式opcode: `microbitMore_whenButtonEvent`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_whenButtonEvent"]({"NAME":"A","EVENT":"DOWN"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NAME | フィールド／文字列 | `"A"` | `["A","B"]` |
| EVENT | フィールド／文字列 | `"DOWN"` | `["DOWN","UP","CLICK"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_whenConnectionChanged`

意味: micro:bit と つながった とき。

- 正式opcode: `microbitMore_whenConnectionChanged`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_whenConnectionChanged"]({"STATE":"connected"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| STATE | フィールド／文字列 | `"connected"` | `["connected","disconnected"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_whenDataReceived`

意味: micro:bit からラベル ? のデータを受け取ったとき。

- 正式opcode: `microbitMore_whenDataReceived`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_whenDataReceived"]({"LABEL":"label-01"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text`、fields=`{"TEXT":"label-01"}`。getInfo宣言既定=`"label-01"` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_whenGesture`

意味: 上へ傾いた とき。

- 正式opcode: `microbitMore_whenGesture`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_whenGesture"]({"GESTURE":"TILT_UP"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| GESTURE | フィールド／文字列 | `"TILT_UP"` | `["TILT_UP","TILT_DOWN","TILT_LEFT","TILT_RIGHT","FACE_UP","FACE_DOWN","FREEFALL","G3","G6","G8","SHAKE"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_whenPinEvent`

意味: ピン P0 で ローパルス イベントが起きたとき。

- 正式opcode: `microbitMore_whenPinEvent`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_whenPinEvent"]({"PIN":"0","EVENT":"PULSE_LOW"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PIN | フィールド／文字列 | `"0"` | `["0","1","2","8","12","13","14","15","16"]` |
| EVENT | フィールド／文字列 | `"PULSE_LOW"` | `["PULSE_LOW","PULSE_HIGH","FALL","RISE"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbitMore_whenTouchEvent`

意味: ピン ロゴ が タッチされた とき。

- 正式opcode: `microbitMore_whenTouchEvent`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: micro:bit More（ID `microbitMore`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbitMore_whenTouchEvent"]({"NAME":"LOGO","EVENT":"DOWN"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NAME | フィールド／文字列 | `"LOGO"` | `["LOGO","P0","P1","P2"]` |
| EVENT | フィールド／文字列 | `"DOWN"` | `["DOWN","UP","CLICK"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の端子・単位・通信の区別を参照。

出典: `stretch3-base/mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877/src/vm/extensions/block/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

