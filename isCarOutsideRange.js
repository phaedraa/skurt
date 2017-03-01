function isCarOutsideRange(carAndPolygonFeatures) {
  carData = carAndPolygonFeatures[0];
  polygonData = carAndPolygonFeatures[1];

  var carLoc = carData.geometry.coordinates;
  var numHorzRightCrossings = 0;
  var coordinates = polygonData.geometry.coordinates[0];
  var j = 0;
  for (var i = 0; i < coordinates.length - 1; i++) {
    j++;
    // Two coordinates that form a single polygonal edge
    var c_1 = coordinates[i];
    var c_2 = coordinates[j];
    // check that car location horizontal crossing intercepts with current edge by:
    // 1. checking that car loc is within y bounds of edge 
    // 2. and that car x coord is at least <= to the max x coord of the edge
    // 3. and that it is to the left of the horizontal interception of car loc y
    if (carLocWithinEdgeYBounds() && carLocLeftOfEdgeXMax()) {
      var x_intercept = getCarXHorzInterceptWithEdge();
      // car is on edge or vertex and is thus counted as 'inside' bounds
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
    // x_intercept = (y_relative / slope) + x_shift; as we don't know 'b'
    if (c_2[0] - c_1[0] == 0) {
      return c_1[0];
    }

    var slope = (c_2[1] - c_1[1]) / (c_2[0] - c_1[0]);
    return ((carLoc[1] - c_1[1]) / slope + c_1[0]);
  }
  
  function carLocLeftOfEdgeXMax() {
    return carLoc[0] <= Math.max(c_1[0], c_2[0]);
  }
  
  function carLocWithinEdgeYBounds() {
    return carLoc[1] >= Math.min(c_1[1], c_2[1])
      && carLoc[1] <= Math.max(c_1[1], c_2[1]);
  }
}

module.exports = isCarOutsideRange;
