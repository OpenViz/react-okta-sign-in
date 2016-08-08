import React from 'react';

const Header = () => {
  return (
    <header>
        <nav className="navbar navbar-default  navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header">
                  <a className="navbar-brand" href="/">
                    <img src="https://www.okta.com/sites/all/themes/Okta/images/logo.svg" height="100%" width="100%"/>
                  </a>
              </div>
            </div>
        </nav>
    </header>
  );
}

export default Header;