const TrelloApiNode = require("./base");

module.exports = function(RED) {
    class TrelloNode extends TrelloApiNode {
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
            var paramType = definition.queryParamType;
            if (paramType === "full") {
                return msg;
            } else {
                var param = definition.queryParam;
                return RED.util.evaluateNodeProperty(param, paramType, this, msg);
            }
        }
    }
    RED.nodes.registerType("trello", TrelloNode);
};