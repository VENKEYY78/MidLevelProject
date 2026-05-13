import { jwtDecode } from 'jwt-decode';

import { Navigate } from "react-router-dom";


import { useState } from 'react';

import AddEnrollments from './AddEnrollments';
import GetAllEnrollments from './GetAllEnrollments';
import GetStudentsEnrolledCourses from './GetStudentEnrolledCourses';

import './index.css'



const EnrollmentPage = () => {
    const [selectedOperation, setSelectedOperation] = useState("add")
    const [enrollmentDetails, setEnrollmentDetails] = useState(null)
    const [allEnrollmentDetails, setAllEnrollmentDetails] = useState(null)
    const [studentEnrollmentDetails, setStudentEnrollmentDetails] = useState(null)

    const token = localStorage.getItem("token")
    const decode = jwtDecode(token)
    const currentTime = Date.now() / 1000
    if (decode.exp < currentTime) {
        localStorage.removeItem("token")
        return <Navigate to="/login" />
    }

    return (
        <>
            <div className='students-page-main-bg-container'>
                <div className="user-details">
                    <h1>User Name : {decode.username}</h1>
                    <h1>User Role : {decode.role}</h1>
                </div>
                <div className="all-oprations-container">
                    <div className="access-oprations-container">
                        <div className="add-new-student-container" onClick={() => { setSelectedOperation("add"); }}>
                            <h1>Add Enrollment</h1>
                        </div>
                        <div className="get-all-students-container" onClick={() => { setSelectedOperation("all"); }}>
                            <h1>Show All Enrollments</h1>
                        </div>
                        <div className="get-single-student-container" onClick={() => { setSelectedOperation("getById"); }}>
                            <h1>Get Student Enrollments</h1>
                        </div>
                    </div>
                </div>
                <div className="sending-details-and-success-msg-main-container">
                    <div className="sending-details-continer">
                        {selectedOperation === "add" &&
                            <AddEnrollments setEnrollmentDetails={setEnrollmentDetails} />
                        }
                        {selectedOperation === "all" && (
                            <GetAllEnrollments setAllEnrollmentDetails={setAllEnrollmentDetails} />
                        )}
                        {selectedOperation === "getById" && (
                            <GetStudentsEnrolledCourses setStudentEnrollmentDetails={setStudentEnrollmentDetails} />
                        )}
                    </div>

                    <div className="show-success-details-container">
                        {enrollmentDetails && (
                            <div className="delete-student-success-container">
                                <h1 className="success-msg">{enrollmentDetails.Message}</h1>
                            </div>
                        )}

                        {allEnrollmentDetails && (
                            <ul className='students-list-container'>
                                {allEnrollmentDetails?.["Enrollment List"]?.map(enrollment => (
                                    <li className='student-card' key={enrollment.id} >
                                        <p>Enrollment ID : {enrollment.id}</p>
                                        <p>Student ID : {enrollment.student_id}</p>
                                        <p>Course ID : {enrollment.course_id}</p>
                                        <p>Enrolled At : {enrollment.enrolled_at}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {studentEnrollmentDetails && (
                            <ul className='students-list-container'>
                                {studentEnrollmentDetails?.["Courses Data"]?.map(course => (
                                    <li className='student-card' key={course.id} >
                                        <p>Course ID : {course.id}</p>
                                        <p> Course Name : {course.course_title} </p>
                                        <p> Description : {course.description} </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

        </>

    )
}
export default EnrollmentPage;