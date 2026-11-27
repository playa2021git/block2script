# 標準命令・補助定義辞書

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

## 標準命令の範囲

動き・見た目・音・イベント・制御・調べる・演算・変数・リストと独自ブロック関連を含める。隠しブロック／互換定義も落とさず掲載するが、VM実行処理なしの旧デモを生成候補にしない。
標準定義のソースは再現セットアップ後の `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/`、実行処理は同 `scratch-vm/src/blocks/`。固定版は `build-support/gui-package-lock.json`（scratch-blocks 1.1.6、scratch-vm 3.0.0）。
色・数値・文字列・音符・LEDマトリクス等の補助定義も本書に含む。

## 独自ブロック引数（4定義）

- `argument_editor_boolean` — 独自ブロック編集用の内部定義。既存mutation等の情報なしに生成しない。
- `argument_editor_string_number` — 独自ブロック編集用の内部定義。既存mutation等の情報なしに生成しない。
- `argument_reporter_boolean` — ???
- `argument_reporter_string_number` — ???

### `argument_editor_boolean`

意味: 独自ブロック編集用の内部定義。既存mutation等の情報なしに生成しない。。

- 正式opcode: `argument_editor_boolean`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INTERNAL_FORBIDDEN`。
- 新規生成の扱い: 補助・内部108件のうち編集内部／旧デモ。実行命令として新規生成禁止。既存の編集メタ情報は保持。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。 既存mutation等の前提を満たす独自ブロックの動作までは保証しない。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["argument_editor_boolean"]({"TEXT":"foo"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TEXT | フィールド／文字列 | `"foo"` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 既存ブロックのmutation・引数IDを保持して使う。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/procedures.js:933`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `argument_editor_string_number`

意味: 独自ブロック編集用の内部定義。既存mutation等の情報なしに生成しない。。

- 正式opcode: `argument_editor_string_number`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INTERNAL_FORBIDDEN`。
- 新規生成の扱い: 補助・内部108件のうち編集内部／旧デモ。実行命令として新規生成禁止。既存の編集メタ情報は保持。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。 既存mutation等の前提を満たす独自ブロックの動作までは保証しない。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["argument_editor_string_number"]({"TEXT":"foo"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TEXT | フィールド／文字列 | `"foo"` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 既存ブロックのmutation・引数IDを保持して使う。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/procedures.js:954`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `argument_reporter_boolean`

意味: ???。

- 正式opcode: `argument_reporter_boolean`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `EXISTING_MUTATION_ONLY`。
- 新規生成の扱い: 348実行候補に含まれるが既存定義・mutation・引数IDが必要。根拠なしに新規生成しない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。 既存mutation等の前提を満たす独自ブロックの動作までは保証しない。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["argument_reporter_boolean"]({"VALUE":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VALUE | フィールド／文字列 | `""` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 既存ブロックのmutation・引数IDを保持して使う。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/procedures.js:903`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `argument_reporter_string_number`

意味: ???。

- 正式opcode: `argument_reporter_string_number`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `EXISTING_MUTATION_ONLY`。
- 新規生成の扱い: 348実行候補に含まれるが既存定義・mutation・引数IDが必要。根拠なしに新規生成しない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。 既存mutation等の前提を満たす独自ブロックの動作までは保証しない。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["argument_reporter_string_number"]({"VALUE":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VALUE | フィールド／文字列 | `""` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 既存ブロックのmutation・引数IDを保持して使う。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/procedures.js:918`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 補助定義 colour（1定義）

- `colour_picker` — 入力値を表す補助ブロック。表示名: #e93776

### `colour_picker`

意味: 入力値を表す補助ブロック。表示名: #e93776。

- 正式opcode: `colour_picker`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["colour_picker"]({"COLOUR":"#0797a8"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| COLOUR | フィールド／文字列 | `"#0797a8"` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_common/colour.js:42`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 制御（18定義）

- `control_all_at_once` — 一斉に ?
- `control_clear_counter` — カウンターをクリアする
- `control_create_clone_of` — ? のクローンを作る
- `control_create_clone_of_menu` — 選択肢を持つ補助レポーター。表示名: 自分自身
- `control_delete_this_clone` — このクローンを削除する
- `control_for_each` — ? の要素を ? に入れて繰り返す ?
- `control_forever` — ずっと ? *
- `control_get_counter` — カウンター
- `control_if` — もし ? なら ?
- `control_if_else` — もし ? なら ? でなければ ?
- `control_incr_counter` — カウンターに足す
- `control_repeat` — ? 回繰り返す ? *
- `control_repeat_until` — ? まで繰り返す ? *
- `control_start_as_clone` — クローンされたとき
- `control_stop` — すべてを止める
- `control_wait` — ? 秒待つ
- `control_wait_until` — ? まで待つ
- `control_while` — ? の間繰り返す ? *

### `control_all_at_once`

意味: 一斉に ?。

- 正式opcode: `control_all_at_once`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_all_at_once"]({"SUBSTACK":()=>{}});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SUBSTACK | 命令列 | `() => { ... }`。省略時は空 | 値・レポーターを入れない |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:504`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `control_clear_counter`

意味: カウンターをクリアする。

- 正式opcode: `control_clear_counter`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_clear_counter"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:489`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `control_create_clone_of`

意味: ? のクローンを作る。

- 正式opcode: `control_create_clone_of`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_create_clone_of"]({"CLONE_OPTION":scratch["control_create_clone_of_menu"]({"CLONE_OPTION":"_myself_"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CLONE_OPTION | 値接続 checks=`null`／実接続check_=`null` | shadow=`control_create_clone_of_menu`、fields=`{}`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"CLONE_OPTION":"_myself_"} | shadowメニュー保存値: `{"CLONE_OPTION":["_myself_"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:422`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `control_create_clone_of_menu`

意味: 選択肢を持つ補助レポーター。表示名: 自分自身。

- 正式opcode: `control_create_clone_of_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["control_create_clone_of_menu"]({"CLONE_OPTION":"_myself_"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CLONE_OPTION | フィールド／文字列 | `"_myself_"` | `["_myself_"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:400`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `control_delete_this_clone`

意味: このクローンを削除する。

- 正式opcode: `control_delete_this_clone`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_delete_this_clone"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:443`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `control_for_each`

意味: ? の要素を ? に入れて繰り返す ?。

- 正式opcode: `control_for_each`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_for_each"]({"VARIABLE":"Gem検証変数","VALUE":1,"SUBSTACK":()=>{}});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VARIABLE | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |
| VALUE | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |
| SUBSTACK | 命令列 | `() => { ... }`。省略時は空 | 値・レポーターを入れない |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:350`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `control_forever`

意味: ずっと ? *。

- 正式opcode: `control_forever`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_forever"]({"SUBSTACK":()=>{}});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SUBSTACK | 命令列 | `() => { ... }`。省略時は空 | 値・レポーターを入れない |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:30`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `control_get_counter`

意味: カウンター。

- 正式opcode: `control_get_counter`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["control_get_counter"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:459`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `control_if`

意味: もし ? なら ?。

- 正式opcode: `control_if`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_if"]({"CONDITION":scratch.operator_equals({OPERAND1:1,OPERAND2:1}),"SUBSTACK":()=>{}});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CONDITION | 値接続 checks=`null`／実接続check_=`["Boolean"]` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |
| SUBSTACK | 命令列 | `() => { ... }`。省略時は空 | 値・レポーターを入れない |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:106`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `control_if_else`

意味: もし ? なら ? でなければ ?。

- 正式opcode: `control_if_else`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_if_else"]({"CONDITION":scratch.operator_equals({OPERAND1:1,OPERAND2:1}),"SUBSTACK":()=>{},"SUBSTACK2":()=>{}});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CONDITION | 値接続 checks=`null`／実接続check_=`["Boolean"]` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |
| SUBSTACK | 命令列 | `() => { ... }`。省略時は空 | 値・レポーターを入れない |
| SUBSTACK2 | 命令列 | `() => { ... }`。省略時は空 | 値・レポーターを入れない |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:135`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `control_incr_counter`

意味: カウンターに足す。

- 正式opcode: `control_incr_counter`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_incr_counter"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:474`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `control_repeat`

意味: ? 回繰り返す ? *。

- 正式opcode: `control_repeat`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_repeat"]({"TIMES":"10","SUBSTACK":()=>{}});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TIMES | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_whole_number`、fields=`{"NUM":"10"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| SUBSTACK | 命令列 | `() => { ... }`。省略時は空 | 値・レポーターを入れない |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:65`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `control_repeat_until`

意味: ? まで繰り返す ? *。

- 正式opcode: `control_repeat_until`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_repeat_until"]({"CONDITION":scratch.operator_equals({OPERAND1:1,OPERAND2:1}),"SUBSTACK":()=>{}});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CONDITION | 値接続 checks=`null`／実接続check_=`["Boolean"]` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |
| SUBSTACK | 命令列 | `() => { ... }`。省略時は空 | 値・レポーターを入れない |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:270`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `control_start_as_clone`

意味: クローンされたとき。

- 正式opcode: `control_start_as_clone`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_start_as_clone"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:383`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `control_stop`

意味: すべてを止める。

- 正式opcode: `control_stop`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_stop"]({"STOP_OPTION":"all"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| STOP_OPTION | フィールド／文字列 | `"all"` | `["all","this script","other scripts in sprite"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:172`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `control_wait`

意味: ? 秒待つ。

- 正式opcode: `control_wait`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_wait"]({"DURATION":"1"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DURATION | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_positive_number`、fields=`{"NUM":"1"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:228`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `control_wait_until`

意味: ? まで待つ。

- 正式opcode: `control_wait_until`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_wait_until"]({"CONDITION":scratch.operator_equals({OPERAND1:1,OPERAND2:1})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CONDITION | 値接続 checks=`null`／実接続check_=`["Boolean"]` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:249`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `control_while`

意味: ? の間繰り返す ? *。

- 正式opcode: `control_while`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["control_while"]({"CONDITION":scratch.operator_equals({OPERAND1:1,OPERAND2:1}),"SUBSTACK":()=>{}});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CONDITION | 値接続 checks=`null`／実接続check_=`["Boolean"]` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |
| SUBSTACK | 命令列 | `() => { ... }`。省略時は空 | 値・レポーターを入れない |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/control.js:310`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 変数・リスト（19定義）

- `data_addtolist` — ? を ? に追加する
- `data_changevariableby` — ? を ? ずつ変える
- `data_deletealloflist` — ? のすべてを削除する
- `data_deleteoflist` — ? の ? 番目を削除する
- `data_hidelist` — リスト ? を隠す
- `data_hidevariable` — 変数 ? を隠す
- `data_insertatlist` — ? の ? 番目に ? を挿入する
- `data_itemnumoflist` — ? 中の ? の場所
- `data_itemoflist` — ? の ? 番目
- `data_lengthoflist` — ? の長さ
- `data_listcontainsitem` — ? に ? が含まれる
- `data_listcontents` — ???
- `data_listindexall` — 1
- `data_listindexrandom` — 1
- `data_replaceitemoflist` — ? の ? 番目を ? で置き換える
- `data_setvariableto` — ? を ? にする
- `data_showlist` — リスト ? を表示する
- `data_showvariable` — 変数 ? を表示する
- `data_variable` — ???

### `data_addtolist`

意味: ? を ? に追加する。

- 正式opcode: `data_addtolist`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["data_addtolist"]({"LIST":"Gem検証リスト","ITEM":"例"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LIST | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |
| ITEM | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:227`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_changevariableby`

意味: ? を ? ずつ変える。

- 正式opcode: `data_changevariableby`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["data_changevariableby"]({"VARIABLE":"Gem検証変数","VALUE":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VARIABLE | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |
| VALUE | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:80`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_deletealloflist`

意味: ? のすべてを削除する。

- 正式opcode: `data_deletealloflist`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["data_deletealloflist"]({"LIST":"Gem検証リスト"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LIST | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:277`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_deleteoflist`

意味: ? の ? 番目を削除する。

- 正式opcode: `data_deleteoflist`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["data_deleteoflist"]({"LIST":"Gem検証リスト","INDEX":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LIST | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |
| INDEX | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:252`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_hidelist`

意味: リスト ? を隠す。

- 正式opcode: `data_hidelist`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["data_hidelist"]({"LIST":"Gem検証リスト"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LIST | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:477`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_hidevariable`

意味: 変数 ? を隠す。

- 正式opcode: `data_hidevariable`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["data_hidevariable"]({"VARIABLE":"Gem検証変数"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VARIABLE | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:126`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_insertatlist`

意味: ? の ? 番目に ? を挿入する。

- 正式opcode: `data_insertatlist`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["data_insertatlist"]({"LIST":"Gem検証リスト","INDEX":1,"ITEM":"例"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LIST | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |
| INDEX | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |
| ITEM | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:298`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_itemnumoflist`

意味: ? 中の ? の場所。

- 正式opcode: `data_itemnumoflist`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["data_itemnumoflist"]({"LIST":"Gem検証リスト","ITEM":"例"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LIST | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |
| ITEM | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:383`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_itemoflist`

意味: ? の ? 番目。

- 正式opcode: `data_itemoflist`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["data_itemoflist"]({"LIST":"Gem検証リスト","INDEX":1})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LIST | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |
| INDEX | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:356`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_lengthoflist`

意味: ? の長さ。

- 正式opcode: `data_lengthoflist`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["data_lengthoflist"]({"LIST":"Gem検証リスト"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LIST | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:410`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_listcontainsitem`

意味: ? に ? が含まれる。

- 正式opcode: `data_listcontainsitem`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["data_listcontainsitem"]({"LIST":"Gem検証リスト","ITEM":"例"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LIST | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |
| ITEM | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:431`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_listcontents`

意味: ???。

- 正式opcode: `data_listcontents`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["data_listcontents"]({"LIST":"Gem検証リスト"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LIST | フィールド／文字列 | `""`。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:148`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_listindexall`

意味: 1。

- 正式opcode: `data_listindexall`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["data_listindexall"]({"INDEX":"1"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| INDEX | フィールド／文字列 | `"1"` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:171`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_listindexrandom`

意味: 1。

- 正式opcode: `data_listindexrandom`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["data_listindexrandom"]({"INDEX":"1"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| INDEX | フィールド／文字列 | `"1"` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:199`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_replaceitemoflist`

意味: ? の ? 番目を ? で置き換える。

- 正式opcode: `data_replaceitemoflist`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["data_replaceitemoflist"]({"LIST":"Gem検証リスト","INDEX":1,"ITEM":"例"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LIST | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |
| INDEX | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |
| ITEM | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:327`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_setvariableto`

意味: ? を ? にする。

- 正式opcode: `data_setvariableto`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["data_setvariableto"]({"VARIABLE":"Gem検証変数","VALUE":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VARIABLE | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |
| VALUE | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:56`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `data_showlist`

意味: リスト ? を表示する。

- 正式opcode: `data_showlist`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["data_showlist"]({"LIST":"Gem検証リスト"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LIST | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:456`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_showvariable`

意味: 変数 ? を表示する。

- 正式opcode: `data_showvariable`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["data_showvariable"]({"VARIABLE":"Gem検証変数"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VARIABLE | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:104`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `data_variable`

意味: ???。

- 正式opcode: `data_variable`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["data_variable"]({"VARIABLE":"Gem検証変数"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VARIABLE | フィールド／文字列 | `""`。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/data.js:32`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

## イベント（12定義）

- `event_broadcast` — ? を送る
- `event_broadcast_menu` — 選択肢を持つ補助レポーター。表示名: ?
- `event_broadcastandwait` — ? を送って待つ
- `event_touchingobjectmenu` — 選択肢を持つ補助レポーター。表示名: マウスのポインター
- `event_whenbackdropswitchesto` — 背景が backdrop1 になったとき
- `event_whenbroadcastreceived` — ? を受け取ったとき
- `event_whenflagclicked` — flag が押されたとき
- `event_whengreaterthan` — 音量 > ? のとき
- `event_whenkeypressed` — スペース キーが押されたとき
- `event_whenstageclicked` — ステージが押されたとき
- `event_whenthisspriteclicked` — このスプライトが押されたとき
- `event_whentouchingobject` — このスプライトが ? に触れたとき

### `event_broadcast`

意味: ? を送る。

- 正式opcode: `event_broadcast`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["event_broadcast"]({"BROADCAST_INPUT":scratch["event_broadcast_menu"]({"BROADCAST_OPTION":"Gem検証メッセージ"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| BROADCAST_INPUT | 値接続 checks=`null`／実接続check_=`null` | shadow=`event_broadcast_menu`、fields=`{}`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"BROADCAST_OPTION":null} | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/event.js:225`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `event_broadcast_menu`

意味: 選択肢を持つ補助レポーター。表示名: ?。

- 正式opcode: `event_broadcast_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["event_broadcast_menu"]({"BROADCAST_OPTION":"Gem検証メッセージ"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| BROADCAST_OPTION | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/event.js:200`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `event_broadcastandwait`

意味: ? を送って待つ。

- 正式opcode: `event_broadcastandwait`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["event_broadcastandwait"]({"BROADCAST_INPUT":scratch["event_broadcast_menu"]({"BROADCAST_OPTION":"Gem検証メッセージ"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| BROADCAST_INPUT | 値接続 checks=`null`／実接続check_=`null` | shadow=`event_broadcast_menu`、fields=`{}`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"BROADCAST_OPTION":null} | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/event.js:246`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `event_touchingobjectmenu`

意味: 選択肢を持つ補助レポーター。表示名: マウスのポインター。

- 正式opcode: `event_touchingobjectmenu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["event_touchingobjectmenu"]({"TOUCHINGOBJECTMENU":"_mouse_"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TOUCHINGOBJECTMENU | フィールド／文字列 | `"_mouse_"` | `["_mouse_","_edge_"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/event.js:50`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `event_whenbackdropswitchesto`

意味: 背景が backdrop1 になったとき。

- 正式opcode: `event_whenbackdropswitchesto`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["event_whenbackdropswitchesto"]({"BACKDROP":"backdrop1"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| BACKDROP | フィールド／文字列 | `"backdrop1"` | `["backdrop1"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/event.js:149`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `event_whenbroadcastreceived`

意味: ? を受け取ったとき。

- 正式opcode: `event_whenbroadcastreceived`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["event_whenbroadcastreceived"]({"BROADCAST_OPTION":"Gem検証メッセージ"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| BROADCAST_OPTION | フィールド／未初期化 | 初期値なし。既存の名前を指定。指定は名前の文字列。内部IDを名前の代わりに書かない | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/event.js:126`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `event_whenflagclicked`

意味: flag が押されたとき。

- 正式opcode: `event_whenflagclicked`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["event_whenflagclicked"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/event.js:73`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `event_whengreaterthan`

意味: 音量 > ? のとき。

- 正式opcode: `event_whengreaterthan`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["event_whengreaterthan"]({"WHENGREATERTHANMENU":"LOUDNESS","VALUE":"10"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| WHENGREATERTHANMENU | フィールド／文字列 | `"LOUDNESS"` | `["LOUDNESS","TIMER"]` |
| VALUE | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"10"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/event.js:172`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `event_whenkeypressed`

意味: スペース キーが押されたとき。

- 正式opcode: `event_whenkeypressed`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["event_whenkeypressed"]({"KEY_OPTION":"space"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| KEY_OPTION | フィールド／文字列 | `"space"` | `["space","up arrow","down arrow","right arrow","left arrow","any","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/event.js:266`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `event_whenstageclicked`

意味: ステージが押されたとき。

- 正式opcode: `event_whenstageclicked`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["event_whenstageclicked"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/event.js:112`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `event_whenthisspriteclicked`

意味: このスプライトが押されたとき。

- 正式opcode: `event_whenthisspriteclicked`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["event_whenthisspriteclicked"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/event.js:97`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `event_whentouchingobject`

意味: このスプライトが ? に触れたとき。

- 正式opcode: `event_whentouchingobject`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["event_whentouchingobject"]({"TOUCHINGOBJECTMENU":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TOUCHINGOBJECTMENU | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/event.js:30`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 補助定義 extension（10定義）

- `extension_microbit_display` — 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: display ?
- `extension_music_drum` — 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: play drum ?
- `extension_music_play_note` — 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: play note ? for ? beats
- `extension_music_reporter` — 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: hey now, you're an all-star
- `extension_pen_down` — 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: pen down
- `extension_wedo_boolean` — 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: O RLY?
- `extension_wedo_hat` — 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: when I am wearing a hat
- `extension_wedo_motor` — 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: turn a motor
- `extension_wedo_tilt_menu` — 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: Any
- `extension_wedo_tilt_reporter` — 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: tilt angle ?

### `extension_microbit_display`

意味: 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: display ?。

- 正式opcode: `extension_microbit_display`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INTERNAL_FORBIDDEN`。
- 新規生成の扱い: 補助・内部108件のうち編集内部／旧デモ。実行命令として新規生成禁止。既存の編集メタ情報は保持。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["extension_microbit_display"]({"MATRIX":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MATRIX | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/extensions.js:236`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `extension_music_drum`

意味: 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: play drum ?。

- 正式opcode: `extension_music_drum`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INTERNAL_FORBIDDEN`。
- 新規生成の扱い: 補助・内部108件のうち編集内部／旧デモ。実行命令として新規生成禁止。既存の編集メタ情報は保持。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["extension_music_drum"]({"NUMBER":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NUMBER | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/extensions.js:54`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `extension_music_play_note`

意味: 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: play note ? for ? beats。

- 正式opcode: `extension_music_play_note`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INTERNAL_FORBIDDEN`。
- 新規生成の扱い: 補助・内部108件のうち編集内部／旧デモ。実行命令として新規生成禁止。既存の編集メタ情報は保持。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["extension_music_play_note"]({"NOTE":1,"BEATS":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NOTE | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |
| BEATS | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/extensions.js:264`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `extension_music_reporter`

意味: 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: hey now, you're an all-star。

- 正式opcode: `extension_music_reporter`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INTERNAL_FORBIDDEN`。
- 新規生成の扱い: 補助・内部108件のうち編集内部／旧デモ。実行命令として新規生成禁止。既存の編集メタ情報は保持。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["extension_music_reporter"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/extensions.js:212`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `extension_pen_down`

意味: 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: pen down。

- 正式opcode: `extension_pen_down`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INTERNAL_FORBIDDEN`。
- 新規生成の扱い: 補助・内部108件のうち編集内部／旧デモ。実行命令として新規生成禁止。既存の編集メタ情報は保持。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["extension_pen_down"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/extensions.js:30`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `extension_wedo_boolean`

意味: 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: O RLY?。

- 正式opcode: `extension_wedo_boolean`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INTERNAL_FORBIDDEN`。
- 新規生成の扱い: 補助・内部108件のうち編集内部／旧デモ。実行命令として新規生成禁止。既存の編集メタ情報は保持。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["extension_wedo_boolean"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/extensions.js:136`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `extension_wedo_hat`

意味: 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: when I am wearing a hat。

- 正式opcode: `extension_wedo_hat`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INTERNAL_FORBIDDEN`。
- 新規生成の扱い: 補助・内部108件のうち編集内部／旧デモ。実行命令として新規生成禁止。既存の編集メタ情報は保持。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["extension_wedo_hat"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/extensions.js:112`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `extension_wedo_motor`

意味: 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: turn a motor。

- 正式opcode: `extension_wedo_motor`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INTERNAL_FORBIDDEN`。
- 新規生成の扱い: 補助・内部108件のうち編集内部／旧デモ。実行命令として新規生成禁止。既存の編集メタ情報は保持。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["extension_wedo_motor"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/extensions.js:82`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `extension_wedo_tilt_menu`

意味: 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: Any。

- 正式opcode: `extension_wedo_tilt_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INTERNAL_FORBIDDEN`。
- 新規生成の扱い: 補助・内部108件のうち編集内部／旧デモ。実行命令として新規生成禁止。既存の編集メタ情報は保持。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["extension_wedo_tilt_menu"]({"TILT":"Any"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TILT | フィールド／文字列 | `"Any"` | `["Any","Whirl","South","Back in time"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/extensions.js:188`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `extension_wedo_tilt_reporter`

意味: 旧デモ定義。対応するVM命令がないため、新規コード生成に使用しない。表示名: tilt angle ?。

- 正式opcode: `extension_wedo_tilt_reporter`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INTERNAL_FORBIDDEN`。
- 新規生成の扱い: 補助・内部108件のうち編集内部／旧デモ。実行命令として新規生成禁止。既存の編集メタ情報は保持。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["extension_wedo_tilt_reporter"]({"TILT":1})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TILT | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/extensions.js:160`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 見た目（26定義）

- `looks_backdropnumbername` — 背景の 番号
- `looks_backdrops` — backdrop1
- `looks_changeeffectby` — 色 の効果を ? ずつ変える
- `looks_changesizeby` — 大きさを ? ずつ変える
- `looks_changestretchby` — 伸びを ? ずつ変える
- `looks_cleargraphiceffects` — 画像効果をなくす
- `looks_costume` — Block2Bot-1
- `looks_costumenumbername` — コスチュームの 番号
- `looks_goforwardbackwardlayers` — ? 層 手前に出す
- `looks_gotofrontback` — 最前面 へ移動する
- `looks_hide` — 隠す
- `looks_hideallsprites` — すべてのスプライトを隠す
- `looks_nextbackdrop` — 次の背景にする
- `looks_nextcostume` — 次のコスチュームにする
- `looks_say` — ? と言う
- `looks_sayforsecs` — ? と ? 秒言う
- `looks_seteffectto` — 色 の効果を ? にする
- `looks_setsizeto` — 大きさを ? %にする
- `looks_setstretchto` — 伸びを ? %にする
- `looks_show` — 表示する
- `looks_size` — 大きさ
- `looks_switchbackdropto` — 背景を ? にする
- `looks_switchbackdroptoandwait` — 背景を ? にして待つ
- `looks_switchcostumeto` — コスチュームを ? にする
- `looks_think` — ? と考える
- `looks_thinkforsecs` — ? と ? 秒考える

### `looks_backdropnumbername`

意味: 背景の 番号。

- 正式opcode: `looks_backdropnumbername`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["looks_backdropnumbername"]({"NUMBER_NAME":"number"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NUMBER_NAME | フィールド／文字列 | `"number"` | `["number","name"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:509`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_backdrops`

意味: backdrop1。

- 正式opcode: `looks_backdrops`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["looks_backdrops"]({"BACKDROP":"backdrop1"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| BACKDROP | フィールド／文字列 | `"backdrop1"` | `["backdrop1","next backdrop","previous backdrop","random backdrop"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:430`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_changeeffectby`

意味: 色 の効果を ? ずつ変える。

- 正式opcode: `looks_changeeffectby`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_changeeffectby"]({"EFFECT":"COLOR","CHANGE":"25"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| EFFECT | フィールド／文字列 | `"COLOR"` | `["COLOR","FISHEYE","WHIRL","PIXELATE","MOSAIC","BRIGHTNESS","GHOST"]` |
| CHANGE | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"25"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:163`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_changesizeby`

意味: 大きさを ? ずつ変える。

- 正式opcode: `looks_changesizeby`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_changesizeby"]({"CHANGE":"10"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CHANGE | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"10"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:243`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_changestretchby`

意味: 伸びを ? ずつ変える。

- 正式opcode: `looks_changestretchby`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_changestretchby"]({"CHANGE":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CHANGE | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:298`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_cleargraphiceffects`

意味: 画像効果をなくす。

- 正式opcode: `looks_cleargraphiceffects`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_cleargraphiceffects"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:229`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_costume`

意味: Block2Bot-1。

- 正式opcode: `looks_costume`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["looks_costume"]({"COSTUME":"Block2Bot-1"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| COSTUME | フィールド／文字列 | `"Block2Bot-1"` | `["Block2Bot-1","Block2Bot-2"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:349`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_costumenumbername`

意味: コスチュームの 番号。

- 正式opcode: `looks_costumenumbername`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["looks_costumenumbername"]({"NUMBER_NAME":"number"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NUMBER_NAME | フィールド／文字列 | `"number"` | `["number","name"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:534`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_goforwardbackwardlayers`

意味: ? 層 手前に出す。

- 正式opcode: `looks_goforwardbackwardlayers`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_goforwardbackwardlayers"]({"FORWARD_BACKWARD":"forward","NUM":"1"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| FORWARD_BACKWARD | フィールド／文字列 | `"forward"` | `["forward","backward"]` |
| NUM | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_integer`、fields=`{"NUM":"1"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:481`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_gotofrontback`

意味: 最前面 へ移動する。

- 正式opcode: `looks_gotofrontback`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_gotofrontback"]({"FRONT_BACK":"front"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| FRONT_BACK | フィールド／文字列 | `"front"` | `["front","back"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:457`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_hide`

意味: 隠す。

- 正式opcode: `looks_hide`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_hide"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:133`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_hideallsprites`

意味: すべてのスプライトを隠す。

- 正式opcode: `looks_hideallsprites`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_hideallsprites"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:147`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_nextbackdrop`

意味: 次の背景にする。

- 正式opcode: `looks_nextbackdrop`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_nextbackdrop"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:579`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_nextcostume`

意味: 次のコスチュームにする。

- 正式opcode: `looks_nextcostume`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_nextcostume"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:396`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_say`

意味: ? と言う。

- 正式opcode: `looks_say`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_say"]({"MESSAGE":"こんにちは!"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MESSAGE | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":"こんにちは!"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:55`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `looks_sayforsecs`

意味: ? と ? 秒言う。

- 正式opcode: `looks_sayforsecs`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_sayforsecs"]({"MESSAGE":"こんにちは!","SECS":"2"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MESSAGE | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":"こんにちは!"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| SECS | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"2"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:31`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_seteffectto`

意味: 色 の効果を ? にする。

- 正式opcode: `looks_seteffectto`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_seteffectto"]({"EFFECT":"COLOR","VALUE":"0"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| EFFECT | フィールド／文字列 | `"COLOR"` | `["COLOR","FISHEYE","WHIRL","PIXELATE","MOSAIC","BRIGHTNESS","GHOST"]` |
| VALUE | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"0"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:196`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_setsizeto`

意味: 大きさを ? %にする。

- 正式opcode: `looks_setsizeto`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_setsizeto"]({"SIZE":"100"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SIZE | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"100"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:263`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_setstretchto`

意味: 伸びを ? %にする。

- 正式opcode: `looks_setstretchto`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_setstretchto"]({"STRETCH":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| STRETCH | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:327`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_show`

意味: 表示する。

- 正式opcode: `looks_show`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_show"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:119`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_size`

意味: 大きさ。

- 正式opcode: `looks_size`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["looks_size"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:283`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_switchbackdropto`

意味: 背景を ? にする。

- 正式opcode: `looks_switchbackdropto`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_switchbackdropto"]({"BACKDROP":"backdrop1"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| BACKDROP | 値接続 checks=`null`／実接続check_=`null` | shadow=`looks_backdrops`、fields=`{"BACKDROP":"backdrop1"}` | shadowメニュー保存値: `{"BACKDROP":["backdrop1","next backdrop","previous backdrop","random backdrop"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:410`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_switchbackdroptoandwait`

意味: 背景を ? にして待つ。

- 正式opcode: `looks_switchbackdroptoandwait`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_switchbackdroptoandwait"]({"BACKDROP":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| BACKDROP | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:559`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_switchcostumeto`

意味: コスチュームを ? にする。

- 正式opcode: `looks_switchcostumeto`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_switchcostumeto"]({"COSTUME":"Block2Bot-2"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| COSTUME | 値接続 checks=`null`／実接続check_=`null` | shadow=`looks_costume`、fields=`{"COSTUME":"Block2Bot-2"}` | shadowメニュー保存値: `{"COSTUME":["Block2Bot-1","Block2Bot-2"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:376`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_think`

意味: ? と考える。

- 正式opcode: `looks_think`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_think"]({"MESSAGE":"うーん..."});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MESSAGE | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":"うーん..."}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:99`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `looks_thinkforsecs`

意味: ? と ? 秒考える。

- 正式opcode: `looks_thinkforsecs`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["looks_thinkforsecs"]({"MESSAGE":"うーん...","SECS":"2"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MESSAGE | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":"うーん..."}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| SECS | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"2"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/looks.js:75`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 補助定義 math（5定義）

- `math_angle` — 入力値を表す補助ブロック。表示名: 0
- `math_integer` — 入力値を表す補助ブロック。表示名: 0
- `math_number` — 入力値を表す補助ブロック。表示名: 0
- `math_positive_number` — 入力値を表す補助ブロック。表示名: 0
- `math_whole_number` — 入力値を表す補助ブロック。表示名: 0

### `math_angle`

意味: 入力値を表す補助ブロック。表示名: 0。

- 正式opcode: `math_angle`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["math_angle"]({"NUM":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NUM | フィールド／文字列 | `"0"` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_common/math.js:136`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `math_integer`

意味: 入力値を表す補助ブロック。表示名: 0。

- 正式opcode: `math_integer`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["math_integer"]({"NUM":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NUM | フィールド／文字列 | `"0"` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_common/math.js:60`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `math_number`

意味: 入力値を表す補助ブロック。表示名: 0。

- 正式opcode: `math_number`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["math_number"]({"NUM":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NUM | フィールド／文字列 | `"0"` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_common/math.js:35`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `math_positive_number`

意味: 入力値を表す補助ブロック。表示名: 0。

- 正式opcode: `math_positive_number`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["math_positive_number"]({"NUM":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NUM | フィールド／文字列 | `"0"` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_common/math.js:111`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `math_whole_number`

意味: 入力値を表す補助ブロック。表示名: 0。

- 正式opcode: `math_whole_number`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["math_whole_number"]({"NUM":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NUM | フィールド／文字列 | `"0"` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_common/math.js:85`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 補助定義 matrix（1定義）

- `matrix` — 入力値を表す補助ブロック。表示名: ???

### `matrix`

意味: 入力値を表す補助ブロック。表示名: ???。

- 正式opcode: `matrix`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["matrix"]({"MATRIX":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| MATRIX | フィールド／文字列 | `""` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_common/matrix.js:35`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 動き（26定義）

- `motion_align_scene` — スクロール位置を 左下 にする
- `motion_changexby` — x座標を ? ずつ変える
- `motion_changeyby` — y座標を ? ずつ変える
- `motion_direction` — 向き
- `motion_glidesecstoxy` — ? 秒でx座標を ? に、y座標を ? に変える
- `motion_glideto` — ? 秒で ? へ行く
- `motion_glideto_menu` — 選択肢を持つ補助レポーター。表示名: どこかの場所
- `motion_goto` — ? へ行く
- `motion_goto_menu` — 選択肢を持つ補助レポーター。表示名: どこかの場所
- `motion_gotoxy` — x座標を ? 、y座標を ? にする
- `motion_ifonedgebounce` — もし端に着いたら、跳ね返る
- `motion_movesteps` — ? 歩動かす
- `motion_pointindirection` — ? 度に向ける
- `motion_pointtowards` — ? へ向ける
- `motion_pointtowards_menu` — 選択肢を持つ補助レポーター。表示名: マウスのポインター
- `motion_scroll_right` — 右に ? スクロールする
- `motion_scroll_up` — 上に ? スクロールする
- `motion_setrotationstyle` — 回転方法を 左右のみ にする
- `motion_setx` — x座標を ? にする
- `motion_sety` — y座標を ? にする
- `motion_turnleft` — ? 度回す
- `motion_turnright` — ? 度回す
- `motion_xposition` — x座標
- `motion_xscroll` — x方向のスクロール量
- `motion_yposition` — y座標
- `motion_yscroll` — y方向のスクロール方向

### `motion_align_scene`

意味: スクロール位置を 左下 にする。

- 正式opcode: `motion_align_scene`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_align_scene"]({"ALIGNMENT":"bottom-left"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| ALIGNMENT | フィールド／文字列 | `"bottom-left"` | `["bottom-left","bottom-right","middle","top-left","top-right"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:528`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_changexby`

意味: x座標を ? ずつ変える。

- 正式opcode: `motion_changexby`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_changexby"]({"DX":"10"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DX | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"10"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:320`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `motion_changeyby`

意味: y座標を ? ずつ変える。

- 正式opcode: `motion_changeyby`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_changeyby"]({"DY":"10"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DY | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"10"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:360`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_direction`

意味: 向き。

- 正式opcode: `motion_direction`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["motion_direction"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:469`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_glidesecstoxy`

意味: ? 秒でx座標を ? に、y座標を ? に変える。

- 正式opcode: `motion_glidesecstoxy`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_glidesecstoxy"]({"SECS":"1","X":"0","Y":"0"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SECS | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"1"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| X | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"0"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| Y | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"0"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:241`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_glideto`

意味: ? 秒で ? へ行く。

- 正式opcode: `motion_glideto`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_glideto"]({"SECS":"1","TO":scratch["motion_glideto_menu"]({"TO":"_random_"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SECS | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"1"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| TO | 値接続 checks=`null`／実接続check_=`null` | shadow=`motion_glideto_menu`、fields=`{}`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"TO":"_random_"} | shadowメニュー保存値: `{"TO":["_random_","_mouse_"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:296`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_glideto_menu`

意味: 選択肢を持つ補助レポーター。表示名: どこかの場所。

- 正式opcode: `motion_glideto_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["motion_glideto_menu"]({"TO":"_random_"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TO | フィールド／文字列 | `"_random_"` | `["_random_","_mouse_"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:269`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_goto`

意味: ? へ行く。

- 正式opcode: `motion_goto`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_goto"]({"TO":scratch["motion_goto_menu"]({"TO":"_random_"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TO | 値接続 checks=`null`／実接続check_=`null` | shadow=`motion_goto_menu`、fields=`{}`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"TO":"_random_"} | shadowメニュー保存値: `{"TO":["_random_","_mouse_"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:221`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_goto_menu`

意味: 選択肢を持つ補助レポーター。表示名: どこかの場所。

- 正式opcode: `motion_goto_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["motion_goto_menu"]({"TO":"_random_"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TO | フィールド／文字列 | `"_random_"` | `["_random_","_mouse_"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:170`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_gotoxy`

意味: x座標を ? 、y座標を ? にする。

- 正式opcode: `motion_gotoxy`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_gotoxy"]({"X":"0","Y":"0"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| X | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"0"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| Y | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"0"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:197`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_ifonedgebounce`

意味: もし端に着いたら、跳ね返る。

- 正式opcode: `motion_ifonedgebounce`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_ifonedgebounce"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:400`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_movesteps`

意味: ? 歩動かす。

- 正式opcode: `motion_movesteps`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_movesteps"]({"STEPS":"10"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| STEPS | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"10"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:31`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_pointindirection`

意味: ? 度に向ける。

- 正式opcode: `motion_pointindirection`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_pointindirection"]({"DIRECTION":"90"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DIRECTION | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_angle`、fields=`{"NUM":"90"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:103`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_pointtowards`

意味: ? へ向ける。

- 正式opcode: `motion_pointtowards`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_pointtowards"]({"TOWARDS":scratch["motion_pointtowards_menu"]({"TOWARDS":"_mouse_"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TOWARDS | 値接続 checks=`null`／実接続check_=`null` | shadow=`motion_pointtowards_menu`、fields=`{}`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"TOWARDS":"_mouse_"} | shadowメニュー保存値: `{"TOWARDS":["_mouse_"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:150`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_pointtowards_menu`

意味: 選択肢を持つ補助レポーター。表示名: マウスのポインター。

- 正式opcode: `motion_pointtowards_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["motion_pointtowards_menu"]({"TOWARDS":"_mouse_"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TOWARDS | フィールド／文字列 | `"_mouse_"` | `["_mouse_"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:123`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_scroll_right`

意味: 右に ? スクロールする。

- 正式opcode: `motion_scroll_right`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_scroll_right"]({"DISTANCE":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DISTANCE | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:484`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_scroll_up`

意味: 上に ? スクロールする。

- 正式opcode: `motion_scroll_up`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_scroll_up"]({"DISTANCE":1});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DISTANCE | 値接続 checks=`null`／実接続check_=`null` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:506`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_setrotationstyle`

意味: 回転方法を 左右のみ にする。

- 正式opcode: `motion_setrotationstyle`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_setrotationstyle"]({"STYLE":"left-right"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| STYLE | フィールド／文字列 | `"left-right"` | `["left-right","don't rotate","all around"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:414`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_setx`

意味: x座標を ? にする。

- 正式opcode: `motion_setx`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_setx"]({"X":"0"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| X | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"0"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:340`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_sety`

意味: y座標を ? にする。

- 正式opcode: `motion_sety`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_sety"]({"Y":"0"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| Y | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"0"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:380`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_turnleft`

意味: ? 度回す。

- 正式opcode: `motion_turnleft`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_turnleft"]({"DEGREES":"15"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DEGREES | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"15"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:77`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_turnright`

意味: ? 度回す。

- 正式opcode: `motion_turnright`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["motion_turnright"]({"DEGREES":"15"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DEGREES | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"15"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:51`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_xposition`

意味: x座標。

- 正式opcode: `motion_xposition`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["motion_xposition"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:439`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_xscroll`

意味: x方向のスクロール量。

- 正式opcode: `motion_xscroll`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["motion_xscroll"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:557`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_yposition`

意味: y座標。

- 正式opcode: `motion_yposition`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["motion_yposition"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:454`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `motion_yscroll`

意味: y方向のスクロール方向。

- 正式opcode: `motion_yscroll`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["motion_yscroll"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/motion.js:573`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 補助定義 note（1定義）

- `note` — 入力値を表す補助ブロック。表示名: 0

### `note`

意味: 入力値を表す補助ブロック。表示名: 0。

- 正式opcode: `note`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["note"]({"NOTE":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NOTE | フィールド／文字列 | `"0"` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_common/note.js:35`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 演算（18定義）

- `operator_add` — ? + ?
- `operator_and` — ? かつ ?
- `operator_contains` — ? に ? が含まれる
- `operator_divide` — ? / ?
- `operator_equals` — ? = ?
- `operator_gt` — ? > ?
- `operator_join` — ? と ?
- `operator_length` — ? の長さ
- `operator_letter_of` — ? の ? 番目の文字
- `operator_lt` — ? < ?
- `operator_mathop` — ? の 絶対値
- `operator_mod` — ? を ? で割った余り
- `operator_multiply` — ? * ?
- `operator_not` — ? ではない
- `operator_or` — ? または ?
- `operator_random` — ? から ? までの乱数
- `operator_round` — ? を四捨五入
- `operator_subtract` — ? - ?

### `operator_add`

意味: ? + ?。

- 正式opcode: `operator_add`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_add"]({"NUM1":"","NUM2":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NUM1 | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| NUM2 | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:31`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `operator_and`

意味: ? かつ ?。

- 正式opcode: `operator_and`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_and"]({"OPERAND1":scratch.operator_equals({OPERAND1:1,OPERAND2:1}),"OPERAND2":scratch.operator_equals({OPERAND1:1,OPERAND2:1})})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| OPERAND1 | 値接続 checks=`null`／実接続check_=`["Boolean"]` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |
| OPERAND2 | 値接続 checks=`null`／実接続check_=`["Boolean"]` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:223`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `operator_contains`

意味: ? に ? が含まれる。

- 正式opcode: `operator_contains`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_contains"]({"STRING1":"りんご","STRING2":"り"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| STRING1 | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":"りんご"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| STRING2 | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":"り"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:364`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `operator_divide`

意味: ? / ?。

- 正式opcode: `operator_divide`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_divide"]({"NUM1":"","NUM2":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NUM1 | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| NUM2 | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:103`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `operator_equals`

意味: ? = ?。

- 正式opcode: `operator_equals`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_equals"]({"OPERAND1":"","OPERAND2":"50"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| OPERAND1 | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| OPERAND2 | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":"50"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。 Scratchの大小文字非区別・数値変換の比較であり、Class名の厳密等値と同一視しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:175`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `operator_gt`

意味: ? > ?。

- 正式opcode: `operator_gt`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_gt"]({"OPERAND1":"","OPERAND2":"50"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| OPERAND1 | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| OPERAND2 | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":"50"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:199`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `operator_join`

意味: ? と ?。

- 正式opcode: `operator_join`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_join"]({"STRING1":"りんご ","STRING2":"バナナ"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| STRING1 | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":"りんご "}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| STRING2 | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":"バナナ"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:296`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `operator_length`

意味: ? の長さ。

- 正式opcode: `operator_length`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_length"]({"STRING":"りんご"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| STRING | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":"りんご"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:344`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `operator_letter_of`

意味: ? の ? 番目の文字。

- 正式opcode: `operator_letter_of`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_letter_of"]({"STRING":"りんご","LETTER":"1"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| STRING | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":"りんご"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| LETTER | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_whole_number`、fields=`{"NUM":"1"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:320`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `operator_lt`

意味: ? < ?。

- 正式opcode: `operator_lt`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_lt"]({"OPERAND1":"","OPERAND2":"50"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| OPERAND1 | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| OPERAND2 | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":"50"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:151`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `operator_mathop`

意味: ? の 絶対値。

- 正式opcode: `operator_mathop`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_mathop"]({"OPERATOR":"abs","NUM":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| OPERATOR | フィールド／文字列 | `"abs"` | `["abs","floor","ceiling","sqrt","sin","cos","tan","asin","acos","atan","ln","log","e ^","10 ^"]` |
| NUM | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:432`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `operator_mod`

意味: ? を ? で割った余り。

- 正式opcode: `operator_mod`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_mod"]({"NUM1":"","NUM2":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NUM1 | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| NUM2 | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:388`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `operator_multiply`

意味: ? * ?。

- 正式opcode: `operator_multiply`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_multiply"]({"NUM1":"","NUM2":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NUM1 | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| NUM2 | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:79`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `operator_not`

意味: ? ではない。

- 正式opcode: `operator_not`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_not"]({"OPERAND":scratch.operator_equals({OPERAND1:1,OPERAND2:1})})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| OPERAND | 値接続 checks=`null`／実接続check_=`["Boolean"]` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:275`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `operator_or`

意味: ? または ?。

- 正式opcode: `operator_or`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_or"]({"OPERAND1":scratch.operator_equals({OPERAND1:1,OPERAND2:1}),"OPERAND2":scratch.operator_equals({OPERAND1:1,OPERAND2:1})})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| OPERAND1 | 値接続 checks=`null`／実接続check_=`["Boolean"]` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |
| OPERAND2 | 値接続 checks=`null`／実接続check_=`["Boolean"]` | shadowなし。明示的な値／式を指定 | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:249`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `operator_random`

意味: ? から ? までの乱数。

- 正式opcode: `operator_random`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_random"]({"FROM":"1","TO":"10"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| FROM | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"1"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| TO | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"10"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:127`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `operator_round`

意味: ? を四捨五入。

- 正式opcode: `operator_round`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_round"]({"NUM":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NUM | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:412`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `operator_subtract`

意味: ? - ?。

- 正式opcode: `operator_subtract`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["operator_subtract"]({"NUM1":"","NUM2":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| NUM1 | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |
| NUM2 | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":""}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/operators.js:55`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 独自ブロック（4定義）

- `procedures_call` — ???
- `procedures_declaration` — 独自ブロック編集用の内部定義。既存mutation等の情報なしに生成しない。
- `procedures_definition` — 定義 ?
- `procedures_prototype` — 独自ブロック編集用の内部定義。既存mutation等の情報なしに生成しない。

### `procedures_call`

意味: ???。

- 正式opcode: `procedures_call`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `EXISTING_MUTATION_ONLY`。
- 新規生成の扱い: 348実行候補に含まれるが既存定義・mutation・引数IDが必要。根拠なしに新規生成しない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。 既存mutation等の前提を満たす独自ブロックの動作までは保証しない。

```javascript
scratch.script({x:30,y:30},()=>{scratch["procedures_call"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 既存ブロックのmutation・引数IDを保持して使う。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/procedures.js:790`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `procedures_declaration`

意味: 独自ブロック編集用の内部定義。既存mutation等の情報なしに生成しない。。

- 正式opcode: `procedures_declaration`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INTERNAL_FORBIDDEN`。
- 新規生成の扱い: 補助・内部108件のうち編集内部／旧デモ。実行命令として新規生成禁止。既存の編集メタ情報は保持。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。 既存mutation等の前提を満たす独自ブロックの動作までは保証しない。

```javascript
scratch.script({x:30,y:30},()=>{scratch["procedures_declaration"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 既存ブロックのmutation・引数IDを保持して使う。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/procedures.js:859`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `procedures_definition`

意味: 定義 ?。

- 正式opcode: `procedures_definition`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `EXISTING_MUTATION_ONLY`。
- 新規生成の扱い: 348実行候補に含まれるが既存定義・mutation・引数IDが必要。根拠なしに新規生成しない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。 既存mutation等の前提を満たす独自ブロックの動作までは保証しない。

```javascript
scratch.script({x:30,y:30},()=>{scratch["procedures_definition"]({"custom_block":()=>{}});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| custom_block | 命令列 | `() => { ... }`。省略時は空 | 値・レポーターを入れない |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 既存ブロックのmutation・引数IDを保持して使う。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/procedures.js:771`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `procedures_prototype`

意味: 独自ブロック編集用の内部定義。既存mutation等の情報なしに生成しない。。

- 正式opcode: `procedures_prototype`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INTERNAL_FORBIDDEN`。
- 新規生成の扱い: 補助・内部108件のうち編集内部／旧デモ。実行命令として新規生成禁止。既存の編集メタ情報は保持。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。 既存mutation等の前提を満たす独自ブロックの動作までは保証しない。

```javascript
scratch.script({x:30,y:30},()=>{scratch["procedures_prototype"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 既存ブロックのmutation・引数IDを保持して使う。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/procedures.js:822`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 調べる（24定義）

- `sensing_answer` — 答え
- `sensing_askandwait` — ? と聞いて待つ
- `sensing_coloristouchingcolor` — ? 色が ? 色に触れた
- `sensing_current` — 現在の 年
- `sensing_dayssince2000` — 2000年からの日数
- `sensing_distanceto` — ? までの距離
- `sensing_distancetomenu` — 選択肢を持つ補助レポーター。表示名: マウスのポインター
- `sensing_keyoptions` — 選択肢を持つ補助レポーター。表示名: スペース
- `sensing_keypressed` — ? キーが押された
- `sensing_loud` — うるさい
- `sensing_loudness` — 音量
- `sensing_mousedown` — マウスが押された
- `sensing_mousex` — マウスのx座標
- `sensing_mousey` — マウスのy座標
- `sensing_of` — ? の 背景 #
- `sensing_of_object_menu` — 選択肢を持つ補助レポーター。表示名: ステージ
- `sensing_resettimer` — タイマーをリセット
- `sensing_setdragmode` — ドラッグ できる ようにする
- `sensing_timer` — タイマー
- `sensing_touchingcolor` — ? 色に触れた
- `sensing_touchingobject` — ? に触れた
- `sensing_touchingobjectmenu` — 選択肢を持つ補助レポーター。表示名: マウスのポインター
- `sensing_userid` — ユーザーID
- `sensing_username` — ユーザー名

### `sensing_answer`

意味: 答え。

- 正式opcode: `sensing_answer`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_answer"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:180`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_askandwait`

意味: ? と聞いて待つ。

- 正式opcode: `sensing_askandwait`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["sensing_askandwait"]({"QUESTION":"あなたの名前は何ですか?"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| QUESTION | 値接続 checks=`null`／実接続check_=`null` | shadow=`text`、fields=`{"TEXT":"あなたの名前は何ですか?"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:160`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_coloristouchingcolor`

意味: ? 色が ? 色に触れた。

- 正式opcode: `sensing_coloristouchingcolor`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_coloristouchingcolor"]({"COLOR":scratch["colour_picker"]({"COLOUR":"#0797a8"}),"COLOR2":scratch["colour_picker"]({"COLOUR":"#0797a8"})})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| COLOR | 値接続 checks=`null`／実接続check_=`null` | shadow=`colour_picker`、fields=`{}`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"COLOUR":"#0797a8"} | ネストした `scratch.OPCODE({...})` または静的リテラル |
| COLOR2 | 値接続 checks=`null`／実接続check_=`null` | shadow=`colour_picker`、fields=`{}`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"COLOUR":"#0797a8"} | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:94`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_current`

意味: 現在の 年。

- 正式opcode: `sensing_current`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_current"]({"CURRENTMENU":"YEAR"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CURRENTMENU | フィールド／文字列 | `"YEAR"` | `["YEAR","MONTH","DATE","DAYOFWEEK","HOUR","MINUTE","SECOND"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:466`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_dayssince2000`

意味: 2000年からの日数。

- 正式opcode: `sensing_dayssince2000`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_dayssince2000"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:496`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_distanceto`

意味: ? までの距離。

- 正式opcode: `sensing_distanceto`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_distanceto"]({"DISTANCETOMENU":scratch["sensing_distancetomenu"]({"DISTANCETOMENU":"_mouse_"})})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DISTANCETOMENU | 値接続 checks=`null`／実接続check_=`null` | shadow=`sensing_distancetomenu`、fields=`{}`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"DISTANCETOMENU":"_mouse_"} | shadowメニュー保存値: `{"DISTANCETOMENU":["_mouse_"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:118`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_distancetomenu`

意味: 選択肢を持つ補助レポーター。表示名: マウスのポインター。

- 正式opcode: `sensing_distancetomenu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_distancetomenu"]({"DISTANCETOMENU":"_mouse_"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DISTANCETOMENU | フィールド／文字列 | `"_mouse_"` | `["_mouse_"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:138`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_keyoptions`

意味: 選択肢を持つ補助レポーター。表示名: スペース。

- 正式opcode: `sensing_keyoptions`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_keyoptions"]({"KEY_OPTION":"space"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| KEY_OPTION | フィールド／文字列 | `"space"` | `["space","up arrow","down arrow","right arrow","left arrow","any","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:215`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_keypressed`

意味: ? キーが押された。

- 正式opcode: `sensing_keypressed`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_keypressed"]({"KEY_OPTION":scratch["sensing_keyoptions"]({"KEY_OPTION":"space"})})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| KEY_OPTION | 値接続 checks=`null`／実接続check_=`null` | shadow=`sensing_keyoptions`、fields=`{}`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"KEY_OPTION":"space"} | shadowメニュー保存値: `{"KEY_OPTION":["space","up arrow","down arrow","right arrow","left arrow","any","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:195`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_loud`

意味: うるさい。

- 正式opcode: `sensing_loud`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_loud"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:359`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_loudness`

意味: 音量。

- 正式opcode: `sensing_loudness`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_loudness"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:344`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_mousedown`

意味: マウスが押された。

- 正式opcode: `sensing_mousedown`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_mousedown"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:278`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_mousex`

意味: マウスのx座標。

- 正式opcode: `sensing_mousex`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_mousex"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:292`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_mousey`

意味: マウスのy座標。

- 正式opcode: `sensing_mousey`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_mousey"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:306`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_of`

意味: ? の 背景 #。

- 正式opcode: `sensing_of`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_of"]({"PROPERTY":"backdrop #","OBJECT":scratch["sensing_of_object_menu"]({"OBJECT":"_stage_"})})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PROPERTY | フィールド／文字列 | `"backdrop #"` | `["backdrop #","backdrop name","volume","my variable"]`（動的・取得時点） |
| OBJECT | 値接続 checks=`null`／実接続check_=`null` | shadow=`sensing_of_object_menu`、fields=`{}`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"OBJECT":"_stage_"} | shadowメニュー保存値: `{"OBJECT":["_stage_"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:429`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_of_object_menu`

意味: 選択肢を持つ補助レポーター。表示名: ステージ。

- 正式opcode: `sensing_of_object_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_of_object_menu"]({"OBJECT":"_stage_"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| OBJECT | フィールド／文字列 | `"_stage_"` | `["_stage_"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:404`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_resettimer`

意味: タイマーをリセット。

- 正式opcode: `sensing_resettimer`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["sensing_resettimer"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:390`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_setdragmode`

意味: ドラッグ できる ようにする。

- 正式opcode: `sensing_setdragmode`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["sensing_setdragmode"]({"DRAG_MODE":"draggable"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DRAG_MODE | フィールド／文字列 | `"draggable"` | `["draggable","not draggable"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:320`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_timer`

意味: タイマー。

- 正式opcode: `sensing_timer`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_timer"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:375`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_touchingcolor`

意味: ? 色に触れた。

- 正式opcode: `sensing_touchingcolor`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_touchingcolor"]({"COLOR":scratch["colour_picker"]({"COLOUR":"#0797a8"})})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| COLOR | 値接続 checks=`null`／実接続check_=`null` | shadow=`colour_picker`、fields=`{}`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"COLOUR":"#0797a8"} | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:74`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_touchingobject`

意味: ? に触れた。

- 正式opcode: `sensing_touchingobject`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_touchingobject"]({"TOUCHINGOBJECTMENU":scratch["sensing_touchingobjectmenu"]({"TOUCHINGOBJECTMENU":"_mouse_"})})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TOUCHINGOBJECTMENU | 値接続 checks=`null`／実接続check_=`null` | shadow=`sensing_touchingobjectmenu`、fields=`{}`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"TOUCHINGOBJECTMENU":"_mouse_"} | shadowメニュー保存値: `{"TOUCHINGOBJECTMENU":["_mouse_","_edge_"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:31`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_touchingobjectmenu`

意味: 選択肢を持つ補助レポーター。表示名: マウスのポインター。

- 正式opcode: `sensing_touchingobjectmenu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_touchingobjectmenu"]({"TOUCHINGOBJECTMENU":"_mouse_"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TOUCHINGOBJECTMENU | フィールド／文字列 | `"_mouse_"` | `["_mouse_","_edge_"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:51`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_userid`

意味: ユーザーID。

- 正式opcode: `sensing_userid`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_userid"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:525`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sensing_username`

意味: ユーザー名。

- 正式opcode: `sensing_username`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sensing_username"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sensing.js:510`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 音（10定義）

- `sound_changeeffectby` — ピッチ の効果を ? ずつ変える
- `sound_changevolumeby` — 音量を ? ずつ変える
- `sound_cleareffects` — 音の効果をなくす
- `sound_play` — ? の音を鳴らす
- `sound_playuntildone` — 終わるまで ? の音を鳴らす
- `sound_seteffectto` — ピッチ の効果を ? にする
- `sound_setvolumeto` — 音量を ? %にする
- `sound_sounds_menu` — 選択肢を持つ補助レポーター。表示名: Meow
- `sound_stopallsounds` — すべての音を止める
- `sound_volume` — 音量

### `sound_changeeffectby`

意味: ピッチ の効果を ? ずつ変える。

- 正式opcode: `sound_changeeffectby`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["sound_changeeffectby"]({"EFFECT":"PITCH","VALUE":"10"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| EFFECT | フィールド／文字列 | `"PITCH"` | `["PITCH","PAN"]` |
| VALUE | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"10"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sound.js:151`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sound_changevolumeby`

意味: 音量を ? ずつ変える。

- 正式opcode: `sound_changevolumeby`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["sound_changevolumeby"]({"VOLUME":"-10"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VOLUME | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"-10"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sound.js:193`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sound_cleareffects`

意味: 音の効果をなくす。

- 正式opcode: `sound_cleareffects`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["sound_cleareffects"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sound.js:179`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sound_play`

意味: ? の音を鳴らす。

- 正式opcode: `sound_play`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["sound_play"]({"SOUND_MENU":"Meow"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SOUND_MENU | 値接続 checks=`null`／実接続check_=`null` | shadow=`sound_sounds_menu`、fields=`{"SOUND_MENU":"Meow"}` | shadowメニュー保存値: `{"SOUND_MENU":["Meow","function t(){return(this&&this!==_&&this instanceof t?r:e).apply(i?o:this,arguments)}"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sound.js:68`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sound_playuntildone`

意味: 終わるまで ? の音を鳴らす。

- 正式opcode: `sound_playuntildone`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["sound_playuntildone"]({"SOUND_MENU":"Meow"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SOUND_MENU | 値接続 checks=`null`／実接続check_=`null` | shadow=`sound_sounds_menu`、fields=`{"SOUND_MENU":"Meow"}` | shadowメニュー保存値: `{"SOUND_MENU":["Meow","function t(){return(this&&this!==_&&this instanceof t?r:e).apply(i?o:this,arguments)}"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sound.js:88`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sound_seteffectto`

意味: ピッチ の効果を ? にする。

- 正式opcode: `sound_seteffectto`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["sound_seteffectto"]({"EFFECT":"PITCH","VALUE":"100"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| EFFECT | フィールド／文字列 | `"PITCH"` | `["PITCH","PAN"]` |
| VALUE | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"100"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sound.js:122`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sound_setvolumeto`

意味: 音量を ? %にする。

- 正式opcode: `sound_setvolumeto`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["sound_setvolumeto"]({"VOLUME":"100"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VOLUME | 値接続 checks=`null`／実接続check_=`null` | shadow=`math_number`、fields=`{"NUM":"100"}` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sound.js:213`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sound_sounds_menu`

意味: 選択肢を持つ補助レポーター。表示名: Meow。

- 正式opcode: `sound_sounds_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sound_sounds_menu"]({"SOUND_MENU":"Meow"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| SOUND_MENU | フィールド／文字列 | `"Meow"` | `["Meow","function t(){return(this&&this!==_&&this instanceof t?r:e).apply(i?o:this,arguments)}"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sound.js:30`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sound_stopallsounds`

意味: すべての音を止める。

- 正式opcode: `sound_stopallsounds`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["sound_stopallsounds"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sound.js:108`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `sound_volume`

意味: 音量。

- 正式opcode: `sound_volume`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["sound_volume"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_vertical/sound.js:233`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 補助定義 text（1定義）

- `text` — 入力値を表す補助ブロック。表示名: undefined

### `text`

意味: 入力値を表す補助ブロック。表示名: undefined。

- 正式opcode: `text`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: 標準定義。ただし内部／旧デモは実行対応を別判定。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["text"]({"TEXT":"undefined"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TEXT | フィールド／文字列 | `"undefined"` | 自由入力／参照先依存 |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。

出典: `stretch3-base/scratch-gui-3.6.18/node_modules/scratch-blocks/blocks_common/text.js:35`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## 名前空間等の非命令登録（監査用）

次の13件はworkspaceから作成できても接続を持たない登録項目で、命令数に数えない。コード生成に使用しない。

- `colour`
- `control`
- `data`
- `defaultToolbox`
- `event`
- `extensions`
- `looks`
- `math`
- `motion`
- `operators`
- `sensing`
- `sound`
- `texts`
