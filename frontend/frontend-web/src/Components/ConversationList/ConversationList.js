import { useState, useEffect } from 'react';
import ConversationListItem from './Item/Item';
import axios from 'axios';
import SearchBar from './SearchBar/SearchBar'
import cls from './ConversationList.module.css';

export default function ConversationList(props) {
  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    getConversations()
  }, [])
  ////////////////////////////////////////////////////////////////////////////
  const [conversations, setConversations] = useState([]);
  const [searchVis, setSearchVis] = useState({ showSearch: false });
  ///////////////////////////////////////////////////////////////////////////
  const getConversations = () => {
    axios.get('https://randomuser.me/api/?results=20').then(response => {
      let newConversations = response.data.results.map(result => {
        return {
          photo: result.picture.large,
          name: `${result.name.first} ${result.name.last}`,
          text: 'Hello world! This is a test message for a demo.'
        };
      });
      setConversations([...conversations, ...newConversations])
    });
  }

  const toggleSearch = () => {
    setSearchVis({ showSearch: !searchVis.showSearch })
  }
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  
  let searchbb = null;
  if (searchVis.showSearch) {
    searchbb = <SearchBar />;
  }

  return (
    <div className={cls.conversationList}>

      <div className={cls.title}>
        Messages
        <button className={cls.search} onClick={toggleSearch}>
          <i><img src="/Search_Icon.svg" width="20" height="20" alt="search button" /></i>
        </button>
        <button className={cls.search}><img src="/add_box.png" width="25" height="25" alt="add new message" /></button>
      </div>

      {searchbb}

      <div className={cls.scrollableList}>
        {
          conversations.map(conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    </div>
  );
}