module.exports = function (RED) {
    function TrelloNodeConfig(config){
        RED.nodes.createNode(this, config);
        this.key = config.key;
        this.token = config.token;
    }
    RED.nodes.registerType("trello-config", TrelloNodeConfig, {
        credentials: {
            key: { type: "password" },
            token: { type: "password" }
        }
    });
};