import React from "react";

import styles from "./search.module.scss";

import SearchSvg from "../svg/SearchSvg";

const Search = () => {
  function search(e) {}

  return (
    <div className={styles.searchWrapper}>
      <input
        onInput={(e) => search(e)}
        type="text"
        placeholder="Zoek verhalen"
      />
      <SearchSvg iconColor="#7D7D7B" />
    </div>
  );
};

export default Search;
