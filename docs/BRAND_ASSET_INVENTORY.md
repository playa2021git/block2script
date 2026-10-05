# ブランド・素材棚卸し

2026-10-05。固定GUI v3.6.18の実ファイルを調査。許可取得を示す文書ではない。

| 名称 | 種類 | 元ファイル／生成元 | 表示場所 | 今回の公開設定で表示されるか | 処理 | 備考 |
|---|---|---|---|---|---|---|
| Scratch wordmark | word mark | README、使い方、翻訳、上流文言 | 基盤の説明・操作説明 | 説明として残る | RETAINED_PENDING_PERMISSION | 製品名はBlock2Script。説明の適切性は相談対象 |
| Scratch logo | logo | GUI `src/components/menu-bar/*logo.svg` | GUI上部 | B2Sへ置換 | REPLACED | テーマ切替時も独立SVGへ固定。元の商標画像の加工ではない |
| Scratch由来favicon | logo | GUI `src/playground/index.ejs` / `static/favicon.ico` | iframeのタブアイコン参照 | 独立SVGへ置換 | REPLACED | 元icoは上流静的資産として残るがfaviconとして参照しない |
| ブラウザータイトル | word mark | root `index.html`、GUI `index.ejs` | タブ | Block2Script | REPLACED | manifestはアプリの入口で登録されていない |
| Scratch Cat | character | GUI `src/lib/libraries/sprites.json` / `costumes.json` | 新規スプライト・衣装選択／既存作品 | 新規選択は非表示、既存作品では表示 | HIDDEN_IN_PUBLIC_BUILD / RETAINED_FOR_COMPATIBILITY | Cat, Cat 2, Cat Flying |
| Gobo | character | GUI `src/lib/libraries/sprites.json` / `costumes.json` | 新規スプライト・衣装選択／既存作品 | 新規選択は非表示、既存作品では表示 | HIDDEN_IN_PUBLIC_BUILD / RETAINED_FOR_COMPATIBILITY | Gobo |
| Giga | character | GUI `src/lib/libraries/sprites.json` / `costumes.json` | 新規スプライト・衣装選択／既存作品 | 新規選択は非表示、既存作品では表示 | HIDDEN_IN_PUBLIC_BUILD / RETAINED_FOR_COMPATIBILITY | Giga, Giga Walking |
| Pico | character | GUI `src/lib/libraries/sprites.json` / `costumes.json` | 新規スプライト・衣装選択／既存作品 | 新規選択は非表示、既存作品では表示 | HIDDEN_IN_PUBLIC_BUILD / RETAINED_FOR_COMPATIBILITY | Pico, Pico Walking |
| Nano | character | GUI `src/lib/libraries/sprites.json` / `costumes.json` | 新規スプライト・衣装選択／既存作品 | 新規選択は非表示、既存作品では表示 | HIDDEN_IN_PUBLIC_BUILD / RETAINED_FOR_COMPATIBILITY | Nano |
| Tera | character | GUI `src/lib/libraries/sprites.json` / `costumes.json` | 新規スプライト・衣装選択／既存作品 | 新規選択は非表示、既存作品では表示 | HIDDEN_IN_PUBLIC_BUILD / RETAINED_FOR_COMPATIBILITY | Tera |
| Scratch Kitten | character | GUI `src/lib/libraries/sprites.json` / `costumes.json` | 新規スプライト・衣装選択／既存作品 | 該当項目を固定版で確認できず | RETAINED_FOR_COMPATIBILITY | 当該名称の収録なし。外部sb3の素材は置換しない |
| Milli | character | GUI `src/lib/libraries/sprites.json` / `costumes.json` | 新規スプライト・衣装選択／既存作品 | 該当項目を固定版で確認できず | RETAINED_FOR_COMPATIBILITY | 当該名称の収録なし。外部sb3の素材は置換しない |
| Zepto | character | GUI `src/lib/libraries/sprites.json` / `costumes.json` | 新規スプライト・衣装選択／既存作品 | 該当項目を固定版で確認できず | RETAINED_FOR_COMPATIBILITY | 当該名称の収録なし。外部sb3の素材は置換しない |
| その他のScratchロゴ／教材画像 | support/library asset | GUIチュートリアル・Tips・背景・拡張カード等 | ヘルプ・選択画面 | 上流素材が残る場合あり | RETAINED_PENDING_PERMISSION | 全ピクセル・全教材素材の網羅的確認は未完了。商標相談に画像を添える |
| Speech2Scratch | third-party extension name | champierreの固定拡張ソース | 拡張一覧・ブロック | 表示 | THIRD_PARTY_NAME | 正式名称・作者・ライセンスを保持 |
| ML2Scratch | third-party extension name | 同上 | 同上 | 表示 | THIRD_PARTY_NAME | 名称は改変せず質問対象として記録 |
| PoseNet2Scratch | third-party extension name | 同上 | 同上 | 表示 | THIRD_PARTY_NAME | 同上 |
| TM2Scratch | third-party extension name | 同上 | 同上 | 表示 | THIRD_PARTY_NAME | 同上 |
| Stretch3 / micro:bit More | third-party extension name | 固定上流ソース | 基盤説明・拡張一覧 | 表示 | THIRD_PARTY_NAME | 各権利者の名前として保持 |

## 適用方法と互換性

`stretch3-base/prepare-brand.mjs` は通常・公開版でB2Sロゴ、タイトル、faviconを再現する。`scripts/brand-library-policy.json` の正確な10項目を公開webpack loaderで除外する。衣装選択もその10項目の衣装のmd5extに一致するものだけを除外する。Catcher等の一般キャラクターは残す。原本JSON、storage、VM、sb3ロード処理にはフィルターを掛けない。通常開発版の新規選択ライブラリーは維持する。

既存sb3のScratch Cat等は表示・保存再読込可能なまま保持する。これは相談中の一時設定であり、権利者が不許可と判断したことを意味しない。ライセンス・著作権表示と対応ソースは保持する。

## 相談対象

残る上流教材・カード内の画像、ライブラリーと既存作品の表示、第三者拡張の正式名称、基盤の説明文。公開設定で隠した素材を将来戻す場合も必要な範囲を確認する。

公式根拠：[Scratch Trademark Guidelines（2026-09-14）](https://mitscratch.freshdesk.com/en/support/solutions/articles/4000232107-scratch-trademark-guidelines)。相談先：trademarks@scratch.org。許可は未取得。

調査結果：スプライト339→329項目、衣装886→855項目。名称一致で10スプライト、対応md5extで31衣装を公開選択から除外。公式の[商標一覧](https://mitscratch.freshdesk.com/en/support/solutions/articles/4000232108)も確認した。
