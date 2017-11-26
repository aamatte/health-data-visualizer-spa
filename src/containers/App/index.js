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
      fetchCountyData: (query, pagination) => dispatch(fetchCountyData(query, pagination)),
    },
  };
};

class App extends Component {
  static get propTypes() {
    return {
      // React Router
      children: PropTypes.object,
      router: PropTypes.object,
    };
  }

  static defaultProps = {
    children: {},
    router: {},
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const subProps = { test: 'hola', counties: ['County 1', 'County 2'] };
    return (
      <div style={styles.app}>
        <Sidebar
          sidebar={<SidebarContent {...subProps} />}
          docked
        >
          {React.cloneElement(this.props.children, { ...subProps }) }
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

export default connect(null, mapDispatchToProps)(App);
