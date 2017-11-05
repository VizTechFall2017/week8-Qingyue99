var width = document.getElementById('svg').clientWidth;
var height = document.getElementById('svg').clientHeight;

var marginLeft = 0;
var marginTop = 10;

var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')')
    .attr("class", "graph-svg-component");


var albersProjection = d3.geoAlbers()
    .scale(185000 )
    .rotate([71.057,0])
    .center([0, 42.313])
    .translate([(width/2), (height/2)]);


var path = d3.geoPath()
    .projection(albersProjection);

var zoomSettings = {
    duration: 1000,
    ease: d3.easeCubicOut,
    zoomLevel: 5
};

function clicked(d){
    var x;
    var y;
    var zoomLevel;

    if (d && centered !== d) {
        var centroid = path.centroid(d)
        x = centroid[0];
        y = centroid[1];
        zoomLevel = zoomSettings.zoomLevel;
        centered = d;
    } else{
        x = width /2;
        y = height/2;
        zoomLevel = 1;
        centered = null;

    }

    g.transition()
        .duration (zoomSettings.duration)
        .ease(zoomSettings.ease)
        .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

}

//import the data from the .csv file
d3.json('./neighborhood_boston.json', function(dataIn){
    //console.log(dataIn);
    svg.selectAll('path')
        .data(dataIn.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', '#007245')
        .attr('opacity', 0.6)
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .attr('cursor','pointer')
        .on('mouseover', function(d){
            console.log(d.properties.NAME);
        });



    svg.selectAll('circle')
        .data(Arraylist)
        .enter()
        .append('circle')
        .attr('cx', function (d){
            console.log(d);
            return albersProjection([d.long, d.lat])[0];
        })
        .attr('cy', function (d){
            return albersProjection([d.long, d.lat])[1];
        })
        .attr('r', 5)

        .attr('fill', 'purple')
        //.attr('data-toggle','tooltip')
        //.attr('title', function (d) {return d.women});;


});



Arraylist= [
    {long:-71.090508, lat:42.340052},
    {long:-71.086145, lat:42.338542},
    {long:-71.081518, lat:42.341663},
{long:-71.076440, lat:42.348695}
];

//$('[data-toggle="tooltip"]').tooltip();