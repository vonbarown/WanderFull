import React, { Component } from "react";
import Toggle from "react-toggle";
import Container from "./Components/Landing/Container";
import { Switch, Route } from "react-router-dom";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile";
import { Buds } from "./Components/Profile/Buds";
import Settings from "./pages/Settings";
import AppNavBar from "./Components/Shared/AppNavBar";
import Home from "./pages/Home/Home";
import "./App.css";

import Upload from "./Components/TestComponents/UploadForm";

import MapContainer from "./Components/Map/MapOfficial";

class Landing extends Component {
  state = {
    firstRender: false,
    login: true,
    darkMode: false,
    toggle: false,
  };

  componentDidMount() {
    //add eventListener to check for the users preferred device
    window.addEventListener("scroll", this.handleScroll);

    const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
    this.handleThemeToggle(darkPref.matches);

    if (darkPref.matches) {
      console.log(darkPref);
      this.setState((prevState) => {
        return {
          darkMode: !prevState.darkMode,
          toggle: !prevState.toggle,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          toggle: !prevState.toggle,
        };
      });
    }

    //creating interval to change class name of the scroll down arrow
    // setInterval(() => {
    //   this.setState({ blink: !this.state.blink });
    // }, 2000);
  }

  handleThemeToggle = (e) => {
    // this.setState({ darkMode: e });
    if (e) {
      document.body.style.backgroundColor = "black;";
    } else {
      document.body.style = "background: white-smoke; transition: 0.5s ease;";
    }
  };

  handleChange = (event) => {
    const { firstRender } = this.state;
    console.log(event.target.value);
    console.log(event.target.innerText);

    if (firstRender) {
      this.switchFirstRender();
    }

    if (event.target.innerText.includes("Login")) {
      this.setState({
        login: true,
      });
    } else {
      this.setState({
        login: false,
      });
    }
  };

  handleLogout = () => {
    console.clear();
    console.log("Logout");
    console.log(this.props);
    // this.props.history.push('/asdf')
  };

  switchFirstRender = () => {
    this.setState({
      firstRender: false,
    });
  };

  renderContainer = (routeProps) => {
    // console.log(routeProps)
    const { firstRender, login, signUp } = this.state;
    const { handleChange, submitLogin, handleLogout } = this;
    return (
      <Container
        id="container"
        submitLogin={submitLogin}
        handleChange={handleChange}
        firstRender={firstRender}
        login={login}
        signUp={signUp}
        handleLogout={handleLogout}
      />
    );
  };

  render() {
    console.log("Landing props:", this.props);
    const { darkMode } = this.state;

    return (
      <div className={darkMode ? "darkMode" : "App"}>
        <Switch>
          <Route path="/home" component={Home} />
          {!!sessionStorage.getItem("user") && (
            <>
              <Route path="/buds" component={Buds} />
              <Route path="/upload" component={Upload} />
              <Route path="/map" component={MapContainer} />

              <AppNavBar>
                <Route path="/feed" component={Feed} />
                <Route path="/profile" component={Profile} />
                <Route path="/settings" component={Settings} />
              </AppNavBar>
            </>
          )}
          <Route path="/" component={this.renderContainer} />
        </Switch>
      </div>
    );
  }
}

export default Landing;
