import React, { useState } from "react";
import "../style/SearchBar.css";
const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const handleSearch = () => {
    onSearch(input);
  };
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(input);
    }
  };


  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={_handleKeyDown}
      />
      <button onClick={handleSearch}>Tìm kiếm</button>

    </div>
  );
};

export default SearchBar;
