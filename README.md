# County health data SPA

This SPA was built to visualize information about several health indicators in every county of the United States. The initial data was obtained from the [Center for Disease Control and Prevention](https://www.cdc.gov/diabetes/data/countydata/countydataindicators.html).

## Table of contents

- [Technology used](#technology-used)
- [Features](#features)
- [Getting started](#getting-started)
- [Deployment](#deployment)
- [API reference](#api-reference)
 
## Technology used

- React
- React Router v3
- Redux
- Linting with [ESLint](http://eslint.org/)

## Features

The SPA has the following features:
- Search counties by name or state.
- Display health indicators by county.
- Select county information to be displayed.
- Add counties to favorites and access them easily.

## Getting started


```sh
# Clone the project
git clone https://github.com/aamatte/health-data-visualizer-spa.git health-data-spa
cd health-data-spa

# Install dependencies
yarn

# Run development
yarn start
```

### Deployment

To generate the production build:

```sh
yarn build
```

Upload the generated build file to a public cloud storage like AWS S3.

