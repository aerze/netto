'use strict';
/*jshint browser:true, node: true */
/*globals define*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS
        if (process) module.exports = factory('node');
        else module.exports = factory();
    } else {
        // Global
        root.Netto = factory();
    }
}(this, function (env) {
    env = env || 'browser';

    var netProto  = {
        root: '',
        env: env,
        xhr: function (type, path, data, callback) {
            path = (!!this.root) ? this.root + path : path;
            data = data || '';
            callback = callback || 
            function (err, res) {
                if (err) throw err;
                else console.log(res);
            };
            
            var request = new XMLHttpRequest();
            request.open(type, path, true);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        callback(null, request.responseText);
                    } else {
                        var err = new Error('XHR Failed:: ' + request.status + ' ' + request.statusText);
                        err.status = request.status;
                        err.statusText = request.statusText;
                        err.req = request;
                        callback(err, null);
                    }
                }
            };
            request.send(data);
        },

        node: function (type, path, data, callback) {
            var http = require('http');
            data = data || '';
            data = (typeof data === 'object') ? JSON.stringify(data) : data;
            callback = callback || 
            function (err, res) {
                if (err) throw err;
                else console.log(res);
            };
            var options= {
                hostname: (!!this.root) ? this.root : 'localhost',
                path: path,
                method: type
            };

            var body = '';
            var req = http.request(options, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    body += chunk;
                });
                res.on('end', function () {
                    if (res.statusCode === 204) callback(null, JSON.stringify({status: res.statusCode, text: res.statusMessage}));
                    else if (res.statusCode === 200) callback(null, body);
                    else {
                        var err = new Error('HTTP Request Failed:: ' + res.statusCode + ' ' + res.statusMessage);
                        err.status = res.statusCode;
                        err.statusText = res.statusMessage;
                        err.req = res;
                        callback(err, null);
                    }
                });
            });

            req.on('Error', function (err) {
                callback(err, null);
            });
            if (!!data) req.write(data);
            req.end();
        },

        req: function (type, path, data, callback) {
            if (env === 'node') this.node(type, path, data, callback);
            else this.xhr(type, path, data, callback);
        },

        get: function (path, callback) {
            this.req('get', path, null, callback);
        },

        post: function (path, data, callback) {
            this.req('post', path, data, callback);
        },

        put: function (path, data, callback) {
            this.req('put', path, data, callback);
        },

        patch: function (path, data, callback) {
            this.req('patch', path, data, callback);
        },

        delete: function (path, callback) {
            this.req('delete', path, null, callback);
        },

        getJson: function (path, callback) {
            this.get(path, function (err, data) {
                if (err) callback(err, null);
                else callback(null, JSON.parse(data));
            });
        }
    };

    return Object.create(netProto);
}));

