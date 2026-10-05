# 商標・公開準備の最終修正報告

2026-10-05。Scratch Foundationへの許可は未取得。メールは未送信。

## A. 変更ファイルと目的

| ファイル | 目的 |
|---|---|
| stretch3-base/prepare-brand.mjs、prepare.mjs | 上部ロゴを独立B2S SVGへ置換。テーマ切替でも維持。iframeタイトル・faviconを置換。組立で再現 |
| index.html、native-scratch/main.js | Block2Scriptを主タイトルとし、常設の非公式ボタンと日英説明を追加 |
| scripts/brand-library-policy.json、public-filter-loader.cjs、stretch3-base/webpack-editor.cjs | 公開選択ライブラリーだけ10スプライト・31衣装を非表示。VM/storage/sb3読込は変更しない |
| native-scratch/build.mjs | ブランド組立ソースも公開対応ソースへ同梱 |
| docs/BRAND_ASSET_INVENTORY.md | 元ファイル・公開表示・処理・残課題を棚卸し |
| docs/NETWORK_DEPENDENCIES.md | 翻訳プロキシと未確認の運営・保存条件を明記 |
| DEVELOPMENT_STATUS.md、stretch3-base/NOTICE.md、README.md、docs/PUBLICATION_VALIDATION.md、docs/CHROMEBOOK_TEST.md | 古いローカル開発／未検証記録に時点と現在の公開・実機結果を明記 |
| docs/SCRATCH_PERMISSION_READINESS_2026-10-05.md | 申請準備と英語メール案、今回修正後の追記 |
| docs/permission-assets/ | 公開用の全体・双方向ハイライト・選択ライブラリー画像4枚、再撮影手順 |
| stretch3-base/brand.test.mjs、correspondence.test.mjs、standard-extensions.test.mjs、.github/workflows/pages.yml | ブランド・互換性QAと申請画像生成。既存回帰を維持し公開CIへ追加 |
| .gitignore | 再現に必要なprepare-brand.mjsを追跡対象にする |

## B. 商標対応

置換：上部のScratchロゴ、テーマ由来のロゴ表示、iframeのfavicon参照とタイトル。親ページfaviconは元から独立SVGで維持。アプリ入口にmanifest登録はない。

公開のみ非表示：Cat、Cat 2、Cat Flying、Giga、Giga Walking、Gobo、Nano、Pico、Pico Walking、Teraと対応31衣装。一般スプライトCatcherなどは維持。通常開発版の選択ライブラリーは維持。

互換性維持：既存sb3のCat等を置換せず表示・保存再読込する。asset loader・VMにフィルターを掛けない。元ライブラリーJSON、OSS著作権、LICENSE、第三者通知は保持。

確認が必要：上流教材・チュートリアル・拡張カード内の素材、正式な第三者拡張名、既存作品中の商標素材を含む表示の許可範囲。第三者拡張を改名していない。網羅的な画像素材の照合は未完了。

## C. 外部通信

翻訳は `scratch-translate-proxy.junya-119.workers.dev`。第三者プロキシで、原文・言語情報を送信する。運営主体の詳細・利用条件・ログ／保存条件・継続性は未確認。学校利用は別途確認が必要。

音声合成は `synthesis-service.scratch.mit.edu`、資産取得はGUIの `assets.scratch.mit.edu`、作品取得設定には `projects.scratch.mit.edu` が残る。TMは指定モデルURL、ML5は外部モデル、音声認識はブラウザー依存。上流設定の存在と全機能が実際に通信することは区別する。通信全件の実測は未完了。

## D. 文書不整合

翻訳先の旧Scratch直結記述を修正。古い実機UNTESTEDや「現在ローカル」は履歴／再検証テンプレートとして位置づけ、現在のGitHub Pages・利用者実機成功・Camera Selector公開除外を追記。全機能・全端末・40台授業規模の保証へ引き上げていない。

## E. 実行した検証

| コマンド | 結果 |
|---|---|
| npm test | 成功 |
| npm run build:pages | 成功、依存検査852件・未確定0 |
| npm run build:stretch3 / npm run build | 本体・パネルビルド成功 |
| node stretch3-base/brand.test.mjs | 成功：表示・タイトル・favicon・商標キャラクター非表示・一般キャラ保持・Cat入りsb3保存再読込・b2sダウンロード |
| node stretch3-base/pages-smoke.test.mjs | 成功：公開起動・機器要求なし・Camera Selector除外・対応ソース・往復 |
| node stretch3-base/correspondence.test.mjs | 成功：双方向・入れ子・解除・再生成・保存再読込・拡張追加 |
| node stretch3-base/chromebook-priority-a.test.mjs | 成功：模擬カメラ・映像とrenderer接続・翻訳経路と結果 |
| node stretch3-base/recovery.test.mjs | 成功：ブラウザー再起動後の作品と草稿・10世代・拡張復旧 |
| node stretch3-base/standard-extensions.test.mjs | 成功：ペン／音楽／音声合成／翻訳の変換・保存再読込 |

ブラウザーテストは公開用ビルドのローカル配信URLを指定し、Windows Edgeで実施。実カメラ・実Bluetoothの新たな人間検証ではない。ブランドQAの初期試行はライブラリー戻る操作と模擬カメラ不足で失敗し、既存QAと同じ環境・実際のUIに修正して成功。既存テストを削除していない。上流Browserslist、bundleサイズの警告は残る。

## F. 残る確認

- 財団の回答・使用条件、申請者情報と利用／料金計画の確定。
- 上流教材などの全素材照合と第三者の権利。
- 翻訳プロキシや外部サービスの利用・保存条件と通信全件。
- 学校端末・管理ポリシー・授業規模での確認。

今回、依存全面更新・新規拡張・DSL変更・アクティビティ図・AI API接続は行っていない。

## 公開CIの追加確認

ブランド修正の最初のCIは全テスト・公開とも成功。後続の同内容CIでは復旧テストの「保存を確認した後、別のIndexedDB読み直しで対象を取得する」箇所が失敗した。保存確認と使用するsnapshotの取得を同一読み取りにまとめ、復旧対象が別読み取り間で変わる余地を除いた。アプリの保存・復旧処理やテストの期待値は変更していない。
