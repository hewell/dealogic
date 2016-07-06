'use strict';

var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

module.exports.handler = function (event, context, cb) {

    console.log('Received event:', JSON.stringify(event, null, 2));

    var operation = event.operation;
    if (event.tableName) {
        event.payload.TableName = event.tableName;
    }

    switch (operation) {
    case "create":
        event.payload.Item.id = event.payload.Item.content.id;
        saveFeed(event.payload.Item.content.host, event.payload.Item.content.path, event.payload, context);
        break;
    case "read":
        dynamo.getItem(event.payload, context.done);
        break;
    }
};

function saveFeed(host, path, payload, context) {
    var http = require('http'),
        xml2js = require('xml2js'),
        parser = new xml2js.Parser(),
        concat = require('concat-stream');

    console.log('Read from url: ', host + path);
    return http.get({
        host: host,
        path: path
    }, function (response) {
        response.pipe(concat(function (body) {
            parser.parseString(body, function (err, result) {
                if (err) {
                    console.log('Got error: ' + err.message);
                } else {
                    var jsonStr = JSON.stringify(result);
                    if (jsonStr !== "{\"STATUS\":\"FAILED\"}") {
                        payload.Item.json = jsonStr;
                        dynamo.putItem(payload, context.done);
                        console.log('Done.');
                    } else {
                        console.log('Failed to read xml feed.');
                    }
                }
            });
        }))
    });

};