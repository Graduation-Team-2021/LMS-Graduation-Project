import classes from "./App.module.css";
import LoginPage from "./Containers/Login Full Page/LoginPage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./Containers/HomePage/HomePage";
import React, { useState, useEffect } from "react";
import ProfilePage from "./Containers/ProfilePage/ProfilePage";
import GroupPage from "./Containers/GroupPage/GroupPage";
import CoursesPage from "./Containers/CoursesPage/HomePage";
import CoursePage from "./Containers/CoursePage/GroupPage";
import Vedioplayer from "./Ibrahim/Vedio";
import Pdf from "./Ibrahim/Pdf_reader";
import MarkEdit from "./Ibrahim/Mrak_edit";
import Test from "./Ibrahim/test"
import Messenger from "./Components/Messenger/Messenger"

const App = () => {
  const [logged, setLogged] = useState(true);

  const [Recommended, setRecommended] = useState(new Map());
  const [Joined, setJoined] = useState(new Map());

  const Joining = (index) => {
    //TODO: Fix this Dark Magic
    let temp1 = Recommended;
    let temp2 = Joined;
    console.log(index);
    console.log(temp1);
    let group = JSON.parse(JSON.stringify({ ...temp1.get(index) }));
    console.log(group);
    temp2.set(index, group);
    temp1.delete(index);
    console.log(group);
    setJoined(temp2);
    console.log(Joined);
    setRecommended(temp1);
  };

  useEffect(() => {
    let temp1 = new Map();
    let temp2 = new Map();

    for (let index = 0; index < 10; index++) {
      temp1.set(index, {
        Title: `Group ${index + 1}`,
        Desc: "Blah Blah Blah",
      });
    }
    for (let index = 10; index < 20; index++) {
      temp2.set(index, {
        Title: `Group ${index + 1}`,
        Desc: "Blah Blah Blah",
      });
    }

    setRecommended(temp2);
    setJoined(temp1);
  }, []);

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Switch>
          {logged ? (
            <React.Fragment>
              <Route
                path="/"
                exact
                render={() => (
                  <HomePage
                    Name="David John"
                    id="5"
                    Joined={Joined}
                    Recommended={Recommended}
                    Joining={Joining}
                  />
                )}
              />
              <Route
                path="/messenger"
                exact
                render={() =>(
                  <Messenger/>
                )
                }/>
              <Route
                path="/profile"
                exact
                render={() => <ProfilePage Name="David John" id="5" Joined={Joined}/>}
              />
              <Route
                path="/group/:id/:isJoined"
                render={(props) => (
                  <GroupPage
                    {...props}
                    Name="David John"
                    id="5"
                    Joining={Joining}
                  />
                )}
              />
              <Route
                path="/Course/:id/:isJoined/Marks"
                render={(props) => (
                  <MarkEdit
                    {...props}
                  />
                )}
              />
              <Route
              exact
                path="/Course/:id/:isJoined"
                render={(props) => (
                  <CoursePage
                    {...props}
                    Name="David John"
                    id="5"
                    Joining={Joining}
                  />
                )}
              />
              <Route
                path="/Courses"
                render={(props) => (
                  <CoursesPage {...props} Name="David John" id="5" />
                )}
              />
              <Route
                path="/Videos"
                render={(props) => (
                  <Vedioplayer {...props}/>
                )}
              />
              <Route
                path="/Pdfs"
                render={(props) => (
                  <Pdf {...props} />
                )}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Redirect from="/" exact to="login" />
              <Redirect from="/profile" exact to="login" />
              <Redirect from="/group" to="login" />
              <Redirect from="/Courses" exact to="login" />
              <Redirect from="/Videos" exact to="login" />
              <Redirect from="/Pdfs" exact to="login" />
              <Redirect from="/Course" to="login" />
              <Redirect from="/Messenger" to="login" />
            </React.Fragment>
          )}
          <Route
            path="/login"
            exact
            render={() => (
              <LoginPage
                SignIn={() => {
                  setLogged(true);
                }}
              />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
