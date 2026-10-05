# UI整理・双方向ハイライト（2026-10-05）

## 復旧基準と第2回実機結果

復旧基準は公開済みコミット `47d3238`。利用者のChromebook第2回検証では翻訳、カメラ映像、ML2Scratch学習と処理、TMモデル `https://teachablemachine.withgoogle.com/models/4aKnrRcIy/` のロード、PoseNetの人数・鼻位置が成功した。以前確認済みのmicro:bit More・マイク・音声認識・合成音声も回帰確認の対象とする。TMモデルロード成功と、そのモデルの推論結果検証は区別する。

## 削除したUIと残した操作

上部の独自「Stretch3 拡張」「.sb3 を開く」「.sb3 を保存」を削除。読込・保存は左のScratch「ファイル」メニュー、拡張追加は左下の標準拡張ボタンを使う。Scratchのファイル・拡張管理処理は変更していない。

コード反映を戻す・復旧・パネル切替・授業前診断・使い方は維持。拡張の通信・機器・保存範囲の説明は「使い方」へ移した。独自拡張ダイアログのカメラ開始・micro:bit接続補助操作も撤去し、各拡張本来のUIで操作する。カメラ起動ロジックやBluetooth接続の内部実装は変更していない。

## 対応情報の生成

`native-scratch/bridge.js` の `exportCodeWithMap(blocks, scripts, targetId)` が `{code, ranges}` を返す。コード文字列を組み立てる各段階で、VM由来のblock IDと相対オフセットを記録し、親のコードへ連結する際に位置を加算する。完成後に行番号も付与する。

各範囲は `targetId, blockId, startOffset, endOffset, startLine, endLine` を持つ。命令名や生成後の文字列を検索してIDを推測しない。従来の `exportCode()` は同じ文字列を返す互換APIとして残した。注釈・シャドー・変数・拡張・独自ブロックの既存情報も維持する。

## Scratch → Script

`native-scratch/correspondence.js` がScratch Blocksの既存workspace change listenerを使い、`ui` イベントの `selected` / `newValue` または `click` / `blockId` からblock IDを取得する。再生成後に既に選択中のブロックをもう一度クリックしても対応する。対応コードをCodeMirrorのStateField/Decorationで黄色く強調し、`EditorView.scrollIntoView` で画面内へ移動する。DOM監視や座標からのブロック推測は行わない。

## Script → Scratch

CodeMirrorの `EditorView.domEventHandlers` と `posAtCoords` を使ってクリックしたコード位置を取得し、対応情報から最小の包含範囲を選ぶ。`workspace.getBlockById()` でScratchブロックを取得し、`getSvgRoot()` に専用CSSクラスを付ける。ブロック本来の色を維持し、黄色の枠と小さなglowを加える。実行用glow APIやVMスクリプトの実行は使わない。

Scratchワークスペースの自動スクロールは初期版では追加していない。画面外のブロックにも対応は付くため、必要に応じてワークスペースをスクロールする。

## ネストと解除

親の条件・繰り返しには全体範囲、条件レポーター・内部の命令・表示されたリテラルシャドーにはそれぞれの範囲を付ける。同じコード位置で複数範囲が重なれば、小さい範囲を優先する。行のインデントをクリックした場合はその行の先頭範囲を補助的に使う。

古い対応はスプライト/プロジェクト変更、コード再生成、ブロック編集、別選択、未対応箇所の選択で解除する。編集対象のtarget ID、生成時のVMブロック内容、現在のコードが一致する場合だけハイライトする。未反映コードの編集中は無効とし、反映後にコードと対応情報を再生成する。別スプライトの同じ形のコードへ古い対応を使わない。

## 変更ファイル

- `native-scratch/bridge.js`: IDとコード範囲の同時生成。
- `native-scratch/correspondence.js`: 双方向イベント、Decoration、Scratch枠、対応検証・解除。
- `native-scratch/main.js`: 重複UI撤去、説明の移動、対応情報更新、CodeMirrorイベントの接続。
- `native-scratch/style.css`: コード側の控えめな強調表示。
- `native-scratch/build.mjs`: 新規モジュールを配布の対応ソースに含める。
- `tests/correspondence.test.js`: 同一命令、ネスト、範囲移動、削除、target分離の単体テスト。
- `tests/browser-native-ui.mjs`: Scratch標準の保存・読込・拡張UIとテスト用模擬映像。
- `stretch3-base/correspondence.test.mjs`: 双方向選択、解除、再生成、標準UI保存再読込・拡張追加のブラウザーテスト。
- `stretch3-base/{pages-smoke,standard-extensions,speech-camera,recovery,robot,student,tm2,lesson-tools}.test.mjs`: 削除した独自UIから標準UIへのテスト操作の移行。
- `package.json`, `.github/workflows/pages.yml`: テストコマンドと公開前のハイライト・Priority A回帰検証。
- この報告書。

## 既存機能と検証の範囲

`stretch3-base/prepare.mjs` と固定Stretch3/Scratch VM/各拡張の内部実装、カメラ、翻訳通信先、ML2Scratch、TM2Scratch、PoseNet2Scratch、micro:bit Moreは変更していない。アクティビティ図や新しい拡張も追加していない。

検証コマンド: `npm test`（20件）、変更ソースのeslintと構文検査、`npm run build:pages`、パネルのローカル/公開向けビルド、ハイライト・標準拡張・音声/カメラ選択・復旧・スプライト・生徒モード・TM拡張・授業前診断のブラウザーテスト。保存・再読込はScratch本来のメニューを操作する。Pagesのサブパスでもハイライト・既存カメラ/翻訳経路を確認する。

ヘッドレステストのカメラ・音声認識は模擬デバイス。機械学習の認識精度、物理Bluetooth、実マイク、合成音声の再実行はChromebookで確認する。バンドル容量/Browserslistの既存警告は残る。

## Chromebook再テスト手順

1. 更新版を再読込。上部の3ボタンが消え、左の「ファイル」と拡張追加ボタンが使えることを確認。
2. 同じ命令を2つ以上置き、順に選ぶ。それぞれ違うコード箇所が黄色くなり、コードをクリックすると対応したブロック1つだけに枠が付くことを確認。
3. 「もし」/繰り返し、条件内のセンサーレポーター、内部の命令を個別に選ぶ。親の全体範囲と子の範囲が区別されることを確認。
4. ブロックを追加・削除・編集し、コード位置が変わっても対応が正しいことを確認。スプライト・作品切替で旧ハイライトが消えることを確認。
5. Scriptを編集したらハイライトが消えること、検証・反映後に再び対応することを確認。「ファイル」で.sb3を保存し、新規タブへ読込後にも対応を確認。
6. テスト1の翻訳/合成音声、2の音声認識/音量、3の映像/ML学習、4のTMモデル読込とPoseNet人数/鼻位置、5のmicro:bit More接続/各センサー/Script同期を再確認。

開発時は `npm run dev` と別ターミナルの `npm run test:correspondence`。配布プレビューでは `BLOCK2SCRIPT_TEST_URL` に `/block2script/` を含むURLを指定する。
