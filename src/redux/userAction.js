// redux/actions/userActions.js
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
const DOMAIN = "https://674d7ca1635bad45618b8933.mockapi.io/api/test";

export const fetchUsers = () => async (dispatch) => {
  const response = await axios.get(`${DOMAIN}/users`);
  // const data = await response.json();
  dispatch({ type: "FETCH_USERS", payload: response.data });
};

export const searchUsers = (name) => async (dispatch) => {
  try {
    // Fetch all users to find the user by name
    const allUsersResponse = await axios.get(`${DOMAIN}/users`);
    const allUsers = allUsersResponse.data;
    if (!name) {
      dispatch({ type: "FETCH_USERS", payload: allUsers });
      return;
    }
    // Find the user with the matching name
    const user = allUsers.filter((u) =>
      u.name.toLowerCase().includes(name.toLowerCase())
    );
    // console.log("User:", user);
    // console.log("idđddđddddđddđdd:",user[0].id);
    if (user) {
      // If user is found, search by ID
      const response = await axios.get(`${DOMAIN}/users/${(user[0].id)}`);
      dispatch({ type: "SEARCH_USERS", payload: [response.data] });
      console.log("User found:", response.data);
    } else {
      // If no user is found, dispatch an empty array or handle the error as needed
      dispatch({ type: "SEARCH_USERS", payload: [] });
      console.log("User not found");
    }

    dispatch({ type: "SET_SEARCH_FILTER", payload: name });
  } catch (error) {
    console.error("Error searching users:", error);
  }
};

export const createUser = (user) => async (dispatch) => {
    console.log("createUser updating post to API:", user);
    const response = await axios.post(`${DOMAIN}/users`, user);
    dispatch({ type: 'CREATE_USER', payload: response.data });
    // alert("create user successfully");
    // window.location.href = `/`;
};

export const updateUser = (id, user) => async (dispatch) => {
    const response = await axios.put(`${DOMAIN}/users/${id}`, user);
    dispatch({ type: 'UPDATE_USER', payload: response.data });
};

export const getUserById = (id) => async (dispatch) => {
    const response = await axios.get(`${DOMAIN}/users/${id}`);
    return response.data;
    // dispatch({ type: 'GT_USER_BY_ID', payload:
}
export const deleteUser = (id) => async (dispatch) => {
    await axios.delete(`${DOMAIN}/users/${id}`);
    dispatch({ type: 'DELETE_USER', payload: id });
};
