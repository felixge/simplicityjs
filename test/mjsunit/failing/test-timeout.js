process.mixin(GLOBAL, require('../common'));

expect('a test that times out', function() {
  setTimeout(function() {
    ok();
  }, 200);
}).timeout(100);