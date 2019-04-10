const join      = require("url-join");
const Trello    = require("node-trello");
const mustache  = require("mustache");
"use strict";

module.exports = class TrelloApiNode {
    constructor(RED, definition) {
        RED.nodes.createNode(this, definition);
        var node = this;

        var trelloConfig = RED.nodes.getNode(definition.config);
        var trello = new Trello(
            trelloConfig.credentials.key, 
            trelloConfig.credentials.token);

        node.on("input", function(msg) {
            var method  = definition.method;
            var path = msg.path || definition.path;
            // For compatibility. the following code will be removed in 0.4
            var url = msg.url || definition.url;
            if (((typeof path === "undefined") || (path === "")) && (definition.url !== "")) {
                node.warn("Sorry for the inconvenience. Save the node config again to improve. (Open config and press DONE.)");
                return;
            }
            ////////////////////////////////////////////////////////////
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