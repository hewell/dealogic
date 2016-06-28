'use strict';

var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

module.exports.handler = function(event, context, cb) {
    
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    return cb(null, {
    message: 'Go Serverless! Your Lambda function executed successfully!'
    });
};
