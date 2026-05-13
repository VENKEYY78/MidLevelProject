import { useState } from "react";

import { Navigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode"

import api from "../../services/api";


import './index.css'

const StudentsPage = () => {
    const token = localStorage.getItem("token")
    const decode = jwtDecode(token)
    const currentTime = Date.now() / 1000

    if (decode.exp < currentTime) {
        localStorage.removeItem('token')
        return <Navigate to="/login" />
    }

    const [selectedOperation, setSelectedOperation] = useState("add")
    const [name, setUsername] = useState("")
    const [age, setAge] = useState("")
    const [course, setCourse] = useState("MECH")
    const [email, setEmail] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [successData, setSuccessData] = useState(null)
    const [studentsList, setStudentsList] = useState(null)
    const [id, setId] = useState("")
    const [studentDetailsByID, setStudentDetailsByID] = useState("")
    const [singleStudentDetails, setSingleStudentDetails] = useState(null)
    const [deleteId, setDeleteId] = useState("")
    const [deleteStudentInformation, setDeleteStudentInformation] = useState(null)
    const [updateId, setUpdateId] = useState("")
    const [updateDetails, setUpdateDetails] = useState(null)



    const onChangeUpdateMailID = (e) => {
        setEmail(e.target.value);
    }

    const onChangeUpdateCourse = (e) => {
        setCourse(e.target.value);
    }

    const onChangeUpdateAge = (e) => {
        setAge(e.target.value);
    }

    const onChangeUpdateUserName = (e) => {
        setUsername(e.target.value);
    }

    const onChangeUserName = (e) => {
        setUsername(e.target.value);
    };

    const onChangeAge = (e) => {
        setAge(e.target.value);
    };

    const onChangeMailID = (e) => {
        setEmail(e.target.value);
    };

    const onChangeCourse = (e) => {
        setCourse(e.target.value);
    };

    const onChangeID = (e) => {
        setId(e.target.value)
    }

    const onChangeUpdateID = (e) => {
        setUpdateId(e.target.value);
    }

    const AddStudentDetails = async (e) => {
        e.preventDefault();
        const AddStudent = {
            name,
            age: parseInt(age),
            course,
            email,
        };
        console.log(AddStudent)

        try {
            const response = await api.post("/add_new_student", AddStudent)
            setUsername("");
            setAge("");
            setEmail("");
            setSuccessData(response.data)
        } catch (error) {
            const msg = error.response?.data?.detail || "Faild to Add Student";
            setErrorMsg(msg);
        }

    }

    const updateStudentForm = async (e) => {
        e.preventDefault()

        if (!updateId) {
            setErrorMsg("Please enter an ID");
            return;
        }
        setUpdateId("")
        const UpdateDetails = {
            name,
            age,
            course,
            email,
        };


        try {
            const response = await api.put(`/update_student_details/${updateId}`, UpdateDetails)
            setUpdateDetails(response.data)
            setUsername("")
            setAge("")
            setCourse("")
            setEmail("")
            console.log(response.data)
        } catch (error) {
            const msg = error.response?.data?.detail || "Failed to Update students Details"
            setErrorMsg(msg)
        }
    }


    const showAllStudentsList = async (e) => {
        try {
            const response = await api.get("/get_all_students_list")
            setStudentsList(response.data)
            console.log(response.data)
        } catch (error) {
            const msg = error.response?.data?.detail || "Failed to fetch students Details"
            setErrorMsg(msg)
        }
    }

    const showStudentsInformation = async (e) => {
        e.preventDefault()
        if (!id) {
            setErrorMsg("Please enter an ID");
            return;
        }

        try {
            const response = await api.get(`/get_single_student_detials/${id}`)
            setSingleStudentDetails(response.data)
            setId("")
            console.log(response.data)
            console.log(typeof (response.data))
        } catch (error) {
            const msg = error.response?.data?.detail || "Failed to fetch student Details"
            setErrorMsg(msg)
        }

    }


    const onChangeDeleteID = (e) => {
        setDeleteId(e.target.value)
    }


    const handleDeleteStudent = async (e) => {
        e.preventDefault()
        if (!deleteId) {
            setErrorMsg("Please Enter Valid ID")
            return;
        }
        console.log(deleteId)
        try {
            const response = await api.delete(`/delete_student_details/${deleteId}`)
            setDeleteStudentInformation(response.data)
            setDeleteId("")
            console.log(response.data)
        } catch (error) {
            const msg = error.response?.data?.detail || "Failed To Delete Student"
            setErrorMsg(msg)
        }
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
                        <div className="add-new-student-container" onClick={() => { setSelectedOperation("add"); setSuccessData(null); setStudentsList(null); }}>
                            <h1>Add Students</h1>
                        </div>
                        <div className="get-all-students-container" onClick={() => { setSelectedOperation("all"); setSuccessData(null); }}>
                            <h1>Show All Students</h1>
                        </div>
                        <div className="get-single-student-container" onClick={() => { setSelectedOperation("getById"); setSuccessData(null); }}>
                            <h1>Student Details By ID</h1>
                        </div>
                        <div className="update-student-details-container" onClick={() => { setSelectedOperation("update"); setSuccessData(null); }}>
                            <h1>Update Student By ID</h1>
                        </div>

                        <div className="delete-student-container" onClick={() => { setSelectedOperation("delete"); setSuccessData(null); }}>
                            <h1>Delete Student By ID</h1>
                        </div>
                    </div>
                </div>
                <div className="sending-details-and-success-msg-main-container">
                    <div className="sending-details-continer">
                        {selectedOperation === "add" &&
                            <div className="adding-student-main-bgcontainer">
                                <form className="add-student-form-container" onSubmit={AddStudentDetails}>
                                    <div className="user-name-container">
                                        <label className="User-name-label" htmlFor="Username">
                                            Enter User Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="User Full Name"
                                            className="input-user-name"
                                            id="Username"
                                            value={name}
                                            onChange={onChangeUserName}
                                        />
                                    </div>
                                    <div className="mail-container">
                                        <label className="mail-label" htmlFor="age">Student Age</label>
                                        <input
                                            type="number"
                                            placeholder="Enter Student Age"
                                            className="input-email-id"
                                            id="age"
                                            value={age}
                                            onChange={onChangeAge}
                                        />
                                    </div>
                                    <div className="select-role-container">
                                        <label className="label-select-role" htmlFor="selectrole">Select Course</label>
                                        <select
                                            className="select-container"
                                            id="selectrole"
                                            value={course}
                                            onChange={onChangeCourse}
                                        >
                                            <option className="option" value="MECH">MECH</option>
                                            <option className="option" value="EEE">EEE</option>
                                            <option className="option" value="CSE">CSE</option>
                                            <option className="option" value="CIVIL">CIVIL</option>
                                            <option className="option" value="ECE">ECE</option>

                                        </select>
                                    </div>
                                    <div className="mail-container">
                                        <label className="mail-label" htmlFor="email">Enter Mail ID</label>
                                        <input
                                            type="text"
                                            placeholder="Enter User Mail ID"
                                            className="input-email-id"
                                            id="email"
                                            value={email}
                                            onChange={onChangeMailID}
                                        />
                                    </div>
                                    <p className="error-msg">{errorMsg}</p>
                                    <div className="add-student-submet-button">
                                        <button type="submit" className="sign-in-button">Add Student</button>
                                    </div>
                                </form>
                            </div>
                        }

                        {selectedOperation === "all" &&
                            <div className="show-all-students-list">
                                <p className="descripton">click On Show All Students Button to Get All Students List </p>
                                <button type="click" className="show-student-details-button" onClick={showAllStudentsList}>
                                    Show All Students
                                </button>
                                <p className="error-msg">{errorMsg}</p>
                            </div>
                        }
                        {selectedOperation === "getById" &&
                            <div className="get-student-details-by-id">
                                <p className="get-single-student-details-description">Enter a unique Student ID below to retrieve specific profile information.</p>
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
                                <button type="click" className="show-student-details-button" onClick={showStudentsInformation}>
                                    Show Student Details
                                </button>
                                <p className="error-msg">{errorMsg}</p>
                            </div>
                        }
                        {selectedOperation === "update" &&
                            <>
                                <div className="update-student-details-by-id">
                                    <form className="update-form-container" onSubmit={updateStudentForm}>
                                        <div className="update-student-id-container">
                                            <label className="label-id-input" htmlFor="id">Student ID</label>
                                            <input
                                                type="number"
                                                placeholder="Enter Student ID"
                                                className="input-id"
                                                id="id"
                                                value={updateId}
                                                onChange={onChangeUpdateID}
                                            />
                                        </div>
                                        <div className="user-name-container">
                                            <label className="User-name-label" htmlFor="updateUsername">
                                                Enter User Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="User Full Name"
                                                className="input-user-name"
                                                id="updateUsername"
                                                value={name}
                                                onChange={onChangeUpdateUserName}
                                            />
                                        </div>
                                        <div className="mail-container">
                                            <label className="mail-label" htmlFor="age">Update Student Age</label>
                                            <input
                                                type="number"
                                                placeholder="Enter Student Age"
                                                className="input-email-id"
                                                id="age"
                                                value={age}
                                                onChange={onChangeUpdateAge}
                                            />
                                        </div>
                                        <div className="select-role-container">
                                            <label className="label-select-role" htmlFor="selectrole">Update Course</label>
                                            <select
                                                className="select-container"
                                                id="selectrole"
                                                value={course}
                                                onChange={onChangeUpdateCourse}
                                            >
                                                <option className="option" value="MECH">MECH</option>
                                                <option className="option" value="EEE">EEE</option>
                                                <option className="option" value="CSE">CSE</option>
                                                <option className="option" value="CIVIL">CIVIL</option>
                                                <option className="option" value="ECE">ECE</option>

                                            </select>
                                        </div>
                                        <div className="mail-container">
                                            <label className="mail-label" htmlFor="email">Update Mail ID</label>
                                            <input
                                                type="text"
                                                placeholder="Enter User Mail ID"
                                                className="input-email-id"
                                                id="email"
                                                value={email}
                                                onChange={onChangeUpdateMailID}
                                            />
                                        </div>
                                        <div className="add-student-submet-button">
                                            <button type="submit" className="sign-in-button">Update Student Details</button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        }

                        {selectedOperation === "delete" &&
                            <div className="get-student-details-by-id">
                                <p className="get-single-student-details-description">Enter a unique Student ID below to retrieve specific profile information.</p>
                                <div className="student-id-container">
                                    <label className="label-id-input" htmlFor="id">Student ID</label>
                                    <input
                                        type="number"
                                        placeholder="Enter Student ID"
                                        className="input-id"
                                        id="id"
                                        value={deleteId}
                                        onChange={onChangeDeleteID}
                                    />
                                </div>
                                <button type="click" className="show-student-details-button" onClick={handleDeleteStudent}>
                                    Delete Student Details
                                </button>
                                <p className="error-msg">{errorMsg}</p>
                            </div>

                        }
                    </div>

                    <div className="show-success-details-container">
                        {successData && (
                            <div>
                                <p className="success-message">{successData.message}</p>
                                <p className="success">Name : {successData["Student Details"]["Student Name"]}</p>
                                <p className="success">Age : {successData["Student Details"]["Student Age"]}</p>
                                <p className="success">Course : {successData["Student Details"]["Student Course"]}</p>
                                <p className="success">Email : {successData["Student Details"]["Student Email"]}</p>
                            </div>
                        )}

                        <ul className="students-list-container">
                            {studentsList && studentsList["Students List"].map(student => (
                                <li className="student-card" key={student.id}>
                                    <p>Name: {student.name}</p>
                                    <p>Age: {student.age}</p>
                                    <p>Course: {student.course}</p>
                                    <p>Email: {student.Email}</p>
                                </li>
                            ))}
                        </ul>

                        {singleStudentDetails && (
                            <div className="details-content">
                                <h1 className="success-msg">{singleStudentDetails.Message}</h1>
                                <p><strong>ID:</strong> {singleStudentDetails.Student.id}</p>
                                <p><strong>Name:</strong> {singleStudentDetails.Student.name}</p>
                                <p><strong>Age:</strong> {singleStudentDetails.Student.age}</p>
                                <p><strong>Course:</strong> {singleStudentDetails.Student.course}</p>
                                <p><strong>Email:</strong> {singleStudentDetails.Student.Email}</p>
                            </div>
                        )}

                        {updateDetails && (
                            <div className="delete-student-success-container">
                                <h1 className="success-msg">{updateDetails.Message}</h1>
                            </div>
                        )}

                        {deleteStudentInformation && (
                            <div className="delete-student-success-container">
                                <h1 className="success-msg">{deleteStudentInformation.Message}</h1>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>

    )
}

export default StudentsPage;




