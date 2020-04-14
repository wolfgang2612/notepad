import React from "react";

function Header(props) {
  let disp = props.text ? <p className="headertext">{props.text}</p> : "";
  return <div className="header">{disp}</div>;
}

export default Header;
