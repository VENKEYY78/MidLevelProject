
import { useState } from "react";

import api from "../../services/api";


const DeleteCourse = ({ setDeleteCourseInformation }) => {
    const [errorMsg, setErrorMsg] = useState("")
    const [deleteId, setDeleteId] = useState("")

    const onChangeCourseDeleteID = (e) => {
        setDeleteId(e.target.value);
    }

    const handleDeleteCourse = async (e) => {
        e.preventDefault()
        if (!deleteId) {
            setErrorMsg("Please Enter Valid ID")
            return;
        }
        try {
            const response = await api.delete(`/detele_course/${deleteId}`)
            setDeleteCourseInformation(response.data)
            setDeleteId("")
            console.log(response.data)
        } catch (error) {
            const msg = error.response?.data?.detail || "Failed To Delete Student"
            setErrorMsg(msg)
        }
    }

    return (
        <>
            <div className="get-student-details-by-id">
                <p className="get-single-student-details-description">Enter a unique Course ID below to Delete For Course.</p>
                <div className="student-id-container">
                    <label className="label-id-input" htmlFor="id">Course ID</label>
                    <input
                        type="number"
                        placeholder="Enter Course ID"
                        className="input-id"
                        id="id"
                        value={deleteId}
                        onChange={onChangeCourseDeleteID}
                    />
                </div>
                <button type="click" className="show-student-details-button" onClick={handleDeleteCourse}>
                    Delete Course Details
                </button>
                <p className="error-msg">{errorMsg}</p>
            </div>
        </>
    )
}

export default DeleteCourse;






















