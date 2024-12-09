import React from "react";
// import { useDispatch } from "react-redux";
// import { createUser, updateUser, getUserById } from "../redux/userAction.js";
import { createUser, updateUsers, getUserById } from "../Services/apis.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../style/UserForm.css";
// import { useQuery } from "react-query";
const vietnamesePhoneRegex = RegExp(
  /^(0[3-9]\d{2}[-. ]?\d{3}[-. ]?\d{3}|02\d{1,2}[-. ]?\d{3}[-. ]?\d{4})$/
);

const schema = yup.object({
  name: yup.string().required("This field is required"),
  gender: yup.number().required("This field is required").max(2, "Invalid"),
  phone_number: yup
    .string()
    .required()
    .matches(
      vietnamesePhoneRegex,
      "Vietnamese phone number only: start with 0, 10 digits"
    )
    .max(11, "Invalid"),
  address: yup.string().required("This field is required"),
  birthday: yup.string().required("This field is required"),
});
const UserForm = ({ initialData = {}, isEditing = false }) => {
  let navigator = useNavigate();
  const { id } = useParams();
  // const dispatch = useDispatch();
  // console.log("id:", id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (isEditing && id) {
      getUserById(id)
        .then((user) => {
          setValue("name", user.name);
          setValue("gender", user.gender);
          setValue("phone_number", user.phone_number);
          setValue("address", user.address);
          setValue(
            "birthday",
            new Date(user.birthday).toISOString().split("T")[0]
          );
        })
        .catch((error) => {
          console.log("error_time:", error);
        });
    }
  }, [id, isEditing, setValue]);

  const onSubmit = async (data) => {
    console.log("data when you submit:", data);
    if (isEditing) {
      try {
        const updateUser = await updateUsers(id, data);
        console.log("updateUser:", updateUser);
      } catch (error) {
        console.log("error:", error);
      }
      alert("Update user successfully");
    } else {
      try {
        const createUs = await createUser(data);
        console.log("Create:", createUs);
        // createUs.id = createUs.id;
      } catch (error) {
        console.log("error:", error);
      }
    }
    navigator("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name="name"
        placeholder="Họ và tên"
        {...register("name")}
      />
      {errors.name && <span>This field is required</span>}

      <select name="gender" {...register("gender", { required: true })}>
        <option value={1}>Nam</option>
        <option value={2}>Nữ</option>
      </select>
      {errors.gender && <span>This field is required</span>}

      <input
        type="text"
        name="phone_number"
        placeholder="Số điện thoại"
        {...register("phone_number")}
      />
      {errors.phone_number && (
        <span>Vietnamese phone number only: start with 0, 10 digits</span>
      )}

      <input
        type="text"
        name="address"
        placeholder="Địa chỉ"
        {...register("address")}
      />
      {errors.address && <span>This field is required</span>}
      <input
        type="date"
        name="birthday"
        placeholder="Ngày sinh"
        {...register("birthday")}
      />
      {errors.birthday && <span>This field is required</span>}

      <button type="submit">{isEditing ? "Cập nhật" : "Tạo mới"}</button>
    </form>
  );
};

export default UserForm;
