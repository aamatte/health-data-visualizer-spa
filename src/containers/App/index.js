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
      actions: PropTypes.object,
      counties: PropTypes.array,
      loadingCounties: PropTypes.bool,
      selectedCounty: PropTypes.object,
      countyData: PropTypes.object,
    };
  }

  static defaultProps = {
    children: {},
    router: {},
    actions: {},
    counties: [],
    loadingCounties: false,
    selectedCounty: {},
    countyData: {},
  }

  constructor(props) {
    super(props);
    this.state = {

    };
    this.fetchCounties = this.fetchCounties.bind(this);
    this.countySelected = this.countySelected.bind(this);
  }

  componentDidMount() {
    this.fetchCounties();
  }

  fetchCounties() {
    this.props.actions.fetchCounties();
  }

  countySelected(county) {
    this.props.actions.fetchCountyData({ county });
    this.props.router.replace(`/county/${county.fips}`);
  }

  render() {
    const { counties, loadingCounties, selectedCounty, countyData, loadingCounty } = this.props;
    console.log(this.props);
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
