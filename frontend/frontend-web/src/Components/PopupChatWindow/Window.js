import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import Message from "./Message/Message";
import moment from "moment";
import SearchBar from "../ConversationList/SearchBar/SearchBar";
import Compose from "./Compose/Compose";
import Waiting from '../Waiting/Waiting'
import cls from "./Window.module.css";
import { getAllMessages, sendMessage } from "../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
// TODO: initialize the socket-io client here
import msngrskt from "../../sockets/msngrskts";



export default connect(mapStateToProps, mapDispatchToProps)(function MessageList(props) {
  const MY_USER_ID = props.userData.ID;
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  const [messages, setMessages] = useState([]);
  const [searchVis, setSearchVis] = useState({ showSearch: false });
  const [newMes, setNewMes] = useState(null)
  const [Query, setQuery] = useState("");
  const [loading, setLoading] = useState(true)
  const [messIn, setMess] = useState({ text: "" });
  const [dismissed, setDismissed] = useState({ dismissed: false })
  ///////////////////////////////////////////////////////////////////////////////////////
  let listCls = [cls.hideList];
  if (props.currentMessage.currentMessage.ID) {
    listCls = [cls.list];
  }
  else {
    listCls = [cls.hideList];
  }
  if (dismissed.dismissed) {
    listCls = [cls.minimize];
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    getMessages();
    setLoading(true);
    setDismissed({ dismissed: false });
  }, [props.currentMessage.currentMessage, newMes]);

  useEffect(() => {
    msngrskt.on("private message", (res) => setNewMes(res));
  }, [])

  useEffect(() => {
    if (newMes && props.currentMessage.currentMessage && newMes.from === props.currentMessage.currentMessage.ID) {
      const Temp = [...messages, {
        id: messages.length,
        author: newMes.from,
        message: newMes.content.text,
        timestamp: new Date(newMes.content.sent_time).getTime()
      }]
      setMessages(Temp)
    }
  }, [newMes, props.currentMessage.currentMessage])
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //TODO: add another useEffect here to add the on recive message call back
  let searchbb = null;
  let searchResults = [];
  if (searchVis.showSearch) {
    searchbb = <SearchBar searchQuery={Query} setSearchQuery={setQuery} fillerText="Search in current conversation..." />;
    if (Query !== "") {
      messages.forEach((value, index) => {
        if (value.message.toLowerCase().includes(Query.toLowerCase())) {
          searchResults.push(
            {
              id: value.id,
              author: value.author,
              message: value.message,
              timestamp: value.timestamp,
            }
          );
        }
      });
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////
  const inputFile = useRef(null);

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
  };
  //////////////////////////////////////////////////////////////////////////////////
  const Dismiss = () => {
    setDismissed({ dismissed: !dismissed.dismissed });
  }

  const toggleSearch = () => {
    setSearchVis({ showSearch: !searchVis.showSearch });
  };

  function handleInputChanged(event) {
    setMess({
      text: event.target.value,
    });
  }

  function handleButtonClicked() {
    if (messIn.text === "") {
      return 0;
    }
    let Time = new Date();
    sendMessage(props.userData.Token, props.currentMessage.currentMessage.ID, {
      text: messIn.text,
      sent_time: `${Time.toISOString().slice(0, 10)} ${Time.toISOString().slice(11, 19)}`
    });

    var joined = messages.concat({
      id: messages.length,
      author: MY_USER_ID,
      message: messIn.text,
      timestamp: Time,
    });
    //TODO: add the message sending code here
    //TODO: send to flask to update the database
    //TODO: use io socket to send the messages
    setMessages([...joined]);
    setMess({ text: "" });
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleButtonClicked();
    }
  };
  /////////////////////////////////////////////////////////////////////////////////

  const getMessages = () => {
    if (props.currentMessage.currentMessage) {
      getAllMessages(props.userData.Token, props.currentMessage.currentMessage.ID).then(res => {
        const temp = []
        res.forEach(
          (ele) => {
            let time = ele['sent_time']
            let timestamp = new Date(time)
            temp.push({
              id: ele['message_id'],
              author: ele['sender_id'],
              message: ele['text'],
              timestamp: timestamp
            })
          }
        )
        setMessages(temp);
        setLoading(false);
      });
    }

  };

  const renderMessages = (list) => {
    let i = 0;
    let messageCount = list.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = list[i - 1];
      let current = list[i];
      let next = list[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as("hours") < 1) {
          startsSequence = false;
        }

        if (previousDuration.as("hours") < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as("hours") < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
          isLast={i === (messageCount - 1)}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  return (
    <div>
      <button className={cls.ButtCls} onClick={Dismiss}>
        <i>
          <img
            src="/messages.png"
            width="40"
            height="40"
            alt="Chats"
          />
        </i>
      </button>
      <div className={listCls.join(' ')}>
        <React.Fragment>
          <div className={cls.title}>
            {props.currentMessage.currentMessage.Name}
            <button className={cls.search} onClick={toggleSearch}>
              <i>
                <img
                  src="/Search_Icon.svg"
                  width="20"
                  height="20"
                  alt="search button"
                />
              </i>
            </button>
          </div>
          {searchbb}
          {
            !(searchVis.showSearch && Query !== "") ?
              <Waiting Loading={loading}><div className={cls.container}>{renderMessages(messages)}</div></Waiting> :
              <div className={cls.container}>{renderMessages(searchResults)}</div>
          }
          <Compose
            value={messIn.text}
            onChange={handleInputChanged}
            onKeyDown={handleKeyDown}
            rightItems={[
              <button
                className={cls.search}
                key="photo"
                onClick={onButtonClick}
              >
                <i>
                  <img src="/photo.png" width="20" height="20" alt="photo" />
                </i>
              </button>,
              <button
                className={cls.search}
                key="send"
                onClick={handleButtonClicked}
              >
                <i>
                  <img src="/send.png" width="20" height="20" alt="send" />
                </i>
              </button>
            ]}
          >
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={onFileChange}
            />
          </Compose>
        </React.Fragment>
      </div>
    </div>
  );
}
)