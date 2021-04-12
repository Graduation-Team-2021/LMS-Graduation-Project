import cls from "./Searchbar.module.css";

export default function ConversationSearch({ searchQuery, setSearchQuery }) {
  return (
    <div className={cls.search}>
      <input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        type="search"
        className={cls.input}
        placeholder="Search Messages"
      />
    </div>
  );
}
