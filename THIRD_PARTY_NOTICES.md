# Third-party notices / 第三者コンポーネント

Block2Scriptの既存AGPL-3.0 LICENSEは変更しません。各第三者ソースには個別のライセンスが適用されます。以下は実ファイルの宣言に基づきます。改変はstretch3-base/prepare.mjs、prepare-robot.mjsとscripts/public-filter-loader.cjsに記録しています。既存のLICENSE・著作権表示を保持します。

| Component | Upstream / fixed version | License | Copyright / redistribution |
|---|---|---|---|
| Stretch3 build definition | https://github.com/stretch3/stretch3.github.io/tree/29217c1957f88d69c440d381c84d6695dee9cfc9 | AGPL-3.0 | Upstream LICENSE retained; source and changes available. |
| Scratch GUI | https://github.com/LLK/scratch-gui/tree/v3.6.18 | BSD-3-Clause | Copyright (c) 2016 MIT. Preserve copyright, conditions and disclaimer; no endorsement. |
| scratch-vm | npm scratch-vm 3.0.0; locked integrity in build-support/gui-package-lock.json | BSD-3-Clause | Copyright (c) 2016 MIT. Preserve notices and disclaimer. |
| scratch-blocks | npm scratch-blocks 1.1.6; locked integrity | Apache-2.0 | Preserve LICENSE and applicable notices; modified source/build changes identified. |
| ml5 | npm ml5 0.12.2; locked integrity | MIT | Preserve LICENSE.md and upstream attribution. |
| Speech2Scratch | https://github.com/champierre/speech2scratch/tree/b6d0f4ed9d349d620c0ccba74acf75e90505d09b | AGPL-3.0 | Full upstream LICENSE and source attribution retained; AGPL corresponding source and build changes supplied. |
| TM2Scratch | https://github.com/champierre/tm2scratch/tree/d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e | AGPL-3.0 | Full upstream LICENSE and source attribution retained; AGPL corresponding source and build changes supplied. |
| ML2Scratch | https://github.com/champierre/ml2scratch/tree/ba1ad68ebd04ec06f4992390b3ad91c1e36486cc | AGPL-3.0 | Full upstream LICENSE and source attribution retained; AGPL corresponding source and build changes supplied. |
| PoseNet2Scratch | https://github.com/champierre/posenet2scratch/tree/94f396d749010353bc7254af0be92a2e0ef52559 | AGPL-3.0 | Full upstream LICENSE and source attribution retained; AGPL corresponding source and build changes supplied. |
| micro:bit More | https://github.com/microbit-more/mbit-more-v2/tree/7d7b216ac046f03472cfe5de267ca7db9ae0e877 | MIT | Copyright (c) 2020-2021 Koji Yokokawa. Preserve MIT notice. |

## Camera Selector exclusion

Fixed tfabworks/xcx-cameraselector commit 8ada859f8d6b2e978a3c1bd5cebc5f1af8ce2088 has no project LICENSE or package license declaration in the inspected archive. Public permission was not established. No source/archive/card/module from this component is included in the public repository/site build. This is a temporary exclusion.

## Corresponding source / 対応ソース

Application source, modifications, build scripts and locked npm dependencies: https://github.com/playa2021git/block2script . Public site source/index.html supplies the fixed upstream archives without Camera Selector; scripts/upstream-lock.json supplies SHA-256 verification. Reproduce with README commands. npm sources are obtainable by the exact lockfile version, integrity and resolved URL. Site licenses/npm contains package license notices discovered from compiled dependencies.

## Source checksums

- stretch3-source: 29217c1957f88d69c440d381c84d6695dee9cfc9; SHA-256 cb80163457fd7bb993143d4e403ca4c918ddbba469d73b5ba69618ba377992f2
- scratch-gui-v3.6.18: v3.6.18; SHA-256 47e3050aa5a4a60d9517a52c29d76a6ab759f7e1c5a57c0df46417aa4c375570
- speech2scratch: b6d0f4ed9d349d620c0ccba74acf75e90505d09b; SHA-256 33f8a192741f569dc3d878c1010d38965c4a3f21c1f3574c2e713f0ef4830f24
- tm2scratch: d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e; SHA-256 3153fae123a803bd4a8ae518b0fd1a96edf4cdd8e0ccbf1edd85a8fb69895a0e
- ml2scratch: ba1ad68ebd04ec06f4992390b3ad91c1e36486cc; SHA-256 074f925ba741492574d93e63ac5eab78cd62ebe2803565da6c4c10df681ac2dc
- posenet2scratch: 94f396d749010353bc7254af0be92a2e0ef52559; SHA-256 154b88ce25dc218905ec31aa85be83cb51c9fd7809343b9da88862558b8343f2
- microbitMore: 7d7b216ac046f03472cfe5de267ca7db9ae0e877; SHA-256 533cd3d164c35d8b0827f1e524ac1cc40bdcb6f5c8ab43747653decfb5e9f86b

Block2Bot PNGs are project-supplied original character assets. Scratch GUI library assets remain upstream assets and are not presented as Block2Script original branding. Names and trademarks belong to their holders.

## Additional npm license findings

scratch-render-fonts 1.0.2 includes Apache-2.0 LICENSE.txt and SIL OFL-1.1 OFL.txt; both preserved. omggif 1.0.9 carries its MIT permission and Dean McNamee copyright notice in omggif.js; the header is reproduced. color-convert 0.5.3 has a MIT LICENSE even though package.json has no license field. See docs/NPM_LICENSE_INVENTORY.json for the compiled package versions and notices.
