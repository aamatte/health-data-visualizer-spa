import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Table } from 'react-bootstrap';
import { LineChart } from 'react-chartkick';

const dataTable = (countyData) => {
  const { years, labels, data } = countyData;
  const tableBody = labels.map((label, index) => {
    return (
      <tr>
        <td> {label} </td>
        {years.map(year => <td> {data[0][year][index]}</td>)}
      </tr>
    );
  });

  return (
    <Table responsive>
      <thead>
        <tr>
          <th />
          {countyData.years.map(year => <th key={year}>{year}</th>)}
        </tr>
      </thead>
      <tbody>
        {tableBody}
      </tbody>
    </Table>
  );
};

const CountyData = ({ selectedCounty, countyData, loadingCounty }) => {
  const parsedData = [{ name: '', data: {} }];
  if (!loadingCounty && countyData) {
    const { years, labels, data } = countyData;
    const [name] = labels;
    parsedData[0].name = name;
    const labelData = {};
    years.forEach((year) => {
      const yearData = data[0][year];
      if (yearData) {
        const [yearValue] = data[0][year];
        labelData[year] = yearValue;
      }
    });
    parsedData[0].data = labelData;
  }
  return (
    <Grid>
      {selectedCounty &&
        <div>
          <h1>{selectedCounty.county}</h1>
          <p>Information about this county.</p>
          {!loadingCounty &&
            <div>
              {dataTable(countyData)}
              <LineChart data={parsedData} />
            </div> }
          {loadingCounty && <h3> Loading... </h3>}
        </div>
      }
      {!selectedCounty && <h2> No county selected </h2>}

    </Grid>
  );
};

CountyData.protoTypes = {
  selectedCounty: PropTypes.any,
  countyData: PropTypes.any,
  loadingCounty: PropTypes.bool,
};

CountyData.defaultProps = {
  selectedCounty: null,
  countyData: { years: [], labels: [], data: [] },
  loadingCounty: true,
};

export default CountyData;
