import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Sidebar from 'react-sidebar';
import {
  fetchCounties,
  fetchCountyData,
  addToFavorites,
  removeFromFavorites,
  fetchAvailableData,
} from '../../actions/counties';
import SidebarContent from '../../components/SidebarContent';

const mapDispatchToProps = (dispatch) => { //eslint-disable-line
  return {
    actions: {
      fetchCounties: (query, pagination) => dispatch(fetchCounties(query, pagination)),
      fetchCountyData: (query, source, pagination = {}) => dispatch(fetchCountyData(query, source, pagination)),
      addToFavorites: county => dispatch(addToFavorites(county)),
      removeFromFavorites: county => dispatch(removeFromFavorites(county)),
      fetchAvailableData: () => dispatch(fetchAvailableData()),
    },
  };
};

const mapStateToProps = (state) => {
  const {
    counties,
    selectedCounty,
    countyData,
    favorites,
    loadingCounties,
    loadingCounty,
    selectedInfo,
    availableData,
  } = state.counties;

  return {
    counties,
    selectedCounty,
    countyData,
    favorites,
    loadingCounties,
    loadingCounty,
    selectedInfo,
    availableData,
  };
};

class App extends Component {
  static get propTypes() {
    return {
      // React Router
      children: PropTypes.object,
      router: PropTypes.object,
      params: PropTypes.object,

      actions: PropTypes.object,
      counties: PropTypes.array,
      loadingCounties: PropTypes.bool,
      selectedCounty: PropTypes.object,
      countyData: PropTypes.object,
      loadingCounty: PropTypes.bool,
      selectedInfo: PropTypes.string,
      favorites: PropTypes.array,
      availableData: PropTypes.array,
    };
  }

  static defaultProps = {
    // React router
    children: {},
    router: {},
    params: {},

    actions: {},
    counties: [],
    loadingCounties: true,
    selectedCounty: {},
    countyData: null,
    loadingCounty: true,
    selectedInfo: null,
    availableData: [],
    favorites: [],
  }

  constructor(props) {
    super(props);
    this.fetchCounties = this.fetchCounties.bind(this);
    this.fetchAvailableData = this.fetchAvailableData.bind(this);
    this.countySelected = this.countySelected.bind(this);
    this.selectCountyData = this.selectCountyData.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
  }

  componentDidMount() {
    const { params } = this.props;
    this.fetchCounties();
    this.fetchAvailableData();
    if (params && params.state && params.county) {
      const { state, county } = params;
      this.props.actions.fetchCountyData({
        county: { county, state },
      });
    }
  }

  fetchCounties(query, pagination) {
    this.props.actions.fetchCounties(query, pagination);
  }

  fetchAvailableData() {
    this.props.actions.fetchAvailableData();
  }

  countySelected(county) {
    this.props.actions.fetchCountyData({ county });
    this.props.router.replace(`/states/${county.state}/counties/${county.county}`);
  }

  selectCountyData(key) {
    const { selectedCounty, availableData } = this.props;
    const info = availableData.find(i => i.key === key);
    this.props.actions.fetchCountyData({ county: selectedCounty }, info.path);
  }

  addToFavorites(county) {
    this.props.actions.addToFavorites(county);
  }

  removeFromFavorites(county) {
    this.props.actions.removeFromFavorites(county);
  }

  render() {
    const {
      counties,
      loadingCounties,
      selectedCounty,
      countyData,
      loadingCounty,
      selectedInfo,
      favorites,
      availableData,
    } = this.props;
    const sidebarProps = {
      fetchCounties: this.fetchCounties,
      countySelected: this.countySelected,
      counties,
      loadingCounties,
      favorites,
    };
    const countyDataProps = {
      countyData,
      selectedCounty,
      availableData,
      loadingCounty,
      selectedInfo,
      selectCountyData: this.selectCountyData,
      favorites,
      addToFavorites: this.addToFavorites,
      removeFromFavorites: this.removeFromFavorites,
    };
    return (
      <div style={styles.app}>
        <Sidebar
          style={styles.sidebar}
          sidebar={<SidebarContent {...sidebarProps} />}
          docked
        >
          {React.cloneElement(this.props.children, { ...countyDataProps }) }
        </Sidebar>
      </div>
    );
  }
}

const styles = {
  app: {},
  sidebar: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
