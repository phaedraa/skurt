var getSkurtCarData = require('./getSkurtCarData.js');
var isCarOutsideRange = require('./isCarOutsideRange.js');
var sendEmailToEng = require('./sendEmailToEng.js');
var getOrderedCarLocAndPolygonFromFeatures = require('./getOrderedCarLocAndPolygonFromFeatures');

const NUM_CARS = 11;

function notifyIfDriverOutOfRange() {
  for (var carID = 1; carID <= NUM_CARS; carID++) {
    getSkurtCarData(carID, validateCarLocation);
  }
}

function validateCarLocation(carData) {
  features = getOrderedCarLocAndPolygonFromFeatures(JSON.parse(carData).features);
  if (isCarOutsideRange(features)) {
    sendEmailToEng(features[0].geometry.coordinates, features[0].properties.id)
  }
}

notifyIfDriverOutOfRange();