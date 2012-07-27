nodotype.js
==========

**A simple http server built with node.js that is appropriate for use in rapid prototyping of client side code.**

The nodotype.js server is intended allow developers to define JSON over HTTP services using a fluid API with mimimal configuraion. The server also will handle static resources without any configuration. With nodotype.js, building apps is as easy as:

1. Place static resources in /web directory

2. Use the serverBuilder module to configure services and start the server


Getting Started
---------------

	var serverBuilder = require("./server/serverBuilder");

	var data = [{id: 1, greeting: "Hello", language: "English"},
			{id: 2, greeting: "Hola", language: "Spanish"},
			{id: 3, greeting: "Bonjour", language: "French"}];
								   
	serverBuilder.addService("/service/greeting", data).start();
	
This is all that is needed to configure and start a server with that will expose a service at /service/greeting to handle CRUD operations using RESTful semantics. 

API
==========
###serverBuilder.addService( path, data )
&nbsp;&nbsp;**returns** - self to allow chained service configuration
&nbsp;&nbsp;**path** - the path on which to expose the service
&nbsp;&nbsp;**data** - initial data for the service

###serverBuilder.start( port )
&nbsp;&nbsp;**port** - the port the server will listen on
