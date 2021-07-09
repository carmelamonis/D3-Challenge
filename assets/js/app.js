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
var svg = d3
    .select(".scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Retrieve data from CSV file & execute everything below
d3.csv("../data/data.csv").then(function(data, err) {
    if (err) throw err;

    //parse data
    data.forEach(function (d) {
        d.healthcare = +d.healthcare;
        d.poverty = +d.poverty;
        d.smokes = +d.smokes;
        d.age = +d.age;
    });

    //Create x scale function
    var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.poverty)]);

    //Create y scale function
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max[data, d => d.healthcare]])
        .range([height, 0]);

    //Create  axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //Append axes to chart
    chartGroup.append("g")
        .atr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);


    //Create circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 20)
        .attr("fill", "blue")
        .attr("opacity", ".5");
    
    //add text to circle
    chartGroup.selectAll("circle")
        .data(data)
        .append("text")
        .attr("dx", function(d) {return -20})
        .text(function(d) {return d.abbr});

    //Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90))")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "aText")
        .text("Poverty (in %)");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "aText")
        .text("Healthcare (in %)");
}).catch(function(error) {
    console.log(error);
});




/*/Initial params Healthcare vs Poverty
var chosenXAxis = "healthcare";

function xScale(data, chosenXAxis) {
    //create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
        d3.max(data, d=> d[chosenXAxis]) * 1.2 
        ]) 
        .range([0, width]);

    return xLinearScale;
}






})
//function used for updating circles group with a transition to new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
}

/*function used for updating circles group w/ new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {
    var label;

    if (chosenXAxis === "healthcare") {
        label = "Healthcare";
    }

    else {
        label = "Smokers";
    }

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return (`<h3>${d.state} <br>Healthcare: ${d[chosenXAxis]} <br>Poverty: ${poverty}}`);
        });

        circlesGroup.call(toolTip);

        circlesGroup.on("mouseover", function(data) {
            toolTip.show(data);
        })

        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });
    return circlesGroup;
}*/


    /*/Create group for two axis labels
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height +20})`);
    
    var healthCareLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "healthcare")
        .classed("active", true)
        .text("Healthcare vs. Poverty");
    
    var smokersLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "smokes")
        .classed("inactive", true)
        .text("Smokers vs. Age");

    //append y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0-margin.left)
        .attr("x", 0- (height/2))
        .attr("dy", "1em")
        .classed("axis-text", true) */
