'use strict';

var request = require('request');

module.exports.handler = function (event, context, cb) {

    request.post(
        'https://toplad3fsc.execute-api.us-east-1.amazonaws.com/dev/post', {
            json: {
                "id": "63643",
                "host": process.env.HOST,
                "path": "/scripts/dwmaisapi.dll?MAILSERV&ACTION=EXECLIB&LIBID=63641&ACCOUNT=DEALOGIC&USERNAME=AFR_TABLES&PASSWORD=XML&FORMAT=XML"
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );
};