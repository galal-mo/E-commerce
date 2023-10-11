import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default function Register() {
  const navigate = useNavigate()
  const validationSchema = Yup.object({
    name: Yup.string("must be string")
      .min(3, "must be more tha 3")
      .max(15)
      .required("name is required"),
    email: Yup.string()
      .email("Email format is not valid")
      .required("Email is reuired"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("phone is reuired"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,20}/, "must be at least 3 chars")
      .required("password is reuired"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "doesnot match the password")
      .required("repassword is reuired"),
  });
  const [isLoading, setLoading] = useState(false);

  async function sendData(values) {
    setLoading(true)
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      values
    );
    console.log(data, data.message);
    if (data.message == 'success')
      setLoading(false);
    navigate('/LogIn')
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendData,
  });

  return (
    <>
      <div className="w-75  mx-auto">
        <h3>Register Now: </h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="userName">name:</label>
          <input
            id="userName"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            type="text"
            name="name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : (
            ""
          )}

          <label htmlFor="userEmail">Email:</label>
          <input
            id="userEmail"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="userPhone">Phone:</label>
          <input
            id="userPhone"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            type="tel"
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : (
            ""
          )}

          <label htmlFor="userPass">Password:</label>
          <input
            id="userPass"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : (
            ""
          )}

          <label htmlFor="userrepassword">RePassword:</label>
          <input
            id="userrepassword"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
            type="password"
            name="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : (
            ""
          )}
          {isLoading ? (
            <InfinitySpin
              width='200'
              color="#4fa94d"
            />
          ) : (
            <button type="submit" className="btn btn-danger my-3">
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
