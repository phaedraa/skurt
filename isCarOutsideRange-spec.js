var isCarOutsideRange = require('../isCarOutsideRange');
var getSkurtCarData = require('./getSkurtCarData.js');

const TEST_CAR_ID = 11;

describe("isCarOutsideRange function", function() {
  var featuresPass = [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-118.263311219348, 34.0654997817231]
      },
      "properties": {
        "id": 2
      }
    }, 
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-118.48548889160156,34.05550388259354],[-118.33786010742186,34.10839345928985],[-118.267822265625,34.11692094207864],[-118.20327758789062,34.07143110146333],[-118.18748474121094,34.0213640496411],[-118.4710693359375,34.00030430441023],[-118.48548889160156,34.05550388259354]]]
      },
      "properties": {}
    }
  ];

  it('Throw on empty features', function() {
    var data = getSkurtCarData(TEST_CAR_ID, function (data) { return data; });
    expect(sCarOutsideRange(data).toEqual(false);
  });
});