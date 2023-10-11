import React, { useContext, useState } from 'react'
import style from './ResetPass.module.css'
import axios from 'axios'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
export default function ResetPass() {
    let { setUserToken } = useContext(UserContext);
    let nav = useNavigate();
    let [message, setMessage] = useState("");


    async function Forgetpassword({ email }) {
        let { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            { email }
        );
        console.log(data);
        console.log(data.message);
        setMessage(data.message);
    }


    async function verifyCode({ resetCode }) {
        console.log(resetCode);
        let { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
            { resetCode: `${resetCode}` }
        );
        console.log(data);
        setMessage(data.status);
    }

    async function resetpassword({ email, newPassword }) {
        console.log(email, newPassword);
        let { data } = await axios.put(
            "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
            {
                email: `${email}`,
                newPassword: `${newPassword}`,
            }
        );
        localStorage.setItem("usertoken", data.token);
        setUserToken(data.token);
        nav('/');
        console.log(data);
    }

    let sendEmail = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: Forgetpassword,
    });
    let resetCode = useFormik({
        initialValues: {
            resetCode: "",
        },
        onSubmit: verifyCode,
    });

    let resetPassword = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        onSubmit: resetpassword,
    });

    if (message == "") {
        return (
            <>
                <div className="container pt-5">
                    <form onSubmit={sendEmail.handleSubmit}>
                        <label htmlFor="email">your Email :</label>
                        <input
                            type="email"
                            onChange={sendEmail.handleChange}
                            onBlur={sendEmail.handleBlur}
                            value={sendEmail.values.email}
                            id="email"
                            className="form-control"
                        />
                        <button type="submit" className="btn btn-outline-success my-3">
                            Submit
                        </button>
                    </form>
                </div>
            </>
        );
    } else if (message == "Reset code sent to your email") {
        return (
            <>
                <div className="container pt-5">
                    <form onSubmit={resetCode.handleSubmit}>
                        <label htmlFor="resetcode">
                            Please enter the verification code :
                        </label>
                        <input
                            type="number"
                            onChange={resetCode.handleChange}
                            onBlur={resetCode.handleBlur}
                            value={resetCode.values.resetCode}
                            id="resetCode"
                            className="form-control"
                        />
                        <button type="submit" className="btn btn-outline-success my-3">
                            Submit
                        </button>
                    </form>
                </div>
            </>
        );
    } else if (message == "Success") {
        return (
            <>
                <div className="container pt-5">
                    <form onSubmit={resetPassword.handleSubmit}>
                        <label htmlFor="email">your Email :</label>
                        <input
                            type="email"
                            onChange={resetPassword.handleChange}
                            onBlur={resetPassword.handleBlur}
                            value={resetPassword.values.email}
                            id="email"
                            className="form-control"
                        />
                        <label htmlFor="password">your new password :</label>
                        <input
                            type="password"
                            onChange={resetPassword.handleChange}
                            onBlur={resetPassword.handleBlur}
                            value={resetPassword.values.newPassword}
                            id="newPassword"
                            className="form-control"
                        />
                        <button type="submit" className="btn btn-outline-success my-3">
                            Submit
                        </button>
                    </form>
                </div>
            </>
        );
    }
}
