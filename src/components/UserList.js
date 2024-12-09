// // import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// // import { fetchUsers } from '../redux/userAction.js';
// import { fetchUsers, searchUsers} from "../redux/userAction.js";
// import SearchBar from "./SearchBar.js";
// import UserTable from "./UserTable.js";
// import React, { useEffect} from "react";
// import '../style/UserList.css'
// // import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';

// const UserList = () => {
//   const dispatch = useDispatch();
//   const { users, searchFilter } = useSelector((state) => state.user);
//   const navigator = useNavigate();
//   // const {filter, setFilter} = React.useState('');
//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const handleSearch = (name) => {
//     dispatch(searchUsers(name));
//     // setFilter(name);
//   };

//   const handleFilterPrevious = () => {
//     if (searchFilter) {
//       dispatch(searchUsers(searchFilter));
//     }
//   };
//   const createUser = () => {
//     navigator('/create');
//   };
//   return (
//     <div>
//       <SearchBar onSearch={handleSearch} />
//       <button onClick={handleFilterPrevious}>
//         Lọc theo lần tìm kiếm trước đó
//       </button>
//       <button onClick={createUser}>Create</button>
//       <UserTable users={users} />
//     </div>
//   );
// };

// export default UserList;
