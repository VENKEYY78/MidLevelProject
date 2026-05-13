import { useState } from "react"

import api from "../../services/api"


const GetAllEnrollments = ({ setAllEnrollmentDetails }) => {
    const [errorMsg, setErrorMsg] = useState("")

    const showAllEnrollmentsList = async (e) => {
        try {
            const response = await api.get("/get_all_enrollments")
            setAllEnrollmentDetails(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error.response)
            console.log(error.response?.data)
            const msg = error.response?.data?.detail || "Failed to fetch Enrollment Details"
            setErrorMsg(msg)
        }
    }
    return (
        <div>
            <div className="show-all-students-list">
                <p className="descripton">click On Show All Enrollments Button to Get All Enrollments List </p>
                <button type="button" className="show-student-details-button" onClick={showAllEnrollmentsList}>
                    Show All Enrollments
                </button>
                <p className="error-msg">{errorMsg}</p>
            </div>
        </div>
    )
}

export default GetAllEnrollments;








