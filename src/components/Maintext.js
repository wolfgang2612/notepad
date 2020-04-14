import React from "react";

function Maintext(props) {
  function handleChange(event) {
    event.preventDefault();
    props.appCallback({ maintext: event.target.value, action: "write" });
  }

  function handleBlur() {
    props.appCallback({
      notename: props.notename,
      text: props.maintext,
      action: "uns", //update and save
    });
  }

  return (
    <div className="maintext">
      <textarea
        className="textarea"
        onChange={handleChange}
        onBlur={handleBlur}
        value={props.maintext}
      ></textarea>
    </div>
  );
}

export default Maintext;
