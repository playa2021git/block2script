# AI拡張の命令辞書

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

## 初期化・Class名・認識結果

### TM2Scratch（画像／音声のTeachable Machine）

画像は `tm2scratch_setImageClassificationModelURL({URL:"モデルディレクトリURL/"})`、音声は `tm2scratch_setSoundClassificationModelURL({URL:"モデルディレクトリURL/"})`。URL末尾に `metadata.json` / `model.json` を連結する実装なので、モデルディレクトリ末尾の `/` を維持する。
これらはPromiseを返す命令であり、VMは同じスクリプトの続きで完了を待つ。ただし失敗をログへ記録してresolveする経路もあるため、「次の命令へ進んだ＝ロード成功」と断定しない。完了確認専用の成功Boolean opcodeは登録されていない。
画像推論は `classifyVideoImageBlock({})`、または `toggleClassification({CLASSIFICATION_STATE:"on"})` 等の連続分類経路を使う。
音声モデルのロード成功時はsoundClassifierEnabled=trueとなり `classifySound` が開始する。toggleClassificationは画像タイマーと音声有効フラグを共通に変更する。
`setClassificationInterval` は結果リセットのintervalを設定し画像タイマーも作成するため、単なる待ち時間指定と同一視しない。

画像のClass名はmetadataの `labels`、音声は `wordLabels` から動的メニューを作る。画像受信メニューは `any` 相当とlabels、音声受信は `any` 相当と `_background_noise_` を除いたwordLabels。信頼度用の音声メニューではbackgroundも含み得る。先頭の任意ラベル表示／保存値はロケール依存のため、固定の日本語／英語文字列を普遍値として埋め込まない。
モデルなしでは任意ラベル／空文字だけの候補となる。新規メニュー値を作る前に、B2Sでモデルをロードして最新仕様JSONを取得する。
`getImageLabel({})` / `getSoundLabel({})` は最も確率の高いラベルがthreshold以上の場合だけClass名、結果なし・threshold未満では空文字を返す。`imageLabelConfidence({LABEL:...})` / `soundLabelConfidence({LABEL:...})` は当該Classの信頼度（0〜1）、未該当は0。threshold既定0.5、設定時に0〜1へclampする。
結果は一定時間後に初期化されるため、全レポーターが永久に直近結果を保持するとは扱わない。`whenReceived` / `whenReceivedSoundLabel` はVMのedge-activated hatであり、条件のtrue期間中に無限に同じ受信処理を起動する説明は誤り。

```javascript
scratch.script({x:40,y:40},()=>{
  scratch.event_whenflagclicked({});
  scratch.control_if({
    CONDITION:scratch.operator_equals({OPERAND1:scratch.tm2scratch_getImageLabel({}),OPERAND2:"実際のClass名"}),
    SUBSTACK:()=>{scratch.looks_say({MESSAGE:"認識しました"});}
  });
});
```

この例は文字列比較の構成例。モデルロード・推論は含まない。
Scratchのoperator_equalsはCast.compareを使い、文字列は大小文字を区別せず、数値化できる値は数値として比較する。Class名がCat_A/cat_aや"01"/"1"のような組合せなら、この例の単純比較で厳密に区別できない。TM専用のisImageLabelDetected/isSoundLabelDetectedや受信hatの実装は厳密な文字列比較を使うため、モデルロード後の対応メニューを確認して使う。Class名を勝手に改名したり、通常JSの===を生成したりしない。
根拠: 固定scratch-vm 3.0.0のsrc/blocks/scratch3_operators.js、src/util/cast.js、および固定TM2ScratchのisImageLabelDetected等。
特定Classのメニューを直接使う場合は、下の辞書の `LABEL` 入力と `tm2scratch_menu_*` フィールドを区別する。
既存の保存済み動的値が変わらない場合、metadataなしでも元の値を保持するvalidateConnectionsの例外がある。新規・変更した値の制限を回避するためにこの例外を利用しない。

### ML2Scratch（その場で学習する画像分類）

画像例を追加・train/trainAnyでラベル別に学習し、getLabel/whenReceived等で結果を使う。Teachable MachineのモデルURLを指定する拡張と同一ではない。
既定の1〜10のラベル、任意ラベルのtrainAny/whenReceivedAny/getCountByLabel/resetAnyを区別する。固定メニューを持つフィールドの範囲外に勝手なClass名を入れない。任意ラベルは対応する値入力命令を使う。
カメラ・学習例・分類状態が必要。学習例は.sb3に全部保存されるものではなくdownload/upload等を別途使う。getLabelは認識結果であり、学習枚数レポーターとは違う。現行getInfoに一般の信頼度レポーターはない。

### PoseNet2Scratch（身体のキーポイント）

人数、鼻・目・耳・肩・肘・手首・腰・膝・足首のXY、getX/getYの部位・人物指定、ビデオ設定を提供。これは姿勢キーポイント推定であり、Teachable Machineのポーズ分類モデルURLと任意のClass名をロードする機能ではない。
getX/getYのPERSON_NUMBERはメニューの文字列1始まり、PARTはキーポイント添字の文字列。座標はxを240、yを180基準に変換し、xはvideo.mirrorで符号の扱いが変わる。対象がなければ空文字を返す経路がある。個別部位レポーターは先頭人物のkeypointsを使う。
「人がいない＝座標0」ではない。人数と部位の存在を考慮する。登録集合にTMポーズモデル用のTMPose2Scratchや任意ポーズClass分類命令はない。ポーズClassを要求された場合はこの環境だけで同等に実現できると回答しない。

### Speech2Scratch（PCマイクで音声→文字）

`startRecognition({})` と `getSpeech({})` の2命令。Teachable Machine音声分類とは異なる。Web Speech API対応・マイク許可が必要。`stretch3-base/prepare.mjs` はAPI選択・二重開始抑止・停止時abort・未対応／エラー文字列の扱いを追加する。
返った文字列が必ず正常な発話とは限らない。音声合成（text2speech）とも区別する。認識言語や信頼度の架空入力・opcodeは追加しない。

## 検証上の限界

本調査のTM単体検証は固定ソースにprepare.mjsと同じml5 importを補った独立ハーネスで、metadata・分類器・媒体をモックした。5ラベルを保持し判定・リセットを確認したが、実モデル推論・実マイク・実カメラ・生徒のClass名は未検証。
既存 `stretch3-base/tm2-recognition.test.mjs` には実モデル＋合成カメラ等の別テストがあるが、本調査でそのテストを実行したとは扱わない。

## ML2Scratch（38定義）

- `ml2scratch_addExample1` — ラベル1を学習する
- `ml2scratch_addExample2` — ラベル2を学習する
- `ml2scratch_addExample3` — ラベル3を学習する
- `ml2scratch_download` — 学習データをダウンロード
- `ml2scratch_getCountByLabel` — ラベル ? の枚数
- `ml2scratch_getCountByLabel1` — ラベル1の枚数
- `ml2scratch_getCountByLabel10` — ラベル10の枚数
- `ml2scratch_getCountByLabel2` — ラベル2の枚数
- `ml2scratch_getCountByLabel3` — ラベル3の枚数
- `ml2scratch_getCountByLabel4` — ラベル4の枚数
- `ml2scratch_getCountByLabel5` — ラベル5の枚数
- `ml2scratch_getCountByLabel6` — ラベル6の枚数
- `ml2scratch_getCountByLabel7` — ラベル7の枚数
- `ml2scratch_getCountByLabel8` — ラベル8の枚数
- `ml2scratch_getCountByLabel9` — ラベル9の枚数
- `ml2scratch_getLabel` — ラベル
- `ml2scratch_menu_classification_interval_menu` — 選択肢を持つ補助レポーター。表示名: 1
- `ml2scratch_menu_classification_menu` — 選択肢を持つ補助レポーター。表示名: 切
- `ml2scratch_menu_count_menu` — 選択肢を持つ補助レポーター。表示名: 4
- `ml2scratch_menu_input_menu` — 選択肢を持つ補助レポーター。表示名: カメラ
- `ml2scratch_menu_mediadevices` — 選択肢を持つ補助レポーター。表示名: ?
- `ml2scratch_menu_received_menu` — 選択肢を持つ補助レポーター。表示名: のどれか
- `ml2scratch_menu_reset_menu` — 選択肢を持つ補助レポーター。表示名: の全て
- `ml2scratch_menu_train_menu` — 選択肢を持つ補助レポーター。表示名: 4
- `ml2scratch_menu_video_menu` — 選択肢を持つ補助レポーター。表示名: 切
- `ml2scratch_reset` — ラベル の全て の学習をリセット
- `ml2scratch_resetAny` — ラベル ? の学習をリセット
- `ml2scratch_setClassificationInterval` — ラベル付けを ? 秒間に1回行う
- `ml2scratch_setInput` — カメラ の画像を学習/判定する
- `ml2scratch_setVideoTransparency` — ビデオの透明度を ? にする
- `ml2scratch_switchCamera` — カメラを ? に切り替える
- `ml2scratch_toggleClassification` — ラベル付けを 切 にする
- `ml2scratch_train` — ラベル 4 を学習する
- `ml2scratch_trainAny` — ラベル ? を学習する
- `ml2scratch_upload` — 学習データをアップロード
- `ml2scratch_videoToggle` — ビデオを 切 にする
- `ml2scratch_whenReceived` — ラベル のどれか を受け取ったとき
- `ml2scratch_whenReceivedAny` — ラベル ? を受け取ったとき

### `ml2scratch_addExample1`

意味: ラベル1を学習する。

- 正式opcode: `ml2scratch_addExample1`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_addExample1"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_addExample2`

意味: ラベル2を学習する。

- 正式opcode: `ml2scratch_addExample2`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_addExample2"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_addExample3`

意味: ラベル3を学習する。

- 正式opcode: `ml2scratch_addExample3`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_addExample3"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_download`

意味: 学習データをダウンロード。

- 正式opcode: `ml2scratch_download`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_download"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_getCountByLabel`

意味: ラベル ? の枚数。

- 正式opcode: `ml2scratch_getCountByLabel`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_getCountByLabel"]({"LABEL":"11"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text`、fields=`{"TEXT":"11"}`。getInfo宣言既定=`"11"` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_getCountByLabel1`

意味: ラベル1の枚数。

- 正式opcode: `ml2scratch_getCountByLabel1`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_getCountByLabel1"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_getCountByLabel10`

意味: ラベル10の枚数。

- 正式opcode: `ml2scratch_getCountByLabel10`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_getCountByLabel10"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_getCountByLabel2`

意味: ラベル2の枚数。

- 正式opcode: `ml2scratch_getCountByLabel2`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_getCountByLabel2"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_getCountByLabel3`

意味: ラベル3の枚数。

- 正式opcode: `ml2scratch_getCountByLabel3`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_getCountByLabel3"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_getCountByLabel4`

意味: ラベル4の枚数。

- 正式opcode: `ml2scratch_getCountByLabel4`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_getCountByLabel4"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_getCountByLabel5`

意味: ラベル5の枚数。

- 正式opcode: `ml2scratch_getCountByLabel5`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_getCountByLabel5"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_getCountByLabel6`

意味: ラベル6の枚数。

- 正式opcode: `ml2scratch_getCountByLabel6`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_getCountByLabel6"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_getCountByLabel7`

意味: ラベル7の枚数。

- 正式opcode: `ml2scratch_getCountByLabel7`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_getCountByLabel7"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_getCountByLabel8`

意味: ラベル8の枚数。

- 正式opcode: `ml2scratch_getCountByLabel8`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_getCountByLabel8"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_getCountByLabel9`

意味: ラベル9の枚数。

- 正式opcode: `ml2scratch_getCountByLabel9`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_getCountByLabel9"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_getLabel`

意味: ラベル。

- 正式opcode: `ml2scratch_getLabel`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_getLabel"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_menu_classification_interval_menu`

意味: 選択肢を持つ補助レポーター。表示名: 1。

- 正式opcode: `ml2scratch_menu_classification_interval_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_menu_classification_interval_menu"]({"classification_interval_menu":"1"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| classification_interval_menu | フィールド／文字列 | `"1"` | `["1","0.5","0.2","0.1"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_menu_classification_menu`

意味: 選択肢を持つ補助レポーター。表示名: 切。

- 正式opcode: `ml2scratch_menu_classification_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_menu_classification_menu"]({"classification_menu":"off"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| classification_menu | フィールド／文字列 | `"off"` | `["off","on"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_menu_count_menu`

意味: 選択肢を持つ補助レポーター。表示名: 4。

- 正式opcode: `ml2scratch_menu_count_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_menu_count_menu"]({"count_menu":"4"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| count_menu | フィールド／文字列 | `"4"` | `["4","5","6","7","8","9","10"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_menu_input_menu`

意味: 選択肢を持つ補助レポーター。表示名: カメラ。

- 正式opcode: `ml2scratch_menu_input_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_menu_input_menu"]({"input_menu":"webcam"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| input_menu | フィールド／文字列 | `"webcam"` | `["webcam","stage"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_menu_mediadevices`

意味: 選択肢を持つ補助レポーター。表示名: ?。

- 正式opcode: `ml2scratch_menu_mediadevices`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_menu_mediadevices"]({"mediadevices":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| mediadevices | フィールド／文字列 | `""` | `[""]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_menu_received_menu`

意味: 選択肢を持つ補助レポーター。表示名: のどれか。

- 正式opcode: `ml2scratch_menu_received_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_menu_received_menu"]({"received_menu":"any"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| received_menu | フィールド／文字列 | `"any"` | `["any","1","2","3","4","5","6","7","8","9","10"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_menu_reset_menu`

意味: 選択肢を持つ補助レポーター。表示名: の全て。

- 正式opcode: `ml2scratch_menu_reset_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_menu_reset_menu"]({"reset_menu":"all"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| reset_menu | フィールド／文字列 | `"all"` | `["all","1","2","3","4","5","6","7","8","9","10"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_menu_train_menu`

意味: 選択肢を持つ補助レポーター。表示名: 4。

- 正式opcode: `ml2scratch_menu_train_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_menu_train_menu"]({"train_menu":"4"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| train_menu | フィールド／文字列 | `"4"` | `["4","5","6","7","8","9","10"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_menu_video_menu`

意味: 選択肢を持つ補助レポーター。表示名: 切。

- 正式opcode: `ml2scratch_menu_video_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["ml2scratch_menu_video_menu"]({"video_menu":"off"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| video_menu | フィールド／文字列 | `"off"` | `["off","on","on-flipped"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_reset`

意味: ラベル の全て の学習をリセット。

- 正式opcode: `ml2scratch_reset`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_reset"]({"LABEL":"all"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | フィールド／文字列 | `"all"` | `["all","1","2","3","4","5","6","7","8","9","10"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_resetAny`

意味: ラベル ? の学習をリセット。

- 正式opcode: `ml2scratch_resetAny`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_resetAny"]({"LABEL":"11"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text`、fields=`{"TEXT":"11"}`。getInfo宣言既定=`"11"` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_setClassificationInterval`

意味: ラベル付けを ? 秒間に1回行う。

- 正式opcode: `ml2scratch_setClassificationInterval`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_setClassificationInterval"]({"CLASSIFICATION_INTERVAL":"1"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CLASSIFICATION_INTERVAL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`ml2scratch_menu_classification_interval_menu`、fields=`{"classification_interval_menu":"1"}`。getInfo宣言既定=`"1"` | shadowメニュー保存値: `{"classification_interval_menu":["1","0.5","0.2","0.1"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_setInput`

意味: カメラ の画像を学習/判定する。

- 正式opcode: `ml2scratch_setInput`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_setInput"]({"INPUT":"webcam"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| INPUT | フィールド／文字列 | `"webcam"` | `["webcam","stage"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_setVideoTransparency`

意味: ビデオの透明度を ? にする。

- 正式opcode: `ml2scratch_setVideoTransparency`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_setVideoTransparency"]({"TRANSPARENCY":"50"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TRANSPARENCY | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"50"}`。getInfo宣言既定=`50` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_switchCamera`

意味: カメラを ? に切り替える。

- 正式opcode: `ml2scratch_switchCamera`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_switchCamera"]({"DEVICE":scratch["ml2scratch_menu_mediadevices"]({"mediadevices":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DEVICE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`ml2scratch_menu_mediadevices`、fields=`{}`。getInfo宣言既定=`""`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"mediadevices":""} | shadowメニュー保存値: `{"mediadevices":[""]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_toggleClassification`

意味: ラベル付けを 切 にする。

- 正式opcode: `ml2scratch_toggleClassification`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_toggleClassification"]({"CLASSIFICATION_STATE":"off"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CLASSIFICATION_STATE | フィールド／文字列 | `"off"` | `["off","on"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_train`

意味: ラベル 4 を学習する。

- 正式opcode: `ml2scratch_train`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_train"]({"LABEL":"4"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | フィールド／文字列 | `"4"` | `["4","5","6","7","8","9","10"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_trainAny`

意味: ラベル ? を学習する。

- 正式opcode: `ml2scratch_trainAny`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_trainAny"]({"LABEL":"11"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text`、fields=`{"TEXT":"11"}`。getInfo宣言既定=`"11"` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_upload`

意味: 学習データをアップロード。

- 正式opcode: `ml2scratch_upload`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_upload"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_videoToggle`

意味: ビデオを 切 にする。

- 正式opcode: `ml2scratch_videoToggle`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_videoToggle"]({"VIDEO_STATE":"off"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VIDEO_STATE | フィールド／文字列 | `"off"` | `["off","on","on-flipped"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_whenReceived`

意味: ラベル のどれか を受け取ったとき。

- 正式opcode: `ml2scratch_whenReceived`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_whenReceived"]({"LABEL":"any"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | フィールド／文字列 | `"any"` | `["any","1","2","3","4","5","6","7","8","9","10"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `ml2scratch_whenReceivedAny`

意味: ラベル ? を受け取ったとき。

- 正式opcode: `ml2scratch_whenReceivedAny`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: ML2Scratch（ID `ml2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["ml2scratch_whenReceivedAny"]({"LABEL":"11"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text`、fields=`{"TEXT":"11"}`。getInfo宣言既定=`"11"` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc/scratch-vm/src/extensions/scratch3_ml2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## PoseNet2Scratch（42定義）

- `posenet2scratch_getLeftAnkleX` — 左足首のx座標
- `posenet2scratch_getLeftAnkleY` — 左足首のy座標
- `posenet2scratch_getLeftEarX` — 左耳のx座標
- `posenet2scratch_getLeftEarY` — 左耳のy座標
- `posenet2scratch_getLeftElbowX` — 左ひじのx座標
- `posenet2scratch_getLeftElbowY` — 左ひじのy座標
- `posenet2scratch_getLeftEyeX` — 左目のx座標
- `posenet2scratch_getLeftEyeY` — 左目のy座標
- `posenet2scratch_getLeftHipX` — 左腰のx座標
- `posenet2scratch_getLeftHipY` — 左腰のy座標
- `posenet2scratch_getLeftKneeX` — 左ひざのx座標
- `posenet2scratch_getLeftKneeY` — 左ひざのy座標
- `posenet2scratch_getLeftShoulderX` — 左肩のx座標
- `posenet2scratch_getLeftShoulderY` — 左肩のy座標
- `posenet2scratch_getLeftWristX` — 左手首のx座標
- `posenet2scratch_getLeftWristY` — 左手首のy座標
- `posenet2scratch_getNoseX` — 鼻のx座標
- `posenet2scratch_getNoseY` — 鼻のy座標
- `posenet2scratch_getPeopleCount` — 人数
- `posenet2scratch_getRightAnkleX` — 右足首のx座標
- `posenet2scratch_getRightAnkleY` — 右足首のy座標
- `posenet2scratch_getRightEarX` — 右耳のx座標
- `posenet2scratch_getRightEarY` — 右耳のy座標
- `posenet2scratch_getRightElbowX` — 右ひじのx座標
- `posenet2scratch_getRightElbowY` — 右ひじのy座標
- `posenet2scratch_getRightEyeX` — 右目のx座標
- `posenet2scratch_getRightEyeY` — 右目のy座標
- `posenet2scratch_getRightHipX` — 右腰のx座標
- `posenet2scratch_getRightHipY` — 右腰のy座標
- `posenet2scratch_getRightKneeX` — 右ひざのx座標
- `posenet2scratch_getRightKneeY` — 右ひざのy座標
- `posenet2scratch_getRightShoulderX` — 右肩のx座標
- `posenet2scratch_getRightShoulderY` — 右肩のy座標
- `posenet2scratch_getRightWristX` — 右手首のx座標
- `posenet2scratch_getRightWristY` — 右手首のy座標
- `posenet2scratch_getX` — ? 人目の ? のx座標
- `posenet2scratch_getY` — ? 人目の ? のy座標
- `posenet2scratch_menu_parts` — 選択肢を持つ補助レポーター。表示名: 鼻
- `posenet2scratch_menu_personNumbers` — 選択肢を持つ補助レポーター。表示名: 1
- `posenet2scratch_menu_videoMenu` — 選択肢を持つ補助レポーター。表示名: 切
- `posenet2scratch_setVideoTransparency` — ビデオの透明度を ? にする
- `posenet2scratch_videoToggle` — ビデオを 切 にする

### `posenet2scratch_getLeftAnkleX`

意味: 左足首のx座標。

- 正式opcode: `posenet2scratch_getLeftAnkleX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftAnkleX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftAnkleY`

意味: 左足首のy座標。

- 正式opcode: `posenet2scratch_getLeftAnkleY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftAnkleY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftEarX`

意味: 左耳のx座標。

- 正式opcode: `posenet2scratch_getLeftEarX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftEarX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftEarY`

意味: 左耳のy座標。

- 正式opcode: `posenet2scratch_getLeftEarY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftEarY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftElbowX`

意味: 左ひじのx座標。

- 正式opcode: `posenet2scratch_getLeftElbowX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftElbowX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftElbowY`

意味: 左ひじのy座標。

- 正式opcode: `posenet2scratch_getLeftElbowY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftElbowY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftEyeX`

意味: 左目のx座標。

- 正式opcode: `posenet2scratch_getLeftEyeX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftEyeX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftEyeY`

意味: 左目のy座標。

- 正式opcode: `posenet2scratch_getLeftEyeY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftEyeY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftHipX`

意味: 左腰のx座標。

- 正式opcode: `posenet2scratch_getLeftHipX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftHipX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftHipY`

意味: 左腰のy座標。

- 正式opcode: `posenet2scratch_getLeftHipY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftHipY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftKneeX`

意味: 左ひざのx座標。

- 正式opcode: `posenet2scratch_getLeftKneeX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftKneeX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftKneeY`

意味: 左ひざのy座標。

- 正式opcode: `posenet2scratch_getLeftKneeY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftKneeY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftShoulderX`

意味: 左肩のx座標。

- 正式opcode: `posenet2scratch_getLeftShoulderX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftShoulderX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftShoulderY`

意味: 左肩のy座標。

- 正式opcode: `posenet2scratch_getLeftShoulderY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftShoulderY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftWristX`

意味: 左手首のx座標。

- 正式opcode: `posenet2scratch_getLeftWristX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftWristX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getLeftWristY`

意味: 左手首のy座標。

- 正式opcode: `posenet2scratch_getLeftWristY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getLeftWristY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getNoseX`

意味: 鼻のx座標。

- 正式opcode: `posenet2scratch_getNoseX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getNoseX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getNoseY`

意味: 鼻のy座標。

- 正式opcode: `posenet2scratch_getNoseY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getNoseY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getPeopleCount`

意味: 人数。

- 正式opcode: `posenet2scratch_getPeopleCount`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getPeopleCount"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightAnkleX`

意味: 右足首のx座標。

- 正式opcode: `posenet2scratch_getRightAnkleX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightAnkleX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightAnkleY`

意味: 右足首のy座標。

- 正式opcode: `posenet2scratch_getRightAnkleY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightAnkleY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightEarX`

意味: 右耳のx座標。

- 正式opcode: `posenet2scratch_getRightEarX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightEarX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightEarY`

意味: 右耳のy座標。

- 正式opcode: `posenet2scratch_getRightEarY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightEarY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightElbowX`

意味: 右ひじのx座標。

- 正式opcode: `posenet2scratch_getRightElbowX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightElbowX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightElbowY`

意味: 右ひじのy座標。

- 正式opcode: `posenet2scratch_getRightElbowY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightElbowY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightEyeX`

意味: 右目のx座標。

- 正式opcode: `posenet2scratch_getRightEyeX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightEyeX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightEyeY`

意味: 右目のy座標。

- 正式opcode: `posenet2scratch_getRightEyeY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightEyeY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightHipX`

意味: 右腰のx座標。

- 正式opcode: `posenet2scratch_getRightHipX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightHipX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightHipY`

意味: 右腰のy座標。

- 正式opcode: `posenet2scratch_getRightHipY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightHipY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightKneeX`

意味: 右ひざのx座標。

- 正式opcode: `posenet2scratch_getRightKneeX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightKneeX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightKneeY`

意味: 右ひざのy座標。

- 正式opcode: `posenet2scratch_getRightKneeY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightKneeY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightShoulderX`

意味: 右肩のx座標。

- 正式opcode: `posenet2scratch_getRightShoulderX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightShoulderX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightShoulderY`

意味: 右肩のy座標。

- 正式opcode: `posenet2scratch_getRightShoulderY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightShoulderY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightWristX`

意味: 右手首のx座標。

- 正式opcode: `posenet2scratch_getRightWristX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightWristX"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getRightWristY`

意味: 右手首のy座標。

- 正式opcode: `posenet2scratch_getRightWristY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getRightWristY"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getX`

意味: ? 人目の ? のx座標。

- 正式opcode: `posenet2scratch_getX`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getX"]({"PERSON_NUMBER":"1","PART":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PERSON_NUMBER | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`posenet2scratch_menu_personNumbers`、fields=`{"personNumbers":"1"}`。getInfo宣言既定=`"1"` | shadowメニュー保存値: `{"personNumbers":["1","2","3","4","5","6","7","8","9","10"]}` |
| PART | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`posenet2scratch_menu_parts`、fields=`{"parts":"0"}`。getInfo宣言既定=`"0"` | shadowメニュー保存値: `{"parts":["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_getY`

意味: ? 人目の ? のy座標。

- 正式opcode: `posenet2scratch_getY`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_getY"]({"PERSON_NUMBER":"1","PART":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| PERSON_NUMBER | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`posenet2scratch_menu_personNumbers`、fields=`{"personNumbers":"1"}`。getInfo宣言既定=`"1"` | shadowメニュー保存値: `{"personNumbers":["1","2","3","4","5","6","7","8","9","10"]}` |
| PART | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`posenet2scratch_menu_parts`、fields=`{"parts":"0"}`。getInfo宣言既定=`"0"` | shadowメニュー保存値: `{"parts":["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_menu_parts`

意味: 選択肢を持つ補助レポーター。表示名: 鼻。

- 正式opcode: `posenet2scratch_menu_parts`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_menu_parts"]({"parts":"0"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| parts | フィールド／文字列 | `"0"` | `["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_menu_personNumbers`

意味: 選択肢を持つ補助レポーター。表示名: 1。

- 正式opcode: `posenet2scratch_menu_personNumbers`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_menu_personNumbers"]({"personNumbers":"1"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| personNumbers | フィールド／文字列 | `"1"` | `["1","2","3","4","5","6","7","8","9","10"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_menu_videoMenu`

意味: 選択肢を持つ補助レポーター。表示名: 切。

- 正式opcode: `posenet2scratch_menu_videoMenu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["posenet2scratch_menu_videoMenu"]({"videoMenu":"off"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| videoMenu | フィールド／文字列 | `"off"` | `["off","on","on-flipped"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_setVideoTransparency`

意味: ビデオの透明度を ? にする。

- 正式opcode: `posenet2scratch_setVideoTransparency`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["posenet2scratch_setVideoTransparency"]({"TRANSPARENCY":"50"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| TRANSPARENCY | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"50"}`。getInfo宣言既定=`50` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `posenet2scratch_videoToggle`

意味: ビデオを 切 にする。

- 正式opcode: `posenet2scratch_videoToggle`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: PoseNet2Scratch（ID `posenet2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["posenet2scratch_videoToggle"]({"VIDEO_STATE":"off"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VIDEO_STATE | フィールド／文字列 | `"off"` | `["off","on","on-flipped"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## Speech2Scratch（2定義）

- `speech2scratch_getSpeech` — 音声
- `speech2scratch_startRecognition` — 音声認識開始

### `speech2scratch_getSpeech`

意味: 音声。

- 正式opcode: `speech2scratch_getSpeech`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: Speech2Scratch（ID `speech2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["speech2scratch_getSpeech"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/speech2scratch-b6d0f4ed9d349d620c0ccba74acf75e90505d09b/scratch-vm/src/extensions/scratch3_speech2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `speech2scratch_startRecognition`

意味: 音声認識開始。

- 正式opcode: `speech2scratch_startRecognition`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: Speech2Scratch（ID `speech2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["speech2scratch_startRecognition"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/speech2scratch-b6d0f4ed9d349d620c0ccba74acf75e90505d09b/scratch-vm/src/extensions/scratch3_speech2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

## TM2Scratch（27定義）

- `tm2scratch_classifyVideoImageBlock` — 画像を分類する
- `tm2scratch_getConfidenceThreshold` — 確度のしきい値
- `tm2scratch_getImageLabel` — 画像ラベル
- `tm2scratch_getSoundLabel` — 音声ラベル
- `tm2scratch_imageLabelConfidence` — 画像ラベル ? の確度
- `tm2scratch_isImageLabelDetected` — ? の画像が見つかった
- `tm2scratch_isSoundLabelDetected` — ? の音声が聞こえた
- `tm2scratch_menu_classification_interval_menu` — 選択肢を持つ補助レポーター。表示名: 1
- `tm2scratch_menu_classification_menu` — 選択肢を持つ補助レポーター。表示名: 切
- `tm2scratch_menu_image_labels_menu` — 選択肢を持つ補助レポーター。表示名: どれか
- `tm2scratch_menu_image_labels_without_any_menu` — 選択肢を持つ補助レポーター。表示名: ?
- `tm2scratch_menu_mediadevices` — 選択肢を持つ補助レポーター。表示名: ?
- `tm2scratch_menu_received_menu` — 選択肢を持つ補助レポーター。表示名: のどれか
- `tm2scratch_menu_received_sound_label_menu` — 選択肢を持つ補助レポーター。表示名: のどれか
- `tm2scratch_menu_sound_labels_menu` — 選択肢を持つ補助レポーター。表示名: どれか
- `tm2scratch_menu_sound_labels_without_any_menu` — 選択肢を持つ補助レポーター。表示名: ?
- `tm2scratch_menu_video_menu` — 選択肢を持つ補助レポーター。表示名: 切
- `tm2scratch_setClassificationInterval` — ラベル付けを ? 秒間に1回行う
- `tm2scratch_setConfidenceThreshold` — 確度のしきい値を ? にする
- `tm2scratch_setImageClassificationModelURL` — 画像分類モデルURL ?
- `tm2scratch_setSoundClassificationModelURL` — 音声分類モデルURL ?
- `tm2scratch_soundLabelConfidence` — 音声ラベル ? の確度
- `tm2scratch_switchCamera` — カメラを ? に切り替える
- `tm2scratch_toggleClassification` — ラベル付けを 切 にする
- `tm2scratch_videoToggle` — ビデオを 切 にする
- `tm2scratch_whenReceived` — 画像ラベル ? を受け取ったとき
- `tm2scratch_whenReceivedSoundLabel` — 音声ラベル ? を受け取ったとき

### `tm2scratch_classifyVideoImageBlock`

意味: 画像を分類する。

- 正式opcode: `tm2scratch_classifyVideoImageBlock`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["tm2scratch_classifyVideoImageBlock"]({});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_getConfidenceThreshold`

意味: 確度のしきい値。

- 正式opcode: `tm2scratch_getConfidenceThreshold`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_getConfidenceThreshold"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_getImageLabel`

意味: 画像ラベル。

- 正式opcode: `tm2scratch_getImageLabel`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_getImageLabel"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `tm2scratch_getSoundLabel`

意味: 音声ラベル。

- 正式opcode: `tm2scratch_getSoundLabel`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_getSoundLabel"]({})});});
```

引数なし。必ず空の第1引数 `{}` を書く。

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_imageLabelConfidence`

意味: 画像ラベル ? の確度。

- 正式opcode: `tm2scratch_imageLabelConfidence`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_imageLabelConfidence"]({"LABEL":scratch["tm2scratch_menu_image_labels_without_any_menu"]({"image_labels_without_any_menu":""})})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`tm2scratch_menu_image_labels_without_any_menu`、fields=`{}`。getInfo宣言既定=`""`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"image_labels_without_any_menu":""} | shadowメニュー保存値: `{"image_labels_without_any_menu":[""]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_isImageLabelDetected`

意味: ? の画像が見つかった。

- 正式opcode: `tm2scratch_isImageLabelDetected`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_isImageLabelDetected"]({"LABEL":"どれか"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`tm2scratch_menu_image_labels_menu`、fields=`{"image_labels_menu":"どれか"}`。getInfo宣言既定=`"どれか"` | shadowメニュー保存値: `{"image_labels_menu":["どれか"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_isSoundLabelDetected`

意味: ? の音声が聞こえた。

- 正式opcode: `tm2scratch_isSoundLabelDetected`
- 種類: 条件（Boolean）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_isSoundLabelDetected"]({"LABEL":"どれか"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`tm2scratch_menu_sound_labels_menu`、fields=`{"sound_labels_menu":"どれか"}`。getInfo宣言既定=`"どれか"` | shadowメニュー保存値: `{"sound_labels_menu":["どれか"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_menu_classification_interval_menu`

意味: 選択肢を持つ補助レポーター。表示名: 1。

- 正式opcode: `tm2scratch_menu_classification_interval_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_menu_classification_interval_menu"]({"classification_interval_menu":"1"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| classification_interval_menu | フィールド／文字列 | `"1"` | `["1","0.5","0.2","0.1"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_menu_classification_menu`

意味: 選択肢を持つ補助レポーター。表示名: 切。

- 正式opcode: `tm2scratch_menu_classification_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_menu_classification_menu"]({"classification_menu":"off"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| classification_menu | フィールド／文字列 | `"off"` | `["off","on"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_menu_image_labels_menu`

意味: 選択肢を持つ補助レポーター。表示名: どれか。

- 正式opcode: `tm2scratch_menu_image_labels_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_menu_image_labels_menu"]({"image_labels_menu":"どれか"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| image_labels_menu | フィールド／文字列 | `"どれか"` | `["どれか"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_menu_image_labels_without_any_menu`

意味: 選択肢を持つ補助レポーター。表示名: ?。

- 正式opcode: `tm2scratch_menu_image_labels_without_any_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_menu_image_labels_without_any_menu"]({"image_labels_without_any_menu":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| image_labels_without_any_menu | フィールド／文字列 | `""` | `[""]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_menu_mediadevices`

意味: 選択肢を持つ補助レポーター。表示名: ?。

- 正式opcode: `tm2scratch_menu_mediadevices`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_menu_mediadevices"]({"mediadevices":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| mediadevices | フィールド／文字列 | `""` | `[""]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_menu_received_menu`

意味: 選択肢を持つ補助レポーター。表示名: のどれか。

- 正式opcode: `tm2scratch_menu_received_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_menu_received_menu"]({"received_menu":"のどれか"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| received_menu | フィールド／文字列 | `"のどれか"` | `["のどれか"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_menu_received_sound_label_menu`

意味: 選択肢を持つ補助レポーター。表示名: のどれか。

- 正式opcode: `tm2scratch_menu_received_sound_label_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_menu_received_sound_label_menu"]({"received_sound_label_menu":"のどれか"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| received_sound_label_menu | フィールド／文字列 | `"のどれか"` | `["のどれか"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_menu_sound_labels_menu`

意味: 選択肢を持つ補助レポーター。表示名: どれか。

- 正式opcode: `tm2scratch_menu_sound_labels_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_menu_sound_labels_menu"]({"sound_labels_menu":"どれか"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| sound_labels_menu | フィールド／文字列 | `"どれか"` | `["どれか"]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_menu_sound_labels_without_any_menu`

意味: 選択肢を持つ補助レポーター。表示名: ?。

- 正式opcode: `tm2scratch_menu_sound_labels_without_any_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_menu_sound_labels_without_any_menu"]({"sound_labels_without_any_menu":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| sound_labels_without_any_menu | フィールド／文字列 | `""` | `[""]`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_menu_video_menu`

意味: 選択肢を持つ補助レポーター。表示名: 切。

- 正式opcode: `tm2scratch_menu_video_menu`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `INPUT_HELPER_ONLY`。
- 新規生成の扱い: 補助・内部108件のうち入力補助。親入力shadow・既存実コードに対応根拠がある入力内だけで使用し、単独命令にしない。対応先不明は確認する。
- 実行登録: VM primitive/hatなし。補助入力としての使用、または内部定義。単独の実用命令とは扱わない。
- 監査用の変換例（新規生成の許可ではなく、授業用完成コードではない）: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_menu_video_menu"]({"video_menu":"off"})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| video_menu | フィールド／文字列 | `"off"` | `["off","on","on-flipped"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 値は入力内へネストして利用する。 変換器が受理しても、単独で実行する命令の裏付けにはならない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_setClassificationInterval`

意味: ラベル付けを ? 秒間に1回行う。

- 正式opcode: `tm2scratch_setClassificationInterval`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["tm2scratch_setClassificationInterval"]({"CLASSIFICATION_INTERVAL":"1"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CLASSIFICATION_INTERVAL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`tm2scratch_menu_classification_interval_menu`、fields=`{"classification_interval_menu":"1"}`。getInfo宣言既定=`"1"` | shadowメニュー保存値: `{"classification_interval_menu":["1","0.5","0.2","0.1"]}` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_setConfidenceThreshold`

意味: 確度のしきい値を ? にする。

- 正式opcode: `tm2scratch_setConfidenceThreshold`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["tm2scratch_setConfidenceThreshold"]({"CONFIDENCE_THRESHOLD":"0.5"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CONFIDENCE_THRESHOLD | 値接続 checks=`null`／実接続check_=`null`／宣言型 `number` | shadow=`math_number`、fields=`{"NUM":"0.5"}`。getInfo宣言既定=`0.5` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_setImageClassificationModelURL`

意味: 画像分類モデルURL ?。

- 正式opcode: `tm2scratch_setImageClassificationModelURL`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["tm2scratch_setImageClassificationModelURL"]({"URL":"https://teachablemachine.withgoogle.com/models/0rX_3hoH/"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| URL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text`、fields=`{"TEXT":"https://teachablemachine.withgoogle.com/models/0rX_3hoH/"}`。getInfo宣言既定=`"https://teachablemachine.withgoogle.com/models/0rX_3hoH/"` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `tm2scratch_setSoundClassificationModelURL`

意味: 音声分類モデルURL ?。

- 正式opcode: `tm2scratch_setSoundClassificationModelURL`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["tm2scratch_setSoundClassificationModelURL"]({"URL":"https://teachablemachine.withgoogle.com/models/xP0spGSB/"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| URL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`text`、fields=`{"TEXT":"https://teachablemachine.withgoogle.com/models/xP0spGSB/"}`。getInfo宣言既定=`"https://teachablemachine.withgoogle.com/models/xP0spGSB/"` | ネストした `scratch.OPCODE({...})` または静的リテラル |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_soundLabelConfidence`

意味: 音声ラベル ? の確度。

- 正式opcode: `tm2scratch_soundLabelConfidence`
- 種類: 値（レポーター）。出力接続チェック: `null`。前接続: `false`／次接続: `false`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch.looks_say({MESSAGE:scratch["tm2scratch_soundLabelConfidence"]({"LABEL":scratch["tm2scratch_menu_sound_labels_without_any_menu"]({"sound_labels_without_any_menu":""})})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`tm2scratch_menu_sound_labels_without_any_menu`、fields=`{}`。getInfo宣言既定=`""`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"sound_labels_without_any_menu":""} | shadowメニュー保存値: `{"sound_labels_without_any_menu":[""]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 値は入力内へネストして利用する。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_switchCamera`

意味: カメラを ? に切り替える。

- 正式opcode: `tm2scratch_switchCamera`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["tm2scratch_switchCamera"]({"DEVICE":scratch["tm2scratch_menu_mediadevices"]({"mediadevices":""})});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| DEVICE | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`tm2scratch_menu_mediadevices`、fields=`{}`。getInfo宣言既定=`""`。toolboxのshadowにfield値がないため、原則この補助ブロックの呼び出しを明示的にネストする。補助ブロックのフィールド初期値={"mediadevices":""} | shadowメニュー保存値: `{"mediadevices":[""]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_toggleClassification`

意味: ラベル付けを 切 にする。

- 正式opcode: `tm2scratch_toggleClassification`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["tm2scratch_toggleClassification"]({"CLASSIFICATION_STATE":"off"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| CLASSIFICATION_STATE | フィールド／文字列 | `"off"` | `["off","on"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。GUI反映・GUI往復は07のサンプルに含まれる指定範囲で成功。実機・モデル推論は未検証。

### `tm2scratch_videoToggle`

意味: ビデオを 切 にする。

- 正式opcode: `tm2scratch_videoToggle`
- 種類: 命令（stack）。出力接続チェック: `null`。前接続: `true`／次接続: `true`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["tm2scratch_videoToggle"]({"VIDEO_STATE":"off"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| VIDEO_STATE | フィールド／文字列 | `"off"` | `["off","on","on-flipped"]` |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_whenReceived`

意味: 画像ラベル ? を受け取ったとき。

- 正式opcode: `tm2scratch_whenReceived`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["tm2scratch_whenReceived"]({"LABEL":"のどれか"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`tm2scratch_menu_received_menu`、fields=`{"received_menu":"のどれか"}`。getInfo宣言既定=`"のどれか"` | shadowメニュー保存値: `{"received_menu":["のどれか"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

### `tm2scratch_whenReceivedSoundLabel`

意味: 音声ラベル ? を受け取ったとき。

- 正式opcode: `tm2scratch_whenReceivedSoundLabel`
- 種類: イベント（hat）。出力接続チェック: `null`。前接続: `false`／次接続: `true`。
- 必要な拡張: TM2Scratch（ID `tm2scratch`、使用前にロード）。
- 用途区分: `RUNTIME_CANDIDATE`。
- 新規生成の扱い: 348実行候補の一部。定義された種類・入力・初期化条件を満たす範囲で生成する。実機成功保証ではない。
- 実行登録: VM primitive/hatあり。実行結果は未検証。
- 正式記法・変換確認例: 次のコード全体を専用Scriptとして変換検証。

```javascript
scratch.script({x:30,y:30},()=>{scratch["tm2scratch_whenReceivedSoundLabel"]({"LABEL":"のどれか"});});
```

| 引数名 | 指定位置・型 | 初期値／指定方法 | メニュー保存値・制約 |
|---|---|---|---|
| LABEL | 値接続 checks=`null`／実接続check_=`null`／宣言型 `string` | shadow=`tm2scratch_menu_received_sound_label_menu`、fields=`{"received_sound_label_menu":"のどれか"}`。getInfo宣言既定=`"のどれか"` | shadowメニュー保存値: `{"received_sound_label_menu":["のどれか"]}`（動的・取得時点） |

注意: フィールドにレポーター式は不可。未知の入力名を追加しない。 SUBSTACK以外の値入力は省略不可。 本書冒頭の初期化・モデル・ラベルの制約を参照。

出典: `stretch3-base/tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e/scratch-vm/src/extensions/scratch3_tm2scratch/index.js`。変換・検証根拠: `native-scratch/bridge.js`、`native-scratch/main.js` のschema/validateConnections。

検証状況: ソース定義確認済み／独立ハーネスの変換・接続・メニュー検証成功／グラフ往復一致。このopcodeのGUI反映・GUI往復は未検証。実機・モデル推論は未検証。

