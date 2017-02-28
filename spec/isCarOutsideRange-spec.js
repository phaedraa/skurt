var isCarOutsideRange = require('../isCarOutsideRange');
var getSkurtCarData = require('../getSkurtCarData.js');

const TEST_CAR_ID = 11;

describe("isCarOutsideRange function", function() {
  it('Expect test car to always be outside range', function() {
    getSkurtCarData(TEST_CAR_ID, function (data) {
      expect(isCarOutsideRange(data)).toEqual(false);
    });
  });

  var complexPolygon = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -118.070068359375,
            34.043556504127444
          ],
          [
            -118.07418823242186,
            34.07768740409027
          ],
          [
            -118.12911987304688,
            34.07882486401267
          ],
          [
            -118.14559936523438,
            34.00258128543371
          ],
          [
            -118.08517456054688,
            33.96272530662602
          ],
          [
            -118.070068359375,
            34.01738017414994
          ],
          [
            -118.03298950195312,
            33.99575015925125
          ],
          [
            -118.07144165039061,
            33.93310591314123
          ],
          [
            -118.00277709960938,
            33.96955908729964
          ],
          [
            -117.96432495117186,
            33.93196649986436
          ],
          [
            -117.92724609375,
            34.03103839734782
          ],
          [
            -118.00140380859375,
            34.033314554166736
          ],
          [
            -117.98904418945312,
            34.092473191457664
          ],
          [
            -118.070068359375,
            34.043556504127444
          ]
        ]
      ]
    }
  };
  var insidePoints = [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.004150390625,
          34.06574315265719
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.10646057128905,
          34.076549928891744
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.08586120605469,
          33.963294809320224
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -117.93685913085939,
          34.019087572255806
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.08586120605469,
          33.987779817779554
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.07144165039061,
          33.93310591314123
        ]
      }
    },
  ];

  for (var i = 0; i < insidePoints.length; i++) {
    testPointsInsidePolygon([insidePoints[i], complexPolygon]);
  }

  function testPointsInsidePolygon(data) {
    it('Expect point to be inside', function() {
      expect(isCarOutsideRange(data)).toEqual(false);
    });
  }

  var outsidePoints = [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -117.9938507080078,
          34.04298753935195
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.06800842285156,
          34.0105502383134
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.02268981933594,
          33.904616008362325
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.00483703613281,
          33.95532142464321
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.070068359375,
          33.944499207394635
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.15109252929686,
          34.022502265437836
        ]
      }
    }
  ];

  for (var o = 0; o < outsidePoints.length; o++) {
    testPointsOutsidePolygon([outsidePoints[o], complexPolygon]);
  }

  function testPointsOutsidePolygon(data) {
    it('Expect point to be outside', function() {
      expect(isCarOutsideRange(data)).toEqual(true);
    });
  }
});