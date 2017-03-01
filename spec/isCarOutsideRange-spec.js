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
          // horizontal edge, coord 1
          [
            -118.07418823242186,
            34.07768740409027
          ],
          // horizontal edge, coord 2
          [
            -118.12911987304688,
            34.07768740409027
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
    // on horizontal edge
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.10646057128905,
          34.07768740409027
        ]
      }
    },
    // left of x_max, passes 1 edge
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
    // passes 3 edges, 2 of which are convex
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
    // vertex of polygon
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
    // passes through 3 edges, 2 of which form a convex apex
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.01856994628906,
          33.96500329452545
        ]
      }
    },
    // passes through vertex and edge, equalling 3 total passes
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.08860778808592,
          34.01738017414994
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
    // outside NE edge, to the lower right (within x & y bounds),
    // passing 0 edges
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
    // outside 3-sided concave section, passing 2 edges
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
    // below polygon
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
    // outside concave vertex, passing 2 edges
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
    // left of vertex, crossing 4 edges
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
    // left of polygon
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
    },
    // above max y plane of polygon
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.02474975585936,
          34.10498222546687
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

  var square =  {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -118.36944580078124,
            33.99916579100914
          ],
          [
            -118.26988220214844,
            33.99916579100914
          ],
          [
            -118.26988220214844,
            34.07086232376631
          ],
          [
            -118.36944580078124,
            34.07086232376631
          ],
          [
            -118.36944580078124,
            33.99916579100914
          ]
        ]
      ]
    }
  };

  var pointOnVerticalLine = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": [
        -118.36944580078124,
        34.03786668460356
      ]
    }
  };

  it('Expect car on vertical line to be inside', function() {
    expect(isCarOutsideRange([pointOnVerticalLine, square])).toEqual(false);
  });
});