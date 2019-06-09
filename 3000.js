"use strict";

function main(input) {
  var output = "";
  var lineNum = 0;
  var stations = [];
  var k = 0;
  var n = 0;
  var g = 0;
  var arrayOfLines = input.split("\n");
  arrayOfLines.forEach(function (line) {
    lineNum = lineNum + 1;

    if (lineNum === 1) {
      k = line[2];
      n = line[0];
    } else {
      var station = {
        stationNumber: lineNum - 1,
        stationNext: line[0]
      };
      stations.push(station);
    }
  });
  var noOfVertices = n;
  var AdjList = new Map();

  function trainsGo() {
    //search and count relevant neighbors
    var get_keys = AdjList.keys();
    var string = "";
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = get_keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var i = _step.value;
        var x = dfs(i, k);
        string = string.concat(x + 1).concat("\n");
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    string = string.substr(0, string.length - 1);
    return string.toString();
  }

  function addVertex(v) {
    // initialize the adjacent list with a 
    // null array 
    AdjList.set(v, []);
  }

  function addEdge(v, w) {
    // get the list for vertex v and put the 
    // vertex w denoting edge between v and w 
    AdjList.get(v).push(w);
  }

  function dfs(startingNode, k) {
    //searching for neighbors and counting using dfs style
    var get_keys = AdjList.keys();
    var reachableStations = 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = get_keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var i = _step2.value;
        var get_neighbours = AdjList.get(i);

        if (i != startingNode) {
          var legs = 0;

          while (legs < k && get_neighbours != i) {
            if (get_neighbours[0] == startingNode) {
              reachableStations = reachableStations + 1;
            }

            legs = legs + 1;
            get_neighbours = AdjList.get(get_neighbours[0]);
          }
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return reachableStations;
  } // adding vertices 


  for (var i = 0; i < stations.length; i++) {
    var stationNum = String.fromCharCode(stations[i].stationNumber + 64);
    addVertex(stationNum);
  } // adding edges 


  for (var i = 0; i < stations.length; i++) {
    var stationNum = String.fromCharCode(stations[i].stationNumber + 64);
    var stationNext = String.fromCharCode(stations[i].stationNext.charCodeAt(0) + 16);
    addEdge(stationNum, stationNext);
  }

  return trainsGo();
}

var input1 = "6 2\n2\n3\n4\n5\n4\n3";
var input2 = "5 3\n2\n3\n1\n5\n4";
var output = main(input2);
console.log(output);