import React, { Component } from "react";
import ReactPlayer from "react-player";
//import Navbar from '../navbar/Navbar';
import './Vedio.css';
import { withRouter } from "react-router-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import CoursePage from "../Containers/CoursePage/GroupPage"

class Vedioplayer extends Component {
  // axios.get()

  state = {
    url: "https://www.youtube.com/watch?v=A3Ffwsnad0k&list=PLl-gb0E4MII28GykmtuBXNUNoej-vY5Rz&index=1"
    
  };

  mathurl = () => {
    this.setState({
      url:
        // "https://youtu.be/8zuE3Rtm1Eo?list=PLQkyODvJ8ywuGxYwN0BfMSvembIJkNQH1"
        "https://www.youtube.com/watch?v=rAxXcX_w5fE&list=PLl-gb0E4MII28GykmtuBXNUNoej-vY5Rz&index=2"
    });
    alert("math");
    console.log(this.state.url);
  };
  Phyurl = () => {
    this.setState({
      url:
         "https://www.youtube.com/watch?v=hWEZsyF3ZZc&list=PLl-gb0E4MII28GykmtuBXNUNoej-vY5Rz&index=3"
        
    });
    alert("phy");
    console.log(this.state.url);
  };
  compurl = () => {
    this.setState({
      url:
         "https://www.youtube.com/watch?v=A2k3ulOJ3u4&list=PLl-gb0E4MII28GykmtuBXNUNoej-vY5Rz&index=4"
    });
    alert("comp");
    console.log(this.state.url);
  };
  softwre = () => {
    setTimeout(this.setState({
      url:
        "https://www.youtube.com/watch?v=N2YHianzseI&list=PLl-gb0E4MII28GykmtuBXNUNoej-vY5Rz&index=5"
    }),3000)

    alert("software");
    console.log(this.state.url);
  };
  nulling = () => {
    // props.history.push('/Courses')
    <BrowserRouter>
    <Route path="/Courses">
    <CoursePage/>
    </Route>
    </BrowserRouter>
  };

  start=()=>{
    alert("you can start now your vedio")
  }
  finish=()=>{
    alert("you have finished your vedio keeo going")
  }
  change=()=>{
    alert("you can start now a new your vedio")
  }
  render() {
    return (
      <div>
          {/*<Navbar/>*/}
          <div className= "container">
        <div className="Vedio">
           <ReactPlayer
            controls
            width="1100px"
            height="600px"
            url={this.state.url}
            onReady={this.start}
            onEnded={this.finish}
            onchange={this.change}
            onError={this.nulling}
          /> 
          <ul className="vediolist">
            <li>
              <p> Your courses vedio :</p>
            </li>
            <li>
              <p onClick={this.mathurl}> Math</p>
            </li>
            <li>
              <p onClick={this.Phyurl}> Physices</p>
            </li>
            <li>
              <p onClick={this.compurl}> Compliers</p>
            </li>
            <li>
              <p onClick={this.softwre}> Software</p>
            </li>
            <li>
              <p onClick={this.nulling}> Back to courese page</p>
            </li>
          </ul>
        </div>
      </div>
   </div>
    );
  }
}

export default withRouter(Vedioplayer);