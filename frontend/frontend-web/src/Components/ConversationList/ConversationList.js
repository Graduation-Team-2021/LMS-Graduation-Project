import { useState, useEffect } from "react";
import { connect } from "react-redux";

import ConversationListItem from "./Item/Item";
import axios from "axios";
import SearchBar from "./SearchBar/SearchBar";
import cls from "./ConversationList.module.css";
import { getAllConversations, getAllUsers } from "../../Interface/Interface";
import { setUser } from "../../Models/User";
import filler from "../../assets/Filler.png";
import SearchItem from "../ConversationList/SearchItem/SearchItem";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function ConversationList(props) {
  ////////////////////////////////////////////////////////////////////////////
  const [conversations, setConversations] = useState([]);
  const [searchVis, setSearchVis] = useState({ showSearch: false });
  const [Query, setQuery] = useState("");
  const [Users, setUsers] = useState([]);
  ///////////////////////////////////////////////////////////////////////////
  const getConversations = () => {
    getAllConversations(props.userData.Token).then((res) => {
      const temp = [];
      res.forEach((ele) => {
        console.log(ele);
        ele["user"]["photo"] = filler;
        let data = {
          name: ele["user"]["name"],
          text: ele["recent_message"],
          ...setUser(ele["user"]),
        };
        temp.push(data);
      });
      setConversations(temp);
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
  useEffect(getConversations, []);

  const toggleSearch = () => {
    setSearchVis({ showSearch: !searchVis.showSearch });
  };
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  let searchbb = null;
  let SearchResult = [];
  if (searchVis.showSearch) {
    searchbb = <SearchBar searchQuery={Query} setSearchQuery={setQuery} />;
    if (Query !== "") {
      Users.forEach((value, index) => {
        if (value.Name.toLowerCase().includes(Query.toLowerCase())) {
          SearchResult.push(
            <SearchItem
              key={index}
              Name={value.Name}
              img={filler}
              onClick={() => {
                props.setIsNew(true);
                props.setCurrent(value);
                let temp = [
                  {
                    name: value.Name,
                    photo: value.photo,
                    text: "no messages Yet",
                  },
                  ...conversations,
                ];
                setConversations(temp);
                setQuery("");
                setSearchVis({ showSearch: false });
              }}
            />
          );
        }
      });
    }
  }

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
        <button className={cls.search}>
          <img
            src="/add_box.png"
            width="25"
            height="25"
            alt="add new message"
          />
        </button>
      </div>

      {searchbb}

      <div className={cls.scrollableList}>
        {!(searchVis.showSearch && Query !== "")
          ? conversations.map((conversation, index) => (
              <ConversationListItem
                onClick={() => {
                  props.setIsNew(false);
                  props.setCurrent(conversation);
                }}
                key={index}
                data={conversation}
              />
            ))
          : SearchResult}
      </div>
    </div>
  );
});
