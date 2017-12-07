import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormGroup,
  Glyphicon,
} from 'react-bootstrap';

const SidebarContent = ({
  counties,
  loadingCounties,
  fetchCounties,
  countySelected,
}) => {
  const loading = loadingCounties;
  const countiesMapped = counties.map(county => (
    <Button
      style={styles.item}
      key={county.fips}
      onClick={() => countySelected(county)}
    >
      {county.county}
      <small> {county.state} </small>
    </Button>
  ));
  return (
    <div>
      <div style={styles.container}>
        <h2 align="center" style={styles.title}>Counties</h2>
        <FormGroup style={styles.search}>
          <FormControl style={styles.searchInput} type="text" placeholder="Search" />
          <Glyphicon onClick={() => fetchCounties()} style={styles.searchButton} glyph="search" />
        </FormGroup>
      </div>
      {loading && <p style={styles.loading}> Loading... </p>}
      {!loading &&
        <ButtonGroup vertical block>
          {countiesMapped}
        </ButtonGroup>
      }
    </div>
  );
};

SidebarContent.propTypes = {
  counties: PropTypes.array,
  fetchCounties: PropTypes.func,
  loadingCounties: PropTypes.bool,
  countySelected: PropTypes.func,
};

SidebarContent.defaultProps = {
  counties: [],
  fetchCounties: () => {},
  loadingCounties: false,
  countySelected: () => {},
};

const styles = {
  container: {
    margin: 20,
  },
  title: {},
  item: {
    borderRadius: 0,
    textAlign: 'left',
  },
  search: {},
  searchInput: {
    width: '90%',
    display: 'inline',
  },
  searchButton: {
    width: '5%',
    padding: 10,
    float: 'right',
    display: 'inline',
    cursor: 'pointer',
  },
  loading: {
    margin: 20,
  },
};

export default SidebarContent;
