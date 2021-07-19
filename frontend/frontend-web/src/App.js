import React from "react";

import MainPage from "./Containers/MainPage/MainPage";
import Home from "./Containers/HomePage/HomePage";
import Login from "./Containers/LoginPage/LoginPage";
import Profile from "./Containers/ProfilePage/ProfilePage";
import Courses from "./Containers/CoursesPage/CoursesPage";
import Groups from "./Containers/GroupsPage/GroupsPage"
import Course from "./Containers/CoursePage/CoursePage";
import Mark_edit from "./Ibrahim/Mrak_edit.js";
import Group from "./Containers/GroupPage/GroupPage.js";
import Messenger from "./Components/Messenger/Messenger";
import Video from "./Ibrahim/Vedio.js";
import SignUp from "./Containers/SignUpPage/SignUpPage";
import AddCourse from "./Containers/AddCoursePage/AddCourse";
import Deliv from "./Components/DeliverablesPage/DeliverablesPage";
import Quiz from "./Components/QuizzesPage/QuizzesPage";
import PDFs from "./Components/PDFsPage/PDFsPage";
import PDF from "./Ibrahim/Pdf_reader";
import AddDelivPage from "./Containers/AddDelivPage/AddDeliv";
import AdminPage from "./Containers/AdminPage/AdminPage";
import ResetPass from "./Containers/ResetPass/ResetPass";

import { mapStateToProps, mapDispatchToProps } from "./store/reduxMaps";
import { connect } from "react-redux";

import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import Search from "./Containers/SearchPage/SearchPage";
import CreateQuiz from "./Containers/CreateQuiz/CreateQuiz";

const App = (props) => {

  return (
    <BrowserRouter>
      {props.userData.Token ? (
        <MainPage Name={props.userData.Name}>
          <Switch>
            {props.userData.Role !== "admin" ? (
              <React.Fragment>
                <Route path="/" exact component={Home} />
                <Route path="/Profile" exact component={Profile} />
                <Route path="/Courses" exact component={Courses} />
                <Route path="/Groups" exact component={Groups} />
                <Route path="/Course/:id" exact component={Course} />
                <Route path="/Group/:id" exact component={Group} />
                <Route path="/Course/:id/Marks" exact component={Mark_edit} />
                <Route path="/messenger" exact component={Messenger} />
                <Route path="/Course/:id/Videos" exact component={Video} />
                <Route path="/Course/:id/PDFs" exact component={PDFs} />
                <Route path="/Deliv" exact component={Deliv} />
                <Route path="/Quiz/:id" exact component={Quiz} />
                <Route path="/Deliv/Assignment/:id" exact component={Deliv} />
                <Route path="/Course/:id/Deliv" exact component={Deliv} />
                <Route path="/Course/:id/Quiz" exact component={Quiz} />
                <Route path="/Course/:cid/PDFs/:id" exact component={PDF} />
                <Route
                  path="/Course/:id/newDeliv"
                  exact
                  component={AddDelivPage}
                />
                <Route path="/changePass" exact component={ResetPass} />
                <Route path="/Search" exact component={Search} />
                {/* TODO: ADD Enroll Route */}
                <Route
                  path="/Course/:id/newQuiz"
                  exact
                  component={CreateQuiz}
                />
                <Redirect path="/login" to="/" />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Route path="/" exact component={AdminPage} />
                <Route path="/SignUp" exact component={SignUp} />
                <Route path="/AddCourse" exact component={AddCourse} />
                <Route path="/changePass" exact component={ResetPass} />
                <Route path="/Search" exact component={Search} />
                <Route path="/messenger" exact component={Messenger} />
                <Redirect path="/login" to="/" />
              </React.Fragment>
            )}
          </Switch>
        </MainPage>
      ) : (
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/Signup" exact component={SignUp} />
          <Route path="/AddCourse" exact component={AddCourse} />
          <Redirect to="/login" />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
