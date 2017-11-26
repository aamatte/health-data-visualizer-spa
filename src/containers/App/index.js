import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div style={styles.app}>
        <header style={styles.title}>
          <h1>Welcome to React</h1>
        </header>
        <p style={styles.intro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const styles = {
  app: {

  },
  title: {

  },
  intro: {

  },
};

export default App;
