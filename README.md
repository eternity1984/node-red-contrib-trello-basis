<p align="center">
    <a href="https://nodered.org/"><img src="https://img.shields.io/badge/Platform-Node--RED-brown.svg" alt="Platform"></a>
    <a href="https://flows.nodered.org/node/node-red-contrib-trello-basis"><img src="https://img.shields.io/npm/v/node-red-contrib-trello-basis/latest?color=brightgreen&label=ver@latest" alt="npm@latest"></a>
    <a href="https://www.npmjs.com/package/node-red-contrib-trello-basis"><img src="https://img.shields.io/npm/v/node-red-contrib-trello-basis/beta?color=inactive&label=ver@beta" alt="npm@beta"></a>
    <img src="https://img.shields.io/badge/npm-6.9.0-blue.svg" alt="npm">
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/node-red-contrib-trello-basis" alt="License: MIT"></a>
    <br>
    <a href="https://www.codacy.com/app/eternity1984/node-red-contrib-trello-basis"><img src="https://img.shields.io/codacy/grade/4bf2afde7d4043bd8523fd70d6d7b1fd?logo=codacy&logoWidth=18" alt="Codacy"></a>
    <a href="https://lgtm.com/projects/g/eternity1984/node-red-contrib-trello-basis/"><img src="https://img.shields.io/lgtm/grade/javascript/github/eternity1984/node-red-contrib-trello-basis?label=code%20quality&logo=lgtm" alt="LGTM"></a>
    <a href="https://lgtm.com/projects/g/eternity1984/node-red-contrib-trello-basis/alerts/"><img src="https://img.shields.io/lgtm/alerts/g/eternity1984/node-red-contrib-trello-basis.svg?logo=lgtm&logoWidth=18" alt="LGTM alert"></a>
    <a href="#"><img src="https://img.shields.io/snyk/vulnerabilities/npm/node-red-contrib-trello-basis" alt="vulnerabilities"></a>    
</p>


# node-red-contrib-trello-basis
A set of [Node-RED](http://www.nodered.org/) nodes to interact with the [Trello API](https://developers.trello.com/).

## Installation
Run the following command in the root directory of your Node-RED install:
```shell
$ npm install -s node-red-contrib-trello-basis
```

## Usage
![get-all-lists](/.images/example-get-all-lists.gif)

> **WARNING**:  
> The `DELETE` action is not reversible.

To learn more about [Adding Nodes](https://nodered.org/docs/getting-started/adding-nodes), take a look through [Node-RED](http://www.nodered.org/) documents.

### You can use a mustache-syntax to include variables from msg
For example, dynamically changing the **Path** field:
1.  Configure the **Path** field on the trello node to be `/boards/{{payload.id}}/lists`.

2.  Add a Function node and copy the following code into the **Function** field:
    ```javascript
    msg.payload = {
        "id": "YOUR_BOARD_ID"
    };
    return msg;
    ```  
    ![your-board-id](/.images/example-your-board-id.png)

3.  Wire the function and trello nodes.

## Acknowledgements
This project uses the following open source software:
-   [node-trello](https://www.npmjs.com/package/node-trello) for communicating with the [Trello API](https://developers.trello.com/).
-   [url-join](https://www.npmjs.com/package/url-join) for joining an absolute and a relative URL.
-   [mustache](https://www.npmjs.com/package/mustache) for templating the URL.

## License
This project is released under the [MIT License](http://opensource.org/licenses/mit-license.php).