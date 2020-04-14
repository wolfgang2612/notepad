import React from "react";
import Axios from "axios";

function New(props) {
  function handleClick(event) {
    let notename = prompt("Enter filename: ", "");
    if (notename) {
      let baseURL = "http://localhost:5000/user";
      let addURL = baseURL + "/" + props.username + "/addnote";
      const postObject = {
        notename: notename,
        username: props.username,
        text: "\n",
      };
      Axios.post(addURL, postObject).then((res) =>
        props.parentCallback({ headertext: res.data, action: "new" })
      );
    }
  }

  return (
    <div className="new" onClick={handleClick}>
      <h3>New note</h3>
    </div>
  );
}

export default New;
