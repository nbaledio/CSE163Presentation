/* ----------------------------------------------------------------------------
File: bulletChart.js
Contructs a bullet chart using D3
Created by Nathan Baledio
80 characters perline, avoid tabs. Indet at 4 spaces. See google style guide on
JavaScript if needed.
-----------------------------------------------------------------------------*/ 
//Hosted on https://people.ucsc.edu/~nbaledio/CSE163Presentation/NathanBaledioExample/

//Define Margin
var margin = {left: 80, right: 80, top: 0, bottom: 50 }, 
    width = 800 - margin.left -margin.right,
    height = 100 - margin.top - margin.bottom;

//Create Chart, add animation, and format ticks to start at 200
var charts = d3.bullet()
    .width(width)
    .height(20)
    .duration(900)
    .tickFormat(function(d){
        return d+200;
    })

//Read data from the json file
d3.json("2019SATScores.json").then(function(d){
    
    //Add bullets to svg and append data to each chart
    var svg = d3.select("body").selectAll("svg")
        .data(d)
        .enter().append("svg")
        .attr("class", "bullet")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height - 20 + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + 100 + "," + 40 + ")")
        .call(charts);
    
    //Add a black border to each bullet chart
    svg.append('rect')
        .attr("width", width - 160 + margin.left + margin.right)
        .attr("height", height - 80 + margin.top + margin.bottom)
        .attr('x', 0)
        .attr('y', 0)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", "2");
    
    //Create a title group to label each bullet chart
    var title = svg.append("g")
        .style("text-anchor", "end")
        .attr("transform", "translate(-25,15)");

    //Label each chart with a corresponding title
    title.append("text")
        .attr("class", "title")
        .attr("dx", "-.4em")
        .text(function(d) { return d.title; });

    //Add subtitle beneath and adjust position
    title.append("text")
        .attr("class", "subtitle")
        .attr("dx", ".5em")
        .attr("dy", "1.1em")
        .text(function(d) { return d.subtitle; });
    
    //Create Legend SVG
    var legend = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + 40 + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + 180 + "," + 50 + ")")
    
    //Legend variables for easier access
    var legendwidth = 30;
    var legendheight = 30;
    
    //Append color squares for legend
    legend.append("rect")
        .attr("x",0)
        .attr("y",-20)
        .attr("width",legendwidth)
        .attr("height",legendheight)
        .style("fill","#C73030");
    
    legend.append("rect")
        .attr("x",0)
        .attr("y",20)
        .attr("width",legendwidth)
        .attr("height",legendheight)
        .style("fill","#dbce14");
    
    legend.append("rect")
        .attr("x",0)
        .attr("y",60)
        .attr("width",legendwidth)
        .attr("height",legendheight)
        .style("fill","#139c3b");
    
    legend.append("rect")
        .attr("x",300)
        .attr("y",-20)
        .attr("width",legendwidth)
        .attr("height",legendheight)
        .style("fill","#8cb2d1");
    
    legend.append("rect")
        .attr("x",310)
        .attr("y",20)
        .attr("width",5)
        .attr("height",legendheight)
        .style("fill","black");
    
    //Append text descriptions for legend
    legend.append("text")
        .attr("x",40)
        .attr("y",0)
        .text("Needs Improvement");
    
    legend.append("text")
        .attr("x",40)
        .attr("y",40)
        .text("Approaching Benchmark");
    
    legend.append("text")
        .attr("x",40)
        .attr("y",80)
        .text("Meets or Exceeds Benchmark");
    
    legend.append("text")
        .attr("x",340)
        .attr("y",0)
        .text("2019 Average Score");
    
    legend.append("text")
        .attr("x",340)
        .attr("y",40)
        .text("Average Score from 2017");
});

