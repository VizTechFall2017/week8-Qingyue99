var width = document.getElementById('svg').clientWidth;
var height = document.getElementById('svg').clientHeight;
var centered;

var marginLeft = 0;
var marginTop = 10;

var svg = d3.select('svg');


var g = svg.append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')')
    .on("click", clicked);

var inputValue = null;
var distance = ["Within half Miles","Within One Miles","Within Two Miles","Within Three Miles"];




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
  /*  var x;
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
        .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');*/
    var x, y, k;

    if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        centered = d;
    } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;
    }

    g.selectAll("path")
        .classed("active", centered && function(d) { return d === centered; });

    g.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");

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
        })
        .on("click", clicked);



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
        .attr('r',3.5)
        .attr('fill', '#007245')
        .on('mouseover', function(d){
            d3.select("h2").text(d.Name);
            d3.select(this).attr("class","incident hover");
            d3.select(this).attr("fill","#000000");
            //d3.select("h2").text(d.Time);
            //d3.select(this).attr("class","incident hover");
            //d3.select(this).attr("fill","#000000");


        })
        .on("mouseout", function(d){
       //     d3.select("h2").text("hhh");
       //     d3.select(this).attr("class","incident");
            d3.select(this).attr("fill",'#007245');})

});



Arraylist= [
    {long:-71.090177, lat:42.340324, Name:"Marino Recreation Center", Time:"Monday 5AM-1AM" },
    {long:-71.086143, lat:42.337929, Name:"SquashBusters Badger and Rosen Center",Time:"Monday 6AM-9:15PM"},
    {long:-71.080779, lat:42.341815, Name:"BURN Fitness Studios",Time:"6AM-9PM" },
    {long:-71.103409, lat:42.338627, Name:"BodyScapes",Time:"8:30AM–10PM" },
    {long:-71.086143, lat:42.337929, Name:"Brain Fit Club",Time:"Monday 8:30AM-5PM"},
    {long:-71.082911, lat:42.346315, Name:"Flywheel Sports",Time:"Monday 6AM-7:30PM"},
    {long:-71.081266, lat:42.346863, Name:"Boston Sports Clubs",Time:"Monday 5:30AM-10:30PM"}
];

//$('[data-toggle="tooltip"]').tooltip();

