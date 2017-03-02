var getInfoFromFeatures = require('../getInfoFromFeatures');

describe("getInfoFromFeatures function", function() {
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
        "coordinates": [
          [
            [
              -118.48548889160156,
              34.05550388259354
            ],
            [
              -118.33786010742186,
              34.10839345928985
            ],
            [
              -118.267822265625,
              34.11692094207864
            ],
            [
              -118.20327758789062,
              34.07143110146333
            ],
            [
              -118.18748474121094,
              34.0213640496411
            ],
            [
              -118.4710693359375,
              34.00030430441023
            ],
            [
              -118.48548889160156,
              34.05550388259354
            ]
          ]
        ]
      },
      "properties": {}
    }
  ];

  it('Returns ccorrectly ordered pairs', function() {
    var parsedFeatures = getInfoFromFeatures(featuresPass);

    expect(parsedFeatures[0].geometry.type).toEqual('Point');
    expect(parsedFeatures[1].geometry.type).toEqual('Polygon');
  });

  var featuresSwitched = [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-118.48548889160156,34.05550388259354],[-118.33786010742186,34.10839345928985],[-118.267822265625,34.11692094207864],[-118.20327758789062,34.07143110146333],[-118.18748474121094,34.0213640496411],[-118.4710693359375,34.00030430441023],[-118.48548889160156,34.05550388259354]]]
      },
      "properties": {
        "id": 2
      }
    }, 
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-118.263311219348, 34.0654997817231]
      },
      "properties": {}
    }
  ];
  it('Swaps incorrectly ordered pairs', function() {
    var parsedFeatures = getInfoFromFeatures(featuresSwitched);
    expect(parsedFeatures[0].geometry.type).toEqual('Point');
    expect(parsedFeatures[1].geometry.type).toEqual('Polygon');
  });

  var featuresWrongType1 = [
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
        "type": "Square",
        "coordinates": [[[-118.20327758789062,34.07143110146333],[-118.18748474121094,34.0213640496411],[-118.4710693359375,34.00030430441023],[-118.48548889160156,34.05550388259354]]]
      },
      "properties": {}
    }
  ];
  it('Throw on invalid geometry type on first value', function() {
    expect(
      function () { getInfoFromFeatures(featuresWrongType2) }
    ).toThrowError('API returned incorrect geometry types for car.');
  });

  var featuresWrongType2 = [
    {
      "type": "Feature",
      "geometry": {
        "type": "Line",
        "coordinates": [[-118.263311219348, 34.0654997817231], [-118.263311219348, 34.0654997817231]]
      },
      "properties": {
        "id": 2
      }
    }, 
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-118.20327758789062,34.07143110146333],[-118.18748474121094,34.0213640496411],[-118.4710693359375,34.00030430441023],[-118.48548889160156,34.05550388259354]]]
      },
      "properties": {}
    }
  ];
  it('Throw on invalid geometry type on second value', function() {
    expect(
      function () { getInfoFromFeatures(featuresWrongType2) }
    ).toThrowError('API returned incorrect geometry types for car.');
  });

  var featuresInsufficientPolygonPoints = [
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
        "coordinates": [
          [
            [
              -118.20327758789062,
              34.07143110146333
            ],
            [
              -118.18748474121094,
              34.0213640496411
            ]
          ]
        ]
      },
      "properties": {}
    }
  ];

  it('Throw on insufficient number of polygon points/edges', function() {
    expect(
      function() { getInfoFromFeatures(featuresInsufficientPolygonPoints) }
    ).toThrowError('At least 3 coordinates are needed to create a polygon.');
  });

  var featuresIncorrectCarLoc = [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-118.263311219348]
      },
      "properties": {
        "id": 2
      }
    }, 
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.20327758789062,
              34.07143110146333
            ],
            [
              -118.18748474121094,
              34.0213640496411
            ],
            [
              -118.18748474121094,
              34.0213640496411
            ]
          ]
        ]
      },
      "properties": {}
    }
  ];
  it('Throw on invalid car location', function() {
    expect(
      function () { getInfoFromFeatures(featuresIncorrectCarLoc) }
    ).toThrowError('Car location requires x and y coordinates.');
  });
  
  var featuresEmpty = [];
  it('Throw on empty features', function() {
    expect(
      function() { getInfoFromFeatures(featuresEmpty) }
    ).toThrowError('API missing either Point or Polygon Data.');
  });
});