# Stretch3移行版の構成とソース

本体組立定義: stretch3/stretch3.github.io source commit 29217c1957f88d69c440d381c84d6695dee9cfc9。
GUI: Scratch GUI v3.6.18 (BSD-3-Clause)。VM: scratch-vm 3.0.0 (BSD-3-Clause)。Blocks: scratch-blocks 1.1.6 (Apache-2.0)。ML5: 0.12.2。依存の固定値はscratch-gui-3.6.18/package-lock.json。

ML2Scratch、PoseNet2Scratch、TM2ScratchはAGPL-3.0、micro:bit MoreはMIT。各取得ソースのLICENSEと著作権表示を維持する。拡張の取得commitとアーカイブSHA-256はextensions-manifest.json。

Block2Script側の改変はprepare.mjsと明示的bridgeが示す。Stretch3のinstallスクリプトと同じVM builtins登録、GUI拡張一覧への追加をWindows上で実施する。VMへの別ローダーによる二重登録は行わない。アプリはローカル配信のStretch3を使用する。

上流のGA挿入と公開サイトへの配信処理は使用しない。モデル取得など拡張自身の通信は残る。カメラ起動は「カメラを開始」操作まで保留する。

現段階は6拡張を含む移行版であり、Stretch3の全拡張を移し終えたものではない。TM2Scratchも登録済み。その他の拡張、授業安全化、ロボット初期作品、低負荷化は後続の小段階。

公開時には完全な対応ソース、依存ライセンス、通信先の一覧と公開導線を整備する。

## TM2Scratch integration
Source: champierre/tm2scratch commit d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e (AGPL-3.0). Patches: native builtin and library registration, shared bundled ml5 0.12.2 instead of an unpinned remote script, camera request deferred until the explicit start button; rejected camera requests are handled. Image/audio recognition with real devices remains untested. Model data is external and is not embedded in sb3 backups.

## Speech2Scratch / Camera Selector integration
Speech2Scratch: champierre/speech2scratch commit b6d0f4ed9d349d620c0ccba74acf75e90505d09b, AGPL-3.0. Camera Selector: tfabworks/xcx-cameraselector commit 8ada859f8d6b2e978a3c1bd5cebc5f1af8ce2088. The Camera Selector source archive has no project license file or package license declaration; upstream README and source are retained, and its public redistribution license must be clarified before release. This build is local development.
Patches: native VM registration and extension cards; SpeechRecognition feature detection, duplicate-start guard, error handling and abort on stop; Camera Selector source built against the native VM, rejection of unsupported camera permission queries handled and camera streams deferred until explicit start. The video gate permits subsequent enable requests after the user starts the camera. TM2Scratch now removes the upstream remote ml5 script correctly and uses the bundled fixed dependency only. Real microphone recognition and physical camera switching remain untested.
