process.mixin(GLOBAL, require('../common'));

expect('a test that finishes', function(ok) {
  ok();
});

expect('a test that does not finish', function(ok) {
  
});

expect('another test that does finish', function(ok) {
  ok();
});