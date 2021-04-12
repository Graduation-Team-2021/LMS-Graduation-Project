import React, {Component, useState } from "react";
import ConversationList from "../ConversationList/ConversationList";
import LSB from "../LeftSidebar/Sidebar";
import MessageWindow from "../MessageWindow/MessageWindow";
import cls from "./Messenger.module.css";
import Card from "../Card/Card";
import io from 'socket.io-client'
const socket = io("http://localhost:7000",{transports:['websocket'], upgrade: false})
socket.on("ServerAdmin",(msg) => console.log(msg))
/* export default function Messenger(props) {
  const [Current, setCurrent] = useState(null);
  const [isNew, setIsNew] = useState(false);

  return (
    <span className={cls.holder}>
      <Card shadow className={cls.Card}>
        <div className={cls.Messenger}>
          <LSB />
          <ConversationList setCurrent={setCurrent} setIsNew={setIsNew} />
          <MessageWindow Current={Current} isNew={isNew} />
        </div>
      </Card>
    </span>
  );
} */

class Messenger extends Component {
  constructor(props) {
    super(props);
    console.log("connecting")
    
    this.state = { Current: null, isNew: false }
  }

  setCurrent=(value)=>{
    this.setState({Current: value})
  }

  setIsNew=(value)=>{
    this.setState({isNew: value})
  }

  render() { 
    return (
      <span className={cls.holder}>
        <Card shadow className={cls.Card}>
          <div className={cls.Messenger}>
            <LSB />
            <ConversationList setCurrent={this.setCurrent} setIsNew={this.setIsNew} />
            <MessageWindow Current={this.state.Current} isNew={this.state.isNew} />
          </div>
        </Card>
      </span>
    );
  }
}
 
export default Messenger;