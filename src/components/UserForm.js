import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser ,updateUser, getUserById} from '../redux/userAction.js';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/UserForm.css';
const UserForm = ({ initialData = {}, isEditing = false }) => {
    let navigator = useNavigate();
    const [form, setForm] = useState({
        name: initialData.name || '',
        gender: initialData.gender || 1,
        phone_number: initialData.phone_number || '',
        address: initialData.address || '',
        birthday: initialData.birthday || '',
    });
    const {id} = useParams();
    const dispatch = useDispatch();

    React.useEffect(() => {
      if (isEditing && id) {
        // console.log("getUserById updating in",id);
          dispatch(getUserById(id)).then((user) => {
              setForm({
                  name: user.name,
                  gender: user.gender,
                  phone_number: user.phone_number,
                  address: user.address,
                  birthday: new Date(user.birthday).toISOString().split('T')[0],
              });
          });
      }
  }, [dispatch, id, isEditing]);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (isEditing) {
            dispatch(updateUser(id, form));
            console.log("updateUser updating in APi:",form);
            alert("update user successfully");
        } else {
            console.log("createUser updating in APi:",form);
            dispatch(createUser(form));
            alert("create user successfully");
        }
        navigator('/');
    };

    return (
        <form>
            <input type="text" name="name" placeholder="Họ và tên" value={form.name} onChange={handleChange} required />
            <select name="gender" value={form.gender} onChange={handleChange}>
                <option value={1}>Nam</option>
                <option value={2}>Nữ</option>
            </select>
            <input
                type="text"
                name="phone_number"
                placeholder="Số điện thoại"
                value={form.phone_number}
                onChange={handleChange}
                required
            />
            <input type="text" name="address" placeholder="Địa chỉ" value={form.address} onChange={handleChange} required />
            <input
                type="date"
                name="birthday"
                placeholder="Ngày sinh"
                value={form.birthday}
                onChange={handleChange}
                required
            />
            <button type="button" onClick={ handleSubmit}>
                {isEditing ? 'Cập nhật' : 'Tạo mới'}
            </button>
        </form>
    );
};

export default UserForm;
