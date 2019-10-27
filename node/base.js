"use strict";
const join      = require("url-join");
const Trello    = require("node-trello");
const mustache  = require("mustache");

module.exports = class TrelloApiNode {
    constructor(RED, definition) {
        RED.nodes.createNode(this, definition);
        var node = this;

        var trelloConfig = RED.nodes.getNode(definition.config);
        var trello = new Trello(
            trelloConfig.credentials.key, 
            trelloConfig.credentials.token);

        var privateGetApiParams = function(msg) {
            var pathParams = node.getPathParams(RED, msg, definition) || {};
            var queryParams = node.getQueryParams(RED, msg, definition) || {};
            return [pathParams, queryParams];
        };

        node.on("input", function(msg, send, done) {
            send = send || function() { node.send.apply(node, arguments); }
            var injectionConfig = msg.trello_config;
            if (typeof injectionConfig ==="object") {
                trello = new Trello(
                    injectionConfig.apikey, 
                    injectionConfig.token);
                node.warn("Dynamically specified credentials are used.");
            } else if (typeof injectionConfig === "string") {
                var nodeRef = RED.nodes.getNode(injectionConfig);
                if ((typeof nodeRef === "object") && (nodeRef.type === "trello-config")) {
                    trello = new Trello(
                        nodeRef.credentials.key, 
                        nodeRef.credentials.token);
                    node.warn("Dynamically specified credentials are used.");
                } else {
                    node.warn("ValueError: `msg.trello_config` must be a string indicating the Trello-Config node ID");
                }
            }    
            var method  = definition.method;
            var path = msg.path || definition.path;
            var query = msg.query || definition.query || {};
            if (typeof query !== "object") {
                query = RED.util.evaluateNodeProperty(query, "json", this);
            }
            query = JSON.stringify(query);
            // For compatibility. the following code will be removed in 0.4
            var url = msg.url || definition.url;
            if (((typeof path === "undefined") || (path === "")) && (definition.url !== "")) {
                node.warn("Sorry for the inconvenience. Save the node config again to improve. (Open config and press DONE.)");
                return;
            }
            ////////////////////////////////////////////////////////////
            var [pathParams, queryParams] = privateGetApiParams(msg);
            var formattedPath = mustache.render(path, pathParams);
            var formattedQuery = JSON.parse(mustache.render(query, queryParams));
            trello.request(method, join("/1", formattedPath), formattedQuery, (err, data) => {
                if (err) {
                    if (done) {
                        done(err);
                    } else {
                        node.error(err, msg);
                    }
                } else {
                    msg.payload = data;
                    send(msg);
                    if (done) {
                        done();
                    }
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
};