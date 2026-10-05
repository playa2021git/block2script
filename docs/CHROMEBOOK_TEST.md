# Chromebook実機検証

端末／Chrome版：＿＿　日付：＿＿　commit：＿＿

結果：PASS / FAIL / UNTESTED。Camera Selectorは対象外と備考へ記載。再読込・再起動前に作品をファイル保存してください。

| 項目 | 結果 | 手順・備考 |
|---|---|---|
| GitHub Pagesを開ける | UNTESTED | |
| 初期画面 | UNTESTED | |
| Block2Bot | UNTESTED | |
| ブロック操作 | UNTESTED | |
| Blocks → Script | UNTESTED | |
| Script検証 | UNTESTED | |
| Script → Blocks反映 | UNTESTED | |
| 実行 | UNTESTED | |
| Undo | UNTESTED | |
| .sb3保存 | UNTESTED | |
| .sb3再読込 | UNTESTED | |
| .b2s保存 | UNTESTED | |
| IndexedDB自動保存 | UNTESTED | |
| 復旧 | UNTESTED | |
| 音 | UNTESTED | |
| ペン | UNTESTED | |
| 音楽 | UNTESTED | |
| 音声合成 | UNTESTED | |
| 翻訳 | UNTESTED | |
| カメラ | UNTESTED | |
| マイク | UNTESTED | |
| 音声認識 | UNTESTED | |
| Web Bluetooth | UNTESTED | |
| IndexedDB | UNTESTED | |
| micro:bit More | UNTESTED | |
| ML2Scratch | UNTESTED | |
| PoseNet2Scratch | UNTESTED | |
| TM2Scratch | UNTESTED | |
| Speech2Scratch | UNTESTED | |
| Camera Selector（公開版除外） | UNTESTED | |
| 学校Wi-Fi | UNTESTED | |
| フィルタリング環境 | UNTESTED | |
| カメラ権限 | UNTESTED | |
| マイク権限 | UNTESTED | |
| Bluetooth権限 | UNTESTED | |
| 外部モデル取得 | UNTESTED | |
| ページ再読込 | UNTESTED | |
| Chromebook再起動後 | UNTESTED | |
| 低速回線 | UNTESTED | |

起動時に許可要求が出ないこと、権限拒否後も編集できること、再起動後の復旧も確認。失敗時は授業前診断・通信一覧・学校管理ポリシーを確認してください。

## 現在の公開状態への追記（2026-10-05）

以前の「ローカル開発」「公開未実施」「実機未検証」等は当時の記録。現在はGitHub Pages公開版が存在する。最新状態はREADMEと `docs/BRAND_ASSET_INVENTORY.md` を参照。Camera Selectorはライセンス未確認のため公開版から除外。通常開発版の構成と混同しない。

利用者のChromebook実機報告では翻訳・カメラ・ML2Scratch学習と処理・PoseNet人数／鼻位置・TMモデルロードが成功。micro:bit More・マイク・音声認識・合成音声も成功報告あり。TMモデルロードは全推論の成功と区別する。表のUNTESTEDは個々の端末で使う再検証テンプレート／当時の記録であり、成功報告を否定するものではない。全機能・全端末・40台授業規模の検証完了ではない。

ブランド整理では独自B2Sロゴと非公式表示を使用し、公開版の新規選択から特定商標キャラクターを一時非表示にする。既存sb3互換性とOSS attributionを保持する。Scratch Foundationからの許可はまだ取得していない。
