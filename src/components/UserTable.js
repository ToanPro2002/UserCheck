import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../redux/userAction';
import '../style/UserTable.css';
const UserTable = ({ users }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const handEditing = (id) => {
      // console.log("id:",id);
        navigate(`/edit/${id}`);
    };
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(id));
        }
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
