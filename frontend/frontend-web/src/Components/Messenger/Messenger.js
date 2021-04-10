import React from 'react';
import ConversationList from '../ConversationList/ConversationList';
import LSB from '../LeftSidebar/Sidebar';
import MessageWindow from '../MessageWindow/MessageWindow'
import cls from './Messenger.css';
import Card from '../Card/Card'

export default function Messenger(props) {
  return (
    <Card shadow>
      <div className={cls.Messenger}>
  
        <div className={cls.sidebar}>
          <LSB />
          <ConversationList />
        </div>
        <div className={cls.scrollabe}>
          <MessageWindow />
        </div>
        
      </div>
    </Card>
  );
}