import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Sidebar from 'react-sidebar';
import { fetchCounties, fetchCountyData } from '../../actions/counties';
import SidebarContent from '../../components/SidebarContent';

const availableInformation = [
  { key: 1, path: 'diabetes-incidence', name: 'Diabetes incidende' },
  { key: 2, path: 'diabetes-prevalence', name: 'Diabetes prevalence' },
  { key: 3, path: 'obesity-prevalence', name: 'Obesity prevalence' },
  { key: 4, path: 'physical-inactivity', name: 'Physical inactivity' },
];

const mapDispatchToProps = (dispatch) => { //eslint-disable-line
  return {
    actions: {
      fetchCounties: (query, pagination) => dispatch(fetchCounties(query, pagination)),
      fetchCountyData: (query, source, pagination = {}) => dispatch(fetchCountyData(query, source, pagination)),
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
  } = state.counties;

  return {
    counties,
    selectedCounty,
    countyData,
    favorites,
    loadingCounties,
    loadingCounty,
    selectedInfo,
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
    };
  }

  static defaultProps = {
    children: {},
    router: {},
    params: {},

    actions: {},
    counties: [],
    loadingCounties: true,
    selectedCounty: {},
    countyData: null,
    loadingCounty: true,
    selectedInfo: 'diabetes-incidence',
  }

  constructor(props) {
    super(props);
    this.fetchCounties = this.fetchCounties.bind(this);
    this.countySelected = this.countySelected.bind(this);
    this.selectCountyData = this.selectCountyData.bind(this);
  }

  componentDidMount() {
    const { params } = this.props;
    this.fetchCounties();
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

  countySelected(county) {
    this.props.actions.fetchCountyData({ county });
    this.props.router.replace(`/states/${county.state}/counties/${county.county}`);
  }

  selectCountyData(key) {
    const { selectedCounty } = this.props;
    const info = availableInformation.find(i => i.key === key);
    this.props.actions.fetchCountyData({ county: selectedCounty }, info.path);
  }

  render() {
    const {
      counties,
      loadingCounties,
      selectedCounty,
      countyData,
      loadingCounty,
      selectedInfo,
    } = this.props;
    const sidebarProps = {
      fetchCounties: this.fetchCounties,
      countySelected: this.countySelected,
      counties,
      loadingCounties,
    };
    const countyDataProps = {
      countyData,
      selectedCounty,
      availableInformation,
      loadingCounty,
      selectedInfo,
      selectCountyData: this.selectCountyData,
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
