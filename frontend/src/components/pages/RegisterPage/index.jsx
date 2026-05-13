import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";


import "./index.css"

const RegisterPage = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [role, setselectedRole] = useState("admin")
    const [password, setPassword] = useState("")
    const [repassword, setRePassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const navigate = useNavigate()

    const onChangeUserName = (e) => {
        setUsername(e.target.value);
    };

    const onChangeMailID = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeRole = (e) => {
        setselectedRole(e.target.value);
    };

    const onChangeRePassword = (e) => {
        setRePassword(e.target.value);
    };


    const addUserDetails = async (e) => {
        e.preventDefault();

        if (password !== repassword) {
            setErrorMsg("Password Mismatch");
            return;
        }

        const newUser = {
            username,
            email,
            role,
            password,
        };
        console.log(newUser)

        try {
            const response = await api.post("/register_user", newUser)
            alert("User added successfully!");
            setUsername("");
            setEmail("");
            setPassword("");
            setRePassword("");
            navigate("/login");
        } catch (error) {
            const msg = error.response?.data?.detail || "Registration faild. Try again.";
            setErrorMsg(msg);
        }

    }



    return (
        <>
            <div className="rigister-page-main-bg-container">
                <div className="rigister-card-bg-container">
                    <h1 className="sign-in-heading">Sign In</h1>
                    <form className="register-page-form-container" onSubmit={addUserDetails}>
                        <div className="user-name-container">
                            <label className="User-name-label" htmlFor="Username">
                                Enter User Name
                            </label>
                            <input
                                type="text"
                                placeholder="User Full Name"
                                className="input-user-name"
                                id="Username"
                                value={username}
                                onChange={onChangeUserName}
                            />
                        </div>
                        <div className="mail-container">
                            <label className="mail-label" htmlFor="email">Enter Mail ID</label>
                            <input
                                type="text"
                                placeholder="Enter User Mail ID"
                                className="input-email-id"
                                id="email"
                                value={email}
                                onChange={onChangeMailID}
                            />
                        </div>
                        <div className="select-role-container">
                            <label className="label-select-role" htmlFor="selectrole">Select Role</label>
                            <select
                                className="select-container"
                                id="selectrole"
                                value={role}

                                onChange={onChangeRole}
                            >
                                <option className="option" value="admin">Admin</option>
                                <option className="option" value="student">Student</option>
                            </select>
                        </div>
                        <div className="input-password-container">
                            <label className="password-label" htmlFor="password">Enter Password</label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="input-password"
                                value={password}
                                id="password"
                                onChange={onChangePassword}
                            />
                        </div>

                        <div className="input-password-container">
                            <label className="password-label" htmlFor="renterpassword">Re Enter Password</label>
                            <input
                                type="password"
                                placeholder="Re Enter Password"
                                className="input-password"
                                id="renterpassword"
                                value={repassword}
                                onChange={onChangeRePassword}
                            />
                        </div>
                        <p className="error-msg">{errorMsg}</p>
                        <div>
                            <button type="submit" className="sign-in-button">Sign In</button>
                        </div>
                        <p>Are You Already Sign In </p>
                    </form>
                </div>
            </div>
        </>
    )
};


export default RegisterPage;