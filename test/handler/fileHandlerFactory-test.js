var assert = require("assert");
var fileHandlerFactory = require("../../src/handler/fileHandlerFactory");

var testServeFile = function() {
	
	var fileHandler = fileHandlerFactory.create("./handler/web");
	
	var verifier = {};
	
	var verify = function() {
		assert.strictEqual(verifier.code, 200);
		assert.ok(verifier.data);
	};
	
	var response = {
		writeHead: function(code) { verifier.code = code; },
		write: function(data) { verifier.data = data; },
		end: function() { 
			verify();
		}
	};
	
	fileHandler.handle(null, response, null, "/test.txt");
};

var testNoMatchingFile = function() {
	
	var fileHandler = fileHandlerFactory.create("./handler/web");
	
	var verifier = {};
	
	var verify = function() {
		assert.ok(verifier.next);
	};
	
	var next = function() {
		verifier.next = true;
	};
	
	fileHandler.handle(null, null, next, "/NOMATCH");
};

exports.run = function() {
	testServeFile();
	testNoMatchingFile();
};