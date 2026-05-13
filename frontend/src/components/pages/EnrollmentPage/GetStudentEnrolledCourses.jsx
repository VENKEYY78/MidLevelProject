import { useState } from "react";

import api from "../../services/api";

const GetStudentsEnrolledCourses = ({ setStudentEnrollmentDetails }) => {
    const [errorMsg, setErrorMsg] = useState("")
    const [id, setId] = useState("")

    const onChangeID = (e) => {
        setId(e.target.value);
    }

    const showStudentEnrolledInformation = async (e) => {
        e.preventDefault()
        if (!id) {
            setErrorMsg("Please enter an ID");
            return;
        }

        try {
            const response = await api.get(`/students/${id}/courses`)
            setStudentEnrollmentDetails(response.data)
            setId("")
            console.log(response.data)
            setErrorMsg('')
        } catch (error) {
            const msg = error.response?.data?.detail || "Failed to fetch student Enrollments Details"
            setErrorMsg(msg)
        }
    }


    return (
        <>
            <div className="student-id-container">
                <label className="label-id-input" htmlFor="id">Student ID</label>
                <input
                    type="number"
                    placeholder="Enter Student ID"
                    className="input-id"
                    id="id"
                    value={id}
                    onChange={onChangeID}
                />
            </div>
            <button type="click" className="show-student-details-button" onClick={showStudentEnrolledInformation}>
                Student Enrolled Details
            </button>
            <p className="error-msg">{errorMsg}</p>
        </>
    )
}


export default GetStudentsEnrolledCourses;