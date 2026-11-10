# TM2Scratch調査・修正報告（2026-11-10）

対象コミット: `2fd23371de714f8e58604ff70d8f03702de0a9fe`

## 結論と完了範囲

Scriptの動的メニュー検証の不具合を再現し、修正した。画像分類の「カメラに何を映しても反応しない」という現象は、このLinux Chromium環境では再現できていない。したがって依頼全体の完了条件は未達であり、Chromebookの画像分類不具合まで解決したとは判断しない。公開サイトへの反映・GitHubへのpushは実施していない。

## 確認できた原因

`native-scratch/main.js` の `schema()` は、opcodeとmutationだけをキーにして、フィールドのメニュー候補までキャッシュしていた。Teachable Machineのモデル読込後に `imageMetadata.labels` が変化しても、TM2Scratchは `BLOCKSINFO_UPDATE` を発行しない。このため `validateConnections()` が読込前の候補で `received_menu` を検証し、有効なCat1等を拒否する。

新しいブラウザーテストを修正前コードでも実行し、モデル読込後の「有効な5ラベルを反映可能」というアサーションがメニューエラーで失敗することを確認した。修正後は同じテストが通る。

保存作品のラベルは外部モデルのメタデータより先に復元される。候補の再取得だけでは、モデル未読込時の既存ラベルを往復変換で拒否するため、同じID・opcode・フィールド値を持つ既存の動的メニュー値に限って保存値を保持する。新規・変更された候補外の値は拒否する。

## 画像分類の調査結果（メニューとは別問題）

組込元は `champierre/tm2scratch` の `d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e`。Block2Scriptはprepare処理で上流のリモートml5スクリプトを削除し、ローカルの固定版 `ml5 0.12.2` をrequireしている。カメラ取得のPromiseには警告処理も追加されている。画像モデルの読込、分類、ラベル取得、hat判定の本体は上流のまま。

指定URLのモデル・メタデータ・実際の重みを取得した。メタデータのラベルは `Cat1, Cat2, Dog1, Dog2, none`、モデル更新時刻は `2026-11-10T06:59:54.937Z`。取得した元データを変更せずブラウザーへ配信し、固定版ml5でCanvasと動画の両方から推論した。黒い画像について `none`（約0.893）を得た。

さらに組み立てたBlock2Scriptのiframe内で、実際のTM2Scratchの連続分類 → `getImageLabel()` → Scratch VMの `tm2scratch_whenReceived` → 接続した「received:noneと言う」まで成功した。保存・新しいページでの再読込後も、緑の旗からURLブロックを実行して再推論できた。

Cat1は分類器の出力だけをモックにし、実際の拡張ソースの結果反映とScratch VMのhatに接続した「received:Cat1と言う」が動作することを確認した。実際のCat1の対象画像は提供されていないため、Cat1を実画像から認識する検証とは区別する。

上流では `this.video` に別途取得したカメラストリームを渡す一方、ステージ表示は `runtime.ioDevices.video` を使う。つまりプレビュー表示だけでは推論用の動画の準備完了を証明できない。Chromebook固有の複数ストリーム・動画準備・権限や実行時例外は残る調査候補であり、今回そのどれかが原因だと確認したわけではない。モデルやml5のせいと断定する根拠もないため、推論本体への推測に基づく変更はしていない。

## 変更ファイル

- `native-scratch/main.js`: 関数で生成されるメニューを識別してschemaキャッシュの対象外にした。現在の候補で検証し、既存の未変更の動的ラベルだけ保存・復元時に保持する。静的メニューの検証は維持。
- `stretch3-base/tm2-recognition.test.mjs`: 実モデル・合成カメラ・VMイベント実行、5ラベルの往復変換、読込前後の候補検証、不正値拒否、sb3再読込・URL保存・再推論、モックCat1イベントを追加。
- `tests/tm2-runtime.test.mjs`: prepareで生成した本物の拡張ソースを使い、分類器境界をモックにして5ラベルの取得・hat判定・リセットを確認。
- `docs/tm2-investigation.md`: 本報告。

モデルURLはテスト用入力にのみ指定し、製品コードには固定していない。Microbit More、ML2Scratch、PoseNet2Scratchと共有するml5や拡張ソースには変更していない。

## 再実行方法

通常の上流取得・依存関係インストール・エディタービルドを終え、`npm run dev` で起動した環境で実施する。

```sh
npm test
node tests/tm2-runtime.test.mjs
BLOCK2SCRIPT_BROWSER=/usr/bin/chromium node stretch3-base/tm2-recognition.test.mjs
```

新規ブラウザーテストはcurlで公開モデルを取得し、一時ディレクトリの元データをPlaywrightのルート経由で配信する。外部モデル取得に失敗した場合はテスト失敗になる。カメラはCanvasのcaptureStreamに置き換えるが、分類器とTensorFlowによる推論は実物。`TM2_MODEL_DIR` で事前取得した `model.json, metadata.json, model.weights.bin` を指定できる。`BLOCK2SCRIPT_TEST_URL` で試験対象URLを変更できる。5つの指定ラベル・黒画像のnoneというアサーションを持つため、モデルの学習内容を変更するとテストの期待値も再評価が必要。

## Chromebookでの実機確認手順

1. 修正をビルドしたサイトを開く。カメラを使用する他のタブを閉じ、Chromeでサイトのカメラ権限を許可する。TM2ScratchとMicrobit Moreを追加する。
2. 緑の旗 → 指定の「画像分類モデルURL」ブロック、ビデオ入、ラベル付け入を配置する。画像ラベルのレポーターと各ラベルの確度を表示する。モデル取得の完了を待つ。
3. Cat1/Cat2/Dog1/Dog2の学習対象とnoneになる背景を順番に映し、画像ラベル・確度が変わることを確認する。既定の確度しきい値は0.5。値がそれ未満ならイベントの条件を満たしていない可能性を区別する。
4. 「画像ラベルCat1を受け取ったとき → Cat1と言う」を置いて確認する。その後、同じイベントにMicrobit MoreのLED表示を接続する。まずScratch内のイベント実行と実機通信を切り分ける。
5. モデル読込後、各5ラベルのイベントをBlocks → Script → Blocksへ往復し、エラーやラベルの欠落がないことを確認する。候補にない新しいラベルは検証エラーになることも確認する。
6. URLブロックとイベントを含む作品をsb3保存する。新しいタブで再読込し、モデル読込前にも保存済みラベルを往復できることを確認する。緑の旗を押して外部モデルを再読込し、認識・イベント・LED表示を再確認する。sb3は外部モデル本体や取得済みメタデータを保存しない。
7. 無反応が残る場合は、Chromeのコンソールを開いた状態で拡張追加からモデル読込まで再実行する。警告・例外、モデルのmetadata/model/重みの通信成功、プレビュー、画像ラベル、確度、イベント内の発言のどの段階で止まるかを記録する。機種・Chrome版・カメラ種類・再読込前後の差も記録する。

実カメラ、Chromebook/Chrome OS、学校ネットワーク、Microbit Moreによる実機LED、Cat1等の実際の学習対象による分類精度、TM音声分類とPoseNetの実推論は未検証。

## 実施結果一覧

|試験|結果・範囲|
|---|---|
|`npm test`|19件成功（bridge、correspondence、loader、safety、recovery、lesson-tools、extension-registry）|
|`tests/tm2-runtime.test.mjs`|成功。5ラベルのモック結果、Cat1等のhat判定、分類リセット|
|`stretch3-base/tm2-recognition.test.mjs`|成功。実モデル推論、合成動画、noneのVMイベント本体、モックCat1のVMイベント本体、5ラベル往復、候補外値拒否、sb3保存・新規ページ読込・再推論|
|同テスト＋修正前main.js|モデル読込後の反映可能チェックでメニューエラーを再現（失敗が期待される比較試験）|
|`standard-extensions.test.mjs`|成功|
|`chromebook-priority-a.test.mjs`|成功。Video Sensing、ML2Scratch、TM2Scratchの動画フレームとオン/オフ/オン、翻訳プロキシ|
|`tm2.test.mjs`|成功。ただしこの既存テスト自体の画像・音声認識はUNTESTEDのまま。新規テストと混同しない|
|`correspondence.test.mjs` / `lesson-tools.test.mjs`|成功|
|`student.test.mjs`|再実行で成功。初回は対象切替後350msのpreview無効化判定で失敗。修正前コードでは成功し、修正後の再試験でも成功した。タイミングの不安定さは残る|
|`robot.test.mjs`|失敗。作品・衣装の検証後、`Failed to fetch`というpageerrorで失敗。修正前でも同じ失敗を確認|
|`recovery.test.mjs`|失敗。復旧・保持数等の検証後、`Failed to fetch`というpageerrorで失敗。外部アセット通信の制約があり、エラーなしという全条件は満たせない|
|`speech-camera.test.mjs` / `labels.test.mjs`|失敗。公開用ビルドに含まないCamera SelectorのUIを待ってタイムアウト|
|`brand.test.mjs`|失敗。既定の5175の公開用サーバーが未起動。5173の開発試験とは別構成|
|`pages-smoke.test.mjs`|未実施。公開パスの配信・デプロイ検証は本作業の完了項目に含めていない|
|公開構成エディターのwebpackビルド|成功（エラー0、既存の警告2）。Camera Selector取得元が通常セットアップのlock一覧にないため公開構成を使用。試験用コピーではアセットのbaseを開発サーバー向けに変更した。製品コードのURL設定には変更なし|
|`git diff --check`|成功|

以上から「すべての既存テストが成功した」という完了条件も満たしていない。画像分類不具合の実機原因特定・修正、学校端末での検証、および上記の環境依存／不安定な試験の解消を残課題とする。
