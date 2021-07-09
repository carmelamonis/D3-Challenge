// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Create an SVG wrapper, append SVG group that will hold chart and shift latter by left & top margins
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Retrieve data from CSV file & execute everything below
d3.csv("../data/data.csv").then(function(data, err) {
    if (err) throw err;

    console.log(data);

    //parse data
    data.forEach(function (d) {
        d.healthcare = +d.healthcare;
        d.poverty = +d.poverty;
        d.smokes = +d.smokes;
        d.age = +d.age;

        //console.log(d.healthcare);
    });

    //Create x scale function
    var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.poverty)])
        .range([0, width]);

    //Create y scale function
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.healthcare)])
        .range([height, 0]);

    //Create  axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //Append axes to chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);


    //Create circles
    //var circlesGroup = 
    chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 20)
        .attr("fill", "#89bdd3")
        .attr("opacity", ".5");

        //add text to circle
    chartGroup.selectAll("circle")
        .data(data)
        .append("text")
        .attr("dx", function(d) {return -20})
        .attr("class", "stateText")
        .text(function(d) {return d.abbr});

    //Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "aText")
        .text("Healthcare (in %)");
        

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "aText")
        .text("Poverty (in %)");
}).catch(function(error) {
    console.log(error);
});

