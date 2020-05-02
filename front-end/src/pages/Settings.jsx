import React, { useState, useEffect } from "react";
import "../styles/settings.css";
import { Button } from "@material-ui/core";
import axios from "axios";

const useStyles = {
  display: "none",
};

const Settings = () => {
  const [data, setData] = useState({ data: [] });
  const [username, setUsername] = useState("");

  const fetchData = async () => {
    const {
      data: { payload },
    } = await axios.patch(
      `http://localhost:8080/users/update/${sessionStorage.getItem("user_id")}`,
      {
        username: username,
      }
    );
    sessionStorage.setItem("user", payload.username);
    setData(payload);
  };

  const handleProfilePicUpdate = async (event) => {
    event.preventDefault();
    console.log("updating profile pic");
    // let imageFile = event.target.files[0]
    // const data = new FormData()
    // data.append('profile_pic', imageFile)
    // try {
    //     const {data: {payload}} = await axios.post(`http://localhost:8080/users/update/`, data)
    // } catch (error) {

    // }
  };

  return (
    <div className="settingsPage">
      <h1>Settings</h1>
      <div className="toggleButton">Change Theme</div>

      <p>Edit Profile info</p>
      <form
        onSubmit={(e) => {
          fetchData();
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        {
          // <input type="text" placeholder="profile pic url"></input>
        }
        <button onClick={() => setUsername(username)}>Submit</button>
      </form>

      <form noValidate autoComplete="off" onSubmit={handleProfilePicUpdate}>
        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          style={useStyles}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            {" "}
            Upload Photo{" "}
          </Button>
        </label>
      </form>
    </div>
  );
};

export default Settings;
