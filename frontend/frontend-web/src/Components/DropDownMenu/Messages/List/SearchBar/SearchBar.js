import cls from "./Searchbar.module.css";
import React from 'react';

export default function ConversationSearch({ searchQuery, setSearchQuery, fillerText }) {
  return (
    <div className={cls.search}>
      <input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        type="search"
        className={cls.input}
        placeholder={fillerText}
      />
    </div>
  );
}
