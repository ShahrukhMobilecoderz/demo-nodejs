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
        //let instanceId = 'i-076acd439f4d65d6a';
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
                let html = `<h1>Instance id-${instanceId}</h1><br>
                <h2>Following are the assigned entries:-<br>`;

                let lists = `<ol>`
                console.log(response.data.data.instanceEntries, 'dfadf')
                for (var key in response.data.data.instanceEntries) {
                    console.log(key, response.data.data.instanceEntries[key], 'sss');
                    lists += `<li><p style='color:red;'>Key---->${key}</p> value- ${response.data.data.instanceEntries[key]}</li>`;
                }
                lists += '</ol>';
                html += lists;
                res.send(html);
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