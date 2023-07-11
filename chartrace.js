// year.js

// Get the combined data from index.js
getCombinedData().then(combinedData => {
  // Ensure combinedData is an array
  if (!Array.isArray(combinedData)) {
    console.error('Combined data is not an array');
    return;
  }
 // Replace with the function that retrieves the combined data
 let existingDots = [];
// Set the dimensions and margins for the chart
const margin = { top: 10, right: 10, bottom: 10, left: 10 };
const width = 2250 - margin.left - margin.right;
const height = 750 - margin.top - margin.bottom;

const deathsPerYear = {};
combinedData.forEach(d => {
  const year = d.year;
  if (deathsPerYear[year]) {
    deathsPerYear[year] += 1;
  } else {
    deathsPerYear[year] = 1;
  }
});

// Create an SVG element
const svg = d3
  .select("#yearrace-chart") // Replace with the ID of the container element in your HTML
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Set the x-scale for years
const xScale = d3
  .scaleLinear()
  .domain([2006, 2020]) // Replace with the minimum and maximum years in your dataset
  .range([margin.left, width - margin.right]);

// Set the y-scale for months
const yScale = d3
  .scaleLinear()
  .domain([1, 12]) // Months range from 1 to 12
  .range([height - margin.bottom, margin.top]);


// Create a function to draw the chart
function drawIntentChart(date) {


  const filteredData = combinedData.filter(
    d => d.year < date.getFullYear() || (d.year === date.getFullYear() && d.month <= date.getMonth() + 1)
  );
  existingDots = existingDots.concat(filteredData);
  // Add or update the data points on the chart
  const circles = svg.selectAll("circle").data(existingDots);

  // Enter new data points

  

  circles
    .enter()
    .append("circle")
    .attr("cx", d => Math.random() * width)
    .attr("cy", d => Math.random() * height)
    .attr("r", 1)
    .attr("fill", d => {
      if (d.race === "White") {
        return "#ff7f0e";
      } else if (d.race === "Black") {
        return "#1f77b4";
      } else if (d.race === "Hispanic") {
        return "#2ca02c";
      } else if (d.race === "Asian/Pacific Islander") {
        return "#d62728";
      } else if (d.race === "Native American/Native Alaskan") {
        return "#e6b20a";
      }
    });

  // Update existing data points
  //circles.attr("cx", d => Math.random() * width).attr("cy", d => Math.random() * height);

  // Remove data points that are no longer in the dataset
  circles.exit().remove();
}



// Set up the play and pause buttons
let interval;

let intentInterval;

d3.select("#play-button") // Replace with the ID of the play button in your HTML
  .on("click", () => {



    const startDate = new Date("2006-01"); // Replace with the minimum date in your dataset
    const endDate = new Date("2021-5"); // Replace with the maximum date in your dataset
    const intervalDuration = 0.0000001; // Adjust the duration between each date in milliseconds

    let currentDate = startDate;

    
     // Increment by 1 month

   

    // Define the animation function
  function animate() {
    drawIntentChart(currentDate);

    

  currentDate.setYear(currentDate.getFullYear() + 1);

  const currentYear = currentDate.getFullYear();
  const numDeaths = deathsPerYear[currentYear] || 0;
  document.getElementById("demo3").innerHTML =  currentYear + ": " + numDeaths  

 
    let totalDeaths = 0;
    Object.entries(deathsPerYear).forEach(([year, deaths]) => {
      if (year <= currentYear) {
        totalDeaths += deaths;
      }
    });
  document.getElementById("demo2").innerHTML = currentYear + ": " + totalDeaths;



  if (currentDate <= endDate) {
    cDate = currentDate.toString().substring(4, 15);
    document.getElementById("demo").innerHTML = cDate;
    intentInterval = setTimeout(animate, intervalDuration);
  }
}



// Start the animation
animate();
  });





d3.select("#pause-button") // Replace with the ID of the pause button in your HTML
  .on("click", () => {
    clearTimeout(interval);
  });

});