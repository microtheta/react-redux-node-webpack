import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Bundler from './Shared/BundleLoader';

const Home = (props) => (
  <Bundler load={() => import('./Home/Home')}>
    {(HomeModule) => <HomeModule {...props} />}
  </Bundler>
);


export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}
