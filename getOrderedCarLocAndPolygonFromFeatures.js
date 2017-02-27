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
    return features;
  }

  if (feat2Type !== "Point" || feat1Type !== "Polygon") {
    throw new TypeError('API returned incorrect geometry types for car.');
  }

  // swap
  return [features[1], features[0]];
}

module.exports = getOrderedCarLocAndPolygonFromFeatures;