import React from "react";
import Tile from "./Tile.js";
import New from "./New.js";

function Panel(props) {
  function callBackFunction(childData) {
    props.appCallback(childData);
  }

  const displayPanel = props.notelist.map((note) => {
    return (
      <div>
        <Tile
          username={props.username}
          notename={note.notename}
          text={note.text}
          parentCallback={callBackFunction}
        />
      </div>
    );
  });
  return (
    <div className="panel">
      <New
        username={props.username}
        parentCallback={callBackFunction}
        text="Create new note"
      />
      {displayPanel}
    </div>
  );
}

export default Panel;
