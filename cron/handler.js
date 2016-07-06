'use strict';

var request = require('request'),
    fs = require('fs'),
    obj;

module.exports.handler = function (event, context, cb) {

    // Read the file and send to the callback
    fs.readFile('deals.json', handleFile)

    // Write the callback function
    function handleFile(err, data) {
        if (err) throw err
        obj = JSON.parse(data)
        obj.deals.forEach(postDeal);
    }

    function postDeal(deal) {
        if (deal.id && deal.path) {
            request.post(
                process.env.LAMBDA_API, {
                    json: {
                        "id": deal.id,
                        "host": process.env.HOST,
                        "path": deal.path
                    }
                },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body)
                    }
                }
            );
        }
    }
};