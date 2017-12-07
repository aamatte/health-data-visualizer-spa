import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Table, Nav, NavItem } from 'react-bootstrap';
import { LineChart } from 'react-chartkick';

const DataTable = ({ countyData, rowSelected }) => {
  const { years, labels, data } = countyData;
  const tableBody = labels.map((label, index) => (
    <tr style={styles.tableRow} onClick={() => rowSelected(index)}>
      <td> {label} </td>
      {years.map(year => <td> {data[0][year][index]}</td>)}
    </tr>
  ));

  return (
    <Table responsive hover>
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

class CountyData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: 0,
    };
  }

  render() {
    const {
      selectedCounty,
      countyData,
      availableInformation,
      loadingCounty,
      selectCountyData,
      selectedInfo,
    } = this.props;

    const { selectedRow } = this.state;

    // name: label name, data: data to be displayed
    const parsedData = [{ name: '', data: {} }];
    if (!loadingCounty && countyData) {
      const { years, labels, data } = countyData;
      const name = labels[selectedRow];
      parsedData[0].name = name;
      const labelData = {};
      years.forEach((year) => {
        const yearData = data[0][year];
        if (yearData) {
          const yearValue = data[0][year][selectedRow];
          labelData[year] = yearValue;
        }
      });
      parsedData[0].data = labelData;
    }
    const activeData = availableInformation.find(i => i.path === selectedInfo);
    return (
      <Grid>
        {selectedCounty &&
          <div>
            <h1> {selectedCounty.county} </h1>
            <h4> {selectedCounty.state} </h4>
            <br />
            <Nav bsStyle="tabs" justified activeKey={activeData.key} onSelect={selectCountyData}>
              {availableInformation.map(info => (
                <NavItem key={info.key} eventKey={info.key}>{info.name}</NavItem>
              ))}
            </Nav>
            <br />

            {!loadingCounty &&
              <div>
                <DataTable
                  countyData={countyData}
                  rowSelected={index => this.setState({ selectedRow: index })}
                />
                <LineChart data={parsedData} />
              </div> }
            {loadingCounty && <h3> Loading... </h3>}
          </div>
        }
        {!selectedCounty && <h2> No county selected </h2>}

      </Grid>
    );
  }
}

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

const styles = {
  tableRow: {
    cursor: 'pointer',
  },
};

export default CountyData;
