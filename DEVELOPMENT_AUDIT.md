> 2026-10-04 方針更新: Stretch3本体を土台にする。以下は旧基盤の監査記録。現行計画は STRETCH3_MIGRATION.md を参照。

# Block2Script 現状監査と段階的開発計画

監査日: 2026-10-04。対象: 改名後の Block2Script フォルダ。
指示書: original development instructions (not distributed)。
前チャットの合意に従い、小さな段階で進める。今回は監査と計画の作成まで。以下は実装完了の宣言ではない。

## 1. 現状監査

| 項目 | 状態 | 根拠・制約 |
|---|---|---|
| Scratch本体との接続 | 実装済み | public/scratch.html がローカル配信の公式GUIを読み込む。同一オリジンiframe内の EditorState/createStandaloneRoot とReduxストアから同じVMを取得。公式サイトのiframeではない。 |
| Block → Script | 部分実装 | native-scratch/bridge.js の exportCode。ID、shadow、mutation、コメント参照、座標をメタコメントに保持。全opcode/mutationの網羅保証はない。 |
| Script → Block | 部分実装 | AcornでAST解析し、許可された scratch 呼び出しをブロックグラフへ変換。テキスト自体を実行しない。接続種別の検査あり。メニュー値・引数型・メタデータの厳密検証は不足。 |
| Student Mode | 未実装 | 入力から700ms後に自動反映。保存ボタンも dirty 状態では apply() を呼ぶ。サンプル追加も直ちに反映。 |
| Validate / Preview | 未実装 | 解析と反映が一体。対象名と現在ブロック数は表示するが、反映予定の内容・数・差分のプレビューはない。 |
| 生徒向けエラー | 部分実装 | 不正コード時に現ブロックと草稿を保持する。エラー分類、原因、対処、AI修正依頼の一式はない。 |
| 変数・リスト | 部分実装 | normalizeReferences が不足分を自動作成する。Student Modeで前提確認が必要。変数作成がUndo記録より先で、反映失敗時の変数ロールバックが不足。 |
| 標準.sb3 | 実装済み・検証拡充必要 | VM saveProjectSb3/loadProjectを使用。ロード時に3拡張のIDを自動復元する。今回GUIで保存再読込は再検証していない。 |
| 追加保存データ | 未実装 | 草稿、DSL版、拡張版、外部モデル/学習データ情報を独自パッケージとして保存しない。保存UIに外部データ警告がない。 |
| 拡張ロード | 部分実装 | public/stretch-loader.js が実配布コードの3拡張を登録。getInfoのID確認、重複ロード抑止、明示操作までカメラ起動保留。共通Registryと競合表は未実装。 |
| AI仕様 | 部分実装 | ScratchBlocksの登録済み定義から入力名・フィールド名・reporterと現コードをクリップボードへ出力。版情報、型、メニュー、保存制限、JSON出力なし。 |
| Undo / snapshot | 部分実装 | 直前グラフを最大30件メモリ保持。applyGraphにグラフ復旧処理あり。ブラウザ終了で消失。読み込みで履歴と草稿を破棄。全作品snapshot、IndexedDB、定期復旧なし。 |
| 授業前診断・負荷対策 | 未実装 | 専用診断、深さ/生成量制限、40台相当通信検証なし。 |
| ブランド | 未実装 | UI、README、保存名、起動メッセージ等にScratch+が残る。名称設定なし。ロボットPNG2枚は配置済みだが初期作品へ未接続。 |
| 旧独自エディタ | 残存 | src/と旧zipがある。現行起動経路はnative-scratch。旧版を完成版として扱わない。 |

## 2. 壊れやすい結合点

- public/scratch.html はReact内部の _reactRootContainer とfiber探索でScratchBlocksコントローラを取得。
- bridge.js は target.blocks._blocks/_scripts を直接置換し、resetCache/emitWorkspaceUpdateを呼ぶ。
- stretch-loader.js は _registerInternalExtension/_loadedExtensions を使用し、loadExtensionURLを差し替える。
- main.js のschema取得は実際のworkspaceへ一時ブロックを作成し、イベントを止めて破棄する。検証処理の無変更性を確認する必要がある。
- 拡張ローダーはruntime.formatMessageを差し替える。公式拡張との併用・翻訳への影響は未検証。

Scratch更新時はこれらを固定版に対する統合テストで確認し、順次明示的なadapterへ集約する。

## 3. 第三者コード・ライセンス記録の監査

法的判断ではなく、配置済みファイルと記録の確認結果。

- 本体: @scratch/scratch-gui 15.2.0、VM 15.2.0、Blocks 2.1.19のアーカイブ/展開ソースあり。本体LICENSEはAGPL-3.0、TRADEMARKあり。ルートLICENSE維持。
- ML2Scratch/PoseNet2Scratch: 各LICENSEはAGPL-3.0。micro:bit More: MIT、Koji Yokokawaの著作権表示あり。
- 3拡張の実ファイルSHA-256はprovenance.jsonとすべて一致。
- provenance.jsonにはID・ファイル・取得URL・取得日・SHA-256のみ。commit/version、作者、再配布状態、帰属要件、内包依存、通信先、権限、競合、検証状態が不足。
- NOTICEはバンドル内第三者ライブラリの存在を記載するが、依存単位の確認一覧はない。未確認の再配布条件はHUMAN_REVIEW_REQUIREDとして管理する。
- CodeMirror、Acorn、Vite、旧版Blockly等はpackage-lockで固定。依存単位のLICENSE/NOTICE一覧は未作成。
- build.mjsは本体LICENSE/TRADEMARKと一部追加ソースを配布するが、完全な対応ソースへの公開導線は未整備。NOTICEのアプリ名も旧名。
- Scratchロゴ/公式キャラクターが残るGUIと初期作品は公開前の対応が必要。非公式である旨をREADME/Aboutに統一する。
- 今回は外部確認・公開・追加拡張の取得を行っていない。公開前には取得元、固定版、依存物、商標条件を改めて確認する。

## 4. テストの現状

2026-10-04に npm.cmd test を実行: 8件成功、失敗0件。

- native-bridge: 往復保持、拡張/mutation/変数ID、新規ブロック、自己完結メタコメント、不正コード拒否の5件。
- stretch-loader: 復元時登録、重複ロード、カメラ保留の3件。拡張クラスはmockであり実機検証ではない。
- tests/model.test.js は旧モデル向けで、現在のnpm testには含まれない。
- native-integration.sb3/stretch-three.sb3のfixtureあり。READMEの過去GUI検証記録と今回の実行結果は区別する。
- シェルピンスキーGolden Test、全作品.sb3往復、Student Mode無変更性、変数を含む失敗時復旧の自動テストは不足。

## 5. 小さな段階で進める実装計画

指示書のPhase 1〜4を対象とする。指示書Phase 3の優先度A拡張は対象、Phase 5の優先度B/C追加は後続。

### 段階1: 安全に貼り付ける（指示書Phase 1）

最初の実装単位: Student Modeを既定にし、入力、保存、サンプル操作の自動反映を止める。Teacher/Developer Modeのみ明示的に自動同期可能にする。
続いて独立Validate、対象名・反映数プレビュー、明示反映、反映前snapshot、変数込みの失敗復旧、生徒向けエラーを追加する。
完了条件: 貼付と保存だけでVMが変わらない。不正Scriptと検証処理で作品が変わらない。対象変更後に古いプレビューを適用できない。Undoと既存回帰成功。

### 段階2: 名称・共通拡張基盤（指示書Phase 2とブランド要件）

APP_NAME/DSL_NAME設定、About/README、Block2Bot初期作品と2衣装を追加。getInfo由来Registry、版と権限を含むmanifest、競合管理、現在ロード中だけのMarkdown/JSON仕様を整備する。
完了条件: 拡張ごとの専用変換増殖を避ける。未ロード命令をAI仕様へ渡さない。ライセンス未確認を可視化。ロボット画像が新規作品へ反映され、既存.sb3の衣装は保持。

### 段階3: 保存・復旧と既存拡張（指示書Phase 1/3/4）

標準.sb3維持、外部データ警告、草稿・版・拡張情報の追加保存、重要操作前の全作品snapshot、IndexedDB世代復旧を実装。既存3拡張を実コードで往復・保存再読込・仕様・失敗安全まで検証する。
完了条件: 複数スプライト、変数、リスト、コメント、独自ブロック、衣装/音を保存再読込で保持。未反映草稿を失わず復旧できる。モデル/学習データの保存範囲を明示する。

### 段階4: 優先度A拡張と授業運用（指示書Phase 3/4）

TM2Scratch、Speech2Scratch、Camera Selectorは固定版とライセンス確認後に個別追加。Pen/Music/Text to Speech/Translateを共通基盤で検証。授業前診断、負荷警告、通信先一覧、Chromebookと学校ネットワークの確認項目を整備。
完了条件: Golden Testと全回帰成功。拡張対応レベルを表示。ハードウェア/カメラ/マイク実測と未検証項目を区別し、証拠なくClassroom Readyとしない。

## 6. 次回の着手点

段階1の最初の実装単位（Student Mode既定・自動反映停止）から開始する。仕様上の不明点が出たら、前チャットのユーザー指示に従いその都度確認する。今回はアプリ動作を変更していない。

