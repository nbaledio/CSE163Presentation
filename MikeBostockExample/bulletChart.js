/* ----------------------------------------------------------------------------
File: bulletChart.js
Contructs a bullet chart using D3
Created by Mike Bostock
Revised to V5/Commented by Nathan Baledio
80 characters perline, avoid tabs. Indet at 4 spaces. See google style guide on
JavaScript if needed.
-----------------------------------------------------------------------------*/ 

//Define the margins
var margin = {top: 5, right: 40, bottom: 20, left: 120},
    width = 960 - margin.left - margin.right,
    height = 50 - margin.top - margin.bottom;

//Create the chart using the d3.bullet() plugin
var chart = d3.bullet()
    .width(width)
    .height(height);

//Read data from the json file
d3.json("bullets.json").then(function(data){

    //Add bullets to svg
    var svg = d3.select("body").selectAll("svg")
        .data(data)
        .enter().append("svg")
        .attr("class", "bullet")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(chart);
    
    //Create a title group to label each bullet chart
    var title = svg.append("g")
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + height / 2 + ")");

    //Label each chart with a corresponding title
    title.append("text")
        .attr("class", "title")
        .text(function(d) { return d.title; });

    //Add subtitle beneath
    title.append("text")
        .attr("class", "subtitle")
        .attr("dy", "1em")
        .text(function(d) { return d.subtitle; });

    //Add function to button that calls randomize
    d3.selectAll("button").on("click", function() {
        svg.datum(randomize).call(chart.duration(1000)); // TODO automatic transition
    });
});

//Functions to randomize ranges, measures, and markers
function randomize(d) {
  if (!d.randomizer) d.randomizer = randomizer(d);
  d.ranges = d.ranges.map(d.randomizer);
  d.markers = d.markers.map(d.randomizer);
  d.measures = d.measures.map(d.randomizer);
  return d;
}

function randomizer(d) {
  var k = d3.max(d.ranges) * .2;
  return function(d) {
    return Math.max(0, d + k * (Math.random() - .5));
  };
}