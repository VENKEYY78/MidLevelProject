import { jwtDecode, } from 'jwt-decode';

import { useState } from 'react';

import { Navigate } from "react-router-dom";

import AddCourse from './AddCourse';
import AllCourses from './AllCourses';
import CourseById from './CourseById';
import DeleteCourse from './DeleteCourse';
import UpdateCourse from './UpdateCourse';

import './index.css'



const Courses = () => {



    const token = localStorage.getItem("token")
    const decode = jwtDecode(token)
    const currentTime = Date.now() / 1000

    if (decode.exp < currentTime) {
        localStorage.removeItem("token")
        return <Navigate to="/login" />
    }

    const [selectedOperation, setSelectedOperation] = useState("add");
    const [addCourseSuccessData, setAddCourseSuccessData] = useState(null);
    const [coursesList, setCoursesList] = useState(null)
    const [courseCourseDetailsById, setCourseDetailsById] = useState(null)
    const [deleteCourseInformation, setDeleteCourseInformation] = useState(null)
    const [courseUpdatedDetails, setCourseUpdatedDetails] = useState(null)

    return (
        <>
            <div className='students-page-main-bg-container'>
                <div className="user-details">
                    <h1>User Name : {decode.username}</h1>
                    <h1>User Role : {decode.role}</h1>
                </div>

                <div className="all-oprations-container">
                    <div className="access-oprations-container">
                        <div className="add-new-student-container" onClick={() => { setSelectedOperation("add"); setAddCourseSuccessData(null); }}>
                            <h1>Add Courses</h1>
                        </div>
                        <div className="get-all-students-container" onClick={() => { setSelectedOperation("all"); }}>
                            <h1>Show All Courses</h1>
                        </div>
                        <div className="get-single-student-container" onClick={() => { setSelectedOperation("getById"); }}>
                            <h1>Get Course By ID</h1>
                        </div>
                        <div className="update-student-details-container" onClick={() => { setSelectedOperation("update"); }}>
                            <h1>Update Course By ID</h1>
                        </div>
                        <div className="delete-student-container" onClick={() => { setSelectedOperation("delete"); }}>
                            <h1>Delete Course By ID</h1>
                        </div>
                    </div>
                </div>
                <div className="sending-details-and-success-msg-main-container">
                    <div className="sending-details-continer">
                        {selectedOperation === "add" && (
                            <AddCourse setAddCourseSuccessData={setAddCourseSuccessData} />
                        )}
                        {selectedOperation === "all" && (
                            <AllCourses setCoursesList={setCoursesList} />
                        )}

                        {selectedOperation === "getById" && (
                            <CourseById setCourseDetailsById={setCourseDetailsById} />
                        )}
                        {selectedOperation === "update" && (
                            <UpdateCourse setCourseUpdatedDetails={setCourseUpdatedDetails} />
                        )}
                        {selectedOperation === "delete" && (
                            <DeleteCourse setDeleteCourseInformation={setDeleteCourseInformation} />
                        )}
                    </div>

                    <div className="show-success-details-container">
                        {addCourseSuccessData && (
                            <div className='delete-student-success-container'>
                                <h1 className='success-mg'>{addCourseSuccessData.Message}</h1>
                            </div>
                        )}
                        <ul className='students-list-container'>
                            {coursesList?.Courses?.map(course => (
                                <li className='student-card' key={course.id}>
                                    <p>Course ID : {course.id}</p>
                                    <p>Course Name : {course.course_title}</p>
                                    <p>Description : {course.description}</p>
                                </li>
                            ))}
                        </ul>

                        {courseCourseDetailsById && (
                            <div className="details-content">
                                <h1 className="success-msg">{courseCourseDetailsById.Message}</h1>
                                <p>Course ID: {courseCourseDetailsById.Course_Details.id}</p>
                                <p>Course Name: {courseCourseDetailsById.Course_Details.course_title}</p>
                                <p>Description: {courseCourseDetailsById.Course_Details.description}</p>
                            </div>
                        )}

                        {courseUpdatedDetails && (
                            <div className="delete-student-success-container">
                                <h1 className="success-msg">{courseUpdatedDetails.Message}</h1>
                            </div>
                        )}

                        {deleteCourseInformation && (
                            <div className="delete-student-success-container">
                                <h1 className="success-msg">{deleteCourseInformation.Message}</h1>
                            </div>
                        )}

                    </div>
                </div>

            </div>

        </>
    )
}

export default Courses;

/*

 
                        
                        

                       
                        */