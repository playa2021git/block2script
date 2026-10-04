# 公開前の確認（2026-10-05）

- npm test：17件成功。
- tests/model.test.js（保持した旧実装）：9件成功。
- ローカル版ブラウザーQA：labels、student、TM2、speech-camera、recovery、smoke、standard-extensions、robot、lesson-toolsの9スクリプトが最終的に成功。
- 公開版/block2script/：student、TM2、recovery、smoke、standard-extensions、robot、lesson-toolsの7スクリプト成功。
- Pages専用smoke：成功。主要資産404、重大な初期化エラー、起動時機器要求なし。Camera Selectorの実コード・カードを含まないことを確認。
- 単体合計26件：成功26・失敗0。ブラウザーはスクリプト単位でローカル9＋公開7＋Pages smoke1が成功。assertion総数とは区別する。
- 最初の復旧QAは3拡張fixtureに全6拡張の復元を要求する古い前提で失敗。作品JSONのextensionsを検証するよう修正し、再実行成功。アプリの復旧処理は変更していない。
- 本体production、ローカルdistribution、Pages subpathビルド成功。bundleサイズ、上流Browserslistの警告は残るが、ビルドエラーなし。
- root npm ci dry-run成功。GUIはnpm ci --legacy-peer-deps dry-run成功。初回の通常npm ciではlockfileにないpeerの自動追加を要求されたため、既存解決方式に統一。
- 実ビルドと事前バンドル内部・宣言された依存まで852件を検査。package宣言不足3件は実LICENSE/ソースヘッダーで確認し、未確定0。上流著作権表示は削除しない。
- GitHubは指定されたPublicの空mainリポジトリを確認。force pushなし。
- 公開候補の秘密情報・資格情報・ユーザーパスの自動監査：検出0。追跡候補・除外物を確認。結果はPUBLIC_AUDIT.json。

Camera Selectorは固定版のライセンスを確認できず公開版から除外。Chromebook実機、学校Wi-Fi・管理ポリシー、認識/実機品質、40台相当は人間による検証が必要。docs/CHROMEBOOK_TEST.mdはすべてUNTESTEDから記録する。

保存形式・生徒モード・検証→反映・Undo・IndexedDB復旧・Block2Bot・既存の許諾確認済み拡張を維持。新規拡張、DSL全面改修、AI API導入、依存全面更新は行っていない。

初回ActionsはStretch3取得時のhash不一致で停止。記録済みhashに1文字多い誤記があり、全7アーカイブのGitHub取得版とローカル元版を展開・ファイル内容比較して同一を確認。実アーカイブのSHA-256へ訂正。ソースの版・内容は変更していない。

2回目ActionsではLinuxの本体ビルドが成功後、Windows起点のroot lockfileにLinux用optional bindingがないため配布ビルドが停止。同じ固定版のrolldown 1.2.12 / lightningcss 1.33.0用Linux x64 GNU bindingをnpm公式メタデータのintegrity付きで補完。既存依存の版は変更していない。
