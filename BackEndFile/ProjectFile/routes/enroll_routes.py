from fastapi import APIRouter , HTTPException , status , Depends
from models import Enrollment
from database import get_connection
from utils.hashing import oauth2_scheme , verify_token
from datetime import datetime


router = APIRouter()



@router.post("/add_enrollment/{student_id}/{course_id}")
def add_enrollment(student_id :int , course_id :int, token : str = Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Database Connection Failed")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED , detail="Invalid Token or Token Expired")
    roll = payload.get("role")
    cursor = conn.cursor()

    if ( roll == "admin") :
        # check course existing
        cursor.execute(
            "SELECT * FROM courses WHERE id = %s",(course_id,)
        )
        existing_course = cursor.fetchone()
        if not existing_course:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND , detail="Course Was Not Found In Given ID")
        # existing course check complete

        #check existing student
        cursor.execute(
            "select * FROM students WHERE id = %s", (student_id,)
        )
        existing_student = cursor.fetchone()
        if not existing_student:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND , detail="Student Was Not Found In Given ID")
        # existing student check complete

        cursor.execute(
            "SELECT * FROM enrollments WHERE student_id = %s AND course_id = %s",(student_id,course_id)
        )
        student_already_enroll = cursor.fetchone()
        if student_already_enroll:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Student Already Enroll This Course")
        else:
            cursor.execute(
                "INSERT INTO enrollments (student_id , course_id) VALUES (%s,%s)",
                (student_id , course_id)
            )
    elif (roll == "student"):
        # check existing student
        cursor.execute(
            "select * FROM students WHERE id = %s", (student_id,)
        )
        existing_student = cursor.fetchone()
        if not existing_student:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND , detail="Student Not Found For Given ID")
        
        #check existing course
        cursor.execute(
            "SELECT * FROM courses WHERE id = %s",(course_id,)
        )
        existing_course = cursor.fetchone()
        if not existing_course:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Course Not Found For Given ID")
        
        #check student already enrolled with same course
        cursor.execute(
            "SELECT * FROM enrollments WHERE student_id = %s AND course_id = %s",(student_id,course_id)
        )
        student_already_enroll = cursor.fetchone()
        if student_already_enroll:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Student Already Enroll This Course")

        cursor.execute(
            "INSERT INTO enrollments (student_id , course_id) VALUES (%s,%s)",
            (student_id , course_id)
        )


    conn.commit()
    cursor.close()
    conn.close()
    return {"Message":"Student Enrolled Course Successfully" }
     

@router.get("/get_all_enrollments")
def get_all_enrollments(token : str = Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database Connection Failed")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid Token or Token Expired")
    role = payload.get("role")
    if role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Access Denied! Admin Only")
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "SELECT * FROM enrollments"
    )
    enrollment_list = cursor.fetchall()
    if not enrollment_list:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND , detail="Enrollments Not Found")
    cursor.close()
    conn.close()
    return {"Message":"Enrollments Fetched Successfully", "Enrollment List" : enrollment_list}



@router.get("/students/{student_id}/courses")
def get_student_enrolled_courses(student_id:int , token : str = Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Database Connection Failed")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED , detail="Invalid Token or Token Expired")
    role = payload.get("role")
    token_email = payload.get("sub")

    cursor = conn.cursor(dictionary=True)
    if (role == "admin"):
        cursor.execute(
            "SELECT courses.* FROM courses JOIN enrollments ON courses.id = enrollments.course_id WHERE enrollments.student_id = %s",(student_id,)
        )
    elif (role == "student"):
        cursor.execute(
            "SELECT email FROM students WHERE id = %s",(student_id,)
        )
        student_eamil = cursor.fetchone()
        if not student_eamil :
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Student Not Found For Given ID")
        if (token_email == student_eamil["email"]):
            cursor.execute(
            "SELECT courses.* FROM courses JOIN enrollments ON courses.id = enrollments.course_id WHERE enrollments.student_id = %s",(student_id,)
            )
        else:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied! Same Student and Admin Can Access")
    student_enrollments = cursor.fetchall()
    if not student_enrollments:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student Not Enrolled Any Course")
    
    cursor.close()
    conn.close()
    return {"Message" : "Student Enrollments Fetched Successfully", "Courses Data": student_enrollments}

    

