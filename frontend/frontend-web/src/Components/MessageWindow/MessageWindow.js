import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import Message from "./Message/Message";
import moment from "moment";
import SearchBar from "./SearchBar/SearchBar";
import Compose from "./Compose/Compose";
import cls from "./MessageWindow.module.css";
import { getAllMessages, sendMessage } from "../../Interface/Interface";
import { mapDispatchToProps,mapStateToProps } from "../../store/reduxMaps";

// TODO: initialize the socket-io client here
import msngrskt from "../../sockets/msngrskts";



export default connect(mapStateToProps, mapDispatchToProps)(function MessageList(props) {

  const MY_USER_ID = props.userData.ID;

  const [messages, setMessages] = useState([]);
  const [searchVis, setSearchVis] = useState({ showSearch: false });
  const [newMes, setNewMes] = useState(null)
  ////////////////////////////////////////////////////////////////////////////////////////
  //var tempMessages1 = [
  //  {
  //    id: 1,
  //    author: "apple",
  //    message: "Definitely looks like everyone is affected",
  //    timestamp: new Date().getTime(),
  //  },
  //  {
  //    id: 2,
  //    author: "orange",
  //    message:
  //      "They literally have to have one of each because you want to see benchmarks and builds by them.",
  //    timestamp: new Date().getTime(),
  //  },
  //];
  ///////////////////////////////////////////////////////////////////////////////////////
  
  useEffect(() => {
    getMessages();
  }, [props.Current]);

  useEffect(()=>{
    msngrskt.on("private message", (res) => setNewMes(res));
  },[])

  useEffect(()=>{
    if(newMes && props.Current &&newMes.from===props.Current.ID){
      const Temp = [...messages,{
        id:messages.length,
        author: newMes.from,
        message: newMes.content.text,
        timestamp: new Date(newMes.content.sent_time).getTime()
      }]
      setMessages(Temp)
    }
  },[newMes, props.Current])
  //////////////////////////////////////////////////////////////////////////////////////
  const toggleSearch = () => {
    setSearchVis({ showSearch: !searchVis.showSearch });
  };
  //TODO: add another useEffect here to add the on recive message call back
  let searchbb = null;
  if (searchVis.showSearch) {
    searchbb = <SearchBar />;
  }

  //////////////////////////////////////////////////////////////////////////////////////
  const inputFile = useRef(null);

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file.name);
    console.log(file.size);
    console.log(file.type);
  };
  //////////////////////////////////////////////////////////////////////////////////
  const [messIn, setMess] = useState({ text: "" });
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
    props.setChanged(true)
    props.setNewID(props.Current.ID)
    props.setNewText(messIn.text)
    sendMessage(props.userData.Token,props.Current.ID,{
        text: messIn.text,
        sent_time: `${Time.toISOString().slice(0,10)} ${Time.toISOString().slice(11,19)}`
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
    if (props.Current) {
        console.log(props.Current, props.isNew);
        if (!props.isNew) {
            getAllMessages(props.userData.Token,props.Current.ID).then(res=>{
              const temp = []
              res.forEach(
                (ele, index)=>{
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
              setMessages(temp)
            });
        } else {
            setMessages([])
        }
    }
    
  };

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
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
          isLast={i===(messageCount-1)}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  return (
    <div className={cls.list}>
      {props.Current ? (
        <React.Fragment>
          <div className={cls.title}>
            {props.Current.Name}
            <button className={cls.search}>
              <i>
                <img
                  src="/settings_black.png"
                  width="20"
                  height="20"
                  alt="options"
                />
              </i>
            </button>
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
            <button className={cls.search}>
              <i>
                <img
                  src="/video_call_black.png"
                  width="20"
                  height="20"
                  alt="video call button"
                />
              </i>
            </button>
            <button className={cls.search}>
              <i>
                <img
                  src="/call_black.png"
                  width="20"
                  height="20"
                  alt="call button"
                />
              </i>
            </button>
          </div>
          {searchbb}
          <div className={cls.container}>{renderMessages()}</div>
          <Compose
            value={messIn.text}
            onChange={handleInputChanged}
            onKeyDown={handleKeyDown}
            rightItems={[
              <button className={cls.search} key="voice">
                <i>
                  <img
                    src="/voice.png"
                    width="20"
                    height="20"
                    alt="voice message"
                  />
                </i>
              </button>,
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
                key="attachment"
                onClick={onButtonClick}
              >
                <i>
                  <img
                    src="/attachment.png"
                    width="20"
                    height="20"
                    alt="attachment"
                  />
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
              </button>,
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
      ) : null}
    </div>
  );
}
)