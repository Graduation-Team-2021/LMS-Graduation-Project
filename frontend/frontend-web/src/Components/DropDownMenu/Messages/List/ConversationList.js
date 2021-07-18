import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import ConversationListItem from "./Item/Item";
import cls from "./ConversationList.module.css";
import { getAllConversations, getUser, searchUsers } from "../../../../Interface/Interface";
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
  const [CurrentActiveUsers, setCurrentActiveUsers] = useState([]);
  const [oldConv, setOldConv] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addBarVis, setAddBar] = useState({ showBar: false });
  const [Query, setQuery] = useState("");
  const [SearchResult, setResult] = useState([]);
  const [started, setStarted] = useState(false);
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  let addbb = null;
  if (addBarVis.showBar) {
    addbb = <SearchBar searchQuery={Query} setSearchQuery={setQuery} fillerText="Search for someone to start a new chat..." />;
  }
  ///////////////////////////////////////////////////////////////////////////
  const onSearch = useCallback(() => {
    if (Query !== "") {
      if (!started) setStarted(true);
      searchUsers(Query).then((res) => {
        setLoading(false);
        let tempResults = [];
        res.forEach((value, index) => {
          tempResults.push(
            <SearchItem
              key={index}
              Name={value.name}
              img={filler}
              onClick={() => { props.currentMessageActions.onSetCurrentMessage({ Name: value.name, ID: value.user_id }) }}
            />
          );
        });
        setResult(tempResults);
      });
    }
  }, [Query, started, props.currentMessageActions])
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
        getUser(res.from).then((result) => {
          user["name"] = result.name;
          user["text"] = res.content.text;
          user["photo"] = filler;
          user["isOnline"] = true;
          let temp = [user, ...conversations];
          setConversations(temp);
        })
      }
    }
  }, [conversations, newMessage]);
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (Query !== "") {
      setLoading(true);
      onSearch();
    } else {
      setResult([]);
    }
  }, [onSearch, Query]);
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
  };
  /////////////////////////////////////////////////////////////////////////////
  useEffect(getConversations, [props.userData.Token]);
  useEffect(() => {
    let newCon = [...oldConv];
    newCon.forEach((ele) => {
      ele.isOnline = CurrentActiveUsers.includes(ele.ID);
    });
    setConversations(newCon);
  }, [CurrentActiveUsers, oldConv]);
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  return (
    <div className={cls.conversationList}>
      <div className={cls.title}>
        Messages
        <button className={cls.search} onClick={()=>{setAddBar({ showBar: !addBarVis.showBar });}}>
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
                onClick={() => { props.currentMessageActions.onSetCurrentMessage(conversation); }}
                isOnline={CurrentActiveUsers.includes(conversation.ID)}
                key={index}
                data={conversation}
              />
            )) : <Waiting Loading={loading}>{SearchResult}</Waiting>
          }
        </div>
      </Waiting>
    </div>
  );
});
