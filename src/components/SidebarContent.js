import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormGroup,
  Glyphicon,
  Pagination,
  Nav,
  NavItem,
  Badge,
} from 'react-bootstrap';

// Source: https://en.wikipedia.org/wiki/County_(United_States)
const NUMBER_OF_COUNTIES = 3142;
const COUNTIES_PER_PAGE = 20;

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      activePage: 1,
      activeTab: 'all-counties',
    };
    this.handlePageSelect = this.handlePageSelect.bind(this);
    this.fetchCounties = this.fetchCounties.bind(this);
    this.searchCounties = this.searchCounties.bind(this);
  }

  fetchCounties(query) {
    this.setState({ activePage: 1 });
    this.props.fetchCounties(query);
  }

  handlePageSelect(eventKey) {
    this.setState({
      activePage: eventKey,
    });
    this.props.fetchCounties({}, { page: eventKey - 1, perPage: COUNTIES_PER_PAGE });
  }

  searchCounties(searchValue) {
    // When length is zero, just search everything, and a one character query is too short
    if (searchValue.length !== 1) {
      const query = { county: searchValue, state: searchValue };
      this.fetchCounties(query);
    }
  }

  render() {
    const {
      counties,
      loadingCounties,
      countySelected,
      favorites,
    } = this.props;
    const { searchValue, activeTab } = this.state;

    const loading = loadingCounties;
    const displayCounties = activeTab === 'all-counties' ? counties : favorites;
    const countiesMapped = displayCounties.map(county => (
      <Button
        style={styles.item}
        key={county.fips}
        onClick={() => countySelected(county)}
      >
        {county.county},
        <small> {county.state} </small>
      </Button>
    ));
    const pages = counties.length >= COUNTIES_PER_PAGE ? parseInt(NUMBER_OF_COUNTIES / COUNTIES_PER_PAGE, 10) : 1;
    return (
      <div>
        <div style={styles.container}>
          {/* Search bar */}
          <FormGroup style={styles.search}>
            <FormControl
              style={styles.searchInput}
              type="text"
              placeholder="Search"
              value={this.state.searchValue}
              onChange={e => this.setState({ searchValue: e.target.value })}
            />
            <Glyphicon
              onClick={() => this.searchCounties(searchValue)}
              style={styles.searchButton}
              glyph="search"
            />
          </FormGroup>
          <Nav
            bsStyle="tabs"
            activeKey={activeTab}
            onSelect={eventKey => this.setState({ activeTab: eventKey })}
          >
            <NavItem eventKey="all-counties">Counties</NavItem>
            <NavItem eventKey="favorites"> Favorites <Badge>{favorites.length}</Badge></NavItem>
          </Nav>
        </div>
        {loading && <p style={styles.sidebarNotice}> Loading... </p>}
        {/* List of counties */}
        {!loading &&
          <ButtonGroup vertical block>
            {displayCounties.length > 0 && countiesMapped}
            {displayCounties.length === 0 && <p style={styles.sidebarNotice}> Nothing to show </p>}
            {displayCounties.length === COUNTIES_PER_PAGE &&
              <Pagination
                style={styles.pagination}
                prev
                next
                ellipsis
                items={pages}
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
  favorites: PropTypes.array,
};

SidebarContent.defaultProps = {
  counties: [],
  fetchCounties: () => {},
  loadingCounties: false,
  countySelected: () => {},
  favorites: [],
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
  sidebarNotice: {
    margin: 20,
  },
  pagination: {
    maxWidth: '100%',
  },
};

export default SidebarContent;
