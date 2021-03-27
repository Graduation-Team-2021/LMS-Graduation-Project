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
import {
  signup,
  login,
  getCurrentCourses,
  getCurrentGroups,
} from "./Interface/Interface";
import jwt_decode from "jwt-decode";
import Messenger from "./Components/Messenger/Messenger";

const App = () => {
  const [logged, setLogged] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [name, setName] = useState(localStorage.getItem("name"));
  const [Role, setRole] = useState(
    localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token")).permissions
      : null
  );
  const [ID, setID] = useState(
    localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token")).id
      : null
  );
  const [Token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const [Recommended, setRecommended] = useState(new Map());
  const [Joined, setJoined] = useState(new Map());
  const [CurrentCourses, setCurrentCourses] = useState(new Map());
  const [Courses, setCourses] = useState(new Map());
  const Joining = (index) => {
    let group = Recommended.get(index);
    Joined.set(index, group);
    Recommended.delete(index);
    console.log(Joined);
    let t = new Map(Joined.entries());
    setJoined(t);
  };

  useEffect(() => {
    let temp2 = new Map();
    for (let index = 10; index < 20; index++) {
      temp2.set(index.toString(), {
        Title: `Group ${index + 1}`,
        Desc: "Blah Blah Blah",
      });
    }
    if (logged) {
      getCurrentCourses(Token, ID, Role).then((res) => {
        const Courses = new Map();
        res.forEach((element) => {
          Courses.set(element["course_code"], {
            Title: element["course_name"],
            Desc: element["course_description"],
          });
        });
        setCurrentCourses(Courses);
      });
      getCurrentGroups(Token, ID, Role).then((res) => {
        const Courses = new Map();
        res.forEach((element) => {
          Courses.set(element["group_id"], {
            Title: element["group_name"],
            Desc: element["group_description"],
          });
        });
        setJoined(Courses);
      });
    }
    setRecommended(temp2);
  }, [Token, ID, Role, logged]);

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Switch>
          {logged ? (
            <React.Fragment>
              <Redirect path="/login" to="" />
              <Route
                path="/"
                exact
                render={() => (
                  <HomePage
                    Name={name}
                    Token={Token}
                    id={ID}
                    CurrentCourses={CurrentCourses}
                    Joined={Joined}
                    Recommended={Recommended}
                    Joining={Joining}
                    Courses={(data) => {
                      setCourses(data);
                    }}
                    setLogged={(data) => setLogged(data)}
                  />
                )}
              />
              <Route path="/messenger" exact render={() => <Messenger />} />
              <Route
                path="/profile"
                exact
                render={() => (
                  <ProfilePage
                    Name="David John"
                    id="5"
                    Joined={Joined}
                    CurrentCourses={CurrentCourses}
                    setLogged={(data) => setLogged(data)}
                  />
                )}
              />
              <Route
                path="/group/:id/:isJoined"
                exact
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
                exact
                path="/Course/:id/:isJoined/Marks"
                render={(props) => <MarkEdit {...props} />}
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
                exact
                path="/Courses"
                render={(props) => (
                  <CoursesPage
                    {...props}
                    Name="David John"
                    id="5"
                    Courses={Courses}
                  />
                )}
              />
              <Route
                exact
                path="/Videos"
                render={(props) => <Vedioplayer {...props} />}
              />
              <Route
                path="/Pdfs"
                exact
                render={(props) => <Pdf {...props} />}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route
                path="/login"
                exact
                children={
                  <LoginPage
                    SignIn={async (Data) => {
                      return await login(Data);
                    }}
                    Home={(data) => {
                      let TempToken = data.Token;
                      setName(data.name);
                      setToken(TempToken);
                      setID(jwt_decode(TempToken).id);
                      setRole(jwt_decode(TempToken).permissions);
                      setLogged(true);
                    }}
                    SignUp={(Data) => {
                      signup(Data);
                    }}
                  />
                }
              />
              <Redirect to="login" />
            </React.Fragment>
          )}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
