import React from "react";
import Axios from "axios";

function Tile(props) {
  const thumbLength = 20;
  const text =
    props.text.length <= thumbLength
      ? props.text
      : props.text.substring(0, thumbLength) + "...";

  function handleClick() {
    props.parentCallback({
      maintext: props.text,
      notename: props.notename,
      action: "cmn",
    });
  }

  function handleDelete() {
    let baseURL = "http://localhost:5000/user";
    let deleteURL =
      baseURL + "/" + props.username + "/delete/" + props.notename;
    Axios.delete(deleteURL).then((res) =>
      props.parentCallback({ headertext: res.data, action: "delete" })
    );
  }

  return (
    <div className="tile" onClick={handleClick}>
      <p className="notename">
        {props.notename}
        <button
          style={{ float: "right", marginRight: "20px" }}
          onClick={handleDelete}
        >
          DEL
        </button>
      </p>
      <p className="text">{text ? text : "Preview empty"}</p>
    </div>
  );
}

export default Tile;
