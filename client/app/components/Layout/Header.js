import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    const  { transparent } = this.props;
    return (
      <nav className={`navbar navbar-expand-lg navbar-light navbar sticky-top navbar-light bg-static ${transparent ? ' bg-transparent' : ' bg-light'}`} id="topNav">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <i className="fa fa-snowflake-o fa-2x" />
          </NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" exact activeClassName="active">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/parallax" activeClassName="active">Parallax</NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/status">Status</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#" disabled>Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
