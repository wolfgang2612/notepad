import React, { useState, useEffect } from "react";

import Panel from "./components/Panel.js";
import Maintext from "./components/Maintext.js";
import Header from "./components/Header.js";
import Titlebar from "./components/Titlebar.js";
import Axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [notelist, setNotelist] = useState([]);
  const [maintext, setMaintext] = useState("");
  const [mainnote, setMainnote] = useState("");
  const [headertext, setHeadertext] = useState("");
  const [trigger, setTrigger] = useState(1);

  let baseURL = "http://localhost:5000/user";

  useEffect(() => {
    Axios.get(baseURL).then((res) => {
      setUsers(res.data);
      if (res.data.length > 0) setUsername(String(res.data[0].username));
    });
  }, []);

  useEffect(() => {
    let notesURL = baseURL + "/" + username + "/notes";
    Axios.get(notesURL).then((res) => {
      setNotelist(res.data);
    });
  }, [username, trigger]);

  function callBackFunction(childData) {
    if (childData.action === "cmn" || childData.action === "write") {
      setMaintext(childData.maintext);
      if (childData.action === "cmn") setMainnote(childData.notename);
    } else if (childData.action === "delete" || childData.action === "new") {
      setHeadertext(childData.headertext);
      setTrigger((prev) => {
        return prev * -1;
      });
      if (childData.action === "delete") {
        setMainnote("");
        setMaintext("");
      }
    } else if (childData.action === "changeuser") {
      setUsername(childData.username);
      setMainnote("");
      setMaintext("");
      Axios.get(baseURL).then((res) => {
        setUsers(res.data);
      });
    } else {
      let updateURL =
        baseURL + "/" + username + "/update/" + childData.notename;
      let postObject = {
        username: username,
        notename: childData.notename,
        text: childData.text,
      };
      Axios.post(updateURL, postObject).then((res) => {
        setHeadertext(res.data);
        setTrigger((prev) => {
          return prev * -1;
        });
      });
    }
  }

  return (
    <div>
      <Header text={headertext} />
      <Titlebar
        username={username}
        notename={mainnote}
        users={users}
        appCallback={callBackFunction}
      />
      <div className="main">
        <Panel
          username={username}
          notelist={notelist}
          appCallback={callBackFunction}
        />
        <Maintext
          notename={mainnote}
          maintext={maintext}
          appCallback={callBackFunction}
        />
      </div>
    </div>
  );
}

export default App;
