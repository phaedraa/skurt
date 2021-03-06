var getInfoFromFeatures = require('./getInfoFromFeatures');
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
  if (!carData || !JSON.parse(carData)) {
    sendEmailToEng(
      'API Failure: Expected object, but received: ' + carData,
      'ALERT: API Failure'
    );
  }

  var features = getInfoFromFeatures(
    JSON.parse(carData).features
  );
  if (isCarOutsideRange(features)) {
    var carID = features[0].properties.id;
    var carLoc = features[0].geometry.coordinates;
    var coordinates = '[' + carLoc[0] + ', ' + carLoc[1] + ']';
    sendEmailToEng(
      'Car ' + carID + ' is out of bounds at: ' + coordinates,
      'ALERT: OUT OF BOUNDS EXCEPTION for Car: ' + carID
    );
  }
}

notifyIfDriverOutOfRange();