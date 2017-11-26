import React from 'react';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormGroup,
  Glyphicon,
} from 'react-bootstrap';

const SidebarContent = ({ counties, fetchCounties, loadingCounties }) => {
  const loading = loadingCounties;
  const countiesMapped = counties.map(county => (
    <Button style={styles.item} key={county.fips}>
      {county.county}
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
