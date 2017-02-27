function isCarOutsideRange(locationData) {
  var features = locationData.features;
  orderPolygonAndCarLocFromFeatures();
  carData = features[0];
  polygonData = features[1];

  var carLoc = carData.geometry.coordinates;
  var numHorzRightCrossings = 0;
  var coordinates = polygonData.geometry.coordinates[0];
  var j = 0;
  for (var i = 0; i < coordinates.length - 1; i++) {
    j++;
    var c_1 = coordinates[i];
    var c_2 = coordinates[j];
    // check that car location horizontal crossing intercepts with current edge
    // 1. check that car loc is within y bounds of edge 
    // 2. and that car x coord is at least <= to the max x coord of the edge
    // 3. and that it is to the left of the horizontal interception of car loc y
    if (
      carLocWithinEdgeYBounds() && carLocLeftOfEdgeXMax() &&
      carXLocLeftOfXIntercept()
    ) {
      numHorzRightCrossings++;
    }
  }

  return numHorzRightCrossings % 2 == 0;

  function carXLocLeftOfXIntercept() {
    // Using: y = m * x + b
    // x_intercept = (y_relative / slope) + x_shift; as we don't know 'b'
    var slope = (c_2[1] - c_1[1]) / (c_2[0] - c_1[0]);

    return carLoc[0] <= ((carLoc[1] - c_1[1]) / slope + c_1[0]);
  }
  
  function carLocLeftOfEdgeXMax() {
    return carLoc[0] <= Math.max(c_1[0], c_2[0]);
  }
  
  function carLocWithinEdgeYBounds() {
    return carLoc[1] >= Math.min(c_1[1], c_2[1])
      && carLoc[1] <= Math.max(c_1[1], c_2[1]);
  }

  function orderPolygonAndCarLocFromFeatures() {
    if (features.length !== 2) {
      throw new TypeError('API missing either Point or Polygon Data.');
    }
    var feat1Type = features[0].geometry.type;
    var feat2Type = features[1].geometry.type;
    if (feat1Type == "Point" && feat2Type == "Polygon") {
      return;
    }

    if (feat2Type !== "Point" || feat1Type !== "Polygon") {
      throw new TypeError('API returned incorrect geometry types for car.');
    }

    // swap
    features = [features[1], features[0]];
  }
}

module.exports = isCarOutsideRange;
