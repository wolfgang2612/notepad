import React from "react";
import Axios from "axios";

function Titlebar(props) {
  const users = props.users;

  const dropdown = users.map((user) => {
    if (user.username == props.username)
      return (
        <option value={user.username} selected="selected">
          {user.username}
        </option>
      );
    else return <option value={user.username}>{user.username}</option>;
  });
  const text = "/" + props.notename;

  function handleChange(event) {
    let val = event.target.value;
    if (val === "adduser") {
      let username = prompt("Enter username: ", "");
      if (username && username != "adduser") {
        let baseURL = "http://localhost:5000/user/";
        let addURL = baseURL + "add";
        const postObject = {
          username: username,
        };
        Axios.post(addURL, postObject).then((res) =>
          props.appCallback({ username: username, action: "changeuser" })
        );
      }
    } else {
      props.appCallback({ username: val, action: "changeuser" });
    }
  }

  return (
    <div className="titlebar">
      <select style={{ fontWeight: "bold" }} onClick={handleChange}>
        <option value="adduser">Add user</option>
        {dropdown}
      </select>
      <p className="title">{text}</p>
    </div>
  );
}

export default Titlebar;
