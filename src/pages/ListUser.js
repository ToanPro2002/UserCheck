// import React, {useCallback } from "react";
// import { debounce } from "lodash";
import React from "react";
// import {Route} from "react-router-dom";
// import Createuser from "./Createuser";
import { useQuery } from "@tanstack/react-query";
import { FetchUsers, searchUsers } from "../Services/apis.js";
import UserTable from "../components/UserTable.js";
import SearchBar from "../components/SearchBar.js"; // import "./ListUser.ss";
import { useNavigate } from "react-router-dom";
import "../style/ListUser.css";
export default function ListUser() {
  const [searchName, setSearchName] = React.useState("");
  const navigator = useNavigate();
  const {
    data: users = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => FetchUsers(), //searchUsers(searchName),
    enabled: true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  // const debouncedSearch = useCallback(
  //   debounce((name) => {
  //     const searchTerm = name.toLowerCase();
  //     const filtered = users.filter((user) =>
  //       user.name.toLowerCase().includes(searchTerm)
  //     );
  //     setSearchName(filtered);
  //   }, 300), // 300ms delay
  //   [users],
  // );

  // console.log("searchName:", searchName);
  const handleSearch = (name) => {
    // debouncedSearch(name);
    searchUsers(name).then((result) => {
      setSearchName(result);
    });
  };
  // console.log("searchName:", searchName);
  // const [searchName, setSearchName] = React.useState('');
  // console.log("users:", users);
  // console.log("error:", error);
  // console.log("isLoading:", useFetchUsers);
  const handleCreate = () => {
    navigator("/create");
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured: {error.message}</div>;
  return (
    <div className="ListUser">
      <h1>User List</h1>
      <SearchBar onSearch={handleSearch} />
      <button onClick={handleCreate}>Tạo User</button>
      {searchName.length === 0 ? (
        <UserTable users={users} isLoading={isLoading} error={error} />
      ) : (
        <UserTable users={searchName} isLoading={isLoading} error={error} />
      )}
    </div>
  );
}
