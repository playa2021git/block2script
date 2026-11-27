# GUI検証・反映・往復確認済みの例

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

## 検証条件

公開サイト `https://playa2021git.github.io/block2script/` をChromiumで開き、実VM・workspaceと実際のボタンで検証→反映→「往復を検証」を実施。7例すべて成功。
従来の7例の採取時は必要な拡張をロードし、変数「点灯中」を作成した状態で検証した。これは旧採取時の記録であり、現在の事前準備の必須条件ではない。現行版では「点灯中」も未作成なら反映時に自動作成される。緑の旗は実行していない。Bluetooth接続・LED点灯・サーボ動作・カメラ推論・外部モデルロードは未検証。
以下のコードは構文・反映・グラフ往復を確認したサンプルであり、実機動作確認済みのサンプルとは呼ばない。

## P0のLEDをON/OFF

P0・抵抗付き外付けLEDを想定。実機・回路動作は未検証。

必要な拡張: micro:bit More。

検証: GUI検証 True／反映 True／往復 True。実行・実機: 未検証。

実測表示: ✓ 全スプライトの 7 ブロックを往復検証。ブロックデータの差はありません

```javascript
scratch.script({x:40,y:40},()=>{
  scratch.event_whenflagclicked({});
  scratch.microbitMore_setDigitalOut({PIN:"0",LEVEL:"true"});
  scratch.control_wait({DURATION:1});
  scratch.microbitMore_setDigitalOut({PIN:"0",LEVEL:"false"});
});
```

## 明るさによる分岐

明るさの公開値は0〜100。しきい値30は授業で実測調整する設計値。

必要な拡張: micro:bit More。

検証: GUI検証 True／反映 True／往復 True。実行・実機: 未検証。

実測表示: ✓ 全スプライトの 12 ブロックを往復検証。ブロックデータの差はありません

```javascript
scratch.script({x:40,y:40},()=>{
  scratch.event_whenflagclicked({});
  scratch.control_forever({SUBSTACK:()=>{
    scratch.control_if_else({CONDITION:scratch.operator_lt({OPERAND1:scratch.microbitMore_getLightLevel({}),OPERAND2:30}),SUBSTACK:()=>{
      scratch.microbitMore_setDigitalOut({PIN:"0",LEVEL:"true"});
    },SUBSTACK2:()=>{
      scratch.microbitMore_setDigitalOut({PIN:"0",LEVEL:"false"});
    }});
    scratch.control_wait({DURATION:0.1});
  }});
});
```

## 加速度Xでスプライトを動かす

加速度の1g相当1000を1000で割って移動量を縮小。X軸の符号・設置方向は実機で確認。実機未検証。

必要な拡張: micro:bit More。

検証: GUI検証 True／反映 True／往復 True。実行・実機: 未検証。

実測表示: ✓ 全スプライトの 8 ブロックを往復検証。ブロックデータの差はありません

```javascript
scratch.script({x:40,y:40},()=>{
  scratch.event_whenflagclicked({});
  scratch.control_forever({SUBSTACK:()=>{
    scratch.motion_changexby({DX:scratch.operator_divide({NUM1:scratch.microbitMore_getAcceleration({AXIS:"x"}),NUM2:1000})});
    scratch.control_wait({DURATION:0.1});
  }});
});
```

## P1のサーボを0度から90度へ

構文PIN:"1"は物理P1。電源・機械可動範囲は別途確認。

必要な拡張: micro:bit More。

検証: GUI検証 True／反映 True／往復 True。実行・実機: 未検証。

実測表示: ✓ 全スプライトの 7 ブロックを往復検証。ブロックデータの差はありません

```javascript
scratch.script({x:40,y:40},()=>{
  scratch.event_whenflagclicked({});
  scratch.microbitMore_setServo({PIN:"1",ANGLE:0});
  scratch.control_wait({DURATION:1});
  scratch.microbitMore_setServo({PIN:"1",ANGLE:90});
});
```

## TM画像認識の結果を比較する

URLは上流の既定サンプル値。Class 1は比較文字列としての構文だけを検証し、このモデルに存在すること・ロード・推論は未検証。使用時は生徒の実URL・実Class名に置換。

必要な拡張: TM2Scratch。

検証: GUI検証 True／反映 True／往復 True。実行・実機: 未検証。

実測表示: ✓ 全スプライトの 13 ブロックを往復検証。ブロックデータの差はありません

```javascript
scratch.script({x:40,y:40},()=>{
  scratch.event_whenflagclicked({});
  scratch.tm2scratch_setImageClassificationModelURL({URL:"https://teachablemachine.withgoogle.com/models/0rX_3hoH/"});
  scratch.tm2scratch_toggleClassification({CLASSIFICATION_STATE:"on"});
  scratch.control_forever({SUBSTACK:()=>{
    scratch.control_if({CONDITION:scratch.operator_equals({OPERAND1:scratch.tm2scratch_getImageLabel({}),OPERAND2:"Class 1"}),SUBSTACK:()=>{
      scratch.looks_say({MESSAGE:"Class 1を認識"});
    }});
    scratch.control_wait({DURATION:0.1});
  }});
});
```

## 明るさとボタンAを組み合わせる

両条件成立時だけ出力。実機未検証。

必要な拡張: micro:bit More。

検証: GUI検証 True／反映 True／往復 True。実行・実機: 未検証。

実測表示: ✓ 全スプライトの 14 ブロックを往復検証。ブロックデータの差はありません

```javascript
scratch.script({x:40,y:40},()=>{
  scratch.event_whenflagclicked({});
  scratch.control_forever({SUBSTACK:()=>{
    scratch.control_if_else({CONDITION:scratch.operator_and({OPERAND1:scratch.operator_lt({OPERAND1:scratch.microbitMore_getLightLevel({}),OPERAND2:30}),OPERAND2:scratch.microbitMore_isButtonPressed({NAME:"A"})}),SUBSTACK:()=>{
      scratch.microbitMore_setDigitalOut({PIN:"0",LEVEL:"true"});
    },SUBSTACK2:()=>{
      scratch.microbitMore_setDigitalOut({PIN:"0",LEVEL:"false"});
    }});
    scratch.control_wait({DURATION:0.1});
  }});
});
```

## ヒステリシスと変数で出力の連続切替を抑える

変数「点灯中」が未作成なら、検証で作成予定を確認し、反映時に自動作成する。しきい値30/40は例示の設計値。センサノイズへの効果は実機未検証。

必要な拡張: micro:bit More。

検証: GUI検証 True／反映 True／往復 True。実行・実機: 未検証。

実測表示: ✓ 全スプライトの 32 ブロックを往復検証。ブロックデータの差はありません

```javascript
scratch.script({x:40,y:40},()=>{
  scratch.event_whenflagclicked({});
  scratch.data_setvariableto({VARIABLE:"点灯中",VALUE:0});
  scratch.microbitMore_setDigitalOut({PIN:"0",LEVEL:"false"});
  scratch.control_forever({SUBSTACK:()=>{
    scratch.control_if({CONDITION:scratch.operator_and({OPERAND1:scratch.operator_equals({OPERAND1:scratch.data_variable({VARIABLE:"点灯中"}),OPERAND2:0}),OPERAND2:scratch.operator_lt({OPERAND1:scratch.microbitMore_getLightLevel({}),OPERAND2:30})}),SUBSTACK:()=>{
      scratch.microbitMore_setDigitalOut({PIN:"0",LEVEL:"true"});
      scratch.data_setvariableto({VARIABLE:"点灯中",VALUE:1});
    }});
    scratch.control_if({CONDITION:scratch.operator_and({OPERAND1:scratch.operator_equals({OPERAND1:scratch.data_variable({VARIABLE:"点灯中"}),OPERAND2:1}),OPERAND2:scratch.operator_gt({OPERAND1:scratch.microbitMore_getLightLevel({}),OPERAND2:40})}),SUBSTACK:()=>{
      scratch.microbitMore_setDigitalOut({PIN:"0",LEVEL:"false"});
      scratch.data_setvariableto({VARIABLE:"点灯中",VALUE:0});
    }});
    scratch.control_wait({DURATION:0.1});
  }});
});
```

## 応用時に改めて確認すること

端子・電源・接続方式・機種・ファームウェア・センサ単位・実測しきい値・モデル種類・実URL・Class名を確定する。TM例の比較文字列は生徒のモデルに存在する文字列へ置換する。
加速度値は1g相当1000のスケールなので、実機で移動量が大きい場合はoperator_divide等で縮小する。変更後のコードは再検証する。
状態管理例のしきい値30/40は設計例であり、実測で誤作動を防止したとの検証結果ではない。

出典: `native-scratch/main.js` の検証・反映・往復機能、`evidence/example-results.json`。変更後の例はここにある検証実績を自動的に継承しない。
