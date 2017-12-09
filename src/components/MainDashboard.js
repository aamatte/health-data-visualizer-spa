import React from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';

const MainDashboard = () => (
  <Jumbotron>
    <Grid>
      <h1>Health data visualizer</h1>
      <p>
        Here you can see in a friendly way health indicators by county.
        The data was adapted from the <a href="https://www.cdc.gov/diabetes/data/countydata/countydataindicators.html">Center for Disease Control and Prevention </a>.
      </p>
    </Grid>
  </Jumbotron>
);

export default MainDashboard;
