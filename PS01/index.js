var width=800;
var height= 700;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var geo = svg.append("g");

//import the data from the .csv file
d3.json('./neighborhood_boston.json', function(dataIn){

    svg.selectAll("path")               //make empty selection
        .data(dataIn.features)          //bind to the features array in the map data
        .enter()
        .append("path")                 //add the paths to the DOM
        .attr("d", path)                //actually draw them
        .attr("class", "feature")
        .attr('fill','gainsboro')
        .attr('stroke',"#333")
        .attr('stroke-width',.8)
        .attr( "d", geoPath );;

    var albersProjection = d3.geoAlbers()
        .scale( 190000 )
        .rotate( [71.057,0] )
        .center( [0, 42.313] )
        .translate( [width/2,height/2] );

    var geoPath = d3.geoPath()
        .projection( albersProjection );


