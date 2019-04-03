[![Platform](https://img.shields.io/badge/Platform-Node--RED-brown.svg)](https://nodered.org/) ![npm](https://img.shields.io/badge/npm-6.9.0-blue.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4bf2afde7d4043bd8523fd70d6d7b1fd)](https://www.codacy.com/app/eternity1984/node-red-contrib-trello-basis?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=eternity1984/node-red-contrib-trello-basis&amp;utm_campaign=Badge_Grade) [![npm version](https://badge.fury.io/js/node-red-contrib-trello-basis.svg)](https://badge.fury.io/js/node-red-contrib-trello-basis)

# node-red-contrib-trello-basis
A set of [Node-RED](http://www.nodered.org/) nodes to interact with the [Trello API](https://developers.trello.com/).

## Installation
Run the following command in the root directory of your Node-RED install:
```shell
$ npm install -s node-red-contrib-trello-basis
```

## Usage
![get-all-lists](/images/example-get-all-lists.gif)

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
    ![your-board-id](/images/example-your-board-id.png)

3.  Wire the function and trello nodes.

## Acknowledgements
This project uses the following open source software:
-   [node-trello](https://www.npmjs.com/package/node-trello) for communicating with the [Trello API](https://developers.trello.com/).
-   [url-join](https://www.npmjs.com/package/url-join) for joining an absolute and a relative URL.
-   [mustache](https://www.npmjs.com/package/mustache) for templating the URL.

## License
This project is released under the [MIT License](http://opensource.org/licenses/mit-license.php).