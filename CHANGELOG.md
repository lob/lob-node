#### 6.0.6 (2019-07-19)

##### Chores

* **deps:**
  * upgrade vulnerable packages ([#216](https://github.com/lob/lob-node/pull/216)) ([a938fc23](https://github.com/lob/lob-node/commit/a938fc23caf38b87ea6791219d4883e862cdd1c9))
  * bump lodash from 4.17.11 to 4.17.14 ([#215](https://github.com/lob/lob-node/pull/215)) ([6d6b0436](https://github.com/lob/lob-node/commit/6d6b0436c8caa15d65bfe0534752842c08ee555d))

#### 6.0.5 (2019-02-14)

##### Chores

* **lib:** fixed npm scripts on windows, moved from istanbul to nyc ([#213](https://github.com/lob/lob-node/pull/213)) ([be91922d](https://github.com/lob/lob-node/commit/be91922d59e4fa9cc747c0e8ae2523b6f5d319c6))

#### 6.0.4 (2019-01-30)

##### New Features

* **postcards:** add ability to modify concurrency ([4a3bbf37](https://github.com/lob/lob-node/commit/4a3bbf373727c7c2bd9098b8425988a4adfd70d8))

##### Bug Fixes

* **resource-base:** handle undefined multipart form value ([#212](https://github.com/lob/lob-node/pull/212)) ([711261dc](https://github.com/lob/lob-node/commit/711261dc23d9f09e8ae7050248068219775fb6eb))

#### 6.0.3 (2019-1-7)

##### Chores

* **assets:** update links ([5d7f66f0](https://github.com/lob/lob-node/commit/5d7f66f0487151a3b50b8d4581fe5b2cfa9474a9))

##### Tests

* **api-key:**
  * remove lob api key from tests and examples ([93fee77a](https://github.com/lob/lob-node/commit/93fee77a156c53eb9454fc0be3a4d220e1943d08))
  * remove lob api key from tests and examples ([062022b3](https://github.com/lob/lob-node/commit/062022b3cc89b921db4a1dec863d687d0db9dabb))

#### 6.0.2 (2018-12-3)

##### Bug Fixes

* **resource-base:** default body to empty object ([70f9c804](https://github.com/lob/lob-node/commit/70f9c804e1dabd2360afcf307e2e98b4787d46d9))
* **deps:**
  * upgrade rest of vulnerable deps ([3b84d7e0](https://github.com/lob/lob-node/commit/3b84d7e09b29b7cbd4718396f8fba7d74bc5b7ec))
  * upgrade mocha (and growl) version ([95bdf700](https://github.com/lob/lob-node/commit/95bdf700d99986d03cb85ad09d300df1557e8abf))
* **addresses:** fix broken test (#202) ([e560d6bc](https://github.com/lob/lob-node/commit/e560d6bc207f8d5964470ce1b9b9883829f198e3))

#### 6.0.1 (2018-8-7)

##### Bug Fixes

* **headers:** don't save request specific headers in configs (#201) ([cfa0fb19](https://github.com/lob/lob-node/commit/cfa0fb191581aef2aa4a42c8ca554446700956d8))

## 6.0.0 (2018-07-02)

##### New Features

* **area-mail:** remove areas and routes resources ([a17d234d](https://github.com/lob/lob-node/commit/a17d234da61f38c9a254642109a85aa6a5622810))

### 5.3.0 (2018-05-21)

##### New Features

* **us-autocompletions:**  add USAutocompletions ([b64b02db](https://github.com/lob/lob-node/commit/b64b02db3712d92a6934c37629c804debdfcb42c))

##### Bug Fixes

* **readme:**  replace dependency status badge and upgrade vulnerable deps ([#198](https://github.com/lob/lob-node/pull/198)) ([b758c76d](https://github.com/lob/lob-node/commit/b758c76d3cdd24d379c13ad5189dce4e28efe45e))

### 5.2.0 (2018-3-13)

##### New Features

* **us-verifications:** allow passing queries in verification creation (#197) ([84b9a44a](https://github.com/lob/lob-node/commit/84b9a44a0044eccc33bc8e1a839c54f9ae5cb067))

### 5.1.0 (2018-02-22)

##### Refactors

* **resources:** remove dynamic requires ([#196](https://github.com/lob/lob-node/pull/196)) ([4036cdda](https://github.com/lob/lob-node/commit/4036cdda417fc859dbe737eef48c78d97e38c1a8))

## 5.0.0 (2017-12-11)

##### Chores

* **lib:**
  * use es6 classes ([38ee703e](https://github.com/lob/lob-node/commit/38ee703e2e03703d4029a922144db53d51320c01))
  * es6 ify resource and test files ([fbd106f3](https://github.com/lob/lob-node/commit/fbd106f3554dafefc6c0e99d24959eaf7970b6fb))
* **deprecate:** Deprecate support for 0.10 and 0.12 ([#187](https://github.com/lob/lob-node/pull/187)) ([bd0130d3](https://github.com/lob/lob-node/commit/bd0130d31ff7df699d423043098385cdbec362a7))

##### Bug Fixes

* **test:** fix US verification test ([a0f10925](https://github.com/lob/lob-node/commit/a0f10925bd4e244d69c53c1e9097f3c04f70f5e5))
* **auto-verify:** update tests to manage auto-verify ([107eeae3](https://github.com/lob/lob-node/commit/107eeae3702290174438fd38ef0ab6d9193b3725))

##### Other Changes

* **postcards:** Remove message field from postcard ([c298fe4c](https://github.com/lob/lob-node/commit/c298fe4c5eace7d746b0215b3f7e5958ae0d18c8))

##### Refactors

* **object:** Use Object.prototype.call, instead of assuming objects inherit from Object.prototype ([#191](https://github.com/lob/lob-node/pull/191)) ([8648cb0c](https://github.com/lob/lob-node/commit/8648cb0cc192650352a061a8c110d09d7345ccf3))

##### Tests

* **intl:** Update international verifications tests ([5f38b3d3](https://github.com/lob/lob-node/commit/5f38b3d3df4b0d44bedd5bbbf5969a5279590b57))

#### 4.1.1 (2017-08-09)

##### Chores

* **examples:**
  * update to use merge_variables ([cc6c2d3c](https://github.com/lob/lob-node/commit/cc6c2d3c96492f52e0c6a173380985fa691ee86b))
  * Fix examples to use new us_verifications endpoint ([b6096944](https://github.com/lob/lob-node/commit/b6096944843d1a9ee67632ee6a27688bb3da381a))

##### New Features

* **idempotency-key:** Add optional headers argument to create() methods to support idempotency-key ([99ef7e92](https://github.com/lob/lob-node/commit/99ef7e92cc8e57608553abdd3b8acd38abe08cf3))
* **us-zip-lookups:** Add US Zip Code Lookup ([d51e8c8b](https://github.com/lob/lob-node/commit/d51e8c8b8f6a9facb1df94d80b230a2387a9e05f))
* **delete:** Add delete method to postcards, letters, and checks chore(ignore): ignore Sublime files ([aa340b57](https://github.com/lob/lob-node/commit/aa340b579cc87999dc7c0ed1cc571e30cefafbda))

##### Bug Fixes

* **readme:** update documentation ([73afa906](https://github.com/lob/lob-node/commit/73afa906bd393097a3a4d18988e80f8bf6c4308b))

#### 4.1.1 (2017-08-09)

##### Chores

* **examples:**
  * update to use merge_variables ([cc6c2d3c](https://github.com/lob/lob-node/commit/cc6c2d3c96492f52e0c6a173380985fa691ee86b))
  * Fix examples to use new us_verifications endpoint ([b6096944](https://github.com/lob/lob-node/commit/b6096944843d1a9ee67632ee6a27688bb3da381a))

##### New Features

* **idempotency-key:** Add optional headers argument to create() methods to support idempotency-key ([99ef7e92](https://github.com/lob/lob-node/commit/99ef7e92cc8e57608553abdd3b8acd38abe08cf3))
* **us-zip-lookups:** Add US Zip Code Lookup ([d51e8c8b](https://github.com/lob/lob-node/commit/d51e8c8b8f6a9facb1df94d80b230a2387a9e05f))
* **delete:** Add delete method to postcards, letters, and checks chore(ignore): ignore Sublime files ([aa340b57](https://github.com/lob/lob-node/commit/aa340b579cc87999dc7c0ed1cc571e30cefafbda))

##### Bug Fixes

* **readme:** update documentation ([73afa906](https://github.com/lob/lob-node/commit/73afa906bd393097a3a4d18988e80f8bf6c4308b))

## 4.0.0 (2017-5-17)

##### Chores

* **mock:** use mock.lob.com ([1fed1c75](https://github.com/lob/lob-node/commit/1fed1c753eeb4f6a0ec15ee4f3619c2758d7c08e))
* **jobs:** removes jobs, objects, settings endpoints ([bbfd446e](https://github.com/lob/lob-node/commit/bbfd446e85f43f870d1c40ed76f6ec7d9ffc8281))

##### Documentation Changes

* **contributing:** changed out-of-date link to valid ([96e21cff](https://github.com/lob/lob-node/commit/96e21cffa16efbe5c5cb3473368ca0362dfbb057))

##### New Features

* **verifications:** add us and intl verification endpoints ENG-2769 ([13f5ed8c](https://github.com/lob/lob-node/commit/13f5ed8c3b1297707f077116d5770dea35c283fa))
* **version:** support Node versions 0.12, 4, 5, and 6. ([7754b22f](https://github.com/lob/lob-node/commit/7754b22f020343b5adb93e4b9c2a5e8241023cfc))

##### Bug Fixes

* **test:** fixes broken address test ([f22dcf8d](https://github.com/lob/lob-node/commit/f22dcf8d6041c58e5dc766dbf0196d8d62a22130))
* **examples:** fix typo ([50bb5487](https://github.com/lob/lob-node/commit/50bb5487ea392d16dd5782b3f51fd398a911684a))

### 3.9.0 (2016-4-15)

##### New Features

* **response:** allow access to response headers ([3c4d6514](https://github.com/lob/lob-node/commit/3c4d65149a133b196385849a1296d55b360cc202))
* **api-version:** support 2016-03-21 ([a304c9cf](https://github.com/lob/lob-node/commit/a304c9cfe927138b8b37345c7ffd2c1fb9f0518f))

### 3.8.0 (2016-2-2)

##### Chores

* **release:** add release scripts ([7cc243eb](https://github.com/lob/lob-node/commit/7cc243eb))

##### New Features

* **version:** support api version 2016-01-19 ([6cb6cec0](https://github.com/lob/lob-node/commit/6cb6cec0))
* **bank-accounts:** standardize verify function ([1d0b37c2](https://github.com/lob/lob-node/commit/1d0b37c2))
* **deps:** remove gulp ([a2c164a7](https://github.com/lob/lob-node/commit/a2c164a7))

##### Bug Fixes

* **errors:** always throw Error object ([41c88f97](https://github.com/lob/lob-node/commit/41c88f97))
* **readme:** update testing instructions ([f193cb0a](https://github.com/lob/lob-node/commit/f193cb0a))

##### Tests

* **resources:** standardize and remove unnecessary tests ([ad0e45ed](https://github.com/lob/lob-node/commit/ad0e45ed))
* **setup:** use global expect, api key, Lob ([6e44ce0b](https://github.com/lob/lob-node/commit/6e44ce0b))

## [**2.6.2**](https://github.com/lob/lob-node/releases/tag/v2.6.2)
- [**#88**] (https://github.com/lob/lob-node/pull/88) changed asset URLs to use lob-assets bucket
