const config = require('./config');
const axios = require('axios');

module.exports = async function (context, req) {
    const {from, to} = req.body;

    if(from && to) {
        await axios({
            baseURL: config.endpoint,
            url: 'translate', 
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': config.key,
            },
            params: {
                'api-version': '3.0',
                'from': from,
                'to': to,
            },
            data: [{
                'text': req.body.text
            }],
        }).then(function (response) {
            context.res = {
                status: 200,
                body: response.data
            };
        }).catch(function(err) {
            context.res = {
                status: 502,
                body: err
            }
        })
    } else {
        context.res = {
            status: 400,
            body: {message: 'To/From doesn\'t found'}
        };
    }
}