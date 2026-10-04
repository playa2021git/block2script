# Block2Script

**Development version / Chromebook testing — 開発版・Chromebook検証用**

Stretch3を基盤とした Blocks ⇄ Script 学習環境です。ブロックとBlock2Script Scriptは同じVMを編集します。一般JavaScript実行環境ではありません。

公開予定：[GitHub Pages](https://playa2021git.github.io/block2script/) ／ [ソース](https://github.com/playa2021git/block2script)

Scratch FoundationおよびMITの公式製品・公認製品ではありません。Scratch、Stretch3などの名称・商標は各権利者に帰属します。上流著作権表示を維持し、初期スプライトは独自のBlock2Botです。

## 基本操作と保存

1. ブロックを編集するとScriptが表示されます。AI用仕様はコピー／JSON保存できます。外部AIへの直接接続はありません。
2. Scriptを貼り「検証」で対象・ブロック数を確認してから「Scratchへ反映」。緑の旗で実行します。
3. 「コード反映を戻す」は最大30件。先生・開発モードの自動反映は明示的に選択します。
4. .sb3は反映済み作品、.b2sは現在のスプライトのScriptを保存。生徒モードは保存時に草稿を自動反映しません。

未反映コードは.sb3に入りません。IndexedDBは作品と草稿をこのブラウザー・このアドレスに10世代保存し「復旧」で戻せます。別端末への移動にはファイル保存が必要です。外部モデル本体・ML2Scratch学習データ・実機状態は.sb3外です。作品と全草稿の追加パッケージは未実装。

## 拡張・対応状況

公開版：micro:bit More、ML2Scratch、PoseNet2Scratch、TM2Scratch、Speech2Scratch。標準のペン・音楽・音声合成・翻訳の代表命令も確認しています。

**Camera Selector is temporarily excluded from the public build.** 固定上流ソースのライセンス宣言を確認できないため、公開ソース・ビルド・一覧から除外します。

代表ブロックのScript往復・保存再読込は、全命令・全実機・授業確認完了とは異なります。音声出力はユーザー確認報告あり。実カメラ認識・実マイク認識・micro:bit通信・Chromebook学校環境は未確認です。

## ブラウザー権限と通信

起動だけでは機器権限を要求しません。カメラは「カメラを開始」、マイク認識は開始ブロック、Bluetoothは接続操作で要求します。Bluetoothは対応ブラウザーとファームウェアが必要です。授業前診断はAPI等の基本確認で、実機やサービス到達性の保証ではありません。学校管理ポリシーで禁止された機能は利用できません。

[通信依存](docs/NETWORK_DEPENDENCIES.md)と[Chromebook検証表](docs/CHROMEBOOK_TEST.md)を確認してください。

## 再現ビルド

Node.js 22（22.12以降）、npm、tar。固定版はルート/build-supportのlockfileとscripts/upstream-lock.jsonで管理。GUIは既存lockfileと同じ旧peer依存解決（--legacy-peer-deps）を使用し、依存の全面更新は行いません。

~~~sh
npm ci
npm run setup:upstream
npm run setup:gui
npm test
npm run build:pages
~~~

pages-distは/block2script/配下用。Camera Selectorは取得しません。既存ローカル版はnpm run build:stretch3、npm run build、start.cmdで起動します。

## 制限・報告・ライセンス

全opcode/mutation/引数型、独自ブロック、高負荷ループ、40台同時利用、学校フィルタ等は未検証です。[GitHub Issues](https://github.com/playa2021git/block2script/issues)には再現手順、ブラウザー、版を記載し、資格情報や生徒個人情報を投稿しないでください。

既存[LICENSE](LICENSE)（AGPL-3.0）を維持。第三者には各自の条件が適用されます。[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)に出典・固定版・著作権・条件を記載。サイトの使い方から対応ソースとライセンスへアクセスできます。

旧開発記録はローカル版の履歴です。公開版のCamera Selector対応を意味しません。
