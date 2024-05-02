import React, { useState } from "react";

import { useRouter } from "next/navigation";

import styles from "./search.module.scss";

import SearchSvg from "../svg/SearchSvg";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/stories/${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className={styles.searchWrapper}>
      <input
        value={searchTerm}
        onChange={handleSearchInput}
        type="text"
        placeholder="Zoek verhalen"
      />
      <button className="unstyled" type="submit">
        <SearchSvg iconColor="#7D7D7B" />
      </button>
    </form>
  );
};

export default Search;
