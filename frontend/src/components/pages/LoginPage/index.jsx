import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from '../../services/api'

import "./index.css";


const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("admin")
    const [password, setPassword] = useState("")
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
        setRole(e.target.value);
    };

    const addUserDetails = async (e) => {
        e.preventDefault();
        const loginUser = {
            username,
            email,
            role,
            password,
        };
        console.log(loginUser)

        try {
            const response = await api.post("/login", loginUser)
            localStorage.setItem('token', response.data.token)
            setUsername("");
            setEmail("");
            setPassword("");
            navigate("/")
        } catch (error) {
            const msg = error.response?.data?.detail || "Login Faild. Try Again.";
            setErrorMsg(msg);
        }

    }

    return (
        <>
            <div className="rigister-page-main-bg-container">
                <div className="rigister-card-bg-container">
                    <h1 className="sign-in-heading">Log In</h1>
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
                        <p>{errorMsg}</p>
                        <div>
                            <button type="submit" className="sign-in-button">Login</button>
                        </div>
                        <p>Are You Not Sign In </p>
                    </form>
                </div>
            </div>

        </>
    );
};

export default LoginPage;


/*


<>
            <div className="job-tracker-main-bg-container">
                <div className="job-tracker-heading-container">
                    <h1 className="job-tracker-main-heading">
                        Welcome To Job Tracker App
                    </h1>
                </div>
                <div>
                    <form className="form-container" onSubmit={userLoginDetails}>
                        <div className="username-container">
                            <label className="Username-label" htmlFor="UserName">
                                Enter UserName
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Username"
                                className="usernameinput"
                                id="UserName"
                                onChange={onChangeUseraName}
                            />
                        </div>
                        <div className="password-container">
                            <label className="password-label" htmlFor="password">
                                Enter Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="passwordinput"
                                id="password"
                                onChange={onChangePassword}
                            />
                        </div>
                        <div>
                            <Link to="/signinpage" className="sing-in-login-page">
                                Sign In
                            </Link>
                            <button type="submit" className="button">
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>


*/