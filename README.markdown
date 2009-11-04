Simplicity.js
=============

Simplicity is a tiny wrapper for mjsunit that helps writing asynchronous unit tests with node.js. In particular it makes it easy to organize your test expectations and show you which ones did not complete.

Install
-------

Put lib/simplicty.js in your test folder or make sure it can be reached from your require.paths.

Usage
-----

  process.mixin(require('simplicity'));

  expect('a test that finishes', function() {
    setTimeout(function() {
      ok();
    }, 100);
  });

  expect('a test that finishes in < 200ms', function() {
    setTimeout(function() {
      ok();
    }, 100);
  }).timeout(200);