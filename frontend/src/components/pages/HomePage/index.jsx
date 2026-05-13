import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode"
import "./index.css"



const HomePage = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const currentTime = Date.now() / 1000

    if (decode.exp < currentTime) {
        localStorage.removeItem('token')
        return <Navigate to="/login" />
    }
    return (
        <>
            <div className="home-page-main-bg-container">
                <div className="user-details-container">
                    <h1 className="home-page-welcome-message">Welcome , {decode.username}</h1>
                    <h1 className="home-page-role">Role : <span>{decode.role}</span></h1>
                    <ul className="home-page-models-container">
                        <li className="students-card-container" className="students-card-container"
                            onClick={() => navigate("/students")}>
                            <h1>Students</h1>
                            <h1 className="home-page-role">Role Type : <span>{decode.role}</span></h1>
                            {decode.role === "student" ? <p> Access Type : <span className="limitd">Limited Access</span> </p> : <p>Access Type: <span>Full Access</span></p>}
                        </li>
                        <li className="courses-card-container" onClick={() => navigate("/courses")}>
                            <h1>Courses</h1>
                            <h1 className="home-page-role">Role Type : <span>{decode.role}</span></h1>
                            {decode.role === "student" ? <p> Access Type : <span className="limitd">Limited Access</span> </p> : <p>Access Type: <span>Full Access</span></p>}
                        </li>
                        <li className="enrollments-card-container" onClick={() => navigate("/enrollments")}>
                            <h1>Enrollments</h1>
                            <h1 className="home-page-role">Role Type : <span>{decode.role}</span></h1>
                            {decode.role === "student" ? <p> Access Type : <span className="limitd">Limited Access</span> </p> : <p>Access Type: <span>Full Access</span></p>}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default HomePage;
























