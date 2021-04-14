import { useState, useEffect } from "react";
import { connect } from "react-redux";

import ConversationListItem from "./Item/Item";
import SearchBar from "./SearchBar/SearchBar";
import cls from "./ConversationList.module.css";
import { getAllConversations, getAllUsers } from "../../Interface/Interface";
import { setUser } from "../../Models/User";
import filler from "../../assets/Filler.png";
import SearchItem from "../ConversationList/SearchItem/SearchItem";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";

import msngrskt from "../../sockets/msngrskts";

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
  const [Users, setUsers] = useState([]);
  const [CurrentActiveUsers, setCurrentActiveUsers] = useState([]);
  const [oldConv, setOldConv] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
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
  }, []);
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
  }, [newMessage]);
  //////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (props.hasChanged) {
      if (conversations.findIndex(Ar => { return Ar.ID === props.newMessID }) != -1) {
        conversations.splice(conversations.findIndex(Ar => { return Ar.ID === props.newMessID }), 1);
      }
      let newTemp = { ...props.Current }
      newTemp.text = props.newText
      newTemp.name = Users[Users.findIndex(Ar => { return Ar.ID === props.newMessID })].Name
      let temp = [newTemp, ...conversations]
      setConversations(temp)
      props.setChanged(false)
      props.setNewID(null)
      props.setNewText("")
    }
  },
    [props.hasChanged, props.newMessID])

  useEffect(() => {
    console.log(props.Current)
  }, [props.Current])
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
    });
    getAllUsers().then((res) => {
      const temp = [];
      res.forEach((element) => {
        element["photo"] = filler;
        temp.push(setUser(element));
      });
      setUsers(temp);
    });
    /* axios.get("https://randomuser.me/api/?results=20").then((response) => {
      let newConversations = response.data.results.map((result) => {
        return {
          photo: result.picture.large,
          name: `${result.name.first} ${result.name.last}`,
          text: "Hello world! This is a test message for a demo.",
        };
      });
      setConversations([...conversations, ...newConversations]);
    }); */
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
  let addbb = null;
  let oldResults = [];
  if (searchVis.showSearch) {
    searchbb = <SearchBar searchQuery={oldQuery} setSearchQuery={setOldQuery} fillerText="Search in your chats..." />;
    if (oldQuery !== "") {
      oldConv.forEach((value, index) => {
        if (value.Name.toLowerCase().includes(oldQuery.toLowerCase())) {
          oldResults.push(
            <ConversationListItem
              key={index}
              data={{
                name: value.name,
                photo: filler,
                text: " "
              }
              }
              onClick={() => {
                props.setIsNew(false);
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
  let SearchResult = [];
  if (addBarVis.showBar) {
    addbb = <SearchBar searchQuery={Query} setSearchQuery={setQuery} fillerText="Search for someone to start a new chat..." />;
    if (Query !== "") {
      Users.forEach((value, index) => {
        let isPart = false
        let onClickHandler = null
        if (value.Name.toLowerCase().includes(Query.toLowerCase())) {
          oldConv.forEach((ele) => { if (ele.ID === value.ID) { isPart = true; } })
          if (isPart) {
            onClickHandler = () => {
              props.setIsNew(false);
              props.setCurrent(value);
              setQuery("");
              setAddBar({ showBar: false });
            }
          }
          else {
            onClickHandler = () => {
              props.setIsNew(true);
              props.setCurrent(value);
              setQuery("");
              setAddBar({ showBar: false });
            }
          }
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={cls.conversationList}>
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

      <div className={cls.scrollableList}>
        {
          !(addBarVis.showBar && Query !== "") ?
            (!(searchVis.showSearch && oldQuery !== "") ?
              conversations.map((conversation, index) => (
                <ConversationListItem
                  onClick={() => {
                    props.setIsNew(false);
                    props.setCurrent(conversation);
                  }}
                  isOnline={CurrentActiveUsers.includes(conversation.ID)}
                  key={index}
                  data={conversation}
                  isCurrent={props.Current === null ? false : props.Current.ID === conversation.ID}
                />
              )) : oldResults)
            : SearchResult
        }
      </div>
    </div>
  );
});
