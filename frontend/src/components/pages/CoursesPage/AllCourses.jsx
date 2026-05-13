
import { useState } from "react";
import api from "../../services/api";



const AllCourses = ({ setCoursesList }) => {
    const [errorMsg, setErrorMsg] = useState("")

    const showAllCourses = async (e) => {
        try {
            const response = await api.get("/get_all_courses_list")
            setCoursesList(response.data)
            console.log(response.data)
        } catch (error) {
            const msg = error.response?.data?.detail || "Failed to fetch Courses"
            setErrorMsg(msg)
        }
    }

    return (
        <>
            <div className="show-all-students-list">
                <p className="descripton">click On Show All Students Button to Get All Students List </p>
                <button type="click" className="show-student-details-button" onClick={showAllCourses}>
                    Show All Courses
                </button>
                <p className="error-msg">{errorMsg}</p>
            </div>
        </>
    )
}

export default AllCourses;




