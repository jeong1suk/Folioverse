// 정주현
import styles from "./Header.module.css";
import SearchResultView from "./SearchResultView";
import { useState } from "react";

function SearchInput({ login }) {
  const [searchText, setSearchText] = useState("");
  const [textFocus, setTextFocus] = useState(false);

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        className={login ? styles.searchInput : styles.gSearchInput}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        onFocus={() => {
          setTextFocus(true);
        }}
        onBlur={() => {
          setTextFocus(false);
        }}
      />
      <ul
        className={login ? styles.searchResultList : styles.gSearchResultList}
      >
        {searchText && textFocus && (
          <SearchResultView setFocus={setTextFocus} searchText={searchText} />
        )}
      </ul>
    </>
  );
}

export default SearchInput;
