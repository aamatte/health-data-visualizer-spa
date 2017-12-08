import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormGroup,
  Glyphicon,
  Pagination,
} from 'react-bootstrap';

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      activePage: 1,
    };
    this.handlePageSelect = this.handlePageSelect.bind(this);
    this.fetchCounties = this.fetchCounties.bind(this);
  }

  fetchCounties(query) {
    this.setState({ activePage: 1 });
    this.props.fetchCounties(query);
  }

  handlePageSelect(eventKey) {
    this.setState({
      activePage: eventKey,
    });
    this.props.fetchCounties({}, { page: eventKey - 1, perPage: 20 });
  }

  render() {
    const {
      counties,
      loadingCounties,
      countySelected,
    } = this.props;
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
    const query = { county: this.state.searchValue, state: this.state.searchValue };
    return (
      <div>
        <div style={styles.container}>
          <h2 align="center" style={styles.title}>Counties</h2>
          <FormGroup style={styles.search}>
            <FormControl
              style={styles.searchInput}
              type="text"
              placeholder="Search"
              value={this.state.searchValue}
              onChange={e => this.setState({ searchValue: e.target.value })}
            />
            <Glyphicon
              onClick={() => this.fetchCounties(query)}
              style={styles.searchButton}
              glyph="search"
            />
          </FormGroup>
        </div>
        {loading && <p style={styles.loading}> Loading... </p>}
        {!loading &&
          <ButtonGroup vertical block>
            {countiesMapped}
            {counties.length <= 20 &&
              <Pagination
                style={styles.pagination}
                prev
                next
                ellipsis
                items={counties.length >= 20 ? 160 : 1}
                maxButtons={3}
                activePage={this.state.activePage}
                onSelect={this.handlePageSelect}
              />
            }
          </ButtonGroup>
        }
      </div>
    );
  }
}

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
  pagination: {
    maxWidth: '100%',
  },
};

export default SidebarContent;
