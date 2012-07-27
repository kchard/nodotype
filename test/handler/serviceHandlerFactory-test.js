var assert = require("assert");
var serviceHandlerFactory = require("../../src/handler/serviceHandlerFactory");

var testGet = function() {
	
	var verifier = {};
	
	var verify = function() {
		assert.strictEqual(verifier.code, 200);
		assert.strictEqual(verifier.data, "{\"id\":1}");
	};
	
	var dao = {
		get: function(id, success) { success({id: id}); }
	};
	
	var request = {
		method: "GET",
		on: function(event, success) { if(event === "end") { success(); } }
	};
	
	var response = {
		writeHead: function(code) { verifier.code = code; },
		write: function(data) { verifier.data = data; },
		end: function() { 
			verify();
		}
	};
	
	var serviceHandler = serviceHandlerFactory.create("/path", dao);
	serviceHandler.handle(request, response, null, "/path/1");
};

var testGetAll = function() {
	
	var verifier = {};
	
	var verify = function() {
		assert.strictEqual(verifier.code, 200);
		assert.strictEqual(verifier.data, "[{\"id\":1}]");
	};
	
	var dao = {
		getAll: function(success) { success([{id: 1}]); }
	};
	
	var request = {
		method: "GET",
		on: function(event, success) { if(event === "end") { success(); } }
	};
	
	var response = {
		writeHead: function(code) { verifier.code = code; },
		write: function(data) { verifier.data = data; },
		end: function() { 
			verify();
		}
	};
	
	var serviceHandler = serviceHandlerFactory.create("/path", dao);
	serviceHandler.handle(request, response, null, "/path");
};

var testCreate = function() {
	
	var verifier = {};
	
	var verify = function() {
		assert.strictEqual(verifier.code, 201);
		assert.strictEqual(verifier.headers["Location"], "/path/1");	
	};
	
	var dao = {
		create: function(data, success) { success({id: 1});} 
	};
	
	var request = {
		method: "POST",
		on: function(event, callback) { 
				if(event === "data") { 
					callback("{}"); 
				} 
				
				if(event === "end") { 
					callback(); 
				} 
		}
	};
	
	var response = {
		writeHead: function(code, headers) { verifier.code = code; verifier.headers = headers},
		end: function() { 
			verify();
		}
	};
	
	var serviceHandler = serviceHandlerFactory.create("/path", dao);
	serviceHandler.handle(request, response, null, "/path");
};

var testUpdate = function() {
	
	var verifier = {};
	
	var verify = function() {
		assert.strictEqual(verifier.code, 200);
	};
	
	var dao = {
		update: function(data, success) { success({}); } 
	};
	
	var request = {
		method: "PUT",
		on: function(event, callback) { 
				if(event === "data") { 
					callback("{}"); 
				} 
				
				if(event === "end") { 
					callback(); 
				} 
		}
	};
	
	var response = {
		writeHead: function(code, headers) { verifier.code = code},
		end: function() { 
			verify();
		}
	};
	
	var serviceHandler = serviceHandlerFactory.create("/path", dao);
	serviceHandler.handle(request, response, null, "/path/1");
};

var testDelete = function() {
	
	var verifier = {};
	
	var verify = function() {
		assert.strictEqual(verifier.code, 200);
	};
	
	var dao = {
		destroy: function(data, success) { success(); } 
	};
	
	var request = {
		method: "DELETE",
		on: function(event, callback) { 
				if(event === "data") { 
					callback("{}"); 
				} 
				
				if(event === "end") { 
					callback(); 
				} 
		}
	};
	
	var response = {
		writeHead: function(code, headers) { verifier.code = code},
		end: function() { 
			verify();
		}
	};
	
	var serviceHandler = serviceHandlerFactory.create("/path", dao);
	serviceHandler.handle(request, response, null, "/path/1");
};


exports.run = function() {
	testGet();
	testGetAll();
	testCreate();
	testUpdate();
	testDelete();
};