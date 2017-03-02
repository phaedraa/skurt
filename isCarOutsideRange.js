function isCarOutsideRange(carAndPolygonFeatures) {
  var carData = carAndPolygonFeatures[0];
  var polygonData = carAndPolygonFeatures[1];
  var carLoc = carData.geometry.coordinates;
  var numHorzRightCrossings = 0;
  var coordinates = polygonData.geometry.coordinates[0];
  for (var i = 0; i < coordinates.length - 1; i++) {
    // Two coordinates that form a single polygonal edge
    var c_1 = coordinates[i];
    var c_2 = coordinates[i + 1];
    // check that car location horizontal crossing intercepts with current edge by:
    // 1. checking that car loc is within y bounds of edge 
    // 2. and that car x coord is at least <= to the max x coord of the edge
    // 3. and that it is to the left of the horizontal interception of car loc y
    if (isCarLocWithinEdgeYBounds() && isCarLocLeftOfEdgeXMax()) {
      // If car is on horizontal edge, its counted as 'inside' bounds.
      if (carLoc[0] >= Math.min(c_1[0], c_2[0]) && c_1[1] == c_2[1]) {
        return false;
      }
      var x_intercept = getCarXHorzInterceptWithEdge();
      // If car is on edge or vertex, we count it as 'inside' bounds. As such,
      // we can early return and exit the loop
      if (carLoc[0] == x_intercept) {
        return false;
      }

      if (carLoc[0] < x_intercept) {
        numHorzRightCrossings++;
      }
    }
  }

  // Using even-odd algorithm rule, we know that even number of crossings
  // ensures that our point is outside the polygon, and odd is within.
  return numHorzRightCrossings % 2 == 0;

  function getCarXHorzInterceptWithEdge() {
    // Using: y = m * x + b
    // x_intercept = (y_relative / slope) + x_relative
    if (c_2[0] - c_1[0] == 0) {
      return c_1[0];
    }

    var slope = (c_2[1] - c_1[1]) / (c_2[0] - c_1[0]);
    return ((carLoc[1] - c_1[1]) / slope + c_1[0]);
  }
  
  function isCarLocLeftOfEdgeXMax() {
    return carLoc[0] <= Math.max(c_1[0], c_2[0]);
  }
  
  function isCarLocWithinEdgeYBounds() {
    return carLoc[1] >= Math.min(c_1[1], c_2[1])
      && carLoc[1] <= Math.max(c_1[1], c_2[1]);
  }
}

module.exports = isCarOutsideRange;
