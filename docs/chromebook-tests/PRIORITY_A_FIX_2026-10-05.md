# Chromebook Priority A 修正（2026-10-05）

## 実機テスト結果と修正の範囲

利用者の同一Chromebook比較では、公式Stretch3のカメラ・翻訳は成功し、Block2Scriptでは失敗。マイク・音声認識・合成音声・micro:bit Moreは成功。今回はカメラ・翻訳の差分だけを修正した。UI整理や教育用新機能は追加していない。

## 原因と公式との差分

**カメラ:** `stretch3-base/prepare.mjs` が生成するVM接続ブリッジは、`runtime.ioDevices.video.enableVideo` を未解決Promiseに置き換えていた。独自の「カメラを開始」を押さない限り、Scratch本来のビデオ入ブロックもML2Scratchのコンストラクターも待機し続け、GUIのVideoProvider、getUserMedia、rendererの映像初期化へ到達しなかった。TM2Scratchの独自映像取得もこの待機処理に追加で接続されていた。公式の固定ソースにはこの待機処理はない。

VMのenableVideo差し替えを撤去し、Scratch本来のVideoProvider・ブラウザーの権限要求・rendererへの接続を利用する。TM2ScratchのgetUserMediaは固定した公式拡張の起動順序に戻した。バンドル済みml5とエラー記録は維持。独自開始ボタンも同じnative enableVideoを呼ぶ補助操作として使える。

これによりカメラ拡張の追加や、その拡張を含む.sb3の読込時にも、公式と同様に権限要求が出る場合がある。Chromebookでは許可して確認する。

**翻訳:** 固定ソース `29217c1957f88d69c440d381c84d6695dee9cfc9` の公式デプロイは、Scratch翻訳APIのドメインを `scratch-translate-proxy.junya-119.workers.dev` に置き換えていた。Block2Scriptのビルドではこの処理を再現していなかった。公式の説明ではScratch APIのCORS許可がScratch originに限定されたためプロキシを使用している。翻訳拡張はfetch失敗を空文字として返すため、利用者には結果が表示されない。

- [公式の固定デプロイ処理](https://github.com/stretch3/stretch3.github.io/blob/29217c1957f88d69c440d381c84d6695dee9cfc9/.github/workflows/deploy.yml)
- [公式のCORS説明](https://github.com/stretch3/stretch3.github.io/blob/29217c1957f88d69c440d381c84d6695dee9cfc9/cloudflare-workers-translate-proxy.md)

prepare時に翻訳ソースの接続先を公式プロキシへ変更し、ローカル・Pages両方のビルドに反映する。翻訳レポーター・エンコード・キャッシュ処理は上流実装のまま。拡張の通信説明も更新した。プロキシは公式Stretch3が運営する外部サービスであり、学校からの通信と継続稼働は実機で確認する。

## 変更したファイル

- `stretch3-base/prepare.mjs`: カメラ待機処理を撤去、TM2Scratchの起動順序を復元、翻訳プロキシを適用。
- `native-scratch/main.js`: 修正後のカメラ起動タイミングに説明文を合わせた。
- `native-scratch/extension-policies.json`: 翻訳通信先を更新。
- `stretch3-base/chromebook-priority-a.test.mjs`: 出荷エディターのiframe・VM・映像・翻訳の回帰テスト。
- `stretch3-base/speech-camera.test.mjs`: カメラ選択だけで起動できる期待値に更新。
- `package.json`: `test:chromebook-priority-a` コマンドを追加。
- この報告書。

## 検証

- `npm test`: 18件成功。Script往復・拡張登録・安全な反映・復旧など。
- `npm run build:stretch3`, `npm run build`, `npm run build:pages`: 成功。バンドル容量とBrowserslist更新の警告は残る。
- 変更ソースの構文/lint検査と翻訳拡張の上流eslint検査。
- 標準拡張のブラウザーテスト: Script変換、.sb3保存、新規ページ再読込、拡張自動登録に成功。
- Speech2Scratch/Camera Selectorのブラウザーテスト: 模擬音声認識、カメラ選択による起動、.sb3再読込、Script往復に成功。
- Priority Aブラウザーテスト: videoSensing・ML2Scratch・TM2Scratchで独自開始ボタンなしのビデオ入/切/入、非空フレームとrenderer previewを確認。TM2Scratch独自の分類用videoにもフレームが届く。翻訳の公式プロキシ向けURL、入力エンコード、返却結果、キャッシュを模擬応答で確認。
- ローカルoriginから実翻訳通信を比較: 元のScratch APIは `Failed to fetch`、公式プロキシはHTTP 200で `こんにちは` を返した。

カメラの自動検証はCanvas由来の模擬MediaStreamを使用。物理Chromebookの撮影、ML2Scratch学習・推論、TM/PoseNetのモデル読込・推論、Bluetooth実機、実マイク・合成音声の再実行はこの開発環境では未検証。これらの成功を自動テスト結果から断定しない。

## Chromebook再テスト

配布成果物は `pages-dist/`。GitHub Pagesへ反映してから、更新版を再読込して各作品を新規タブで試す。今回の作業では公開サイトへのpush/deployは行っていない。

1. テスト1: Tでhelloの日本語訳が表示される。Sの合成音声も確認。
2. テスト3: 独自の「カメラを開始」を押さず、カメラ許可と緑の旗/ビデオ入でステージ映像が出る。切/入も確認。物A/Bを学習し、分類ラベルが変わることを確認。
3. テスト4: カメラ起動後、TM画像モデルURLの読込、グー/チョキ/パー分類、PoseNetの人数・座標、TM音声モデルを個別に確認。モデル読込失敗とカメラ失敗を分けて記録。
4. テスト2: 音声認識とマイク音量。
5. テスト5: micro:bit More接続、LED、A/B、明るさ、傾き、Script同期。
6. テスト1・3・4の.sb3保存・新規タブ再読込とScript往復。

失敗時は作品番号、操作、カメラ許可表示、Console例外、Networkの翻訳/モデルURLとステータスを記録する。公式が同じ端末で動く比較条件を維持する。

回帰テスト再実行は `npm run dev` を起動し、別ターミナルで `npm run test:chromebook-priority-a`。配布ビルドの確認は `BLOCK2SCRIPT_TEST_URL` を配布プレビューのURLに設定する。
