// import logo from "./logo.svg";
// import store from './redux/store'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import ListUser from "./pages/ListUser.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <Routes>
            <Route path="/" element={<ListUser />} />
            {/* Trang danh sách user */}
            {/* <Route path="/" element={<UserList />} /> */}
            {/* Trang tạo mới user */}
            <Route path="/create" element={<UserForm />} />
            {/* Trang chỉnh sửa user */}
            <Route path="/edit/:id" element={<UserForm isEditing />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
