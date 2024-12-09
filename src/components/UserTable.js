import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { deleteUser } from '../redux/userAction';
import { deleteUser } from '../Services/apis';
import '../style/UserTable.css';
const UserTable = ({ users ,isLoading, error}) => {
  const navigate = useNavigate();
  if (isLoading) {
    return <div>Loading...</div>; // Hiển thị trạng thái loading
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>; // Hiển thị lỗi
  }
  if (!users.length) {
    return <div>No users found.</div>; // Hiển thị khi không có dữ liệu
  }
    const handEditing = (id) => {
      // console.log("id:",id);
        navigate(`/edit/${id}`);
    };
    const handleDelete = (id) => {
      if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
        deleteUser(id).then(() => {
          window.location.reload();
        });
      }
      return null;
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Họ và tên</th>
                    <th>Giới tính</th>
                    <th>SĐT</th>
                    <th>Địa chỉ</th>
                    <th>Ngày sinh</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.gender === 1 ? 'Nam' : 'Nữ'}</td>
                        <td>{user.phone_number}</td>
                        <td>{user.address}</td>
                        <td>{new Date(user.birthday).toLocaleDateString('vi-VN')}</td>
                        <td>
                            <button onClick={() => handEditing(user.id)}>Edit</button>

                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
