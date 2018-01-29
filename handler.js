var request = require('request');

const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="
const CA_KEY = process.env.CA_KEY;

module.exports.getGeocode = (event, context, callback) => {
  console.log ("Inside get GEO Code for given Address ");

  var response = { 
    statusCode: 200,
    body: "",
  };

  if (event.queryStringParameters.address.length == 0) {
    console.log ("Address is needed to call the google API ");
    response.statusCode = 101;
    response.body = JSON.stringify({errorDescription: "Address is needed"});
    callback (null, response);
  }

  const urlFinal = baseUrl+event.queryStringParameters.address+'&key='+CA_KEY

  request (urlFinal, function (error, res, body) {
    if (error) {
      console.log ("error occurred while making the call to google API " + error)
      response.statusCode = 102;
      response.body = JSON.stringify({errorDescription: error});
      callback (null, response);      
    } else if (res.statusCode == 200) {
      response.body = body;
      callback (null, response);
    } else {
      console.log ("Expected status code 200. Actual Status code " + res.statusCode );
      response.statusCode = res.statusCode;
      response.body = JSON.stringify({errorDescription: "Some error occurred"});      
      callback (null, response);
    }
  })
 

};
