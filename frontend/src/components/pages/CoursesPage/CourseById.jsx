
import { useState } from "react";

// import { Navigate } from "react-router-dom";

import api from "../../services/api";


const CourseById = ({ setCourseDetailsById }) => {
    const [id, setId] = useState("")
    const [errorMsg, setErrorMsg] = useState("")


    const onChangeID = (e) => {
        setId(e.target.value)
    }

    const showCourseInformation = async (e) => {
        e.preventDefault()
        if (!id) {
            setErrorMsg("Please enter an ID")
            return;
        }
        try {
            const response = await api.get(`/get_single_course/${id}`)
            setCourseDetailsById(response.data)
            setId("")
            console.log(response.data)
        } catch (error) {
            const msg = error.response?.data?.detail || "Failed to Fetch Course Details"
            setErrorMsg(msg)
        }
    }


    return (
        <>
            <div className="get-student-details-by-id">
                <p className="get-single-student-details-description">Enter a unique Course ID below to retrieve specific profile information.</p>
                <div className="student-id-container">
                    <label className="label-id-input" htmlFor="id">Course ID</label>
                    <input
                        type="number"
                        placeholder="Enter Course ID"
                        className="input-id"
                        id="id"
                        value={id}
                        onChange={onChangeID}
                    />
                </div>
                <button type="click" className="show-student-details-button" onClick={showCourseInformation}>
                    Show Course  Details
                </button>
                <p className="error-msg">{errorMsg}</p>
            </div>
        </>
    )
}

export default CourseById;