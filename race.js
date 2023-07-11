// Function to draw the bar chart
function drawBarChart(data) {
    const margin = { top: 150, right: 150, bottom: 80, left: 80 };
    const width = 1000 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;
  
    // Create an SVG element
    const svg = d3
      .select("#race-chart") // Replace with the ID of the container element in your HTML
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
  
  
      
  
    // Define color scale for different races
    const colorScale = d3
      .scaleOrdinal()
      .domain(["White", "Black", "Hispanic", "Asian/Pacific Islander", "Native American/Native Alaskan"])
      .range(["#ff7f0e", "#1f77b4", "#2ca02c", "#d62728", "#ba920f"]);
  
    // Set x-scale for races
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.race))
      .range([0, width])
      .padding(0.2);
  
    // Set y-scale for number of deaths
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([height, 0]);
  
    // Draw x-axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));
  
    // Draw y-axis
    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));
  
     // Draw bars
  // Draw bars
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.race))
    .attr("y", d => yScale(d.count))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d.count))
    .attr("fill", d => colorScale(d.race))
    .on("mouseover", (event, d) => {
      // Show annotation on mouseover
      const bar = d3.select(event.currentTarget);
      const barX = parseFloat(bar.attr("x")) + xScale.bandwidth() / 2;
      const barY = parseFloat(bar.attr("y"));
      const barHeight = parseFloat(bar.attr("height"));
      svg
        .append("text")
        .attr("class", "annotation")
        .attr("x", barX)
        .attr("y", barY - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px") 
        .attr("fill", colorScale(d.race))
        .text(`Race: ${d.race} | Count: ${d.count}`);
    })
    .on("mouseout", () => {
      // Remove annotation on mouseout
      svg.select(".annotation").remove();
    });
  
  const radius = Math.min(width, height) / 2;
    // Add annotations to the pie chart
  const annotationRadius = radius + 20; // Adjust the radius for the annotations
  
  // Create a group element for the annotations
  
  
  // Append text elements for the annotations
  
  
  
    const pieSvg = d3
      .select("#racepie-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    // Create a pie layout
    const pie = d3
      .pie()
      .value(d => d.count)
      .sort(null);
  
      
  
      const pieData = pie(data);
  
      
    // Generate the pie chart data
  
  
    // Define color scale for different races
    const pieColorScale = d3
      .scaleOrdinal()
      .domain(data.map(d => d.race))
      .range(["#ff7f0e", "#1f77b4", "#2ca02c", "#d62728", "#ba920f"]);
  
    // Set inner and outer radius for the pie chart
    const innerRadius = 0;
    const outerRadius = radius - 20;
  
    // Create arc generator
    const arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
  
    // Draw pie slices
    const slices = pieSvg
      .selectAll("path")
      
      .data(pieData)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => pieColorScale(d.data.race))
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .on("mouseover", (event, d) => {
        // Show annotation on mouseover
        const total = d3.sum(pieData.map(d => d.data.count));
    const percentage = ((d.data.count / total) * 100).toFixed(2);
        const [x, y] = arc.centroid(d);
        pieSvg
          .append("text")
          .attr("class", "annotation")
          .attr("x", x)
          .attr("y", y)
          .attr("text-anchor", "middle")
          .attr("fill", "white")
          .text(`Race: ${d.data.race} | Percentage: ${percentage}%`);
      })
      .on("mouseout", () => {
        // Remove annotation on mouseout
        pieSvg.select(".annotation").remove();
      });
  
  
  
  const arrowPosition = { x: 100, y: 350 };
  const arrowPosition2 = { x: 300, y: 350 }; // Adjust the coordinates as needed
  const textPosition = { x: 255, y: -30 };
  
  // Create the arrow using SVG <path> element
  const arrowPath = `M${arrowPosition.x},${arrowPosition.y} L${textPosition.x},${textPosition.y}`;
  const arrowPath2 = `M${arrowPosition2.x},${arrowPosition2.y} L${textPosition.x+30},${textPosition.y}`;

    
    svg
    .append("path")
    .attr("class", "arrow")
    .attr("d", arrowPath2);
  
    svg
    .append("text")
    .attr("x", 255)
    .attr("y", -60)
    .text("For some rate context to the aggregate deaths displayed in the chart,");


  // Add the text annotation
  svg
    .append("text")
    .attr("x", textPosition.x)
    .attr("y", textPosition.y)
    .text("Here are the gun-related death rates for each race shown in the chart (per 100,000 people): ");
  
    svg
    .append("text")
    .attr("x", 300)
    .attr("y", 0)
    .text("White: 10.23");

    svg
    .append("text")
    .attr("x", 300)
    .attr("y", 20)
    .text("Black: 20.56");

    svg
    .append("text")
    .attr("x", 300)
    .attr("y", 40)
    .text("Hispanic: 6.52");

    svg
    .append("text")
    .attr("x", 300)
    .attr("y", 60)
    .text("Asian: 2.74");

    svg
    .append("text")
    .attr("x", 300)
    .attr("y", 80)
    .text("Native American: 8.31");
  
  
    const arrowPiePosition = { x: -200, y: 50 };
    const arrowPiePosition2 = { x: -100, y: -150 }; // Adjust the coordinates as needed
    const textPiePosition = { x: -300, y: -270 };
    
    // Create the arrow using SVG <path> element
    const arrowPiePath = `M${arrowPiePosition.x},${arrowPiePosition.y} L${textPiePosition.x},${textPiePosition.y}`;
    const arrowPiePath2 = `M${arrowPiePosition2.x},${arrowPiePosition2.y} L${-350},${300}`;
    pieSvg
      .append("path")
      .attr("class", "arrow")
      .attr("d", arrowPiePath);

    // Add the text annotation
    pieSvg
      .append("text")
      .attr("x", textPiePosition.x)
      .attr("y", textPiePosition.y)
      .text("Despite making up approximately 12% of the population over this time period, Blacks account for about 25% of the gun deaths");

      // Add the text annotation
    pieSvg
    .append("text")
    .attr("x", -350)
    .attr("y", 300)
    .text("Despite making up approximately 16% of the population over this time period, Hispanics only account for about 10% of the gun deaths");

    pieSvg
      .append("path")
      .attr("class", "arrow")
      .attr("d", arrowPiePath2);

            
   
    
  
  
  
  }
  
  // Function to retrieve and process the data for the bar chart
  async function processData() {
    const combinedData = await getCombinedData();
  
    // Calculate the number of deaths for each race
    const racesData = [
      { race: "White", count: 0 },
      { race: "Black", count: 0 },
      { race: "Hispanic", count: 0 },
      { race: "Asian/Pacific Islander", count: 0 },
      { race: "Native American/Native Alaskan", count: 0 },
    ];
  
    combinedData.forEach(d => {
      if (d.race === "White") {
        racesData.find(item => item.race === "White").count++;
      } else if (d.race === "Black") {
        racesData.find(item => item.race === "Black").count++;
      } else if (d.race === "Hispanic") {
        racesData.find(item => item.race === "Hispanic").count++;
      } else if (d.race === "Asian/Pacific Islander") {
        racesData.find(item => item.race === "Asian/Pacific Islander").count++;
      }
      else if (d.race === "Native American/Native Alaskan") {
        racesData.find(item => item.race === "Native American/Native Alaskan").count++;
      }
    });
  
    drawBarChart(racesData);
  }
  
  // Call the processData function
  processData();