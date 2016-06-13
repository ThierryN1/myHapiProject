/**
 * Created by thierryn1 on 8/1/2015.
 * This file is only needed to run on OpsWorks (see https://github.com/nodejs-osaka/opsworks-hapi-tutorial)
 */
var Hapi = require('hapi');
//var server = new Hapi.Server('0.0.0.0', 80);
var server = new Hapi.Server();
server.connection({ port: 80 });

server.route({
    method: 'GET',
    path: '/greetings',
    handler: function (request, reply) {
        reply('Hello, world !!');
    }
});

var handler = function (request, reply) {
    var user = request.params.name ? encodeURIComponent(request.params.name) : 'stranger';
    reply('Hello, ' + user + '!');
}

server.route({
    method: 'GET',
    path: '/greetings/name='+'{name?}',
    handler: handler
});

server.route({
    method: 'GET',
    path: '/greetings/{name?}',
    handler: handler
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});