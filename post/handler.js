'use strict';

var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

module.exports.handler = function(event, context, cb) {
    
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    var operation = event.operation;
    if(event.tableName){
        event.payload.tableName = event.tableName;
    }
    
    switch(operation){
        case "create":
            var uuid = require('node-uuid');
            event.payload.Item.id = uuid.v1();
            dynamo.putItem(event.payload, context.done);
            break;
            
    }
    
    return cb(null, {
    message: 'Go Serverless! Your Lambda function executed successfully!'
    });
};
