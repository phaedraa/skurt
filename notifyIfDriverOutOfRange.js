const NUM_CARS = 11;
console.log('here');
var getSkurtCarData = require('./getSkurtCarData.js');
var isCarOutsideRange = require('./isCarOutsideRange.js');
console.log('here2');

function notifyIfDriverOutOfRange() {
  console.log('notifyIfDriverOutOfRange');
  //var car_ids = getCars(NUM_CARS);
  var carLocData = [];
  for (var car_id = 1; car_id <= NUM_CARS; car_id++) {
    var car_data = getSkurtCarData(car_id);
    //carLocData[] = {car_id: getSkurtCarData(car_id)};
    if (isCarOutsideRange(car_data)) {
      // send email
      console.log('now send email!');
    }
  }

  //var carsOutsideRange = [];
  //for (var datum = 0; datum < NUM_CARS; datum++) {
  //  if (isCarOutsideRange(carLocData[datum])) {
  //    carsOutsideRange[] = {carLocData[datum].}
  //  }
  //}

  //function getCars(num_cars) {
  //  var cars = [];
  //  car_id = 1;
  //  while (car_id <= num_cars) {
  //    cars[] = car_id;
  //    car_id++;
  //  }
  //}
}

notifyIfDriverOutOfRange();