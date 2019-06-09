function main(input) {
    var output = "";
    var lineNum = 0;
    var stations = [];
    var k = 0;
    var n = 0;
    var g = 0;

    // create a graph class 
    class Graph {

        constructor(noOfVertices) {
            this.noOfVertices = noOfVertices;
            this.AdjList = new Map();
        }

        trainsGo(){//search and count relevant neighbors
            var get_keys = this.AdjList.keys();
            var string = "";
            for (var i of get_keys) {
                var x = g.dfs(i, k);
                string=string.concat(x+1).concat("\n");
            }
            string = string.substr(0, string.length - 1);
            return string.toString();
        }

        addVertex(v) {
            // initialize the adjacent list with a 
            // null array 
            this.AdjList.set(v, []);
        }

        addEdge(v, w) {
            // get the list for vertex v and put the 
            // vertex w denoting edge between v and w 
            this.AdjList.get(v).push(w);
        }

        dfs(startingNode, k) { //searching for neighbors and counting using dfs style

            var get_keys = this.AdjList.keys();
            var reachableStations = 0;
            for (var i of get_keys) {

                var get_neighbours = this.AdjList.get(i);

                if (i != startingNode) {
                    var legs = 0;
                    while (legs < k && get_neighbours != i) {

                        if(get_neighbours[0] == startingNode){
                            reachableStations = reachableStations + 1;
                        }
                        legs = legs + 1;
                        get_neighbours = this.AdjList.get(get_neighbours[0]);
                    }
                }
            }

            return reachableStations;
        }
    }

    arrayOfLines = input.split("\n");
    arrayOfLines.forEach(function (line) {
        lineNum = lineNum + 1;
        if (lineNum === 1) {
            k = line[2];
            n = line[0];
            g = new Graph(n);
        }
        else {
            var station = { stationNumber: lineNum - 1, stationNext: line[0] };
            stations.push(station);
        }
    });

    // adding vertices 
    for (var i = 0; i < stations.length; i++) {
        var stationNum = String.fromCharCode(stations[i].stationNumber + 64);
        g.addVertex(stationNum);
    }
    // adding edges 
    for (var i = 0; i < stations.length; i++) {
        var stationNum = String.fromCharCode(stations[i].stationNumber + 64);
        var stationNext = String.fromCharCode(stations[i].stationNext.charCodeAt(0) + 16);
        g.addEdge(stationNum, stationNext)
    }

    return g.trainsGo();
}

var input1 = "6 2\n2\n3\n4\n5\n4\n3";
var input2 = "5 3\n2\n3\n1\n5\n4";

var output = main(input1);

console.log(output);