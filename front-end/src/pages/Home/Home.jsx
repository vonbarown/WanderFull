import React, { Component } from "react";
import Hamburger from "../../Components/Shared/Hamburger";
import axios from "axios";
import "../../styles/AppNavBar.css";
import logo from "../../themes/Logo/f537d019-e1b6-4e42-8275-2c9c5c7b8075_200x200.png";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import Carousel from "../../Components/Caroursel/carousel";
import "./Home.css";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      feed: true,
      feedArr: [],
      input: "",
      hashtagArr: [],
      loggedIn: false,
    };
    // checkStorage()
  }

  componentDidMount() {
    this.checkStorage();
    this.getAllPhotos();
  }

  componentDidUpdate(prevProps, prevState) {
    const { input } = this.state;
    if (!input === prevState.input) {
      this.searchHashtag();
    }
  }

  checkStorage = () => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      window.location.href = "/";
    } else {
      this.setState({ loggedIn: true });
    }
  };

  getAllPhotos = async () => {
    let allPhotos = `http://localhost:8080/posts/all`;
    try {
      const {
        data: { payload },
      } = await axios.get(allPhotos);
      this.setState({
        feedArr: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  searchHashtag = async (input) => {
    // const {input} = this.state
    try {
      const hashtagImgs = `http://localhost:8080/posts/search/hashtag/${input}`;
      const {
        data: { payload },
      } = await axios.get(hashtagImgs);
      // let urlsArr = payload.map(el=>{
      //     return el.img
      // })
      this.setState({
        feedArr: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  searchUser = async () => {
    const { input } = this.state;
    try {
      const username = `http://localhost:8080/posts/profile/${input}`;
      const {
        data: { payload },
      } = await axios.get(username);
      this.setState({
        feedArr: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  render() {
    const { feed, input } = this.state;
    const { handleInput, searchUser, searchHashtag } = this;

    return this.state.loggedIn ? (
      <div className="home">
        <div className="appNavBar">
          <div className="appNavBarItems">
            <div className="appName">
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
              <Sidebar className="sidebar" />
            </div>
            <div className="hamburger">
              <Hamburger
                handleInput={handleInput}
                searchUser={searchUser}
                searchHashtag={searchHashtag}
                input={input}
                feed={feed}
                home={true}
              />
            </div>
          </div>
        </div>
        <Carousel />
      </div>
    ) : (
      <div>berbter</div>
    );
  }
}

export default Home;
