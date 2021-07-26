import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import ConversationListItem from "./Item/Item";
import SearchBar from "./SearchBar/SearchBar";
import cls from "./ConversationList.module.css";
import {
  getAllConversations,
  getUser,
  searchUsers,
  url,
} from "../../Interface/Interface";
import { setUser } from "../../Models/User";
import filler from "../../assets/Filler.png";
import SearchItem from "../ConversationList/SearchItem/SearchItem";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import msngrskt from "../../sockets/msngrskts";
import Waiting from "../Waiting/Waiting";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function ConversationList(props) {
  ////////////////////////////////////////////////////////////////////////////
  const [conversations, setConversations] = useState([]);
  const [searchVis, setSearchVis] = useState({ showSearch: false });
  const [addBarVis, setAddBar] = useState({ showBar: false });
  const [Query, setQuery] = useState("");
  const [oldQuery, setOldQuery] = useState("");
  const [CurrentActiveUsers, setCurrentActiveUsers] = useState([]);
  const [oldConv, setOldConv] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [SearchResult, setResult] = useState([]);
  ///////////////////////////////////////////////////////////////////////////
  let addbb = null;
  if (addBarVis.showBar) {
    addbb = (
      <SearchBar
        searchQuery={Query}
        setSearchQuery={setQuery}
        fillerText="Search for someone to start a new chat..."
      />
    );
  }
  ///////////////////////////////////////////////////////////////////////////
  const onSearch = useCallback(() => {
    if (Query !== "") {
      if (!started) setStarted(true);
      searchUsers(Query).then((res) => {
        setLoading(false);
        let tempResults = [];
        res.forEach((value, index) => {
          let onClickHandler = null;
          let isPart = false;
          oldConv.forEach((ele) => {
            if (ele.ID === value.user_id) {
              isPart = true;
            }
          });
          if (isPart) {
            onClickHandler = () => {
              props.setVis();
              props.setIsNew(false);
              props.setCurrent({
                ID: value.user_id,
                Name: value.name,
                ...value
              });
              setQuery("");
              setAddBar({ showBar: false });
            };
          } else {
            onClickHandler = () => {
              props.setVis();
              props.setIsNew(true);
              props.setCurrent({
                ID: value.user_id,
                Name: value.name,
                ...value
              });
              setQuery("");
              setAddBar({ showBar: false });
            };
          }
          tempResults.push(
            <SearchItem
              key={index}
              Name={value.name}
              img={value.picture ? url + value.picture : filler}
              onClick={onClickHandler}
            />
          );
        });
        setResult(tempResults);
      });
    }
  }, [Query, started]);
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    msngrskt.on("users", (response) => {
      setCurrentActiveUsers(response);
    });
    msngrskt.on("user connected", (response) => {
      let temp = [response, ...CurrentActiveUsers];
      console.log("New User Connected");
      setCurrentActiveUsers(temp);
    });
    msngrskt.on("private message", (res) => setNewMessage(res));
    msngrskt.on("user disconnected", (response) => {
      let temp = [...CurrentActiveUsers];
      temp.splice(
        temp.findIndex((el) => {
          return el === response;
        }),
        1
      );
      setCurrentActiveUsers(temp);
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
        user["photo"] = user.picture ? url + user.picture : filler
        let temp = [user, ...conversations];
        setConversations(temp);
        setNewMessage(null);
      } else {
        getUser(newMessage.from).then((res) => {
          let userino = {
            ID: res.user_id,
            name: res.name,
            text: newMessage.content.text,
            photo:res.picture ? url + res.picture : filler,
          };
          let temp = [userino, ...conversations];
          setConversations(temp);
          setNewMessage(null);
        });
      }
    }
  }, [conversations, newMessage]);
  //////////////////////////////////////////////////////////////////
  const {
    hasChanged,
    Current,
    newMessID,
    newText,
    setChanged,
    setNewID,
    setNewText,
  } = props;
  useEffect(() => {
    if (hasChanged) {
      let newTemp = { ...Current };
      getUser(newMessID).then((res) => {
        if (
          conversations.findIndex((Ar) => {
            return Ar.ID === newMessID;
          }) !== -1
        ) {
          conversations.splice(
            conversations.findIndex((Ar) => {
              return Ar.ID === newMessID;
            }),
            1
          );
        }
        newTemp.text = newText;
        newTemp.name = res.name;
        newTemp.photo = res.picture ? url + res.picture : filler
        let temp = [newTemp, ...conversations];
        setConversations(temp);
        setChanged(false);
        setNewID(null);
        setNewText("");
      })
    }
  }, [conversations, Current, hasChanged, newMessID, newText, setChanged, setNewID, setNewText]);
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
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.hideList();
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  /////////////////////////////////////////////////////////////////
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  /////////////////////////////////////////////////////////////////
  const getConversations = () => {
    getAllConversations(props.userData.Token).then((res) => {
      const temp = [];
      res.forEach((ele) => {
        ele["user"]["photo"] = ele['user']['picture'] ? url + ele['user']['picture'] : filler;
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
  const toggleSearch = () => {
    setSearchVis({ showSearch: !searchVis.showSearch });
    setAddBar({ showBar: false });
  };
  const toggleBar = () => {
    setAddBar({ showBar: !addBarVis.showBar });
    setSearchVis({ showSearch: false });
  };
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  let searchbb = null;
  let oldResults = [];
  if (searchVis.showSearch) {
    searchbb = (
      <SearchBar
        searchQuery={oldQuery}
        setSearchQuery={setOldQuery}
        fillerText="Search in your chats..."
      />
    );
    if (oldQuery !== "") {
      oldConv.forEach((value, index) => {
        if (value.Name.toLowerCase().includes(oldQuery.toLowerCase())) {
          oldResults.push(
            <ConversationListItem
              key={index}
              data={{
                name: value.name,
                photo: value.photo,
                text: " ",
              }}
              onClick={() => {
                props.setIsNew(false);
                props.setVis();
                props.setCurrent(value);
                setOldQuery("");
                setSearchVis({ showSearch: false });
              }}
              isOnline={value.isOnline}
            />
          );
        }
      });
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  let listCls = [cls.conversationList];
  if (props.visState) {
    listCls = [cls.conversationList];
  } else {
    listCls.push(cls.listClosed);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={listCls.join(" ")} ref={wrapperRef}>
      <div className={cls.title}>
        Messages
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
        <button className={cls.search} onClick={toggleBar}>
          <img
            src="/add_box.png"
            width="25"
            height="25"
            alt="add new message"
          />
        </button>
      </div>

      {searchbb}
      {addbb}

      <Waiting Loading={loading}>
        <div className={cls.scrollableList}>
          {!(addBarVis.showBar && Query !== "")
            ? !(searchVis.showSearch && oldQuery !== "")
              ? conversations.map((conversation, index) => (
                <ConversationListItem
                  onClick={() => {
                    props.setIsNew(false);
                    props.setCurrent(conversation);
                    props.setVis();
                  }}
                  isOnline={CurrentActiveUsers.includes(conversation.ID)}
                  key={index}
                  data={conversation}
                  isCurrent={
                    props.Current === null
                      ? false
                      : props.Current.ID === conversation.ID
                  }
                />
              ))
              : oldResults
            : SearchResult}
        </div>
      </Waiting>
    </div>
  );
});
