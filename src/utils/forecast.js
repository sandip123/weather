
const request = require('request');

const forecast = (address, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=e19d220b7adf4cc3821165343240705&q='+address;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `It is currently ${body.current.temp_c} degree outsode.`)
        }
    })
}



module.exports=forecast