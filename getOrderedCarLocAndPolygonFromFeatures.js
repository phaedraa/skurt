function getOrderedCarLocAndPolygonFromFeatures(features) {
  // Cannot guarantee that the features list will always maintain
  // order of point object first, and polygon second, nor that 
  // it will always contain both a point and polygon
  if (features.length !== 2) {
    throw new TypeError('API missing either Point or Polygon Data.');
  }

  var feat1Type = features[0].geometry.type;
  var feat2Type = features[1].geometry.type;
  if (feat1Type == "Point" && feat2Type == "Polygon") {
    validatePolygonAndPoint(features[1].geometry.coordinates[0], features[0].geometry.coordinates)
    return features;
  }

  if (feat2Type !== "Point" || feat1Type !== "Polygon") {
    throw new TypeError('API returned incorrect geometry types for car.');
  }

  // validate and swap
  validatePolygonAndPoint(features[0].geometry.coordinates[0], features[1].geometry.coordinates)

  return [features[1], features[0]];

  function validatePolygonAndPoint(polygonCoordinates, point) {
    if (polygonCoordinates.length < 3) {
      throw new TypeError('At least 3 coordinates are needed to create a polygon.');
    }

    for (var coord = 0; coord < polygonCoordinates.length; coord++) {
      if (polygonCoordinates[coord].length !== 2) {
        throw new TypeError('Polygon coordinate requires x and y values.');
      }
    }

    if (point.length !== 2) {
      throw new TypeError('Car location requires x and y coordinates.');
    }
  }
}

module.exports = getOrderedCarLocAndPolygonFromFeatures;