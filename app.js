const express = require('express');
const app = express();
const port = 3000;
const AWS = require('aws-sdk');
const axios = require('axios');

app.get('/', async(req, res) => {
    var meta = new AWS.MetadataService();
    meta.request("/latest/meta-data/instance-id", function(err, data) {
        console.log(data);
        // Make a request for a user with a given ID
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(function(response) {
                // handle success
                console.log(response.data);
            })
            .catch(function(error) {
                // handle error
                console.log(error);
            });
    });
    res.send('<h1>Auto Scaling Demo</h1>');
})

app.listen(port, () => {
    console.log(`Demo app is up and listening to port ${port}`);
})