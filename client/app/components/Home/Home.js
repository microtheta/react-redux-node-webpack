import React, { Component, Fragment } from 'react';
import Header from '../Layout/Header';

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className="container-fluid">
          <div className="page row align-items-center">
            <div className="col">
              <h2 className="text-center">Welcome to React!!</h2>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Home;
