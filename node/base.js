const join      = require("url-join");
const Trello    = require("node-trello");
const mustache  = require("mustache");
"use strict";

module.exports = class TrelloApiNode {
    constructor(RED, definition, options = {}) {
        RED.nodes.createNode(this, definition);
        var node = this;

        var trelloConfig = RED.nodes.getNode(definition.config);
        var trello = new Trello(
            trelloConfig.credentials.key, 
            trelloConfig.credentials.token);

        node.on("input", function(msg) {
            var method  = definition.method;
            var path = msg.path || definition.path;
            var [pathParams, queryParams] = this.getApiParams(RED, msg, definition);
            var formattedPath = mustache.render(path, pathParams);
            trello.request(method, join("/1", formattedPath), queryParams, (err, data) => {
                if (err) { 
                    node.error(err, msg);
                } else {
                    msg.payload = data;
                    node.send(msg);
                }
            });
        });
    }

    getPathParams(RED, msg, definition) {
        return msg;
    }

    getQueryParams(RED, msg, definition) {
        return {};
    }

    getApiParams(RED, msg, definition) {
        var pathParams = this.getPathParams(RED, msg, definition) || {};
        var queryParams = this.getQueryParams(RED, msg, definition) || {};
        return [pathParams, queryParams];
    }
};