function getSkurtCarData(id, callback) {
  var http = require("http");
  var url = "http://skurt-interview-api.herokuapp.com/carStatus/" + id;

  var request = http.get(url, function (response) {
    var buffer = "", 
        route;
    response.on("data", function (chunk) {
      buffer += chunk;
    }); 
    response.on("end", function (err) {
      callback(buffer);
    });
  });
}

module.exports = getSkurtCarData;
