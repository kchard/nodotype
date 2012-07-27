var util = require("util");var create = function(path, dao) {		var handle = function(req, res, next, pathname) {				var error = function() {			console.log("(serviceHandler) Delegating to next handler: " + pathname);			next();		};				var handleGet = function(id) {						var success = function(data) {				console.log("(serviceHandler) Handled GET for pathname: " + pathname);				res.writeHead(200);				res.write(util.format("%j", data));				res.end();			};						if(id) {				dao.get(id, success, error);			} else {				dao.getAll(success, error);			}		};				var handlePost = function(data) {			dao.create(data, function(data) {				console.log("(serviceHandler) Handled POST for pathname: " + pathname);				res.writeHead(201, {"Location": pathname + "/" + data.id});				res.end();			}, error);		};				var handlePut = function(data) {			dao.update(data, function(data) {				console.log("(serviceHandler) Handled PUT for pathname: " + pathname);				res.writeHead(200);				res.end();			}, error);		};				var handleDelete = function(id) {			dao.destroy(id, function(data) {				console.log("(serviceHandler) Handled DELETE for pathname: " + pathname);				res.writeHead(200);				res.end();			}, error);		};				var extractId = function() {			var id;			if(pathname.charAt(path.length) === "/"){				id = Number(pathname.substring(path.length + 1));			}						return id;		};				var id = extractId();				var body = '';        req.on('data', function (data) {            body += data;        });		        req.on('end', function () {			var data;			if(body) {				data = JSON.parse(body);			}						if(req.method === "GET") {				handleGet(id);			} else if (req.method === "POST") {				handlePost(data)			} else if (req.method === "PUT") {				handlePut(data);			} else if (req.method === "DELETE") {				handleDelete(id);			} else {				next();			}        });	};		return {path: path, handle: handle};};exports.create = create;