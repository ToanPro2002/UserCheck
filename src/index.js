import React, {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';

import reportWebVitals from "./reportWebVitals";
// import router from react-router-dom;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import { Provider } from 'react-redux'
import store from './redux/store'
import UserForm from "./components/UserForm";
const root = ReactDOM.createRoot(document.getElementById("root"));
// import { Provider } from 'react-redux';
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' })
  // useEffect(() => {
  //     dispatch(fetchUsers());
  // }, [dispatch]);
root.render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* Trang danh sách user */}
        <Route path="/" element={<UserList />} />
        {/* Trang tạo mới user */}
        <Route path="/create" element={<UserForm />} />
        {/* Trang chỉnh sửa user */}
        <Route path="/edit/:id" element={<UserForm isEditing />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
