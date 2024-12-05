import React from "react";
// import {Route} from "react-router-dom";
// import CreateUser from "./CreateUser";
export default function ListUser() {
  const [user, setUser] = React.useState([
    {
      name: "Nguyen Van A",
      gender: "Nữ",
      email: "NguyenVanA@gmail.com",
      phone: "0923456789",
      address: "Ha Noi",
      birthday: "12/12/1990",
    },
    {
      name: "Jojn",
      gender: "Nữ",
      email: "NguyenVanB@gmail.com",
      phone: "0923456789",
      address: "Ha Noi",
      birthday: "12/12/1990",
    },
  ]);

  const [searchName, setSearchName] = React.useState("");
  const [filterUser, setFilterUser] = React.useState(user);
  // const Navigate = Routes();

  // function displayListAddUser() {
  //   setUser([
  //     ...user,
  //     { name: "", gender: "", email: "", phone: "", address: "", birthday: "" },
  //   ]);
  // }
  const handleInputChange = (e) => {
    const searchItem = e.target.value;
    setSearchName(searchItem);
  }
  React.useEffect(() => {
    const filteredItem = user.filter((user) =>
      user.name.toLowerCase().includes(searchName.toLocaleLowerCase())
    );
    setFilterUser(filteredItem);
  }, [searchName, user]);
  const handleEdit = (index) => {
    // Navigate to the edit user page
    // window.location.href = `/user`;
    window.location.href = `/user/${index}`;
  };
  const handleDelete = (index) => {
    alert("Are you sure you want to delete this user?");
    const newUser = user.filter((_, i) => i !== index);
    setUser(newUser);
  };

  return (
    <div className="table-user">
      <h2>Heading list of user</h2>
      {/* <button onClick={displayListAddUser}>Add user</button> */}
      <input
        type="text"
        placeholder="Search name user"
        onChange={handleInputChange}
        value={searchName}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Birthday</th>
          </tr>
        </thead>
        <tbody>
          {filterUser.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{user.birthday}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
