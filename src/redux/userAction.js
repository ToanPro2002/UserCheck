// redux/actions/userActions.js
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
const DOMAIN = "https://674d7ca1635bad45618b8933.mockapi.io/api/test";

const apiClient = axios.create({
  baseURL: DOMAIN, // URL gốc cho các yêu cầu
  timeout: 5000,                      // Thời gian chờ tối đa
  headers: {                          // Headers mặc định
      'Content-Type': 'application/json',
  },
});

// Sử dụng instance
apiClient.interceptors.request.use(
  (config) => {
      // Thêm token vào header nếu có\
      console.log("Request Config:", config);
      const token = localStorage.getItem('token');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  (response) => {
      return response;
  },
  (error) => {
      if (error.response.status === 401) {
          // Xử lý logout
      }
      return Promise.reject(error);
  }
);
export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await apiClient.get(`${DOMAIN}/users`);
    console.log("response:", response.data);
    dispatch({ type: "FETCH_USERS", payload: response.data });
  } catch (error) {
    console.log("error:fetchUsers", error);
  }
};

export const searchUsers = (name) => async (dispatch) => {
  try {
    // Fetch all users to find the user by name
    const user = await apiClient.get(`${DOMAIN}/users`,{
      params: { name }
    });
    dispatch({ type: "SEARCH_USERS", payload: user.data });
    dispatch({ type: "SET_SEARCH_FILTER", payload: name });
  } catch (error) {
    console.error("Error searching users:", error);
  }
};

export const createUser = (user) => async (dispatch) => {
    console.log("createUser updating post to API:", user);
    const response = await apiClient.post(`${DOMAIN}/users`, user);
    dispatch({ type: 'CREATE_USER', payload: response.data });
    alert("create user successfully");
    window.location.href = `/`;
};

export const updateUser = (id, user) => async (dispatch) => {
    const response = await apiClient.put(`${DOMAIN}/users/${id}`, user);
    dispatch({ type: 'UPDATE_USER', payload: response.data });
};

export const getUserById = (id) => async (dispatch) => {
    const response = await apiClient.get(`${DOMAIN}/users/${id}`);
    return response.data;
    // dispatch({ type: 'GT_USER_BY_ID', payload:
}

export const deleteUser = (id) => async (dispatch) => {
    await apiClient.delete(`${DOMAIN}/users/${id}`);
    dispatch({ type: 'DELETE_USER', payload: id });
};

export const getUserIdByName = (name) => async (dispatch) => {
  try {
    const response = await apiClient.get(`${DOMAIN}/users`, {
      params: { name }
    });
    console.log("response:", response);
    const users = response.data;
    if (users.length > 0) {
      return users[0].id;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user ID by name:", error);
    return null;
  }
};
