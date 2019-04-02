const join = require("url-join");
const Trello = require("node-trello");
const mustache = require("mustache");

module.exports = function(RED) {
    function TrelloNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var trelloConfig = RED.nodes.getNode(config.config);
        var trello = new Trello(
            trelloConfig.credentials.key, 
            trelloConfig.credentials.token);

        node.on("input", function(msg) {
            var method = msg.method || config.method;
            var url = msg.url || config.url;
            if (typeof msg === "object") {
                url = mustache.render(url, msg);
            }
            var path = join("/1", url);
            var query = RED.util.evaluateNodeProperty(
                (msg.query || config.query || "{}"), "json", node);
            trello.request(method, path, query, (err, data) => {
                if (err) { 
                    node.error(err, msg);
                } else {
                    msg.payload = data;
                    node.send(msg);
                }
            });
        });
    }
    RED.nodes.registerType("trello", TrelloNode);
};