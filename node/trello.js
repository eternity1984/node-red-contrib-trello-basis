const join = require('url-join');
const Trello = require('node-trello');

module.exports = function(RED) {
    function TrelloNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var trello_config = RED.nodes.getNode(config.config);
        var trello = new Trello(
            trello_config.credentials.key, 
            trello_config.credentials.token);

        node.on('input', function(msg) {
            var method = msg.method || config.method;
            var path = join("/1", msg.url || config.url);    
            var query = RED.util.evaluateNodeProperty(
                (msg.query || config.query || "{}"), "json", node);
            trello.request(method, path, query, (err, data) => {
                if (err) { 
                    node.error(err, msg);
                    return;
                }
                msg.payload = data;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("trello", TrelloNode);
};