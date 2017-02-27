function getSkurtCarData(id) {
    console.log('in getSkurtCarData');
  var http = require("http");
  var url = "http://skurt-interview-api.herokuapp.com/carStatus/{id}";
  
  // get is a simple wrapper for request()
  // which sets the http method to GET
  var request = http.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "", 
        data,
        route;
  
    response.on("data", function (chunk) {
      buffer += chunk;
    }); 
  
    response.on("end", function (err) {
      // finished transferring data
      // dump the raw data
      console.log(buffer);
      console.log("\n");
      data = JSON.parse(buffer);
  
      // extract the data
      console.log("Car 1: " + data);
       return data;
    }); 
  });
}

module.exports = getSkurtCarData;
