import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Sidebar from 'react-sidebar';
import { fetchCounties, fetchCountyData } from '../../actions/counties';
import SidebarContent from '../../components/SidebarContent';

const mapDispatchToProps = (dispatch) => { //eslint-disable-line
  return {
    actions: {
      fetchCounties: pagination => dispatch(fetchCounties(pagination)),
      fetchCountyData: (query, pagination = {}) => dispatch(fetchCountyData(query, pagination)),
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
  } = state.counties;

  return {
    counties,
    selectedCounty,
    countyData,
    favorites,
    loadingCounties,
    loadingCounty,
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
  }

  constructor(props) {
    super(props);
    this.state = {

    };
    this.fetchCounties = this.fetchCounties.bind(this);
    this.countySelected = this.countySelected.bind(this);
  }

  componentDidMount() {
    const { params } = this.props;
    this.fetchCounties();
    if (params && params.state && params.county) {
      const { state, county } = params;
      this.props.actions.fetchCountyData({ county: { county, state } });
    }
  }

  fetchCounties() {
    this.props.actions.fetchCounties();
  }

  countySelected(county) {
    this.props.actions.fetchCountyData({ county });
    this.props.router.replace(`/states/${county.state}/counties/${county.county}`);
  }

  render() {
    const {
      counties,
      loadingCounties,
      selectedCounty,
      countyData,
      loadingCounty,
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
      loadingCounty,
    };
    return (
      <div style={styles.app}>
        <Sidebar
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
  title: {},
  intro: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
