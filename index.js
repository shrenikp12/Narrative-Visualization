

async function combineGunDeathData() {
   
  let combinedData = [];
  try {
    // Loop through the years and fetch the data for each year
    for (let year = 2006; year <= 2020; year++) {
      const response = await d3.csv(`guns_${year}.csv`);
      combinedData = combinedData.concat(response);
    }

    return combinedData;
  } catch (error) {
    console.error('Error combining gun death data:', error);
    return [];
  }
  }

  const combinedDataPromise = combineGunDeathData();

  async function getCombinedData() {
    try {
      return await combinedDataPromise;
    } catch (error) {
      console.error('Error retrieving combined data:', error);
      return [];
    }
  }
  
  // Load and combine the gun death data
