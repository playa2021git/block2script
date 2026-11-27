# エラー・非対応構文・検証の限界

対象: https://github.com/playa2021git/block2script

運用更新対象SHA: `9483f680aca238330e5d7227d88102d45278ab0b`  
命令辞書・従来検証の採取SHA: `732e0d4e7a465477168f595ae5d9313764ff8e14`  
調査・更新日: 2026-11-12（日本時間）

## 運用更新：変数・リストの自動作成

運用対象は `9483f680aca238330e5d7227d88102d45278ab0b`（PR #1マージ版）。命令辞書の469登録・348/108/13区分と既存の検証例は、下記の辞書採取SHAで得た記録を保持している。今回の差分には命令定義・拡張本体・固定上流バージョンの変更がない。過去の469件検証を新版で全件再実施したという意味ではない。

必要な変数・リストを、ブロック画面で別に手入力して作成する必要はない。登録済みのdata命令等のVARIABLE／LISTフィールドへ正確な名前を指定する。通常JSのletや配列宣言、架空の作成opcode、推測したIDを追加しない。
「検証」は不足する名前・個数・作成先をプレビューするだけで作品を変更しない。「Scratchへ反映」で不足分を自動作成する。新規分は原則として現在のスプライト専用、ステージを対象にした場合は全体用。参照できる同名・同型の既存資産は値や内容を変えず再利用する。初期値やリストの消去が目的に必要なら、緑の旗などの実行用Scriptにdata命令で明示する。
同名のローカル／全体用が複数あれば勝手に選ばない。エラーを確認し、使う資産を選んだブロックから取り出したScriptと参照メタ情報で区別する。既存IDの不一致・他スプライト専用・空欄や不正な名前は自動作成で回避しない。新規作成を任意の全体用に切り替える構文は創作しない。全体用が必要なら、全体用として用意した資産を再利用するなど対象とスコープを確認する。
拡張の追加、機器の接続、モデルのロード、動的Classメニューの確認は別途必要。これらまで自動準備されるとは説明しない。旧版のMISSING_VARIABLEを受けた場合は、現在の公開版・再読込状態とエラー全文を確認する。

以下の引数チェックは `a94b060` の実装で確認した。拒否テスト表は採取時の記録で、現行版ではエラー文言が変わることがある。

## 実装から確認した拒否条件

| 条件 | 根拠・対処 |
|---|---|
| トップレベルがscratch.scriptでない | bridge.jsのast.body/callName。現行のラッパーを使う |
| 通常のJS文 | stackはExpressionStatement/EmptyStatementのみ。let/if/for/return等を専用命令へ置換 |
| fetch/DOM/eval/任意関数 | callNameはscratchのメンバー呼び出しのみ。Script自体は実行しない |
| JSの計算式・識別子 | staticValueの許可ASTにない。operator_* / data_variable等を使う |
| async・引数つきコールバック・式本体 | callbackは非async・引数なし・BlockStatementのみ |
| 未登録opcode | baseにもschemaにもない新規ブロックを拒否。先に拡張をロード |
| 存在しない引数 | 新規・既存ともに入力名とフィールド名を照合し、未知の引数は `UNKNOWN_ARGUMENT` で拒否する。表示された候補と現在の仕様を確認し、大文字小文字も一致させる |
| 入力不足 | SUBSTACK以外の定義入力をすべて指定する |
| メニュー値の不一致 | validateConnectionsのINVALID_MENU。表示文字列と保存値を区別 |
| 変数／リスト不足 | 現行版は検証で作成予定を表示し、反映時に自動作成。MISSING_VARIABLEは旧版の挙動なので版と再読込状態を確認 |
| 名前が空欄・不正 | INVALID_REFERENCE。名前を確認する |
| 同名のローカル／全体用等 | AMBIGUOUS_REFERENCE。使う資産を選んだブロックのScriptでIDを確認 |
| ID・名前・型や対象の不一致 | REFERENCE_CONFLICT。保存メタ情報と参照先を確認し、IDを捏造しない |
| 値接続に命令／SUBSTACKにレポーター | validateConnectionsのoutput/previous検査 |
| 次接続のないブロックの下へ命令 | validateConnectionsのnext検査。forever/stop等の形に注意 |
| ID重複・メタコメントJSON破損 | bridge.jsで拒否。新規生成で既存IDを複製しない |
| 検証後のコード・対象・作品変更 | STALE_PREVIEW。再検証してから反映 |
| 20万文字超・3000ブロック超 | prepareGraphのTOO_LARGE。3000はshadowも含む生成グラフ数 |
| 反映前の自動保存失敗 | BACKUP_FAILED。作品と草稿を保存し空き容量確認 |

## 検証が通っても正しいとは限らない条件

1. Boolean/数値などの接続check情報は元のブロック定義にあるが、B2SのgetCheck?.()経由ではnullとして抽出される例があり、validateConnectionsが確認するのは主にoutput/previous/nextで、全型の適合を検査しない。実測で `control_if` のCONDITIONにoperator_addを接続しても独立検証を通った。Gemはこれを利用せずBooleanレポーターを使う。
2. namespace・旧デモ用定義もschemaが作れることがある。VM primitive/hatを持たない旧extension_*等は実用命令として生成しない。
3. 既存ブロックを編集する場合も、未知の引数は拒否される。未登録opcodeは既存baseがあればcompile段階を通り得るため、opcodeの検証結果は後続の定義検査も含めて判断する。
4. メニュー候補が空の時は不正値チェックを実施しない分岐がある。これは外部サービスやモデルの成功保証ではない。
5. 動的メニューの未変更値は既存baseと一致すれば保持可能。新規Class名・機器名が無条件で使えるわけではない。モデル／機器初期化後のJSONを優先。
6. properties()はブロック引数の重複キーをObject.fromEntriesでまとめる一方、staticValue()のオブジェクトでは重複を拒否する。Gemはどちらも重複キーを出力しない。
7. 文字列・配列・オブジェクトを受理するAST経路があるが、すべての命令の型／範囲／意味を保証しない。数値範囲・単位・資産の存在は別確認。
8. 新規のprocedures_call等はmutationなしでもグラフ生成できる場合があるが、独自ブロック実行成功の根拠にはならない。既存定義とmutationを保持する。
9. 待ちなしループ・過大repeat・大量hat・深いネスト・端末負荷について十分な静的検査がない。センサ監視周期と処理量を設計する。
10. コード反映は現在対象のブロック集合を置換しVMを停止する。貼付だけでは生徒モードで実行・反映しない。未反映草稿は.sb3に含まれない。
11. operator_equalsはJavaScriptの厳密等値ではなくScratchのCast.compareを使い、大小文字だけ違うラベルや数値化すると等しい文字列を同一視する。必要な区別は確認済みのTM専用条件等を使う。コード上でClassの大小文字を保持するだけで、厳密判定を保証しない。

## 拒否テストの結果

以下は公開workspace＋現行変換/検証関数を使う独立ハーネスの実測。Boolean接続テストのみ「受理」を問題の記録として掲載し、正しいコード例にしない。

| テスト | 結果 | 実測エラー |
|---|---|---|
| old | 拒否 | 1行目: scratch.ブロック名(...) の形で書いてください |
| let | 拒否 | 1行目: scratchの命令を並べてください。通常のJavaScript文はブロック変換できません |
| if | 拒否 | 1行目: scratchの命令を並べてください。通常のJavaScript文はブロック変換できません |
| for | 拒否 | 1行目: scratchの命令を並べてください。通常のJavaScript文はブロック変換できません |
| fetch | 拒否 | 1行目: scratch.ブロック名(...) の形で書いてください |
| dom | 拒否 | 1行目: scratch.ブロック名(...) の形で書いてください |
| arithmetic | 拒否 | 1行目: この値には数値・文字列・配列・オブジェクトを使ってください |
| async | 拒否 | 1行目: () => { ... } の形で書いてください |
| unknown | 拒否 | 1行目: 「no_such_opcode」はScratchに登録されていません。拡張機能を先に読み込んでください |
| missing | 拒否 | 1行目: 入力「STEPS」がありません。既存の入力を省略せず指定してください |
| extra | 拒否 | 1行目: ブロック「motion_movesteps」に入力「FAKE」はありません |
| badMenu | 拒否 | 不正なメニュー値: PIN |
| booleanConnection | 受理（型検証の不足） | エラーなし |

## 未ロード拡張・動的メニューの修復

現在の対象と拡張ロード状態を確認→必要な拡張をUIで追加→モデルや機器を必要に応じて初期化→仕様JSONを再保存→入力名・フィールド・メニュー保存値を照合→生徒モードで検証→反映。
エラー回避のために架空opcodeへ変更したり、Class名を別の名前へ勝手に置換したり、メタデータを捏造しない。

## 確認された既存側の問題・環境差

- ルートnpm ciは今回のNode 24/npm 11環境ではlockfileのoptional依存不整合により失敗。その後、運用更新SHAのGitHub Actions（推奨Node 22）でnpm ci・単体テスト・完全なPagesビルド・ブラウザーテスト・deployが成功した。依存・lockfileを更新せず別フォルダーの同版依存で既存npm testを実行した。
- 拡張一括ロード時、ネットワークを公開サイトに限定したブラウザーハーネスで `Failed to fetch` と `Cannot set properties of null (setting 'width')` のpageerrorを観測。外部モデル／カメラ境界を伴う状態であり、通常利用の普遍的な不具合と断定しない。定義抽出・検証・7例反映は成功したが、「ブラウザーエラー0」とは報告しない。
- microbitMore_getMagneticForceは、日本語採取のworkspaceと仕様JSONにAXISフィールドがある。初期の英語状態の採取ではAXISがなく、上流の英語default文には[AXIS]がない一方、日本語翻訳文にはある。「現行版ではAXISが常にない」という旧説明を訂正する。他ロケールでは現在のJSONを確認し、不一致のままAXISを追加しない。実機の磁力値は未検証。
- 共通Registryの公開版9拡張に対し、VMは他の標準拡張もロードできる。AI仕様のextensions配列は16ロード全体の完全な列挙にならない。

出典: `native-scratch/bridge.js`、`native-scratch/main.js`、`native-scratch/safety.js`、`native-scratch/lesson-tools.js`、`tests/safety.test.js`、`tests/native-bridge.test.js`、`evidence/negative-results.json`。
