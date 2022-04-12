const express = require('express');
const app = express();
const port = 3333;
const AWS = require('aws-sdk');
const axios = require('axios');

app.get('/', async(req, res) => {
    var meta = new AWS.MetadataService();
    meta.request("/latest/meta-data/instance-id", function(err, data) {
        console.log(data);
        let instanceId = data || 'NA';
        //let instanceId = 'i-091fec15b42cc7e6b';
        // Make a request for a user with a given ID
        let url = `http://api-dev.kwikpic.in/api/app/ec2/entries/${instanceId}`;
        axios.get(url)
            .then(function(response) {
                // handle success
                console.log(response.data);
                let respdata = {
                    apidata: response.data,
                    instanceId: instanceId
                }
                res.json(respdata);
            })
            .catch(function(error) {
                // handle error
                console.log(error);
            });
    });

})

app.listen(port, () => {
    console.log(`Demo app is up and listening to port ${port}`);
})