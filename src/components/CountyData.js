import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Table, Nav, NavItem } from 'react-bootstrap';
import { LineChart } from 'react-chartkick';

const DataTable = ({ countyData, rowSelected, selectedRow }) => {
  const { years, labels, data } = countyData;
  const tableBody = labels.map((label, index) => (
    <tr
      style={selectedRow === index ? styles.selectedTableRow : styles.tableRow}
      onClick={() => rowSelected(index)}
    >
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
  static get propTypes() {
    return {
      selectedCounty: PropTypes.object,
      countyData: PropTypes.object,
      loadingCounty: PropTypes.bool,
      availableInformation: PropTypes.object,
      selectCountyData: PropTypes.func,
      selectedInfo: PropTypes.string,
    };
  }

  static defaultProps = {
    selectedCounty: null,
    countyData: { years: [], labels: [], data: [] },
    loadingCounty: true,
    availableInformation: {},
    selectCountyData: () => {},
    selectedInfo: '',
  }

  static parseData(countyData, selectedRow) {
    // name: label name, data: data to be displayed
    const parsedData = [{ name: '', data: {} }];
    if (countyData) {
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
    return parsedData;
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedRow: 0,
    };
    this.selectCountyData = this.selectCountyData.bind(this);
  }

  selectCountyData(key) {
    this.setState({ selectedRow: 0 });
    this.props.selectCountyData(key);
  }

  render() {
    const {
      selectedCounty,
      countyData,
      availableInformation,
      loadingCounty,
      selectedInfo,
    } = this.props;
    const { selectedRow } = this.state;
    const parsedData = loadingCounty ? { } : CountyData.parseData(countyData, selectedRow);
    const activeData = availableInformation.find(i => i.path === selectedInfo);
    return (
      <Grid>
        {selectedCounty &&
          <div>
            <h1> {selectedCounty.county} </h1>
            <h4> {selectedCounty.state} </h4>
            <br />
            <Nav
              bsStyle="tabs"
              justified
              activeKey={activeData.key}
              onSelect={this.selectCountyData}
            >
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
                  selectedRow={selectedRow}
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
  selectedTableRow: {
    cursor: 'pointer',
    backgroundColor: 'lightgray',
  },
};

export default CountyData;
