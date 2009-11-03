var sys = require('sys');
var mjsunit = require('mjsunit');

process.mixin(exports, mjsunit);

var queue = [], total = 0, passed = 0, running = [];
function next() {
	if (!queue.length) {
		return;
	}

	var expectation = queue.shift();
	expectation.promise.addErrback(function() {
		throw new Error('"'+expectation.name+'" timed out after: '+expectation.promise.timeout()+'ms');
	});

	var ok = function() {
		process.stdio.write('.');
		passed++;

		running.splice(running.indexOf(expectation));

		expectation.promise.emitSuccess();
	};

	running.push(expectation);
	var r = expectation.fn.call(null, ok);

	setTimeout(function() {
		next();
	})
};

exports.expect = function(name, fn) {
	var expectation = {name: name, fn: fn, promise: new process.Promise()};
	queue.push(expectation);

	if (!running.length) {
		next();
	}
	total++;

	return expectation.promise;
};


process.addListener('exit', function() {
	if (passed) {
		sys.puts("\n");
	}
	sys.puts(passed+"/"+total+" tests passed");

	var unfinished = [];
	running.forEach(function(expectation) {
		unfinished.push(expectation.name);
	});	
	unfinished = unfinished.join(', ');

	mjsunit.assertEquals('', unfinished, 'Tests that did not finish');
});