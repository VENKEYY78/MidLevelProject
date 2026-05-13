import { useState } from "react";

import { jwtDecode } from "jwt-decode";

import { Navigate } from "react-router-dom";

import api from "../../services/api";

const AddCourse = ({ setAddCourseSuccessData }) => {

    const token = localStorage.getItem("token")
    if (!token) {

        return <Navigate to="/login" />
    }
    const decode = jwtDecode(token)
    const [course_title, setCouse_title] = useState("")
    const [description, setDescription] = useState("")
    const [errorMsg, setErrorMsg] = useState("")



    const onChangeCourseTitle = (e) => {
        setCouse_title(e.target.value);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const AddCourseDetails = async (e) => {
        e.preventDefault();
        const AddCourse = {
            course_title,
            description,
        }
        try {
            const response = await api.post("/add_new_course", AddCourse)
            setCouse_title("")
            setDescription("")
            setAddCourseSuccessData(response.data)
            console.log(response.data)
        } catch (error) {
            const msg = error.response?.data?.detail || "Faild to Add Course";
            setErrorMsg(msg);
        }
    }

    return (

        <div className="adding-student-main-bgcontainer">
            <form className="add-student-form-container" onSubmit={AddCourseDetails}>
                <div className="user-name-container">
                    <label className="User-name-label" htmlFor="coursename">
                        Enter Course Name
                    </label>
                    <input
                        type="text"
                        placeholder="User Full Name"
                        className="input-user-name"
                        id="coursename"
                        value={course_title}
                        onChange={onChangeCourseTitle}
                    />
                </div>

                <div className="user-name-container">
                    <label className="User-name-label" htmlFor="description">
                        Description
                    </label>
                    <input
                        type="text"
                        placeholder="write description"
                        className="input-user-name"
                        id="description"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                <p className="error-msg">{errorMsg}</p>
                <div className="add-student-submet-button">
                    <button type="submit" className="sign-in-button">Add Course</button>
                </div>
            </form>
        </div>
    )
}

export default AddCourse;















