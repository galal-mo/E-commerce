import React, { useContext, useState } from "react";
import style from "./LogIn.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import toast, { Toaster } from "react-hot-toast";



export default function LogIn() {
    let { setUserToken } = useContext(UserContext);
    const navigate = useNavigate()
    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Email is reuired"),
        password: Yup.string()
            .required("password is reuired"),
    });
    const [isLoading, setLoading] = useState(false);

    async function sendData(values) {
        try{
        setLoading(true)
        let { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            values
        );
        // console.log(data, data.message);
        if (data.message == 'success') {
            setLoading(false);
            localStorage.setItem('usertoken', data.token)
            setUserToken(data.token);
            navigate('/')
        }
        else {
            setLoading(false);
            console.log("incorrect email or password");
        }
    }catch(error) { 
        setLoading(false);
        toast.error("Please check your information")
    }
}

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: sendData,
    });

    return (
        <>
            <div className="w-75  mx-auto mt-2">
                <h3>LogIn Now: </h3>
                <Toaster/>
                <form onSubmit={formik.handleSubmit}>

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


                    {isLoading ? (
                        <InfinitySpin
                            width='200'
                            color="#4fa94d"
                        />
                    ) : (
                        <div className="d-flex justify-content-between mt-3">
                            <div>
                                <Link to='ResetPass' className="text-main">Forget your password?</Link>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-danger my-3">
                                    LogIn
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}
