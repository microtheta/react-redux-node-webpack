import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from '../redux' // Or wherever you keep your reducers

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(middleware, thunk))
)

// Now you can dispatch navigation actions from anywhere!
// { push } from 'react-router-redux';
// store.dispatch(push('/foo'))


import Bundler from './Shared/BundleLoader';

const Home = (props) => (
  <Bundler load={() => import('./Home/Home')}>
    {(HomeModule) => <HomeModule {...props} />}
  </Bundler>
);

const Parallax = (props) => (
  <Bundler load={() => import('./Parallax/Parallax')}>
    {(ParallaxModule) => <ParallaxModule {...props} />}
  </Bundler>
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically */ }
        <ConnectedRouter history={history}>
          <Fragment>
            <Route exact path="/" component={Home} />
            <Route path="/parallax" component={Parallax} />
          </Fragment>
        </ConnectedRouter>
      </Provider>
    );
  }
}

if (module.hot) {
  module.hot.accept('../redux', () => {
    const nextReducer = require('../redux').default;
    store.replaceReducer(nextReducer);
  });
}