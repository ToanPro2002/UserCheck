// hooks/useFetchUsers.js
// import { useQuery } from '@tanstack/react-query';
// import { useDispatch } from 'react-redux';
// import { fetchUsers } from '../redux/userAction';
import axios from "axios";

const DOMAIN = "https://674d7ca1635bad45618b8933.mockapi.io/api/test";

const apiClient = axios.create({
  baseURL: DOMAIN, // URL gốc cho các yêu cầu
  timeout: 5000, // Thời gian chờ tối đa
  headers: {
    // Headers mặc định
    "Content-Type": "application/json",
  },
});

// Sử dụng instance
apiClient.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu có\
    // return Promise.reject(config);
    console.log("Request Config:", config);
    const token = localStorage.getItem("token");
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
export const FetchUsers = async () => {
  const response = await apiClient.get(`${DOMAIN}/users`);
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.data;
};
export const searchUsers = async (name) => {
  try {
    // Fetch all users to find the user by name
    const response = await apiClient.get(`${DOMAIN}/users`, {
      params: { name }, // Gửi tham số "name" để API xử lý tìm kiếm
    });
    // console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
  }
};
export const createUser = async (user) => {
  try {
    const response = await apiClient.post(`${DOMAIN}/users`, user);
    console.log("response:", response.data.id);
    alert("create user successfully");
    // window.location.href = `/`;
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
  }
  // console.log("createUser updating post to API:", user);
  // const response = await apiClient.post(`${DOMAIN}/users`, user);
  // console.log("createUser response:", response.data);
  // dispatch({ type: 'CREATE_USER', payload: response.data });

  // return [...user, response.data];
};

export const updateUsers = async (id, user) => {
  const response = await apiClient.put(`${DOMAIN}/users/${id}`, user);
  // dispatch({ type: 'UPDATE_USER', payload: response.data });
  console.log("updateUser response:", response.data);
  // return response.data;
};

export const getUserById = async (id) => {
  const response = await apiClient.get(`${DOMAIN}/users/${id}`);
  return response.data;
  // dispatch({ type: 'GT_USER_BY_ID', payload:
}
