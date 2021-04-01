import React, { Component } from "react";
import Login from "../Login/Login";
import classes from "./LoginPage.module.css";
import image from "../../assets/Filler.png";
import Card from "../../Components/Card/Card";
import ImageHolder from "../../Components/ImageHolder/ImageHolder";

class LoginPage extends Component {
  render() {
    return (
      <div className={classes.Main}>
        <Card row shadow style={{
          height: '75%'
        }}>
          <Login SignIn={this.props.SignIn} SignUp={this.props.SignUp} Home={this.props.Home}/>
          <div className={classes.Blue}>
            <ImageHolder filler={image}/>
          </div>
        </Card>
      </div>
    );
  }
}

export default LoginPage;
