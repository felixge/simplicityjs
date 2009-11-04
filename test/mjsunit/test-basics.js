process.mixin(GLOBAL, require('./common'));

var firstTestRunning = false;
expect('async tests to work great', function(ok) {
  firstTestRunning = true;
  setTimeout(function() {
    firstTestRunning = false;
    ok();
  }, 1000);
});

expect('async test to run in parallel', function(ok) {
  assertTrue(firstTestRunning);
  ok();
});