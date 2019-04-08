const TrelloApiNode = require("./base");

module.exports = function(RED) {
    class TrelloNode extends TrelloApiNode {
        constructor(definition) {
            super(RED, definition, {});
        }
        getQueryParams(RED, msg, definition) {
            var query = msg.query || definition.query || {};
            if (typeof query !== "object") {
                query = RED.util.evaluateNodeProperty(query, "json", this);
            }
            return query;
        }
    }
    RED.nodes.registerType("trello", TrelloNode);
};