import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Nav, NavItem, Glyphicon, Row, Col } from 'react-bootstrap';
import { LineChart } from 'react-chartkick';
import DataTable from './DataTable';

class CountyData extends Component {
  static get propTypes() {
    return {
      selectedCounty: PropTypes.object,
      countyData: PropTypes.object,
      loadingCounty: PropTypes.bool,
      availableData: PropTypes.array,
      selectCountyData: PropTypes.func,
      selectedInfo: PropTypes.string,
      favorites: PropTypes.array,
      addToFavorites: PropTypes.func,
      removeFromFavorites: PropTypes.func,
    };
  }

  static defaultProps = {
    selectedCounty: null,
    countyData: { years: [], labels: [], data: [] },
    loadingCounty: true,
    availableData: {},
    selectCountyData: () => {},
    selectedInfo: '',
    favorites: [],
    addToFavorites: () => {},
    removeFromFavorites: () => {},
  }

  // Parse the data to the accepted format by LineChart
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
      // Selected data row to be displayed
      selectedRow: 0,
    };
    this.selectCountyData = this.selectCountyData.bind(this);
    this.changeFavoriteStatus = this.changeFavoriteStatus.bind(this);
  }

  selectCountyData(key) {
    this.setState({ selectedRow: 0 });
    this.props.selectCountyData(key);
  }

  changeFavoriteStatus(newStatusIsFavorite) {
    const { removeFromFavorites, addToFavorites, selectedCounty } = this.props;
    if (newStatusIsFavorite) {
      addToFavorites(selectedCounty);
    } else {
      removeFromFavorites(selectedCounty);
    }
  }

  render() {
    const {
      selectedCounty,
      countyData,
      availableData,
      loadingCounty,
      selectedInfo,
      favorites,
    } = this.props;
    const { selectedRow } = this.state;
    const parsedData = loadingCounty ? { } : CountyData.parseData(countyData, selectedRow);
    const activeData = availableData.find(i => i.path === selectedInfo);
    const favorite = selectedCounty && favorites.find(f => f.fips === selectedCounty.fips);
    return (
      <Grid>
        {selectedCounty &&
          <div>
            {/* Header */}
            <Row style={styles.header}>
              <Col sm={9}>
                <h1> {selectedCounty.county} </h1>
                <h4> {selectedCounty.state} </h4>
              </Col>
              <Col style={styles.favoriteContainer} sm={3}>
                <Glyphicon
                  onClick={() => this.changeFavoriteStatus(!favorite)}
                  style={favorite ? styles.favoriteSelected : styles.favoriteUnselected}
                  glyph="heart"
                />
              </Col>
            </Row>
            <br />
            {/* Tabs showing available indicators */}
            <Nav
              bsStyle="tabs"
              justified
              activeKey={activeData ? activeData.key : 1}
              onSelect={this.selectCountyData}
            >
              {availableData.map(info => (
                <NavItem key={info.key} eventKey={info.key}>{info.name}</NavItem>
              ))}
            </Nav>
            <br />
            {/* Indicators of the selected county */}
            {!loadingCounty &&
              <div>
                <DataTable
                  countyData={countyData}
                  handleRowSelected={index => this.setState({ selectedRow: index })}
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
  header: {

  },
  favoriteContainer: {
    padding: 30,
  },
  favoriteSelected: {
    float: 'right',
    fontSize: 30,
  },
  favoriteUnselected: {
    // Simulate border
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    color: 'white',
    fontSize: 30,
    float: 'right',
  },
};

export default CountyData;
