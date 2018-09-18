import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import NowPlaying from "./components/NowPlaying";

export const Login = props => {
  return <p>Login</p>;
};

export const Home = props => {
  return <p class="bg-dark">Navigate to your secret URL</p>;
};

class App extends Component {
  render() {
    return (
      <div className="App minHeight m-0 p-0">
        <BrowserRouter>
          <Switch>
            <Route
              path="/nowplaying/:userId"
              name="NowPlaying"
              component={NowPlaying}
            />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
