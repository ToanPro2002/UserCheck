import React from "react";
import "../style/SearchBar.css";
const SearchBar = ({ onSearch }) => {
  // const [input, setInput] = useState("");
  const [query, setQuery] = React.useState(""); // Lưu từ khóa đang nhập
  const [searchHistory, setSearchHistory] = React.useState(['Micel Toan']); // Lưu lịch sử tìm kiếm
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const handleSearch = () => {
    if (query.trim() !== "") {
      if (searchHistory.includes(query)) {
        setSearchHistory((prev) => prev.filter((item) => item !== query));
      }
      setSearchHistory((prev) => [...prev, query]);
      setQuery("");
      // onSearch(query);
      setShowSuggestions(false);
    }
    onSearch(query);
  };
  if (searchHistory.length > 5) {
    searchHistory.shift();
  }

  console.log("searchHistory", searchHistory);
  const handleSuggestionsClick = (value) => {
    setQuery(value);
    setShowSuggestions(false);
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setQuery("");
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={_handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
      />
      <button onClick={handleSearch}>Tìm kiếm</button>
      {showSuggestions && searchHistory.length > 0 && (
        <ul>
          {searchHistory.map((item, index) => (
            <li key={index} onClick={() => handleSuggestionsClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
