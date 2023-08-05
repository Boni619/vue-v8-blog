V8 release v8.0
===============

Published 18 December 2019 · Tagged with [release](/blog/tags/release)

a{pointer-events:auto}text{font-family:Helvetica,Roboto,Segoe UI,Calibri,sans-serif;fill:#1c2022;font-weight:400}.bg,.divider{stroke:#e1e8ed;stroke-width:.8;fill:#fff}a.name text{font-weight:700}.subText,a.like text,a.name .subText{fill:#697882;font-size:14px;font-weight:400}a.like path{fill:url(#b)}a:focus text,a:hover text{fill:#3b94d9}a.like:focus text,a.like:hover text{fill:#e0245e}a.like:focus path,a.like:hover path{fill:url(#B)}.dark .bg{stroke:#66757f;fill:#000}.dark text{fill:#f5f8fa}.dark .subText,.dark a.like text,.dark a.name .subText{fill:#8899a6}.dark a:focus text,.dark a:hover text{fill:#55acee}.dark a.like:focus text,.dark a.like:hover text{fill:#e0245e}Josebaba 💥@fullstackmofoReplying to @v8jsV8 almost at v8422:09 - 20 Nov 2019Connor ‘Stryxus’ Shearer@StryxusReplying to @v8jsWhat happens when v8 reaches v8? 🤔1117:19 - 20 Nov 2019Thibault Molleman@thibaultmolReplying to @v8jsWait. What happens when we get V8 V8?11:37 - 20 Jun 2019Greg Miernicki@gregulatoreReplying to @v8jsAnything special planned for v8 v8.0? 😅516:43 - 13 Aug 2019SignpostMarv@SignpostMarvReplying to @v8js @ChromiumDevare you going to be having an extra special party when V8 goesv8?1816:20 - 27 Sep 2019

It’s finally here. Every V8 release, every six weeks when we branch as part of our [release process](/docs/release-process), the question comes up about what will happen when V8 hits version 8. Will we have a party? Will we ship a new compiler? Will we skip versions 8 and 9 and just stay at an eternal V8 version X? Finally, after [over 10 years](/blog/10-years) of work, on our 100th blog post, we’re pleased to announce our newest branch, [V8 version 8.0 V8](https://chromium.googlesource.com/v8/v8.git/+log/branch-heads/8.0), and we can finally answer that question:

It’s bug fixes and performance improvements.

This post provides a preview of some of the highlights in anticipation of the release in coordination with Chrome 80 Stable in several weeks.

Performance (size & speed) [#](#performance)
--------------------------------------------

### Pointer compression [#](#pointer-compression)

We changed all our `void *` to `pv`, reducing source file size by up to 66%.

The V8 heap contains a whole slew of items, for example floating point values, string characters, compiled code, and tagged values (which represent pointers into the V8 heap or small integers). Upon inspection of the heap, we discovered that these tagged values occupy the majority of the heap!

Tagged values are as big as the system pointer: they are 32 bits wide for 32-bit architectures, and 64 bits in 64-bit architectures. Then, when comparing the 32-bit version with the 64-bit one, we are using twice as much heap memory for every tagged value.

Luckily for us, we have a trick up our sleeve. The top bits can be synthesized from the lower bits. Then, we only need to store the unique lower bits into the heap saving precious memory resources... to save an average of 40% of the heap memory!

![](/_img/v8-release-80/pointer-compression-chart.svg)

Pointer compression saves an average of 40% of memory.

When improving memory, usually it comes at the cost of performance. Usually. We are proud to announce that we saw improvements in performance on real websites in the time spent in V8, and in its garbage collector!

Desktop

Mobile

Facebook

V8-Total

\-8%

\-6%

GC

\-10%

\-17%

CNN

V8-Total

\-3%

\-8%

GC

\-14%

\-20%

Google Maps

V8-Total

\-4%

\-6%

GC

\-7%

\-12%

If pointer compression piqued your interest, be on the lookout for a full blog post with more details.

### Optimizing higher-order builtins [#](#optimizing-higher-order-builtins)

We recently removed a limitation within TurboFan’s optimization pipeline that prevented aggressive optimizations of higher-order builtins.

    const charCodeAt = Function.prototype.call.bind(String.prototype.charCodeAt);charCodeAt(string, 8);

So far, the call to `charCodeAt` was completely opaque to TurboFan, which led to the generation of a generic call to a user-defined function. With this change, we are now able to recognize that we are actually calling the built-in `String.prototype.charCodeAt` function and are thus able to trigger all the further optimizations that TurboFan has in stock to improve calls to builtins, which leads to the same performance as:

    string.charCodeAt(8);

This change affects a bunch of other builtins like `Function.prototype.apply`, `Reflect.apply`, and many higher-order array builtins (e.g. `Array.prototype.map`).

JavaScript [#](#javascript)
---------------------------

### Optional chaining [#](#optional-chaining)

When writing chains of property accesses, programmers often need to check if intermediate values are nullish (that is, `null` or `undefined`). A chain without error checking may throw, and a chain with explicit error checking is verbose and has the unwanted consequence of checking for all truthy values instead of only non-nullish values.

    // Error prone-version, could throw.const nameLength = db.user.name.length;// Less error-prone, but harder to read.let nameLength;if (db && db.user && db.user.name)  nameLength = db.user.name.length;

[Optional chaining](https://v8.dev/features/optional-chaining) (`?.`) lets programmers write terser, robust chains of property accesses that check if intermediate values are nullish. If an intermediate value is nullish, the entire expression evaluates to `undefined`.

    // Still checks for errors and is much more readable.const nameLength = db?.user?.name?.length;

In addition to static property accesses, dynamic property accesses and calls are also supported. Please see our [feature explainer](https://v8.dev/features/optional-chaining) for details and more examples.

### Nullish coalescing [#](#nullish-coalescing)

The [nullish coalescing](https://v8.dev/features/nullish-coalescing) operator `??` is a new short-circuiting binary operator for handling default values. Currently, default values are sometimes handled with the logical `||` operator, such as in the following example.

    function Component(props) {  const enable = props.enabled || true;  // …}

Use of `||` is undesirable for computing default values because `a || b` evaluates to `b` when `a` is falsy. If `props.enabled` were explicitly set to `false`, `enable` would still be true.

With the nullish coalescing operator, `a ?? b` evaluates to `b` when `a` is nullish (`null` or `undefined`), and otherwise evaluates to `a`. This is the desired default value behavior, and rewriting the example using `??` fixes the bug above.

    function Component(props) {  const enable = props.enabled ?? true;  // …}

The nullish coalescing operator and optional chaining are companion features and work well together. The example may be further amended to handle the case when no `props` argument is passed in.

    function Component(props) {  const enable = props?.enabled ?? true;  // …}

Please see our [feature explainer](https://v8.dev/features/nullish-coalescing) for details and more examples.

V8 API [#](#v8-api)
-------------------

Please use `git log branch-heads/7.9..branch-heads/8.0 include/v8.h` to get a list of the API changes.

Developers with an [active V8 checkout](/docs/source-code#using-git) can use `git checkout -b 8.0 -t branch-heads/8.0` to experiment with the new features in V8 v8.0. Alternatively you can [subscribe to Chrome’s Beta channel](https://www.google.com/chrome/browser/beta.html) and try the new features out yourself soon.