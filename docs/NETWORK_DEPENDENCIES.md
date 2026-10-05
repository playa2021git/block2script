# 外部通信依存

固定ソースに基づく一覧。学校ネットワークでの到達性は未確認。外部AIへ自動送信する機能はありません。

| 接続先 | 目的・機能 | 通信不可の場合 |
|---|---|---|
| playa2021git.github.io | アプリと同梱資産 | 起動できない |
| teachablemachine.withgoogle.com/models/と設定したモデルURL | TM2Scratchのモデル・重み取得 | 認識が始まらない可能性 |
| synthesis-service.scratch.mit.edu | 音声合成・文章から発話音声 | 発話に失敗する可能性 |
| scratch-translate-proxy.junya-119.workers.dev | 翻訳・原文送信・言語一覧 | 翻訳/言語取得に失敗する可能性 |
| storage.googleapis.com等（ML5内のモデル。完全なURL一覧は未確認） | ML2Scratch/PoseNet2Scratchモデル | 学習/推論に失敗する可能性 |
| 不明・ブラウザー依存 | Speech2Scratch音声認識。サービス利用時は音声送信の可能性 | 音声認識エラー |
| 上流GUI/VM設定のScratch資産サーバー | 追加スプライト・音等 | 追加資産取得に失敗。Block2Botは同梱 |
| 音源の取得先は実通信で確認が必要 | 音楽 | 音が出ない可能性 |

カメラや音声を使う前に拡張とモデル設定の送信先・目的を確認してください。Camera Selector配布元からの取得は公開版に含めません。Bluetoothは端末・実機間通信ですが、ファームウェアの準備は別途必要です。

ビルド時のみ：codeload.github.com（hash固定ソース）、registry.npmjs.org（lock固定依存）、downloads.scratch.mit.edu（上流micro:bit準備）。実行時通信と区別してください。

## 翻訳プロキシの実装確認（2026-10-05）

`stretch3-base/prepare.mjs` は翻訳先を `scratch-translate-proxy.junya-119.workers.dev` に置換する。翻訳時の原文・対象言語、言語一覧取得がこの第三者プロキシへ通信される。Scratch Foundation直営サービスではなく、Stretch3が使用する第三者の接続経路である。プロキシの運営主体の詳細、利用条件、ログ・保存条件、継続性の確認はBlock2Script側で未完了。学校利用には別途確認が必要。「保存しない」「安全」「外部送信なし」とは保証しない。接続できることと利用許諾取得は別である。

ソース確認：翻訳は上記URL、音声合成は `synthesis-service.scratch.mit.edu`。この一覧は実コードから確認できた主要依存で、全通信のNetwork実測を網羅したものではない。ブラウザー音声認識・任意指定モデルURL・ML5内モデル・上流教材等は引き続き調査対象。現在の端末実機成功と学校全体の到達性も区別する。
