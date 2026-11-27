# その他の公開組込み拡張辞書

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

## 公開版の追加拡張

ペン・音楽・音声合成・翻訳に加え、実際に公開VMからロードできた標準のビデオモーションセンサー、micro:bit、WeDo 2.0、EV3、BOOST、Go Direct、Makey Makeyも省略せず記録した。
「拡張情報Registryに表示されるもの」と「VMに組込み登録されてロード可能なもの」は同じ集合ではない。AI仕様JSONのextensions配列だけを見て、blocks配列にある他拡張を否定しない。
標準micro:bitとmicro:bit Moreは別拡張。ロボット・センサ用の構文検証に実機は接続していない。

ペンの旧Hue/Shade命令等は互換用として登録されている。新規生成は色パラメータ指定の現行命令を優先する。数値・音符・楽器・ドラムの保存値はUI表示と区別する。
音楽はMusic、PCの音素材再生は標準sound、音声合成はtext2speech、micro:bit音出力はmicrobitMoreであり別機能。
text2speechのVOICEは例として `"ALTO"`、LANGUAGEは `"ja"`。保存値を「アルト」「日本語」に翻訳しない。全候補は下の定義を参照。
翻訳先の言語リストはサービス／ロケールに依存し、起動時に外部一覧取得もある。本調査は外部サービス到達を検証しておらず、取得時の候補集合だけを保存した。言語候補の空集合は任意言語コードの成功保証ではない。
`stretch3-base/prepare.mjs` では翻訳サービスを `https://scratch-translate-proxy.junya-119.workers.dev/` に置換。サービスの利用結果・発音・音源再生品質は未検証。
Camera Selectorは公開ビルドで除外。TMPose2Scratch/Handpose/Facemesh/AkaDako等はこの公開版に登録されていないため命令を作らない。

## LEGO BOOST（18定義）

- `boost_getMotorPosition` — モーター ? の位置
- `boost_getTiltAngle` — ? 方向の傾き
- `boost_menu_COLOR` — 選択肢を持つ補助レポーター。表示名: 赤
- `boost_menu_MOTOR_DIRECTION` — 選択肢を持つ補助レポーター。表示名: こちら向き
- `boost_menu_MOTOR_ID` — 選択肢を持つ補助レポーター。表示名: A
- `boost_menu_MOTOR_REPORTER_ID` — 選択肢を持つ補助レポーター。表示名: A
- `boost_menu_TILT_DIRECTION` — 選択肢を持つ補助レポーター。表示名: 上
- `boost_menu_TILT_DIRECTION_ANY` — 選択肢を持つ補助レポーター。表示名: 上
- `boost_motorOff` — モーター ? をオフにする
- `boost_motorOn` — モーター ? をオンにする
- `boost_motorOnFor` — モーター ? を ? 秒間オンにする
- `boost_motorOnForRotation` — モーター ? を ? 回転させる
- `boost_seeingColor` — ? を見ている？
- `boost_setLightHue` — ライトの色を ? にする
- `boost_setMotorDirection` — モーター ? の向きを ? にする
- `boost_setMotorPower` — モーター ? の速さを ? %にする
- `boost_whenColor` — ? を見たとき
- `boost_whenTilted` — ? に傾いたとき

### `boost_getMotorPosition`

意味: モーター ? の位置。

- 正式opcode: `boost_getMotorPosition`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["boost_getMotorPosition"]({"MOTOR_REPORTER_ID":"A"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_REPORTER_ID | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`boost_menu_MOTOR_REPORTER_ID`、fields=`{"MOTOR_REPORTER_ID":"A"}`。getInfo宣言既定=`"A"` | shadowメニュー保存値: `{"MOTOR_REPORTER_ID":["A","B","C","D"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_getTiltAngle`

意味: ? 方向の傾き。

- 正式opcode: `boost_getTiltAngle`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["boost_getTiltAngle"]({"TILT_DIRECTION":"up"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TILT_DIRECTION | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`boost_menu_TILT_DIRECTION`、fields=`{"TILT_DIRECTION":"up"}`。getInfo宣言既定=`"up"` | shadowメニュー保存値: `{"TILT_DIRECTION":["up","down","left","right"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_menu_COLOR`

意味: 選択肢を持つ補助レポーター。表示名: 赤。

- 正式opcode: `boost_menu_COLOR`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["boost_menu_COLOR"]({"COLOR":"red"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| COLOR | フィールド／文字列 | `"red"` | `["red","blue","green","yellow","white","black","any"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_menu_MOTOR_DIRECTION`

意味: 選択肢を持つ補助レポーター。表示名: こちら向き。

- 正式opcode: `boost_menu_MOTOR_DIRECTION`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["boost_menu_MOTOR_DIRECTION"]({"MOTOR_DIRECTION":"this way"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_DIRECTION | フィールド／文字列 | `"this way"` | `["this way","that way","reverse"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_menu_MOTOR_ID`

意味: 選択肢を持つ補助レポーター。表示名: A。

- 正式opcode: `boost_menu_MOTOR_ID`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["boost_menu_MOTOR_ID"]({"MOTOR_ID":"A"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_ID | フィールド／文字列 | `"A"` | `["A","B","C","D","AB","ABCD"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_menu_MOTOR_REPORTER_ID`

意味: 選択肢を持つ補助レポーター。表示名: A。

- 正式opcode: `boost_menu_MOTOR_REPORTER_ID`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["boost_menu_MOTOR_REPORTER_ID"]({"MOTOR_REPORTER_ID":"A"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_REPORTER_ID | フィールド／文字列 | `"A"` | `["A","B","C","D"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_menu_TILT_DIRECTION`

意味: 選択肢を持つ補助レポーター。表示名: 上。

- 正式opcode: `boost_menu_TILT_DIRECTION`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["boost_menu_TILT_DIRECTION"]({"TILT_DIRECTION":"up"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TILT_DIRECTION | フィールド／文字列 | `"up"` | `["up","down","left","right"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_menu_TILT_DIRECTION_ANY`

意味: 選択肢を持つ補助レポーター。表示名: 上。

- 正式opcode: `boost_menu_TILT_DIRECTION_ANY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["boost_menu_TILT_DIRECTION_ANY"]({"TILT_DIRECTION_ANY":"up"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TILT_DIRECTION_ANY | フィールド／文字列 | `"up"` | `["up","down","left","right","any"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_motorOff`

意味: モーター ? をオフにする。

- 正式opcode: `boost_motorOff`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["boost_motorOff"]({"MOTOR_ID":"A"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_ID | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`boost_menu_MOTOR_ID`、fields=`{"MOTOR_ID":"A"}`。getInfo宣言既定=`"A"` | shadowメニュー保存値: `{"MOTOR_ID":["A","B","C","D","AB","ABCD"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_motorOn`

意味: モーター ? をオンにする。

- 正式opcode: `boost_motorOn`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["boost_motorOn"]({"MOTOR_ID":"A"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_ID | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`boost_menu_MOTOR_ID`、fields=`{"MOTOR_ID":"A"}`。getInfo宣言既定=`"A"` | shadowメニュー保存値: `{"MOTOR_ID":["A","B","C","D","AB","ABCD"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_motorOnFor`

意味: モーター ? を ? 秒間オンにする。

- 正式opcode: `boost_motorOnFor`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["boost_motorOnFor"]({"MOTOR_ID":"A","DURATION":"1"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_ID | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`boost_menu_MOTOR_ID`、fields=`{"MOTOR_ID":"A"}`。getInfo宣言既定=`"A"` | shadowメニュー保存値: `{"MOTOR_ID":["A","B","C","D","AB","ABCD"]}` |
| DURATION | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"1"}`。getInfo宣言既定=`1` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_motorOnForRotation`

意味: モーター ? を ? 回転させる。

- 正式opcode: `boost_motorOnForRotation`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["boost_motorOnForRotation"]({"MOTOR_ID":"A","ROTATION":"1"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_ID | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`boost_menu_MOTOR_ID`、fields=`{"MOTOR_ID":"A"}`。getInfo宣言既定=`"A"` | shadowメニュー保存値: `{"MOTOR_ID":["A","B","C","D","AB","ABCD"]}` |
| ROTATION | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"1"}`。getInfo宣言既定=`1` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_seeingColor`

意味: ? を見ている？。

- 正式opcode: `boost_seeingColor`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["boost_seeingColor"]({"COLOR":"any"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| COLOR | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`boost_menu_COLOR`、fields=`{"COLOR":"any"}`。getInfo宣言既定=`"any"` | shadowメニュー保存値: `{"COLOR":["red","blue","green","yellow","white","black","any"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_setLightHue`

意味: ライトの色を ? にする。

- 正式opcode: `boost_setLightHue`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["boost_setLightHue"]({"HUE":"50"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| HUE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"50"}`。getInfo宣言既定=`50` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_setMotorDirection`

意味: モーター ? の向きを ? にする。

- 正式opcode: `boost_setMotorDirection`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["boost_setMotorDirection"]({"MOTOR_ID":"A","MOTOR_DIRECTION":"this way"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_ID | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`boost_menu_MOTOR_ID`、fields=`{"MOTOR_ID":"A"}`。getInfo宣言既定=`"A"` | shadowメニュー保存値: `{"MOTOR_ID":["A","B","C","D","AB","ABCD"]}` |
| MOTOR_DIRECTION | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`boost_menu_MOTOR_DIRECTION`、fields=`{"MOTOR_DIRECTION":"this way"}`。getInfo宣言既定=`"this way"` | shadowメニュー保存値: `{"MOTOR_DIRECTION":["this way","that way","reverse"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_setMotorPower`

意味: モーター ? の速さを ? %にする。

- 正式opcode: `boost_setMotorPower`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["boost_setMotorPower"]({"MOTOR_ID":"ABCD","POWER":"100"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_ID | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`boost_menu_MOTOR_ID`、fields=`{"MOTOR_ID":"ABCD"}`。getInfo宣言既定=`"ABCD"` | shadowメニュー保存値: `{"MOTOR_ID":["A","B","C","D","AB","ABCD"]}` |
| POWER | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"100"}`。getInfo宣言既定=`100` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_whenColor`

意味: ? を見たとき。

- 正式opcode: `boost_whenColor`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["boost_whenColor"]({"COLOR":"any"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| COLOR | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`boost_menu_COLOR`、fields=`{"COLOR":"any"}`。getInfo宣言既定=`"any"` | shadowメニュー保存値: `{"COLOR":["red","blue","green","yellow","white","black","any"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `boost_whenTilted`

意味: ? に傾いたとき。

- 正式opcode: `boost_whenTilted`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: LEGO BOOST（ID `boost`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["boost_whenTilted"]({"TILT_DIRECTION_ANY":"any"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TILT_DIRECTION_ANY | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`boost_menu_TILT_DIRECTION_ANY`、fields=`{"TILT_DIRECTION_ANY":"any"}`。getInfo宣言既定=`"any"` | shadowメニュー保存値: `{"TILT_DIRECTION_ANY":["up","down","left","right","any"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_boost/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## LEGO MINDSTORMS EV3（13定義）

- `ev3_beep` — ? の音符を ? 秒鳴らす
- `ev3_buttonPressed` — ボタン ? が押された
- `ev3_getBrightness` — 明るさ
- `ev3_getDistance` — 距離
- `ev3_getMotorPosition` — モーター ? の位置
- `ev3_menu_motorPorts` — 選択肢を持つ補助レポーター。表示名: A
- `ev3_menu_sensorPorts` — 選択肢を持つ補助レポーター。表示名: 1
- `ev3_motorSetPower` — モーター ? のパワーを ? %にする
- `ev3_motorTurnClockwise` — モーター ? をこちら向きに ? 秒間回す
- `ev3_motorTurnCounterClockwise` — モーター ? をあちら向きに ? 秒間回す
- `ev3_whenBrightnessLessThan` — 明るさ < ? のとき
- `ev3_whenButtonPressed` — ボタン ? が押されたとき
- `ev3_whenDistanceLessThan` — 距離 < ? のとき

### `ev3_beep`

意味: ? の音符を ? 秒鳴らす。

- 正式opcode: `ev3_beep`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO MINDSTORMS EV3（ID `ev3`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ev3_beep"]({"NOTE":"60","TIME":"0.5"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NOTE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `note` | shadow=`note`、fields=`{"NOTE":"60"}`。getInfo宣言既定=`60` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| TIME | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"0.5"}`。getInfo宣言既定=`0.5` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ev3_buttonPressed`

意味: ボタン ? が押された。

- 正式opcode: `ev3_buttonPressed`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO MINDSTORMS EV3（ID `ev3`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ev3_buttonPressed"]({"PORT":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PORT | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`ev3_menu_sensorPorts`、fields=`{"sensorPorts":"0"}`。getInfo宣言既定=`0` | shadowメニュー保存値: `{"sensorPorts":["0","1","2","3"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ev3_getBrightness`

意味: 明るさ。

- 正式opcode: `ev3_getBrightness`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO MINDSTORMS EV3（ID `ev3`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ev3_getBrightness"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ev3_getDistance`

意味: 距離。

- 正式opcode: `ev3_getDistance`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO MINDSTORMS EV3（ID `ev3`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ev3_getDistance"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ev3_getMotorPosition`

意味: モーター ? の位置。

- 正式opcode: `ev3_getMotorPosition`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO MINDSTORMS EV3（ID `ev3`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ev3_getMotorPosition"]({"PORT":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PORT | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`ev3_menu_motorPorts`、fields=`{"motorPorts":"0"}`。getInfo宣言既定=`0` | shadowメニュー保存値: `{"motorPorts":["0","1","2","3"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ev3_menu_motorPorts`

意味: 選択肢を持つ補助レポーター。表示名: A。

- 正式opcode: `ev3_menu_motorPorts`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO MINDSTORMS EV3（ID `ev3`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ev3_menu_motorPorts"]({"motorPorts":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| motorPorts | フィールド／文字列 | `"0"` | `["0","1","2","3"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ev3_menu_sensorPorts`

意味: 選択肢を持つ補助レポーター。表示名: 1。

- 正式opcode: `ev3_menu_sensorPorts`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO MINDSTORMS EV3（ID `ev3`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ev3_menu_sensorPorts"]({"sensorPorts":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| sensorPorts | フィールド／文字列 | `"0"` | `["0","1","2","3"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ev3_motorSetPower`

意味: モーター ? のパワーを ? %にする。

- 正式opcode: `ev3_motorSetPower`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO MINDSTORMS EV3（ID `ev3`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ev3_motorSetPower"]({"PORT":"0","POWER":"100"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PORT | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`ev3_menu_motorPorts`、fields=`{"motorPorts":"0"}`。getInfo宣言既定=`0` | shadowメニュー保存値: `{"motorPorts":["0","1","2","3"]}` |
| POWER | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"100"}`。getInfo宣言既定=`100` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ev3_motorTurnClockwise`

意味: モーター ? をこちら向きに ? 秒間回す。

- 正式opcode: `ev3_motorTurnClockwise`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO MINDSTORMS EV3（ID `ev3`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ev3_motorTurnClockwise"]({"PORT":"0","TIME":"1"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PORT | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`ev3_menu_motorPorts`、fields=`{"motorPorts":"0"}`。getInfo宣言既定=`0` | shadowメニュー保存値: `{"motorPorts":["0","1","2","3"]}` |
| TIME | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"1"}`。getInfo宣言既定=`1` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ev3_motorTurnCounterClockwise`

意味: モーター ? をあちら向きに ? 秒間回す。

- 正式opcode: `ev3_motorTurnCounterClockwise`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO MINDSTORMS EV3（ID `ev3`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ev3_motorTurnCounterClockwise"]({"PORT":"0","TIME":"1"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PORT | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`ev3_menu_motorPorts`、fields=`{"motorPorts":"0"}`。getInfo宣言既定=`0` | shadowメニュー保存値: `{"motorPorts":["0","1","2","3"]}` |
| TIME | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"1"}`。getInfo宣言既定=`1` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ev3_whenBrightnessLessThan`

意味: 明るさ < ? のとき。

- 正式opcode: `ev3_whenBrightnessLessThan`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: LEGO MINDSTORMS EV3（ID `ev3`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ev3_whenBrightnessLessThan"]({"DISTANCE":"50"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DISTANCE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"50"}`。getInfo宣言既定=`50` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ev3_whenButtonPressed`

意味: ボタン ? が押されたとき。

- 正式opcode: `ev3_whenButtonPressed`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: LEGO MINDSTORMS EV3（ID `ev3`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ev3_whenButtonPressed"]({"PORT":"0"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PORT | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`ev3_menu_sensorPorts`、fields=`{"sensorPorts":"0"}`。getInfo宣言既定=`0` | shadowメニュー保存値: `{"sensorPorts":["0","1","2","3"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ev3_whenDistanceLessThan`

意味: 距離 < ? のとき。

- 正式opcode: `ev3_whenDistanceLessThan`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: LEGO MINDSTORMS EV3（ID `ev3`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ev3_whenDistanceLessThan"]({"DISTANCE":"5"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DISTANCE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"5"}`。getInfo宣言既定=`5` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## Go Direct Force & Acceleration（14定義）

- `gdxfor_getAcceleration` — ? 方向への加速度
- `gdxfor_getForce` — force
- `gdxfor_getSpinSpeed` — ? 回転のはやさ
- `gdxfor_getTilt` — ? 方向の傾き
- `gdxfor_isFreeFalling` — 落下中
- `gdxfor_isTilted` — ? に傾いた
- `gdxfor_menu_axisOptions` — 選択肢を持つ補助レポーター。表示名: x
- `gdxfor_menu_gestureOptions` — 選択肢を持つ補助レポーター。表示名: 振られた
- `gdxfor_menu_pushPullOptions` — 選択肢を持つ補助レポーター。表示名: 押された
- `gdxfor_menu_tiltAnyOptions` — 選択肢を持つ補助レポーター。表示名: 前
- `gdxfor_menu_tiltOptions` — 選択肢を持つ補助レポーター。表示名: 前
- `gdxfor_whenForcePushedOrPulled` — force sensorが ? とき
- `gdxfor_whenGesture` — ? とき
- `gdxfor_whenTilted` — ? に傾いたとき

### `gdxfor_getAcceleration`

意味: ? 方向への加速度。

- 正式opcode: `gdxfor_getAcceleration`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: Go Direct Force & Acceleration（ID `gdxfor`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["gdxfor_getAcceleration"]({"DIRECTION":"x"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DIRECTION | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`gdxfor_menu_axisOptions`、fields=`{"axisOptions":"x"}`。getInfo宣言既定=`"x"` | shadowメニュー保存値: `{"axisOptions":["x","y","z"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `gdxfor_getForce`

意味: force。

- 正式opcode: `gdxfor_getForce`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: Go Direct Force & Acceleration（ID `gdxfor`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["gdxfor_getForce"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `gdxfor_getSpinSpeed`

意味: ? 回転のはやさ。

- 正式opcode: `gdxfor_getSpinSpeed`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: Go Direct Force & Acceleration（ID `gdxfor`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["gdxfor_getSpinSpeed"]({"DIRECTION":"z"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DIRECTION | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`gdxfor_menu_axisOptions`、fields=`{"axisOptions":"z"}`。getInfo宣言既定=`"z"` | shadowメニュー保存値: `{"axisOptions":["x","y","z"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `gdxfor_getTilt`

意味: ? 方向の傾き。

- 正式opcode: `gdxfor_getTilt`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: Go Direct Force & Acceleration（ID `gdxfor`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["gdxfor_getTilt"]({"TILT":"front"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TILT | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`gdxfor_menu_tiltOptions`、fields=`{"tiltOptions":"front"}`。getInfo宣言既定=`"front"` | shadowメニュー保存値: `{"tiltOptions":["front","back","left","right"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `gdxfor_isFreeFalling`

意味: 落下中。

- 正式opcode: `gdxfor_isFreeFalling`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: Go Direct Force & Acceleration（ID `gdxfor`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["gdxfor_isFreeFalling"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `gdxfor_isTilted`

意味: ? に傾いた。

- 正式opcode: `gdxfor_isTilted`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: Go Direct Force & Acceleration（ID `gdxfor`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["gdxfor_isTilted"]({"TILT":"any"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TILT | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`gdxfor_menu_tiltAnyOptions`、fields=`{"tiltAnyOptions":"any"}`。getInfo宣言既定=`"any"` | shadowメニュー保存値: `{"tiltAnyOptions":["front","back","left","right","any"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `gdxfor_menu_axisOptions`

意味: 選択肢を持つ補助レポーター。表示名: x。

- 正式opcode: `gdxfor_menu_axisOptions`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: Go Direct Force & Acceleration（ID `gdxfor`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["gdxfor_menu_axisOptions"]({"axisOptions":"x"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| axisOptions | フィールド／文字列 | `"x"` | `["x","y","z"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `gdxfor_menu_gestureOptions`

意味: 選択肢を持つ補助レポーター。表示名: 振られた。

- 正式opcode: `gdxfor_menu_gestureOptions`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: Go Direct Force & Acceleration（ID `gdxfor`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["gdxfor_menu_gestureOptions"]({"gestureOptions":"shaken"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| gestureOptions | フィールド／文字列 | `"shaken"` | `["shaken","started falling","turned face up","turned face down"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `gdxfor_menu_pushPullOptions`

意味: 選択肢を持つ補助レポーター。表示名: 押された。

- 正式opcode: `gdxfor_menu_pushPullOptions`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: Go Direct Force & Acceleration（ID `gdxfor`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["gdxfor_menu_pushPullOptions"]({"pushPullOptions":"pushed"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| pushPullOptions | フィールド／文字列 | `"pushed"` | `["pushed","pulled"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `gdxfor_menu_tiltAnyOptions`

意味: 選択肢を持つ補助レポーター。表示名: 前。

- 正式opcode: `gdxfor_menu_tiltAnyOptions`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: Go Direct Force & Acceleration（ID `gdxfor`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["gdxfor_menu_tiltAnyOptions"]({"tiltAnyOptions":"front"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| tiltAnyOptions | フィールド／文字列 | `"front"` | `["front","back","left","right","any"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `gdxfor_menu_tiltOptions`

意味: 選択肢を持つ補助レポーター。表示名: 前。

- 正式opcode: `gdxfor_menu_tiltOptions`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: Go Direct Force & Acceleration（ID `gdxfor`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["gdxfor_menu_tiltOptions"]({"tiltOptions":"front"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| tiltOptions | フィールド／文字列 | `"front"` | `["front","back","left","right"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `gdxfor_whenForcePushedOrPulled`

意味: force sensorが ? とき。

- 正式opcode: `gdxfor_whenForcePushedOrPulled`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: Go Direct Force & Acceleration（ID `gdxfor`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["gdxfor_whenForcePushedOrPulled"]({"PUSH_PULL":"pushed"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PUSH_PULL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`gdxfor_menu_pushPullOptions`、fields=`{"pushPullOptions":"pushed"}`。getInfo宣言既定=`"pushed"` | shadowメニュー保存値: `{"pushPullOptions":["pushed","pulled"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `gdxfor_whenGesture`

意味: ? とき。

- 正式opcode: `gdxfor_whenGesture`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: Go Direct Force & Acceleration（ID `gdxfor`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["gdxfor_whenGesture"]({"GESTURE":"shaken"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| GESTURE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`gdxfor_menu_gestureOptions`、fields=`{"gestureOptions":"shaken"}`。getInfo宣言既定=`"shaken"` | shadowメニュー保存値: `{"gestureOptions":["shaken","started falling","turned face up","turned face down"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `gdxfor_whenTilted`

意味: ? に傾いたとき。

- 正式opcode: `gdxfor_whenTilted`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: Go Direct Force & Acceleration（ID `gdxfor`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["gdxfor_whenTilted"]({"TILT":"any"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TILT | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`gdxfor_menu_tiltAnyOptions`、fields=`{"tiltAnyOptions":"any"}`。getInfo宣言既定=`"any"` | shadowメニュー保存値: `{"tiltAnyOptions":["front","back","left","right","any"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## Makey Makey（4定義）

- `makeymakey_menu_KEY` — 選択肢を持つ補助レポーター。表示名: スペース
- `makeymakey_menu_SEQUENCE` — 選択肢を持つ補助レポーター。表示名: 左 上 右
- `makeymakey_whenCodePressed` — ? が順番に押されたとき
- `makeymakey_whenMakeyKeyPressed` — ? キーが押されたとき

### `makeymakey_menu_KEY`

意味: 選択肢を持つ補助レポーター。表示名: スペース。

- 正式opcode: `makeymakey_menu_KEY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: Makey Makey（ID `makeymakey`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["makeymakey_menu_KEY"]({"KEY":"SPACE"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| KEY | フィールド／文字列 | `"SPACE"` | `["SPACE","UP","DOWN","RIGHT","LEFT","w","a","s","d","f","g"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_makeymakey/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `makeymakey_menu_SEQUENCE`

意味: 選択肢を持つ補助レポーター。表示名: 左 上 右。

- 正式opcode: `makeymakey_menu_SEQUENCE`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: Makey Makey（ID `makeymakey`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["makeymakey_menu_SEQUENCE"]({"SEQUENCE":"LEFT UP RIGHT"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SEQUENCE | フィールド／文字列 | `"LEFT UP RIGHT"` | `["LEFT UP RIGHT","RIGHT UP LEFT","LEFT RIGHT","RIGHT LEFT","UP DOWN","DOWN UP","UP RIGHT DOWN LEFT","UP LEFT DOWN RIGHT","UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_makeymakey/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `makeymakey_whenCodePressed`

意味: ? が順番に押されたとき。

- 正式opcode: `makeymakey_whenCodePressed`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: Makey Makey（ID `makeymakey`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["makeymakey_whenCodePressed"]({"SEQUENCE":"LEFT UP RIGHT"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SEQUENCE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`makeymakey_menu_SEQUENCE`、fields=`{"SEQUENCE":"LEFT UP RIGHT"}`。getInfo宣言既定=`"LEFT UP RIGHT"` | shadowメニュー保存値: `{"SEQUENCE":["LEFT UP RIGHT","RIGHT UP LEFT","LEFT RIGHT","RIGHT LEFT","UP DOWN","DOWN UP","UP RIGHT DOWN LEFT","UP LEFT DOWN RIGHT","UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_makeymakey/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `makeymakey_whenMakeyKeyPressed`

意味: ? キーが押されたとき。

- 正式opcode: `makeymakey_whenMakeyKeyPressed`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: Makey Makey（ID `makeymakey`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["makeymakey_whenMakeyKeyPressed"]({"KEY":"SPACE"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| KEY | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`makeymakey_menu_KEY`、fields=`{"KEY":"SPACE"}`。getInfo宣言既定=`"SPACE"` | shadowメニュー保存値: `{"KEY":["SPACE","UP","DOWN","RIGHT","LEFT","w","a","s","d","f","g"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_makeymakey/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 標準micro:bit（16定義）

- `microbit_displayClear` — 画面を消す
- `microbit_displaySymbol` — ? を表示する
- `microbit_displayText` — ? を表示する
- `microbit_getTiltAngle` — ? 方向の傾き
- `microbit_isButtonPressed` — ボタン ? が押された
- `microbit_isTilted` — ? に傾いた
- `microbit_menu_buttons` — 選択肢を持つ補助レポーター。表示名: A
- `microbit_menu_gestures` — 選択肢を持つ補助レポーター。表示名: 動いた
- `microbit_menu_pinState` — 選択肢を持つ補助レポーター。表示名: 入
- `microbit_menu_tiltDirection` — 選択肢を持つ補助レポーター。表示名: 前
- `microbit_menu_tiltDirectionAny` — 選択肢を持つ補助レポーター。表示名: 前
- `microbit_menu_touchPins` — 選択肢を持つ補助レポーター。表示名: 0
- `microbit_whenButtonPressed` — ボタン ? が押されたとき
- `microbit_whenGesture` — ? とき
- `microbit_whenPinConnected` — ピン ? がつながったとき
- `microbit_whenTilted` — ? に傾いたとき

### `microbit_displayClear`

意味: 画面を消す。

- 正式opcode: `microbit_displayClear`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbit_displayClear"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_displaySymbol`

意味: ? を表示する。

- 正式opcode: `microbit_displaySymbol`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbit_displaySymbol"]({"MATRIX":"0101010101100010101000100"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MATRIX | 値接続 checks=`null`／実接続check_=`null`／宣言型 `matrix` | shadow=`matrix`、fields=`{"MATRIX":"0101010101100010101000100"}`。getInfo宣言既定=`"0101010101100010101000100"` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_displayText`

意味: ? を表示する。

- 正式opcode: `microbit_displayText`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbit_displayText"]({"TEXT":"Hello!"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TEXT | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text`、fields=`{"TEXT":"Hello!"}`。getInfo宣言既定=`"Hello!"` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_getTiltAngle`

意味: ? 方向の傾き。

- 正式opcode: `microbit_getTiltAngle`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbit_getTiltAngle"]({"DIRECTION":"front"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DIRECTION | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`microbit_menu_tiltDirection`、fields=`{"tiltDirection":"front"}`。getInfo宣言既定=`"front"` | shadowメニュー保存値: `{"tiltDirection":["front","back","left","right"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_isButtonPressed`

意味: ボタン ? が押された。

- 正式opcode: `microbit_isButtonPressed`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbit_isButtonPressed"]({"BTN":"A"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| BTN | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`microbit_menu_buttons`、fields=`{"buttons":"A"}`。getInfo宣言既定=`"A"` | shadowメニュー保存値: `{"buttons":["A","B","any"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_isTilted`

意味: ? に傾いた。

- 正式opcode: `microbit_isTilted`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbit_isTilted"]({"DIRECTION":"any"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DIRECTION | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`microbit_menu_tiltDirectionAny`、fields=`{"tiltDirectionAny":"any"}`。getInfo宣言既定=`"any"` | shadowメニュー保存値: `{"tiltDirectionAny":["front","back","left","right","any"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_menu_buttons`

意味: 選択肢を持つ補助レポーター。表示名: A。

- 正式opcode: `microbit_menu_buttons`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbit_menu_buttons"]({"buttons":"A"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| buttons | フィールド／文字列 | `"A"` | `["A","B","any"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_menu_gestures`

意味: 選択肢を持つ補助レポーター。表示名: 動いた。

- 正式opcode: `microbit_menu_gestures`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbit_menu_gestures"]({"gestures":"moved"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| gestures | フィールド／文字列 | `"moved"` | `["moved","shaken","jumped"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_menu_pinState`

意味: 選択肢を持つ補助レポーター。表示名: 入。

- 正式opcode: `microbit_menu_pinState`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbit_menu_pinState"]({"pinState":"on"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| pinState | フィールド／文字列 | `"on"` | `["on","off"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_menu_tiltDirection`

意味: 選択肢を持つ補助レポーター。表示名: 前。

- 正式opcode: `microbit_menu_tiltDirection`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbit_menu_tiltDirection"]({"tiltDirection":"front"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| tiltDirection | フィールド／文字列 | `"front"` | `["front","back","left","right"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_menu_tiltDirectionAny`

意味: 選択肢を持つ補助レポーター。表示名: 前。

- 正式opcode: `microbit_menu_tiltDirectionAny`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbit_menu_tiltDirectionAny"]({"tiltDirectionAny":"front"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| tiltDirectionAny | フィールド／文字列 | `"front"` | `["front","back","left","right","any"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_menu_touchPins`

意味: 選択肢を持つ補助レポーター。表示名: 0。

- 正式opcode: `microbit_menu_touchPins`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["microbit_menu_touchPins"]({"touchPins":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| touchPins | フィールド／文字列 | `"0"` | `["0","1","2"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_whenButtonPressed`

意味: ボタン ? が押されたとき。

- 正式opcode: `microbit_whenButtonPressed`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbit_whenButtonPressed"]({"BTN":"A"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| BTN | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`microbit_menu_buttons`、fields=`{"buttons":"A"}`。getInfo宣言既定=`"A"` | shadowメニュー保存値: `{"buttons":["A","B","any"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_whenGesture`

意味: ? とき。

- 正式opcode: `microbit_whenGesture`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbit_whenGesture"]({"GESTURE":"moved"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| GESTURE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`microbit_menu_gestures`、fields=`{"gestures":"moved"}`。getInfo宣言既定=`"moved"` | shadowメニュー保存値: `{"gestures":["moved","shaken","jumped"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_whenPinConnected`

意味: ピン ? がつながったとき。

- 正式opcode: `microbit_whenPinConnected`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbit_whenPinConnected"]({"PIN":"0"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PIN | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`microbit_menu_touchPins`、fields=`{"touchPins":"0"}`。getInfo宣言既定=`"0"` | shadowメニュー保存値: `{"touchPins":["0","1","2"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `microbit_whenTilted`

意味: ? に傾いたとき。

- 正式opcode: `microbit_whenTilted`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準micro:bit（ID `microbit`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["microbit_whenTilted"]({"DIRECTION":"any"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DIRECTION | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`microbit_menu_tiltDirectionAny`、fields=`{"tiltDirectionAny":"any"}`。getInfo宣言既定=`"any"` | shadowメニュー保存値: `{"tiltDirectionAny":["front","back","left","right","any"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 音楽（11定義）

- `music_changeTempo` — テンポを ? ずつ変える
- `music_getTempo` — テンポ
- `music_menu_DRUM` — 選択肢を持つ補助レポーター。表示名: (1) スネアドラム
- `music_menu_INSTRUMENT` — 選択肢を持つ補助レポーター。表示名: (1) ピアノ
- `music_midiPlayDrumForBeats` — ? のドラムを ? 拍鳴らす
- `music_midiSetInstrument` — 楽器を ? にする
- `music_playDrumForBeats` — ? のドラムを ? 拍鳴らす
- `music_playNoteForBeats` — ? の音符を ? 拍鳴らす
- `music_restForBeats` — ? 拍休む
- `music_setInstrument` — 楽器を ? にする
- `music_setTempo` — テンポを ? にする

### `music_changeTempo`

意味: テンポを ? ずつ変える。

- 正式opcode: `music_changeTempo`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 音楽（ID `music`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["music_changeTempo"]({"TEMPO":"20"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TEMPO | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"20"}`。getInfo宣言既定=`20` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_music/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `music_getTempo`

意味: テンポ。

- 正式opcode: `music_getTempo`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 音楽（ID `music`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["music_getTempo"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_music/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `music_menu_DRUM`

意味: 選択肢を持つ補助レポーター。表示名: (1) スネアドラム。

- 正式opcode: `music_menu_DRUM`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 音楽（ID `music`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["music_menu_DRUM"]({"DRUM":"1"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DRUM | フィールド／文字列 | `"1"` | `["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_music/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `music_menu_INSTRUMENT`

意味: 選択肢を持つ補助レポーター。表示名: (1) ピアノ。

- 正式opcode: `music_menu_INSTRUMENT`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 音楽（ID `music`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["music_menu_INSTRUMENT"]({"INSTRUMENT":"1"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| INSTRUMENT | フィールド／文字列 | `"1"` | `["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_music/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `music_midiPlayDrumForBeats`

意味: ? のドラムを ? 拍鳴らす。

- 正式opcode: `music_midiPlayDrumForBeats`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 音楽（ID `music`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["music_midiPlayDrumForBeats"]({"DRUM":1,"BEATS":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DRUM | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadowなし。明示的な値／式を指定。getInfo宣言既定=`1` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| BEATS | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadowなし。明示的な値／式を指定。getInfo宣言既定=`0.25` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 getInfoでhideFromPalette指定の互換用命令。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_music/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `music_midiSetInstrument`

意味: 楽器を ? にする。

- 正式opcode: `music_midiSetInstrument`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 音楽（ID `music`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["music_midiSetInstrument"]({"INSTRUMENT":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| INSTRUMENT | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadowなし。明示的な値／式を指定。getInfo宣言既定=`1` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 getInfoでhideFromPalette指定の互換用命令。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_music/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `music_playDrumForBeats`

意味: ? のドラムを ? 拍鳴らす。

- 正式opcode: `music_playDrumForBeats`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 音楽（ID `music`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["music_playDrumForBeats"]({"DRUM":"1","BEATS":"0.25"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DRUM | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`music_menu_DRUM`、fields=`{"DRUM":"1"}`。getInfo宣言既定=`1` | shadowメニュー保存値: `{"DRUM":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]}` |
| BEATS | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"0.25"}`。getInfo宣言既定=`0.25` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_music/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `music_playNoteForBeats`

意味: ? の音符を ? 拍鳴らす。

- 正式opcode: `music_playNoteForBeats`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 音楽（ID `music`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["music_playNoteForBeats"]({"NOTE":"60","BEATS":"0.25"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NOTE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `note` | shadow=`note`、fields=`{"NOTE":"60"}`。getInfo宣言既定=`60` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| BEATS | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"0.25"}`。getInfo宣言既定=`0.25` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_music/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `music_restForBeats`

意味: ? 拍休む。

- 正式opcode: `music_restForBeats`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 音楽（ID `music`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["music_restForBeats"]({"BEATS":"0.25"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| BEATS | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"0.25"}`。getInfo宣言既定=`0.25` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_music/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `music_setInstrument`

意味: 楽器を ? にする。

- 正式opcode: `music_setInstrument`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 音楽（ID `music`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["music_setInstrument"]({"INSTRUMENT":"1"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| INSTRUMENT | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`music_menu_INSTRUMENT`、fields=`{"INSTRUMENT":"1"}`。getInfo宣言既定=`1` | shadowメニュー保存値: `{"INSTRUMENT":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_music/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `music_setTempo`

意味: テンポを ? にする。

- 正式opcode: `music_setTempo`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 音楽（ID `music`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["music_setTempo"]({"TEMPO":"60"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TEMPO | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"60"}`。getInfo宣言既定=`60` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_music/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## ペン（14定義）

- `pen_changePenColorParamBy` — ペンの ? を ? ずつ変える
- `pen_changePenHueBy` — ペンの色を ? ずつ変える
- `pen_changePenShadeBy` — ペンの濃さを ? ずつ変える
- `pen_changePenSizeBy` — ペンの太さを ? ずつ変える
- `pen_clear` — 全部消す
- `pen_menu_colorParam` — 選択肢を持つ補助レポーター。表示名: 色
- `pen_penDown` — ペンを下ろす
- `pen_penUp` — ペンを上げる
- `pen_setPenColorParamTo` — ペンの ? を ? にする
- `pen_setPenColorToColor` — ペンの色を ? にする
- `pen_setPenHueToNumber` — ペンの色を ? にする
- `pen_setPenShadeToNumber` — ペンの濃さを ? にする
- `pen_setPenSizeTo` — ペンの太さを ? にする
- `pen_stamp` — スタンプ

### `pen_changePenColorParamBy`

意味: ペンの ? を ? ずつ変える。

- 正式opcode: `pen_changePenColorParamBy`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ペン（ID `pen`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["pen_changePenColorParamBy"]({"COLOR_PARAM":"color","VALUE":"10"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| COLOR_PARAM | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`pen_menu_colorParam`、fields=`{"colorParam":"color"}`。getInfo宣言既定=`"color"` | shadowメニュー保存値: `{"colorParam":["color","saturation","brightness","transparency"]}` |
| VALUE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"10"}`。getInfo宣言既定=`10` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_pen/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `pen_changePenHueBy`

意味: ペンの色を ? ずつ変える。

- 正式opcode: `pen_changePenHueBy`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ペン（ID `pen`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["pen_changePenHueBy"]({"HUE":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| HUE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadowなし。明示的な値／式を指定。getInfo宣言既定=`1` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 getInfoでhideFromPalette指定の互換用命令。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_pen/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `pen_changePenShadeBy`

意味: ペンの濃さを ? ずつ変える。

- 正式opcode: `pen_changePenShadeBy`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ペン（ID `pen`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["pen_changePenShadeBy"]({"SHADE":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SHADE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadowなし。明示的な値／式を指定。getInfo宣言既定=`1` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 getInfoでhideFromPalette指定の互換用命令。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_pen/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `pen_changePenSizeBy`

意味: ペンの太さを ? ずつ変える。

- 正式opcode: `pen_changePenSizeBy`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ペン（ID `pen`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["pen_changePenSizeBy"]({"SIZE":"1"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SIZE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"1"}`。getInfo宣言既定=`1` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_pen/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `pen_clear`

意味: 全部消す。

- 正式opcode: `pen_clear`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ペン（ID `pen`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["pen_clear"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_pen/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `pen_menu_colorParam`

意味: 選択肢を持つ補助レポーター。表示名: 色。

- 正式opcode: `pen_menu_colorParam`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ペン（ID `pen`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["pen_menu_colorParam"]({"colorParam":"color"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| colorParam | フィールド／文字列 | `"color"` | `["color","saturation","brightness","transparency"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_pen/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `pen_penDown`

意味: ペンを下ろす。

- 正式opcode: `pen_penDown`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ペン（ID `pen`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["pen_penDown"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_pen/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `pen_penUp`

意味: ペンを上げる。

- 正式opcode: `pen_penUp`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ペン（ID `pen`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["pen_penUp"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_pen/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `pen_setPenColorParamTo`

意味: ペンの ? を ? にする。

- 正式opcode: `pen_setPenColorParamTo`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ペン（ID `pen`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["pen_setPenColorParamTo"]({"COLOR_PARAM":"color","VALUE":"50"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| COLOR_PARAM | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`pen_menu_colorParam`、fields=`{"colorParam":"color"}`。getInfo宣言既定=`"color"` | shadowメニュー保存値: `{"colorParam":["color","saturation","brightness","transparency"]}` |
| VALUE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"50"}`。getInfo宣言既定=`50` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_pen/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `pen_setPenColorToColor`

意味: ペンの色を ? にする。

- 正式opcode: `pen_setPenColorToColor`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ペン（ID `pen`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["pen_setPenColorToColor"]({"COLOR":scratch["colour_picker"]({"COLOUR":"#0797a8"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| COLOR | 値接続 checks=`null`／実接続check_=`null`／宣言型 `color` | shadow=`colour_picker`、fields=`{}`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"COLOUR":"#0797a8"} | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_pen/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `pen_setPenHueToNumber`

意味: ペンの色を ? にする。

- 正式opcode: `pen_setPenHueToNumber`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ペン（ID `pen`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["pen_setPenHueToNumber"]({"HUE":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| HUE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadowなし。明示的な値／式を指定。getInfo宣言既定=`1` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 getInfoでhideFromPalette指定の互換用命令。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_pen/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `pen_setPenShadeToNumber`

意味: ペンの濃さを ? にする。

- 正式opcode: `pen_setPenShadeToNumber`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ペン（ID `pen`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["pen_setPenShadeToNumber"]({"SHADE":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SHADE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadowなし。明示的な値／式を指定。getInfo宣言既定=`1` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 getInfoでhideFromPalette指定の互換用命令。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_pen/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `pen_setPenSizeTo`

意味: ペンの太さを ? にする。

- 正式opcode: `pen_setPenSizeTo`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ペン（ID `pen`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["pen_setPenSizeTo"]({"SIZE":"1"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SIZE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"1"}`。getInfo宣言既定=`1` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_pen/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `pen_stamp`

意味: スタンプ。

- 正式opcode: `pen_stamp`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ペン（ID `pen`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["pen_stamp"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_pen/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 音声合成（5定義）

- `text2speech_menu_languages` — 選択肢を持つ補助レポーター。表示名: アラビア語
- `text2speech_menu_voices` — 選択肢を持つ補助レポーター。表示名: アルト
- `text2speech_setLanguage` — 言語を ? にする
- `text2speech_setVoice` — 声を ? にする
- `text2speech_speakAndWait` — ? としゃべる

### `text2speech_menu_languages`

意味: 選択肢を持つ補助レポーター。表示名: アラビア語。

- 正式opcode: `text2speech_menu_languages`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 音声合成（ID `text2speech`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["text2speech_menu_languages"]({"languages":"ar"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| languages | フィールド／文字列 | `"ar"` | `["ar","zh-cn","da","nl","en","fr","de","hi","is","it","ja","ko","nb","pl","pt-br","pt","ro","ru","es","es-419","sv","tr","cy"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_text2speech/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `text2speech_menu_voices`

意味: 選択肢を持つ補助レポーター。表示名: アルト。

- 正式opcode: `text2speech_menu_voices`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 音声合成（ID `text2speech`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["text2speech_menu_voices"]({"voices":"ALTO"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| voices | フィールド／文字列 | `"ALTO"` | `["ALTO","TENOR","SQUEAK","GIANT","KITTEN"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_text2speech/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `text2speech_setLanguage`

意味: 言語を ? にする。

- 正式opcode: `text2speech_setLanguage`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 音声合成（ID `text2speech`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["text2speech_setLanguage"]({"LANGUAGE":"en"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LANGUAGE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text2speech_menu_languages`、fields=`{"languages":"en"}`。getInfo宣言既定=`"en"` | shadowメニュー保存値: `{"languages":["ar","zh-cn","da","nl","en","fr","de","hi","is","it","ja","ko","nb","pl","pt-br","pt","ro","ru","es","es-419","sv","tr","cy"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_text2speech/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `text2speech_setVoice`

意味: 声を ? にする。

- 正式opcode: `text2speech_setVoice`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 音声合成（ID `text2speech`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["text2speech_setVoice"]({"VOICE":"ALTO"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VOICE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text2speech_menu_voices`、fields=`{"voices":"ALTO"}`。getInfo宣言既定=`"ALTO"` | shadowメニュー保存値: `{"voices":["ALTO","TENOR","SQUEAK","GIANT","KITTEN"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_text2speech/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `text2speech_speakAndWait`

意味: ? としゃべる。

- 正式opcode: `text2speech_speakAndWait`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 音声合成（ID `text2speech`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["text2speech_speakAndWait"]({"WORDS":"こんにちは"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| WORDS | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text`、fields=`{"TEXT":"こんにちは"}`。getInfo宣言既定=`"こんにちは"` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_text2speech/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 翻訳（3定義）

- `translate_getTranslate` — ? を ? に翻訳する
- `translate_getViewerLanguage` — 言語
- `translate_menu_languages` — 選択肢を持つ補助レポーター。表示名: アイスランド語

### `translate_getTranslate`

意味: ? を ? に翻訳する。

- 正式opcode: `translate_getTranslate`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 翻訳（ID `translate`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["translate_getTranslate"]({"WORDS":"こんにちは","LANGUAGE":"nb"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| WORDS | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text`、fields=`{"TEXT":"こんにちは"}`。getInfo宣言既定=`"こんにちは"` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| LANGUAGE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`translate_menu_languages`、fields=`{"languages":"nb"}`。getInfo宣言既定=`"nb"` | shadowメニュー保存値: `{"languages":["is","ga","az","am","ar","it","id","cy","uk","et","nl","ca","gl","el","ckb","hr","sv","zu","gd","es","sk","sl","sr","th","cs","da","de","tr","nb","eu","hu","fi","fr","bg","vi","he","fa","pl","pt","mi","lv","lt","ro","ru","en","ko","zh-cn","zh-tw","ja","he","zh-cn"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_translate/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `translate_getViewerLanguage`

意味: 言語。

- 正式opcode: `translate_getViewerLanguage`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 翻訳（ID `translate`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["translate_getViewerLanguage"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_translate/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `translate_menu_languages`

意味: 選択肢を持つ補助レポーター。表示名: アイスランド語。

- 正式opcode: `translate_menu_languages`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 翻訳（ID `translate`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["translate_menu_languages"]({"languages":"is"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| languages | フィールド／文字列 | `"is"` | `["is","ga","az","am","ar","it","id","cy","uk","et","nl","ca","gl","el","ckb","hr","sv","zu","gd","es","sk","sl","sr","th","cs","da","de","tr","nb","eu","hu","fi","fr","bg","vi","he","fa","pl","pt","mi","lv","lt","ro","ru","en","ko","zh-cn","zh-tw","ja","he","zh-cn"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_translate/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## ビデオモーションセンサー（7定義）

- `videoSensing_menu_ATTRIBUTE` — 選択肢を持つ補助レポーター。表示名: モーション
- `videoSensing_menu_SUBJECT` — 選択肢を持つ補助レポーター。表示名: スプライト
- `videoSensing_menu_VIDEO_STATE` — 選択肢を持つ補助レポーター。表示名: 切
- `videoSensing_setVideoTransparency` — ビデオの透明度を ? にする
- `videoSensing_videoOn` — ? のビデオの ?
- `videoSensing_videoToggle` — ビデオを ? にする
- `videoSensing_whenMotionGreaterThan` — ビデオモーション > ? のとき

### `videoSensing_menu_ATTRIBUTE`

意味: 選択肢を持つ補助レポーター。表示名: モーション。

- 正式opcode: `videoSensing_menu_ATTRIBUTE`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ビデオモーションセンサー（ID `videoSensing`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["videoSensing_menu_ATTRIBUTE"]({"ATTRIBUTE":"motion"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| ATTRIBUTE | フィールド／文字列 | `"motion"` | `["motion","direction"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_video_sensing/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `videoSensing_menu_SUBJECT`

意味: 選択肢を持つ補助レポーター。表示名: スプライト。

- 正式opcode: `videoSensing_menu_SUBJECT`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ビデオモーションセンサー（ID `videoSensing`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["videoSensing_menu_SUBJECT"]({"SUBJECT":"this sprite"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SUBJECT | フィールド／文字列 | `"this sprite"` | `["this sprite","Stage"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_video_sensing/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `videoSensing_menu_VIDEO_STATE`

意味: 選択肢を持つ補助レポーター。表示名: 切。

- 正式opcode: `videoSensing_menu_VIDEO_STATE`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ビデオモーションセンサー（ID `videoSensing`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["videoSensing_menu_VIDEO_STATE"]({"VIDEO_STATE":"off"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VIDEO_STATE | フィールド／文字列 | `"off"` | `["off","on","on-flipped"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_video_sensing/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `videoSensing_setVideoTransparency`

意味: ビデオの透明度を ? にする。

- 正式opcode: `videoSensing_setVideoTransparency`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ビデオモーションセンサー（ID `videoSensing`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["videoSensing_setVideoTransparency"]({"TRANSPARENCY":"50"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TRANSPARENCY | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"50"}`。getInfo宣言既定=`50` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_video_sensing/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `videoSensing_videoOn`

意味: ? のビデオの ?。

- 正式opcode: `videoSensing_videoOn`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ビデオモーションセンサー（ID `videoSensing`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["videoSensing_videoOn"]({"SUBJECT":"this sprite","ATTRIBUTE":"motion"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SUBJECT | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`videoSensing_menu_SUBJECT`、fields=`{"SUBJECT":"this sprite"}`。getInfo宣言既定=`"this sprite"` | shadowメニュー保存値: `{"SUBJECT":["this sprite","Stage"]}` |
| ATTRIBUTE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`videoSensing_menu_ATTRIBUTE`、fields=`{"ATTRIBUTE":"motion"}`。getInfo宣言既定=`"motion"` | shadowメニュー保存値: `{"ATTRIBUTE":["motion","direction"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_video_sensing/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `videoSensing_videoToggle`

意味: ビデオを ? にする。

- 正式opcode: `videoSensing_videoToggle`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ビデオモーションセンサー（ID `videoSensing`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["videoSensing_videoToggle"]({"VIDEO_STATE":"on"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VIDEO_STATE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`videoSensing_menu_VIDEO_STATE`、fields=`{"VIDEO_STATE":"on"}`。getInfo宣言既定=`"on"` | shadowメニュー保存値: `{"VIDEO_STATE":["off","on","on-flipped"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_video_sensing/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `videoSensing_whenMotionGreaterThan`

意味: ビデオモーション > ? のとき。

- 正式opcode: `videoSensing_whenMotionGreaterThan`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: ビデオモーションセンサー（ID `videoSensing`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["videoSensing_whenMotionGreaterThan"]({"REFERENCE":"10"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| REFERENCE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"10"}`。getInfo宣言既定=`10` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_video_sensing/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## LEGO WeDo 2.0（17定義）

- `wedo2_getDistance` — 距離
- `wedo2_getTiltAngle` — ? 方向の傾き
- `wedo2_isTilted` — ? に傾いた
- `wedo2_menu_MOTOR_DIRECTION` — 選択肢を持つ補助レポーター。表示名: こちら向き
- `wedo2_menu_MOTOR_ID` — 選択肢を持つ補助レポーター。表示名: モーター
- `wedo2_menu_OP` — 選択肢を持つ補助レポーター。表示名: <
- `wedo2_menu_TILT_DIRECTION` — 選択肢を持つ補助レポーター。表示名: 上
- `wedo2_menu_TILT_DIRECTION_ANY` — 選択肢を持つ補助レポーター。表示名: 上
- `wedo2_motorOff` — ? をオフにする
- `wedo2_motorOn` — ? をオンにする
- `wedo2_motorOnFor` — ? を ? 秒間オンにする
- `wedo2_playNoteFor` — ? の音符を ? 秒間鳴らす
- `wedo2_setLightHue` — ライトの色を ? にする
- `wedo2_setMotorDirection` — ? の方向を ? にする
- `wedo2_startMotorPower` — ? のパワーを ? にする
- `wedo2_whenDistance` — 距離 ? ? のとき
- `wedo2_whenTilted` — ? に傾いたとき

### `wedo2_getDistance`

意味: 距離。

- 正式opcode: `wedo2_getDistance`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["wedo2_getDistance"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_getTiltAngle`

意味: ? 方向の傾き。

- 正式opcode: `wedo2_getTiltAngle`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["wedo2_getTiltAngle"]({"TILT_DIRECTION":"up"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TILT_DIRECTION | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`wedo2_menu_TILT_DIRECTION`、fields=`{"TILT_DIRECTION":"up"}`。getInfo宣言既定=`"up"` | shadowメニュー保存値: `{"TILT_DIRECTION":["up","down","left","right"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_isTilted`

意味: ? に傾いた。

- 正式opcode: `wedo2_isTilted`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["wedo2_isTilted"]({"TILT_DIRECTION_ANY":"any"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TILT_DIRECTION_ANY | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`wedo2_menu_TILT_DIRECTION_ANY`、fields=`{"TILT_DIRECTION_ANY":"any"}`。getInfo宣言既定=`"any"` | shadowメニュー保存値: `{"TILT_DIRECTION_ANY":["up","down","left","right","any"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_menu_MOTOR_DIRECTION`

意味: 選択肢を持つ補助レポーター。表示名: こちら向き。

- 正式opcode: `wedo2_menu_MOTOR_DIRECTION`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["wedo2_menu_MOTOR_DIRECTION"]({"MOTOR_DIRECTION":"this way"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_DIRECTION | フィールド／文字列 | `"this way"` | `["this way","that way","reverse"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_menu_MOTOR_ID`

意味: 選択肢を持つ補助レポーター。表示名: モーター。

- 正式opcode: `wedo2_menu_MOTOR_ID`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["wedo2_menu_MOTOR_ID"]({"MOTOR_ID":"motor"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_ID | フィールド／文字列 | `"motor"` | `["motor","motor A","motor B","all motors"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_menu_OP`

意味: 選択肢を持つ補助レポーター。表示名: <。

- 正式opcode: `wedo2_menu_OP`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["wedo2_menu_OP"]({"OP":"<"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| OP | フィールド／文字列 | `"<"` | `["<",">"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_menu_TILT_DIRECTION`

意味: 選択肢を持つ補助レポーター。表示名: 上。

- 正式opcode: `wedo2_menu_TILT_DIRECTION`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["wedo2_menu_TILT_DIRECTION"]({"TILT_DIRECTION":"up"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TILT_DIRECTION | フィールド／文字列 | `"up"` | `["up","down","left","right"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_menu_TILT_DIRECTION_ANY`

意味: 選択肢を持つ補助レポーター。表示名: 上。

- 正式opcode: `wedo2_menu_TILT_DIRECTION_ANY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["wedo2_menu_TILT_DIRECTION_ANY"]({"TILT_DIRECTION_ANY":"up"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TILT_DIRECTION_ANY | フィールド／文字列 | `"up"` | `["up","down","left","right","any"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_motorOff`

意味: ? をオフにする。

- 正式opcode: `wedo2_motorOff`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["wedo2_motorOff"]({"MOTOR_ID":"motor"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_ID | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`wedo2_menu_MOTOR_ID`、fields=`{"MOTOR_ID":"motor"}`。getInfo宣言既定=`"motor"` | shadowメニュー保存値: `{"MOTOR_ID":["motor","motor A","motor B","all motors"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_motorOn`

意味: ? をオンにする。

- 正式opcode: `wedo2_motorOn`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["wedo2_motorOn"]({"MOTOR_ID":"motor"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_ID | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`wedo2_menu_MOTOR_ID`、fields=`{"MOTOR_ID":"motor"}`。getInfo宣言既定=`"motor"` | shadowメニュー保存値: `{"MOTOR_ID":["motor","motor A","motor B","all motors"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_motorOnFor`

意味: ? を ? 秒間オンにする。

- 正式opcode: `wedo2_motorOnFor`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["wedo2_motorOnFor"]({"MOTOR_ID":"motor","DURATION":"1"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_ID | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`wedo2_menu_MOTOR_ID`、fields=`{"MOTOR_ID":"motor"}`。getInfo宣言既定=`"motor"` | shadowメニュー保存値: `{"MOTOR_ID":["motor","motor A","motor B","all motors"]}` |
| DURATION | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"1"}`。getInfo宣言既定=`1` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_playNoteFor`

意味: ? の音符を ? 秒間鳴らす。

- 正式opcode: `wedo2_playNoteFor`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["wedo2_playNoteFor"]({"NOTE":1,"DURATION":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NOTE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadowなし。明示的な値／式を指定。getInfo宣言既定=`60` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| DURATION | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadowなし。明示的な値／式を指定。getInfo宣言既定=`0.5` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 getInfoでhideFromPalette指定の互換用命令。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_setLightHue`

意味: ライトの色を ? にする。

- 正式opcode: `wedo2_setLightHue`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["wedo2_setLightHue"]({"HUE":"50"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| HUE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"50"}`。getInfo宣言既定=`50` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_setMotorDirection`

意味: ? の方向を ? にする。

- 正式opcode: `wedo2_setMotorDirection`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["wedo2_setMotorDirection"]({"MOTOR_ID":"motor","MOTOR_DIRECTION":"this way"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_ID | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`wedo2_menu_MOTOR_ID`、fields=`{"MOTOR_ID":"motor"}`。getInfo宣言既定=`"motor"` | shadowメニュー保存値: `{"MOTOR_ID":["motor","motor A","motor B","all motors"]}` |
| MOTOR_DIRECTION | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`wedo2_menu_MOTOR_DIRECTION`、fields=`{"MOTOR_DIRECTION":"this way"}`。getInfo宣言既定=`"this way"` | shadowメニュー保存値: `{"MOTOR_DIRECTION":["this way","that way","reverse"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_startMotorPower`

意味: ? のパワーを ? にする。

- 正式opcode: `wedo2_startMotorPower`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["wedo2_startMotorPower"]({"MOTOR_ID":"motor","POWER":"100"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MOTOR_ID | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`wedo2_menu_MOTOR_ID`、fields=`{"MOTOR_ID":"motor"}`。getInfo宣言既定=`"motor"` | shadowメニュー保存値: `{"MOTOR_ID":["motor","motor A","motor B","all motors"]}` |
| POWER | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"100"}`。getInfo宣言既定=`100` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_whenDistance`

意味: 距離 ? ? のとき。

- 正式opcode: `wedo2_whenDistance`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["wedo2_whenDistance"]({"OP":"<","REFERENCE":"50"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| OP | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`wedo2_menu_OP`、fields=`{"OP":"<"}`。getInfo宣言既定=`"<"` | shadowメニュー保存値: `{"OP":["<",">"]}` |
| REFERENCE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"50"}`。getInfo宣言既定=`50` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `wedo2_whenTilted`

意味: ? に傾いたとき。

- 正式opcode: `wedo2_whenTilted`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: LEGO WeDo 2.0（ID `wedo2`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["wedo2_whenTilted"]({"TILT_DIRECTION_ANY":"any"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TILT_DIRECTION_ANY | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`wedo2_menu_TILT_DIRECTION_ANY`、fields=`{"TILT_DIRECTION_ANY":"any"}`。getInfo宣言既定=`"any"` | shadowメニュー保存値: `{"TILT_DIRECTION_ANY":["up","down","left","right","any"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

