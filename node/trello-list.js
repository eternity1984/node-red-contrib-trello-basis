const TrelloApiNode = require("./base");

module.exports = function(RED) {
    class TrelloListNode extends TrelloApiNode {
        constructor(definition) {
            super(RED, definition);
        }
        getPathParams(RED, msg, definition) {
            var paramType = definition.pathParamType;
            if (paramType === "full") {
                return msg;
            } else {
                var param = definition.pathParam;
                return RED.util.evaluateNodeProperty(param, paramType, this, msg);
            }
        }
        getQueryParams(RED, msg, definition) {
            var query = msg.query || definition.query || {};
            if (typeof query !== "object") {
                query = RED.util.evaluateNodeProperty(query, "json", this);
            }
            return query;
        }
    }
    RED.nodes.registerType("trello-list", TrelloListNode);
};