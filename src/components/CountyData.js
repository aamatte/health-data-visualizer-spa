import React from 'react';
import { Grid } from 'react-bootstrap';
import { LineChart } from 'react-chartkick';

const CountyData = ({ selectedCounty, countyData, loadingCounty }) => {
  const { years, labels, data } = countyData;
  const parsedData = [{}];
  if (!loadingCounty) {
    parsedData[0].name = labels[0]; 
    const labelData = {}
    console.log(years);
    years.forEach((year) => {
      if (data[0][year]) {
        labelData[year] = data[0][year][0];        
      }
    });
    parsedData[0].data = labelData;
  }
  return (
    <Grid>
      <h1>County Data</h1>
      <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      {!loadingCounty && <LineChart data={parsedData} /> }
    </Grid>
  );
};

export default CountyData;
