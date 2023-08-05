V8 release v8.5
===============

Published 21 July 2020 · Tagged with [release](/blog/tags/release)

Every six weeks, we create a new branch of V8 as part of our [release process](https://v8.dev/docs/release-process). Each version is branched from V8’s Git master immediately before a Chrome Beta milestone. Today we’re pleased to announce our newest branch, [V8 version 8.5](https://chromium.googlesource.com/v8/v8.git/+log/branch-heads/8.5), which is in beta until its release in coordination with Chrome 85 Stable in several weeks. V8 v8.5 is filled with all sorts of developer-facing goodies. This post provides a preview of some of the highlights in anticipation of the release.

JavaScript [#](#javascript)
---------------------------

### `Promise.any` and `AggregateError` [#](#promise.any-and-aggregateerror)

`Promise.any` is a promise combinator that resolves the resulting promise as soon as one of the input promises is fulfilled.

    const promises = [  fetch('/endpoint-a').then(() => 'a'),  fetch('/endpoint-b').then(() => 'b'),  fetch('/endpoint-c').then(() => 'c'),];try {  const first = await Promise.any(promises);  // Any of the promises was fulfilled.  console.log(first);  // → e.g. 'b'} catch (error) {  // All of the promises were rejected.  console.assert(error instanceof AggregateError);  // Log the rejection values:  console.log(error.errors);}

If all input promises are rejected, the resulting promise is rejected with an `AggregateError` object containing an `errors` property which holds an array of rejection values.

Please see [our explainer](https://v8.dev/features/promise-combinators#promise.any) for more.

### `String.prototype.replaceAll` [#](#string.prototype.replaceall)

`String.prototype.replaceAll` provides an easy way to replace all occurrences of a substring without creating a global `RegExp`.

    const queryString = 'q=query+string+parameters';// Works, but requires escaping inside regular expressions.queryString.replace(/\+/g, ' ');// → 'q=query string parameters'// Simpler!queryString.replaceAll('+', ' ');// → 'q=query string parameters'

Please see [our explainer](https://v8.dev/features/string-replaceall) for more.

### Logical assignment operators [#](#logical-assignment-operators)

Logical assignment operators are new compound assignment operators that combine the logical operations `&&`, `||`, or `??` with assignment.

    x &&= y;// Roughly equivalent to x && (x = y)x ||= y;// Roughly equivalent to x || (x = y)x ??= y;// Roughly equivalent to x ?? (x = y)

Note that, unlike mathematical and bitwise compound assignment operators, logical assignment operators only conditionally perform the assignment.

Please read [our explainer](https://v8.dev/features/logical-assignment) for a more in-depth explanation.

WebAssembly [#](#webassembly)
-----------------------------

### Liftoff shipped on all platforms [#](#liftoff-shipped-on-all-platforms)

Since V8 v6.9, [Liftoff](https://v8.dev/blog/liftoff) has been used as the baseline compiler for WebAssembly on Intel platforms (and Chrome 69 enabled it on desktop systems). Since we were concerned about memory increase (because of more code being generated by the baseline compiler), we held it back for mobile systems so far. After some experimentation in the last months, we are confident that the memory increase is negligible for most cases, hence we finally enable Liftoff by default on all architectures, bringing increased compilation speed, especially on arm devices (32- and 64-bit). Chrome 85 follows along and ships Liftoff.

### Multi-value support shipped [#](#multi-value-support-shipped)

WebAssembly support for [multi-value code blocks and function returns](https://github.com/WebAssembly/multi-value) is now available for general use. This reflects the recent merge of the proposal in the official WebAssembly standard and is supported by all compilation tiers.

For instance, this is now a valid WebAssembly function:

    (func $swap (param i32 i32) (result i32 i32)  (local.get 1) (local.get 0))

If the function is exported, it can also be called from JavaScript, and it returns an array:

    instance.exports.swap(1, 2);// → [2, 1]

Conversely, if a JavaScript function returns an array (or any iterator), it can be imported and called as a multi-return function inside the WebAssembly module:

    new WebAssembly.Instance(module, {  imports: {    swap: (x, y) => [y, x],  },});

    (func $main (result i32 i32)  i32.const 0  i32.const 1  call $swap)

More importantly, toolchains can now use this feature to generate more compact and faster code within a WebAssembly module.

### Support for JS BigInts [#](#support-for-js-bigints)

WebAssembly support for [converting WebAssembly I64 values from and to JavaScript BigInts](https://github.com/WebAssembly/JS-BigInt-integration) has been shipped and is available for general use as per the latest change in the official standard.

Thereby WebAssembly functions with i64 parameters and return values can be called from JavaScript without precision loss:

    (module  (func $add (param $x i64) (param $y i64) (result i64)    local.get $x    local.get $y    i64.add)  (export "add" (func $add)))

From JavaScript, only BigInts can be passed as I64 parameter:

    WebAssembly.instantiateStreaming(fetch('i64.wasm'))  .then(({ module, instance }) => {    instance.exports.add(12n, 30n);    // → 42n    instance.exports.add(12, 30);    // → TypeError: parameters are not of type BigInt  });

V8 API [#](#v8-api)
-------------------

Please use `git log branch-heads/8.4..branch-heads/8.5 include/v8.h` to get a list of the API changes.

Developers with an active V8 checkout can use `git checkout -b 8.5 -t branch-heads/8.5` to experiment with the new features in V8 v8.5. Alternatively you can [subscribe to Chrome’s Beta channel](https://www.google.com/chrome/browser/beta.html) and try the new features out yourself soon.