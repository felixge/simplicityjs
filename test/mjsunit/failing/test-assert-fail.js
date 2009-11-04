process.mixin(GLOBAL, require('../common'));

expect('a test with a failing assertation', function(ok) {
  assertFalse(true);
  ok();
});