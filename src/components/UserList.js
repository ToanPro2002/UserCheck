// import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import {useSelector} from 'react-redux'
// import { fetchUsers } from '../redux/userAction.js';
import { fetchUsers, searchUsers } from "../redux/userAction.js";
// import { useEffect } from 'react';
import SearchBar from "./SearchBar.js";
import UserTable from "./UserTable.js";
// import axios from "axios";
import React, { useEffect } from "react";

const UserList = () => {
  // const DOMAIN = "https://674d7ca1635bad45618b8933.mockapi.io/api/test";
  // const [users, setUsers] = useState([]);
  // const fetchUsers = async () => {
  //   const response = await axios.get(`${DOMAIN}/users`);
  //   setUsers(response.data);
  // };
  // const searchUsers = async (name) => {
  //   await axios.get(`${DOMAIN}/users`, { params: { name } });
  // }
  // useEffect(() => {
  //   fetchUsers();
  // }, []);
  //   React.useEffect(() => {
  //   const filteredItem = users.filter((user) =>
  //     user.name.toLowerCase().includes(handleSearch.toLocaleLowerCase())
  //   );
  //   setFilterUser(filteredItem);
  // }, [searchName, user]);

  // const handleSearch = (name) => {
  //   searchUsers(name);
  // };
  const dispatch = useDispatch();
  const { users, searchFilter } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearch = (name) => {
    dispatch(searchUsers(name));
  };

  const handleFilterPrevious = () => {
    if (searchFilter) {
      dispatch(searchUsers(searchFilter));
    }
  };
  const styleButton = {
    padding: "10px",
    borderRadius: "10px",
    border: "2px solid #ccc",
  };
  return (

    <div>
      <SearchBar onSearch={handleSearch} />
      <button onClick={handleFilterPrevious} style={styleButton}>
        Lọc theo lần tìm kiếm trước đó
      </button>
      <UserTable users={users} />
    </div>
  );
};

export default UserList;
