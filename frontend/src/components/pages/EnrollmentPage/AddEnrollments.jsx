
import { useState } from "react"

import api from "../../services/api"



const AddEnrollments = ({ setEnrollmentDetails }) => {
    const [studentId, setSudentId] = useState("")
    const [courseId, setCourseId] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const onChangeStudentID = (e) => {
        setSudentId(e.target.value)
    }

    const onChangeCourseID = (e) => {
        setCourseId(e.target.value)
    }


    const AddEnrollmentDetails = async (e) => {
        e.preventDefault()

        if (!studentId || !courseId) {
            setErrorMsg("Please Enter Valid ID")
        }
        try {
            const response = await api.post(`add_enrollment/${studentId}/${courseId}`)
            setEnrollmentDetails(response.data)
            setCourseId("")
            setSudentId("")
            setErrorMsg("")
            console.log(response.data)
        } catch (error) {
            const msg = error.response?.data?.detail || "Failed To Add Enrollment"
            setErrorMsg(msg)
        }

    }

    return (
        <>
            <div className="sending-details-and-success-msg-main-container">
                <form className="add-student-form-container" onSubmit={AddEnrollmentDetails}>
                    <div className="student-id-container">
                        <label className="label-id-input" htmlFor="id">Student ID</label>
                        <input
                            type="number"
                            placeholder="Enter Student ID"
                            className="input-id"
                            id="id"
                            value={studentId}
                            onChange={onChangeStudentID}
                        />
                    </div>

                    <div className="student-id-container">
                        <label className="label-id-input" htmlFor="id">Course ID</label>
                        <input
                            type="number"
                            placeholder="Enter Course ID"
                            className="input-id"
                            id="id"
                            value={courseId}
                            onChange={onChangeCourseID}
                        />
                    </div >
                    <div className="add-student-submet-button">
                        <button type="submit" className="sign-in-button">Add Enrollment</button>
                    </div>
                    {errorMsg && (
                        <p>{errorMsg}</p>
                    )}
                </form>
            </div>
        </>
    )
}



export default AddEnrollments;









