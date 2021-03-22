import React, { Component } from "react";
import ReactPlayer from "react-player";
import Navbar from '../navbar/Navbar';
import VideoPlayer from 'react-video-markers';
import './Vedio.css';

class Vedioplayer extends Component {
  // axios.get()

  state = {
    url: "https://youtu.be/OrDzu_xveDo"
    
  };

  mathurl = () => {
    this.nulling();
    this.setState({
      url:
        // "https://youtu.be/8zuE3Rtm1Eo?list=PLQkyODvJ8ywuGxYwN0BfMSvembIJkNQH1"
        "https://youtu.be/OrDzu_xveDo"
    });
    alert("math");
    console.log(this.state.url);
  };
  Phyurl = () => {
    this.nulling();
    this.setState({
      url:
         "https://youtube.com/playlist?list=PLtFbQRDJ11kGc2dWpGMLJjPADeHPAFVA9"
        
    });
    alert("phy");
    console.log(this.state.url);
  };
  compurl = () => {
    this.nulling();
    this.setState({
      url:
         "https://youtube.com/playlist?list=PLQkyODvJ8ywuGxYwN0BfMSvembIJkNQH1"
    });
    alert("comp");
    console.log(this.state.url);
  };
  softwre = () => {
    this.nulling();
    setTimeout(this.setState({
      url:
        "https://youtube.com/playlist?list=PLDoPjvoNmBAzH72MTPuAAaYfReraNlQgM"
    }),3000)

    alert("software");
    console.log(this.state.url);
  };
  nulling = () => {
    this.setState({
      url:
       null
    });
    alert("erroorrrrrr");
    console.log(this.state.url);
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
          <Navbar/>
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
              <p onClick={this.nulling}> refresh</p>
            </li>
          </ul>
        </div>
      </div>
   </div>
    );
  }
}

export default Vedioplayer;