

import { useState } from "react";

import api from "../../services/api";

const UpdateCourse = ({ setCourseUpdatedDetails }) => {
    const [updateId, setUpdateId] = useState("")
    const [course_title, setCourse_tilte] = useState("")
    const [description, setDescription] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const onChangeCourseUpdateID = (e) => {
        setUpdateId(e.target.value);
    }

    const onChangeUpdateCourseTitle = (e) => {
        setCourse_tilte(e.target.value);
    }

    const onUpdateCourseDescription = (e) => {
        setDescription(e.target.value);
    }


    const updateCourseForm = async (e) => {
        e.preventDefault()

        if (!updateId) {
            setErrorMsg("Please Enter Valid ID")
            return;
        }
        setUpdateId("")
        const CourseUpdateDetails = {
            course_title,
            description,
        };

        try {
            const response = await api.put(`/update_course_details/${updateId}`, CourseUpdateDetails)
            setCourseUpdatedDetails(response.data)
            setCourse_tilte("")
            setDescription('')
            console.log(response.data)
        } catch (error) {
            const msg = error.response?.data?.detail || "Failed to Update Course Details"
            setErrorMsg(msg)
        }
    }



    return (
        <>
            <form className="update-form-container" onSubmit={updateCourseForm}>
                <div className="update-student-id-container">
                    <label className="label-id-input" htmlFor="id">Course ID</label>
                    <input
                        type="number"
                        placeholder="Enter Course ID"
                        className="input-id"
                        id="id"
                        value={updateId}
                        onChange={onChangeCourseUpdateID}
                    />
                </div>
                <div className="user-name-container">
                    <label className="User-name-label" htmlFor="updateUsername">
                        Update Course Title
                    </label>
                    <input
                        type="text"
                        placeholder="Update Course Title"
                        className="input-user-name"
                        id="updateUsername"
                        value={course_title}
                        onChange={onChangeUpdateCourseTitle}
                    />
                </div>

                <div className="mail-container">
                    <label className="mail-label" htmlFor="email">Update Mail ID</label>
                    <input
                        type="text"
                        placeholder="Enter User Mail ID"
                        className="input-email-id"
                        id="email"
                        value={description}
                        onChange={onUpdateCourseDescription}
                    />
                </div>
                <div className="add-student-submet-button">
                    <button type="submit" className="sign-in-button">Update Course Details</button>
                </div>
            </form>
        </>
    )
}

export default UpdateCourse;


