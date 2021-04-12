import React, { useState } from "react";
import ConversationList from "../ConversationList/ConversationList";
import LSB from "../LeftSidebar/Sidebar";
import MessageWindow from "../MessageWindow/MessageWindow";
import cls from "./Messenger.module.css";
import Card from "../Card/Card";

export default function Messenger(props) {
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
}
