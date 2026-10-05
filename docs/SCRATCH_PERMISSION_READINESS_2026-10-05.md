# Block2Script 現状整理とScratch財団への許可相談

作成日：2026-10-05（日本時間）  
確認した公開コード：`657d058`  
位置づけ：実装・検証記録と公式公開資料に基づく申請準備の評価。許諾取得済みという意味ではない。

## 1. 結論

**Scratch財団へのメール相談・許可申請の準備に進める。** 公開デモ、公開ソース、教育目的、独自機能、ライセンス記録があり、具体的な画面を示して問い合わせられる段階にある。

ただし、現状を「Scratch財団公認」「すべての権利処理が完了」「学校で全面運用可能」とは扱わない。申請の主題は、**独立した教育用派生エディターに残るScratchロゴ・キャラクター等の扱いと、必要な許可の範囲の確認**とする。承認されるか、回答まで何日かかるかは予測できない。

全機能の完成やアクティビティ図の実装を待つ必要はない。申請者の情報、利用・料金計画、素材の一覧を確定すれば、具体的なメールを送れる。今回メールは送信していない。

- 公開デモ：https://playa2021git.github.io/block2script/
- 公開リポジトリ：https://github.com/playa2021git/block2script
- 最新変更：https://github.com/playa2021git/block2script/commit/657d058
- 最新公開処理：https://github.com/playa2021git/block2script/actions/runs/37256433555 （成功確認済み）

## 2. 現在できていること

| 項目 | 現状と根拠 |
|---|---|
| 教育上の目的 | ブロックとテキスト記法の対応を中学生が理解するための環境。教材として説明できる。教育効果の定量評価は未実施。 |
| 基盤 | 固定したStretch3／Scratch GUI・VM・Blocksを利用。単独の模倣エディターではなく、同じVMのブロックを編集する。 |
| Blocks ⇄ Script | 変換、検証してから反映、代表構造の往復、既存拡張への対応。一般のJavaScript実行環境ではなく、専用のBlock2Script Script。全命令の網羅的保証は未完了。 |
| 双方向ハイライト | ブロック選択で対応Script、Scriptクリックで対応ブロックを強調。入れ子全体・個別命令・レポーターの対応を保持。最新公開版では濃い青・太い枠・発光に改善。 |
| UI整理 | 重複する独自の拡張追加・sb3読込／保存ボタンを撤去。Scratch本来のUIを利用。 |
| 保存・復旧 | sb3、現在スプライトのb2s、Undo、IndexedDB復旧。未反映草稿はsb3に入らず、全草稿の持ち運びパッケージは未実装。 |
| 翻訳・カメラ修正 | 初回Chromebookで失敗した後に修正。第2回の利用者実機報告では成功。初回のNGを現在の未修正不具合と混同しない。 |
| 画像・機械学習 | 利用者報告でML2Scratch学習と処理、PoseNet人数／鼻位置、TMモデルロードが成功。TMモデルロード成功は画像／音声の全推論成功を意味しない。 |
| その他の実機 | micro:bit More、Bluetooth、LED・ボタン・センサー値同期、マイク音量、音声認識、合成音声の成功報告あり。全端末・全授業条件の保証ではない。 |
| 検証 | 最新変更ではnpm test・通常／公開用ビルド・双方向ハイライトのブラウザー回帰検証成功。公開CIも成功。今回の文書作成では動作試験を追加していない。 |
| ブランド | 名称はBlock2Script。独自初期キャラクターBlock2Bot、非公式表示あり。ただし組込みGUIのScratchロゴやライブラリー素材は残る。 |
| AI | 外部AIへ自動接続する機能はなく、仕様コピー・利用者によるコード貼付。今後直接接続する場合は別途データ・利用条件の整理が必要。 |

主な根拠： [README](../README.md)、[修正記録](chromebook-tests/PRIORITY_A_FIX_2026-10-05.md)、[ハイライト実装記録](chromebook-tests/HIGHLIGHT_2026-10-05.md)。

**記録の注意：** `DEVELOPMENT_STATUS.md` や `stretch3-base/NOTICE.md` 等には「ローカル開発」「実機未検証」といった以前の記述が残る。本書は最新README・変更履歴・利用者報告を優先して整理した。申請添付資料では時点を揃える必要がある。今回、既存の編集中ファイルは変更していない。

## 3. ソフトウェアのライセンスと商標許可を分ける

| 対象 | 現在の整理 | 申請との関係 |
|---|---|---|
| Block2Script・Stretch3・一部拡張 | リポジトリのLICENSEはAGPL-3.0。対応ソース、改変手順、固定版、ライセンスへの導線を用意。 | 利用・改変・配布は各ライセンス条件の遵守が前提。財団の回答だけで第三者の条件が免除されるわけではない。 |
| 固定したScratch GUI／VM／Blocks | 今回使う旧固定版の実LICENSEはGUI／VMがBSD-3-Clause、BlocksがApache-2.0。 | 最新公式エディターの条件を古い固定版に一律適用しない。実際に配布する版の条件で説明する。 |
| Scratchの名称・ロゴ・キャラクター | コードのライセンスとは別に商標の問題がある。非公式表示だけで全使用が許可されるわけではない。 | GUI内ロゴ、キャラクターライブラリー、教材画像を使用箇所別に示して相談する。 |
| Stretch3・各拡張・モデル等 | 個別の作者・権利者・規約がある。 | Scratch財団に一括で他者の権利の許可を求めない。必要な場合は各権利者へ別途確認する。 |
| Camera Selector | 固定版の許諾を確認できず、公開版から除外済み。 | 公開版に含まれていると説明しない。再導入は個別の許諾確認後。 |

[第三者通知](../THIRD_PARTY_NOTICES.md)、[依存ライセンス記録](NPM_LICENSE_INVENTORY.json)、[ソース固定情報](../scripts/upstream-lock.json)を根拠に説明できる。ただし記録があることだけで法的適合の全項目を証明したとはしない。

## 4. 公式資料から確認できた申請方針

2026-09-14更新の[Scratch Trademark Guidelines](https://mitscratch.freshdesk.com/en/support/solutions/articles/4000232107-scratch-trademark-guidelines)は、派生ソフトの独立性を明示し、名称・ブランドで公式との誤認を避ける方針を示す。コードの利用許諾と商標の権利は別であり、説明上のScratchへの言及と、製品のブランドとしての利用を区別する。

同ガイドラインに、商標使用の相談先として **trademarks@scratch.org** が掲載されている。したがって、宛先を推測する必要はない。独自名称を保ったまま、実際の素材と画面を提示して相談する方針が妥当と判断する。

なお、現行ガイドラインは最新公式エディターをAGPL v3として説明しているが、本プロジェクトが固定する旧版の実LICENSEとは時点が異なる。申請では双方を混同しない。

参考：[Scratch財団公式サイト](https://www.scratchfoundation.org/home)、[画像・スクリーンショットについての公式Help](https://mitscratch.freshdesk.com/en/support/solutions/articles/4000156890-can-i-use-screenshots-of-scratch-in-a-book-or-presentation-)。古い画像FAQだけを根拠に派生アプリ全体の使用を許可済みとは判断しない。

## 5. 申請前に確定するもの

| 項目 | 必要な整理 | 重要度 |
|---|---|---|
| 申請者 | 氏名、所属、役割、返信先。個人活動か学校／組織の事業かを明記。 | 送信前に必須 |
| 利用範囲 | 自校授業、他校への提供、一般公開の範囲。対象年齢、予定人数。 | 送信前に必須 |
| 料金・営利計画 | 無料／有料、広告、寄付、研修販売、将来の事業化の有無。現時点で未確認なので無料・非営利と断定しない。 | 送信前に必須 |
| 素材一覧 | GUI内Scratchロゴ、ライブラリーのScratch Cat等、チュートリアル画像等を画面・使用目的別に確認。現在ロゴが残ることは確認済み、全素材棚卸しは未完了。 | 許可範囲確定に必須 |
| 非公式表示 | README／使い方だけでなく、初回画面で見える位置への表示も検討。現状と追加予定を明確にする。 | 優先 |
| デモ資料 | 1枚の全体画面、個別ブロックと入れ子のハイライト各1枚、短い操作動画。生徒の顔・氏名・作品中の個人情報を含めない資料で十分。 | 推奨 |
| 文書の時点 | 旧未検証表記、公開版の拡張一覧、翻訳接続先を最新状態に揃える。 | 優先 |
| 外部サービス | 翻訳、音声合成、Scratch資産配信を派生アプリから利用する条件、容量・学校利用に適切な窓口を確認する。動作成功をサービス利用許諾の証拠にしない。 | 優先 |

**通信資料の既知の不整合：** `docs/NETWORK_DEPENDENCIES.md` の翻訳先は旧記述が残る。修正済みコードでは `scratch-translate-proxy.junya-119.workers.dev` を使用する（`stretch3-base/prepare.mjs` で確認）。このプロキシはScratch財団の直営サービスと断定せず、運営者の利用条件・継続性も別途確認する。コードとNetwork実測に基づく通信表の更新が必要。ブラウザー音声認識、MLモデル等の外部通信も全件確定済みではない。申請で「データが一切外部へ送られない」と説明してはいけない。

## 6. 申請までの進め方

1. 上表の申請者・利用範囲・料金計画を確定する。
2. 公開版の画面と素材一覧を用意し、残したいロゴ／素材と、差し替え可能なものを区別する。
3. ソース・ライセンスの公開導線と独立性の表示を、公開版の画面で最終確認する。
4. 下記メール案を確定し、`trademarks@scratch.org` に送る。技術的な完成認定ではなく、具体的な商標利用・表記の確認として申請する。
5. 回答を保管し、許可された素材・媒体・用途・期間・条件を記録する。追加指示や他窓口の案内があれば対応する。
6. 学校導入の通信・個人情報・管理端末条件は別途検証する。商標許可取得と学校導入準備完了を区別する。

回答待ちの間にアクティビティ図などの新機能を急いで追加する必要はない。許可対象の画面が変わる場合は、最終画面との整合を確認する。

## 7. 英語メール案（未送信）

送信先：trademarks@scratch.org  
件名：Request for guidance on Scratch trademarks in Block2Script, an independent educational editor

以下の角括弧を埋め、素材一覧・画像を添えてから送信する。料金計画や所属は事実に合わせる。

```text
Dear Scratch Foundation Trademark Team,

My name is [name], and I am [role / affiliation] in Japan.
I am developing Block2Script, an independent educational editor based on
Stretch3 and fixed versions of the open-source Scratch components.
Its purpose is to help middle-school students understand the relationship
between visual blocks and a JavaScript-like textual notation.

Students can select a block to highlight its corresponding text, or click
the text to highlight the corresponding block. This includes nested
structures and individual blocks. The text is our own Block2Script Script
notation, rather than unrestricted JavaScript.

Public development demo:
https://playa2021git.github.io/block2script/
Public source and build instructions:
https://github.com/playa2021git/block2script
Third-party notices:
https://github.com/playa2021git/block2script/blob/main/THIRD_PARTY_NOTICES.md

We use the independent name Block2Script and our own initial character,
Block2Bot. Our documentation states that the project is not affiliated
with or endorsed by the Scratch Foundation. The embedded editor still
contains the Scratch logo and access to some upstream library assets.
Attached are screenshots and an inventory of the specific marks/assets
we would like to retain.

Our intended use and distribution are [scope, audience and scale].
Our current and planned pricing, advertising and commercial arrangements
are [accurate details].

Could you please advise:
1. Whether the specific uses shown in the attachments require a trademark
   license, and whether permission can be granted for the stated scope;
2. Which marks or assets should be removed or replaced, and which visible
   disclaimer and attribution you recommend;
3. Whether retaining access to the relevant character-library assets
   requires additional permission;
4. Which team we should contact about use of Scratch-hosted translation,
   text-to-speech and asset services from this independent editor.

We understand that open-source code licenses and trademark permissions
are separate, and that your response does not grant rights to third-party
extensions or imply endorsement of our project. We are willing to adjust
our interface and materials to meet the applicable requirements.

Thank you for your guidance.

[name]
[role / organization]
[reply email]
```

## 8. 現時点の判定

- **相談メールの作成：可能。** 本書に案を用意した。
- **送信：申請者情報・利用計画・具体的な素材一覧を埋めれば進められる。** 全機能完成は前提にしない。
- **許可取得：未取得。** 回答・許可条件はまだない。
- **全面的な学校導入：追加確認が必要。** 端末差、学校通信、データ取扱い、保存、高負荷、授業規模の検証が残る。

Block2Scriptは、教育的な狙いを動作するデモで説明し、許可範囲を具体的に相談できる段階に達している。

## ブランド整理後の更新（2026-10-05）

上記の「ロゴが残る」「素材棚卸し未完了」は本書作成時点の記録。その後の修正では上部ロゴとiframe faviconを独立B2S表示へ置換、常設の非公式表示を追加、公開版の新規選択から特定商標キャラクターを一時非表示にした。[素材棚卸し](BRAND_ASSET_INVENTORY.md)と[申請画像](permission-assets/README.md)を用意した。本文のメール案の「embedded editor still contains the Scratch logo」は現在の上部ロゴに該当しないため、送信時には「The top-level branding has been replaced with our own B2S branding. Some upstream instructional assets and third-party extension names remain; details are listed in the attached inventory.」へ更新する。許可は未取得、メール未送信。利用者情報・利用範囲・料金計画は申請者が確定する必要がある。
