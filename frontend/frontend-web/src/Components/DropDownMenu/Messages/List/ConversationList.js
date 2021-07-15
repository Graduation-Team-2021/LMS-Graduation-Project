import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ConversationListItem from "./Item/Item";
import cls from "./ConversationList.module.css";
import { getAllConversations, getAllUsers, getUser } from "../../../../Interface/Interface";
import { setUser } from "../../../../Models/User";
import filler from "../../../../assets/Filler.png";
import { mapDispatchToProps, mapStateToProps } from "../../../../store/reduxMaps";
import msngrskt from "../../../../sockets/msngrskts";
import Waiting from '../../../Waiting/Waiting'
import SearchItem from "./SearchItem/SearchItem";
import SearchBar from "./SearchBar/SearchBar";


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function ConversationList(props) {
  ////////////////////////////////////////////////////////////////////////////
  const [conversations, setConversations] = useState([]);
  const [Users, setUsers] = useState([]);
  const [CurrentActiveUsers, setCurrentActiveUsers] = useState([]);
  const [oldConv, setOldConv] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addBarVis, setAddBar] = useState({ showBar: false });
  const [Query, setQuery] = useState("");
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    msngrskt.on("users", (response) => {
      setCurrentActiveUsers(response);
    });
    msngrskt.on("user connected", (response) => {
      let temp = [response, ...CurrentActiveUsers]
      setCurrentActiveUsers(temp)
    });
    msngrskt.on("private message", (res) => setNewMessage(res));
    msngrskt.on("user disconnected", (response) => {
      let temp = [...CurrentActiveUsers]
      temp.splice(temp.findIndex(el => { return el === response }), 1)
      setCurrentActiveUsers(temp)
    });
  }, [CurrentActiveUsers]);
  ///////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (newMessage) {
      let res = newMessage;
      let user = null;
      for (let index = 0; index < conversations.length; index++) {
        if (conversations[index].ID === res.from) {
          user = conversations[index];
          conversations.splice(index, 1);
          break;
        }
      }
      if (user) {
        user["text"] = res.content.text;
        let temp = [user, ...conversations];
        setConversations(temp);
      } else {
        for (let index = 0; index < Users.length; index++) {
          if (Users[index].ID === res.from) {
            user = Users[index];
            break;
          }
        }
        user["text"] = res.content.text;
        let temp = [user, ...conversations];
        setConversations(temp);
      }
    }
  }, [Users, conversations, newMessage]);
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  const getConversations = () => {
    getAllConversations(props.userData.Token).then((res) => {
      const temp = [];
      res.forEach((ele) => {
        ele["user"]["photo"] = filler;
        let x = setUser(ele["user"]);
        let data = {
          name: ele["user"]["name"],
          text: ele["recent_message"],
          sent_time: ele["sent_time"],
          isOnline: false,
          ...x,
        };
        temp.push(data);
      });
      setOldConv(temp);
      setLoading(false);
    });
    getAllUsers().then((res) => {
      const temp = [];
      res.forEach((element) => {
        element["photo"] = filler;
        temp.push(setUser(element));
      });
      setUsers(temp);
    });
  };

  const toggleBar = () => {
    setAddBar({ showBar: !addBarVis.showBar });
  };

  const handleClicked = (conversation) => {
    let temp = Users.findIndex((ele) => ele.ID === conversation.ID);
    props.currentMessageActions.onSetCurrentMessage(Users[temp]);
  }
  /////////////////////////////////////////////////////////////////////////////
  let addbb = null;
  let SearchResult = [];
  if (addBarVis.showBar) {
    addbb = <SearchBar searchQuery={Query} setSearchQuery={setQuery} fillerText="Search for someone to start a new chat..." />;
    if (Query !== "") {
      Users.forEach((value, index) => {
        let onClickHandler = () => {
          props.currentMessageActions.onSetCurrentMessage(value)
        }
        if (value.Name.toLowerCase().includes(Query.toLowerCase())) {
          SearchResult.push(
            <SearchItem
              key={index}
              Name={value.Name}
              img={filler}
              onClick={onClickHandler}
            />
          );
        }
      });
    }
  }
  /////////////////////////////////////////////////////////////////////////////
  useEffect(getConversations, [props.userData.Token]);
  useEffect(() => {
    let newCon = [...oldConv];
    newCon.forEach((ele) => {
      ele.isOnline = CurrentActiveUsers.includes(ele.ID);
    });
    setConversations(newCon);
  }, [CurrentActiveUsers, oldConv]);
  /////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={cls.conversationList}>
      <div className={cls.title}>
        Messages
        <button className={cls.search} onClick={toggleBar}>
          <img
            src="/add_box.png"
            width="25"
            height="25"
            alt="add new message"
          />
        </button>
      </div>
      {addbb}
      <Waiting Loading={loading}>
        <div className={cls.scrollableList}>
          {!(addBarVis.showBar && Query !== "") ?
            conversations.map((conversation, index) => (
              <ConversationListItem
                onClick={() => { handleClicked(conversation) }}
                isOnline={CurrentActiveUsers.includes(conversation.ID)}
                key={index}
                data={conversation}
              />
            )) : SearchResult
          }
        </div>
      </Waiting>
    </div>
  );
});
