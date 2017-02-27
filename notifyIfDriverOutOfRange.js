const NUM_CARS = 11;
var getSkurtCarData = require('./getSkurtCarData.js');
var isCarOutsideRange = require('./isCarOutsideRange.js');

function notifyIfDriverOutOfRange() {
  for (var carID = 1; carID <= NUM_CARS; carID++) {
    getSkurtCarData(carID, handleCarData);
  }
}

function handleCarData(carData) {
  if (isCarOutsideRange(JSON.parse(carData))) {
    // send email
    console.log('now send email!');
    console.log('data', carData);
  }
}

notifyIfDriverOutOfRange();