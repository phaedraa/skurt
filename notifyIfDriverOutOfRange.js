var getOrderedCarLocAndPolygonFromFeatures = require('./getOrderedCarLocAndPolygonFromFeatures');
var getSkurtCarData = require('./getSkurtCarData.js');
var isCarOutsideRange = require('./isCarOutsideRange.js');
var sendEmailToEng = require('./sendEmailToEng.js');

const NUM_CARS = 11;

function notifyIfDriverOutOfRange() {
  for (var carID = 1; carID <= NUM_CARS; carID++) {
    getSkurtCarData(carID, validateCarLocation);
  }
}

function validateCarLocation(carData) {
  var data = JSON.parse(carData);
  if (!data) {
    sendEmailToEng(
      'API Failure: Expected object, but received: ' + data,
      'ALERT: API Failure'
    );
  }

  var features = getOrderedCarLocAndPolygonFromFeatures(
    JSON.parse(carData).features
  );
  if (isCarOutsideRange(features)) {
    var carID = features[0].properties.id;
    var carLoc = features[0].geometry.coordinates;
    var coordinates = '[' 
    sendEmailToEng(
      'Car ' + carID + ' is out of bounds at: [' + carLoc[0] + ', ' +
      carLoc[1] + ']',
      'ALERT: OUT OF BOUNDS EXCEPTION for Car: ' + carID
    );
  }
}

notifyIfDriverOutOfRange();