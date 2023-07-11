// Function to draw the line chart
function drawLineChart(data) {
    const margin = { top: 120, right: 120, bottom: 80, left: 90 };
    const width = 1500 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;
  
    // Create an SVG element
    const svg = d3
      .select("#time-chart") // Replace with the ID of the container element in your HTML
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Calculate the total number of deaths per year
    const deathsPerYear = {};
    data.forEach(d => {
      const year = d.year;
      if (deathsPerYear[year]) {
        deathsPerYear[year] += d.count;
      } else {
        deathsPerYear[year] = d.count;
      }
    });
  
    // Format the data as an array of objects with year and count
    const aggregatedData = Object.entries(deathsPerYear).map(([year, count]) => ({
      year: Number(year),
      count: count,
    }));
  
    // Set x-scale for years
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(aggregatedData, d => d.year))
      .range([0, width]);
  
    // Set y-scale for number of deaths
    const yScale = d3
      .scaleLinear()
      .domain([25000, d3.max(aggregatedData, d => d.count)])
      .range([height, 0]);
  
    // Define the line function
    const line = d3
    .line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.count));

  // Draw the line
  svg
    .append("path")
    .datum(aggregatedData)
    .attr("class", "line")
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 5);
  
    // Draw data points
    svg
      .selectAll(".dot")
      .data(aggregatedData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.count))
      .attr("fill", "red")
      .attr("r", 8)
      .on("mouseover", (event, d) => {
        // Show tooltip on mouseover
        const tooltip = svg
          .append("text")
          .attr("class", "tooltip")
          .attr("x", xScale(d.year))
          .attr("y", yScale(d.count) - 10)
          .text(`Year: ${d.year} \n | Deaths: ${d.count}`)
          .attr("text-anchor", "middle")
          .attr("fill", "green");
      })
      .on("mouseout", () => {
        // Remove tooltip on mouseout
        svg.select(".tooltip").remove();
      });
  
    // Draw x-axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
  
    // Draw y-axis
    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));
  
    // Add labels
    svg
      .append("text")
      .attr("class", "x-label")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .text("Year");
  
    svg
      .append("text")
      .attr("class", "y-label")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 10)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Number of Deaths");

      const arrowPosition = { x: 2, y: 430 };
const arrowPosition2 = { x: 743, y: 346 }; // Adjust the coordinates as needed
const textPosition = { x: 103, y: 200 };

// Create the arrow using SVG <path> element
const arrowPath = `M${arrowPosition.x},${arrowPosition.y} L${textPosition.x},${textPosition.y}`;
const arrowPath2 = `M${arrowPosition2.x},${arrowPosition2.y} L${textPosition.x+30},${textPosition.y}`;
svg
  .append("path")
  .attr("class", "arrow")
  .attr("d", arrowPath);
  
  svg
  .append("path")
  .attr("class", "arrow")
  .attr("d", arrowPath2);

// Add the text annotation
svg
  .append("text")
  .attr("x", textPosition.x)
  .attr("y", textPosition.y)
  .text("Between 2006 and 2014, gun deaths only increased by 2,703, or an 8.75% increase.");

  const arrow1Position = { x: 735, y: 345 };
  const arrow1Position2 = { x: 1010, y: 160 }; // Adjust the coordinates as needed
  const text1Position = { x: 830, y: 450 };
  
  // Create the arrow using SVG <path> element
  const arrow1Path = `M${arrow1Position.x},${arrow1Position.y} L${text1Position.x},${text1Position.y}`;
  const arrow1Path2 = `M${arrow1Position2.x},${arrow1Position2.y} L${text1Position.x+30},${text1Position.y}`;
  svg
    .append("path")
    .attr("class", "arrow2")
    .attr("d", arrow1Path);
    
    svg
    .append("path")
    .attr("class", "arrow2")
    .attr("d", arrow1Path2);
  
  // Add the text annotation
  svg
    .append("text")
    .attr("x", text1Position.x)
    .attr("y", text1Position.y)
    .text("Between 2014 and 2017, gun deaths increased by 6,174, or an 18.36% increase.");


    const arrow2Position = { x: 1015, y: 160 };
  const arrow2Position2 = { x: 1200, y: 160 }; // Adjust the coordinates as needed
  const text2Position = { x: 630, y: 0 };
  
  // Create the arrow using SVG <path> element
  const arrow2Path = `M${arrow2Position.x},${arrow2Position.y} L${text2Position.x},${text2Position.y}`;
  const arrow2Path2 = `M${arrow2Position2.x},${arrow2Position2.y} L${text2Position.x+30},${text2Position.y}`;
  svg
    .append("path")
    .attr("class", "arrow3")
    .attr("d", arrow2Path);
    
    svg
    .append("path")
    .attr("class", "arrow3")
    .attr("d", arrow2Path2);
  
  // Add the text annotation
  svg
    .append("text")
    .attr("x", text2Position.x)
    .attr("y", text2Position.y)
    .text("Between 2017 and 2019, gun deaths actually decreased by 66 deaths");

    const arrow3Position = { x: 1200, y: 165 };
    const arrow3Position2 = { x: 1290, y: 0 }; // Adjust the coordinates as needed
    const text3Position = { x: 920, y: 380 };
    
    // Create the arrow using SVG <path> element
    const arrow3Path = `M${arrow3Position.x},${arrow3Position.y} L${text3Position.x+10},${text3Position.y-10}`;
    const arrow3Path2 = `M${arrow3Position2.x},${arrow3Position2.y} L${text3Position.x+350},${text3Position.y}`;
    svg
      .append("path")
      .attr("class", "arrow4")
      .attr("d", arrow3Path);
      
      svg
      .append("path")
      .attr("class", "arrow4")
      .attr("d", arrow3Path2);
    
    // Add the text annotation
    svg
      .append("text")
      .attr("x", text3Position.x)
      .attr("y", text3Position.y)
      .text("Deaths jumped by 5,515 between 2019 and 2020, a 13.88% increase");



  }
  // Function to retrieve and process the data for the line chart
  async function processData() {
    const combinedData = await getCombinedData();
  
    // Calculate the number of deaths for each year and month
    const deathsData = {};
    combinedData.forEach(d => {
      const year = d.year;
      const month = d.month;
      const key = `${year}-${month}`;
  
      if (deathsData[key]) {
        deathsData[key]++;
      } else {
        deathsData[key] = 1;
      }
    });
  
    // Convert deathsData object into an array
    const data = Object.entries(deathsData).map(([key, count]) => {
      const [year, month] = key.split("-");
      return { year: parseInt(year), month: parseInt(month), count };
    });
  
    drawLineChart(data);
  }
  
  // Call the processData function
  processData();