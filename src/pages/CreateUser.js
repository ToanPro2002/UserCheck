import React, { useState } from "react";
import Combobox from "react-widgets/Combobox";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
  });
  const genderRef = React.useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Gender:</label>
        <Combobox
          // dataKey={['1', '2']}
          ref={genderRef}
          defaultValue={formData.gender}
          data={["Nam", "Nữ"]}
          onChange={(value) => setFormData({ ...formData, gender: value })}
          required
          dropUp
        />
        {/* <option value="">Select Gender</option> */}
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Birthday:</label>
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUser;
