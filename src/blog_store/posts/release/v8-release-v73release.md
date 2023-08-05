V8 release v7.3
===============

Published 07 February 2019 · Tagged with [release](/blog/tags/release)

Every six weeks, we create a new branch of V8 as part of our [release process](/docs/release-process). Each version is branched from V8’s Git master immediately before a Chrome Beta milestone. Today we’re pleased to announce our newest branch, [V8 version 7.3](https://chromium.googlesource.com/v8/v8.git/+log/branch-heads/7.3), which is in beta until its release in coordination with Chrome 73 Stable in several weeks. V8 v7.3 is filled with all sorts of developer-facing goodies. This post provides a preview of some of the highlights in anticipation of the release.

Async stack traces [#](#async-stack-traces)
-------------------------------------------

We are turning on [the `--async-stack-traces` flag](/blog/fast-async#improved-developer-experience) by default. [Zero-cost async stack traces](https://bit.ly/v8-zero-cost-async-stack-traces) make it easier to diagnose problems in production with heavily asynchronous code, as the `error.stack` property that is usually sent to log files/services now provides more insight into what caused the problem.

Faster `await` [#](#faster-await)
---------------------------------

Related to the above-mentioned `--async-stack-traces` flag, we’re also enabling the `--harmony-await-optimization` flag by default, which is a prerequisite for the `--async-stack-traces`. See [faster async functions and promises](/blog/fast-async#await-under-the-hood) for more details.

Faster Wasm startup [#](#faster-wasm-startup)
---------------------------------------------

Via optimizations to the internals of Liftoff, we improved WebAssembly compilation speed significantly without regressing the quality of the generated code. For most workloads, compilation time reduced by 15–25%.

![](/_img/v8-release-73/liftoff-epic.svg)

Liftoff compile time on [the Epic ZenGarden demo](https://s3.amazonaws.com/mozilla-games/ZenGarden/EpicZenGarden.html)

JavaScript language features [#](#javascript-language-features)
---------------------------------------------------------------

V8 v7.3 comes with several new JavaScript language features.

### `Object.fromEntries` [#](#object.fromentries)

The `Object.entries` API is nothing new:

    const object = { x: 42, y: 50 };const entries = Object.entries(object);// → [['x', 42], ['y', 50]]

Unfortunately, there’s no easy way to go from the `entries` result back to an equivalent object… until now! V8 v7.3 supports [`Object.fromEntries()`](/features/object-fromentries), a new built-in API that performs the inverse of `Object.entries`:

    const result = Object.fromEntries(entries);// → { x: 42, y: 50 }

For more information and example use cases, see [our `Object.fromEntries` feature explainer](/features/object-fromentries).

### `String.prototype.matchAll` [#](#string.prototype.matchall)

A common use case of global (`g`) or sticky (`y`) regular expressions is applying it to a string and iterating through all of the matches. The new `String.prototype.matchAll` API makes this easier than ever before, especially for regular expressions with capture groups:

    const string = 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev';const regex = /\b(?<owner>[a-z0-9]+)\/(?<repo>[a-z0-9\.]+)\b/g;for (const match of string.matchAll(regex)) {  console.log(`${match[0]} at ${match.index} with '${match.input}'`);  console.log(`→ owner: ${match.groups.owner}`);  console.log(`→ repo: ${match.groups.repo}`);}// Output://// tc39/ecma262 at 23 with 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev'// → owner: tc39// → repo: ecma262// v8/v8.dev at 36 with 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev'// → owner: v8// → repo: v8.dev

For more details, read [our `String.prototype.matchAll` explainer](/features/string-matchall).

### `Atomics.notify` [#](#atomics.notify)

`Atomics.wake` has been renamed to `Atomics.notify`, matching [a recent spec change](https://github.com/tc39/ecma262/pull/1220).

V8 API [#](#v8-api)
-------------------

Please use `git log branch-heads/7.2..branch-heads/7.3 include/v8.h` to get a list of the API changes.

Developers with an [active V8 checkout](/docs/source-code#using-git) can use `git checkout -b 7.3 -t branch-heads/7.3` to experiment with the new features in V8 v7.3. Alternatively you can [subscribe to Chrome’s Beta channel](https://www.google.com/chrome/browser/beta.html) and try the new features out yourself soon.