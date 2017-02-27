function getSkurtCarData(id) {
  console.log('in getSkurtCarData');
  var http = require("http");
  var url = "http://skurt-interview-api.herokuapp.com/carStatus/" + id;
  console.log('url: ', url);
  var request = http.get(url, function (response) {
    console.log('in request');
    var buffer = "", 
        data,
        route;
  
    response.on("data", function (chunk) {
      buffer += chunk;
    }); 
    console.log('buffer: ', buffer);
    response.on("end", function (err) {
      // finished transferring data
      // dump the raw data
      console.log(buffer);
      console.log("\n");
      data = JSON.parse(buffer);
  
      // extract the data
      console.log("Car 1: " + data);
      return buffer;
    }); 
  });

  console.log('request', request);
  //console.log('data', data);
}

module.exports = getSkurtCarData;
