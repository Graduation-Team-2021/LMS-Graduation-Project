import React, { Component } from "react";
import ConversationList from "../ConversationList/ConversationList";
import MessageWindow from "../MessageWindow/MessageWindow";
import cls from "./Messenger.module.css";
import Card from "../Card/Card";
import { connect } from "react-redux";
import { mapStateToProps } from "../../store/reduxMaps";

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
    this.state = { Current: null, isNew: false, hasChanged: false, newConversationID: null, newText: "", showList:false };
  }

  setCurrent = (value) => {
    this.setState({ Current: value });
  };

  setIsNew = (value) => {
    this.setState({ isNew: value });
  };

  setHasChanged = (value) => {
    this.setState({ hasChanged: value })
  }

  setNewMessID = (value) => {
    this.setState({ newConversationID: value })
  }

  setNewText = (value) => {
    this.setState({ newText: value })
  }

  toggleListVis = () => {
    this.setState({showList: !this.state.showList})
  }

  hideList = () => {
    this.setState({showList: false})
  }

  render() {
    return (
      <span className={cls.holder}>
        <Card shadow className={cls.Card}>
          <div className={cls.Messenger}>
            <ConversationList
              Current={this.state.Current}
              setCurrent={this.setCurrent}
              setIsNew={this.setIsNew}
              hasChanged={this.state.hasChanged}
              newMessID={this.state.newConversationID}
              newText={this.state.newText}
              setChanged={this.setHasChanged}
              setNewID={this.setNewMessID}
              setNewText={this.setNewText}
              visState={this.state.showList}
              setVis = {this.toggleListVis}
              hideList = {this.hideList}
            />
            <MessageWindow
              Current={this.state.Current}
              isNew={this.state.isNew}
              setChanged={this.setHasChanged}
              setNewID={this.setNewMessID}
              setNewText={this.setNewText}
              toggleVis={this.toggleListVis}
            />
          </div>
        </Card>
      </span>
    );
  }
}

export default connect(mapStateToProps)(Messenger);
