import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config_example";
import hash from "./hash";

import "./App.css";
import SideMenu from "./components/sideMenu";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
    };
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
    }
  }

  render() {
    return (
      <div className="App">
        {!this.state.token && (
          <div className="m-32">
            <a
              style={{
                border: " 1px solid lightgreen",
                borderRadius: "21px",
                padding: "10px",
                background: "lightgreen",
                color: "white",
                margin: "20px",
              }}
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          </div>
        )}
        {this.state.token && <SideMenu token={this.state.token} />}
      </div>
    );
  }
}

export default App;
