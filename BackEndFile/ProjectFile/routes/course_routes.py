from fastapi import APIRouter , HTTPException , status , Depends
from models import Courses
from database import get_connection
from utils.hashing import oauth2_scheme , verify_token


router = APIRouter()


@router.post("/add_new_course")
def adding_new_course(course:Courses , token : str=Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database Connection Was Failed")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED , detail="Invalid Token or Token Expired")
    role = payload.get("role")
    if role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied! Admin Only")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO courses (course_title , description) VALUES (%s , %s)",(course.course_title , course.description)
        )
    conn.commit()
    cursor.close()
    conn.close()
    return {"Message":"Course Added Successfully" , "Added Course": {
        "Course Title" : course.course_title,
        "Coursr Description": course.description
    }}



@router.get("/get_all_courses_list")
def get_all_courses_list(token : str = Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn :
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail="Database Connection Was Failed")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token or Token Expired")
    cursor = conn.cursor(dictionary=True)
    role = payload.get("role")
    if (role == "admin") or (role == "student"):
        cursor.execute(
            "SELECT * FROM courses"
        )
    courses_list = cursor.fetchall()
    if not courses_list :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Courses Table Was Empty")
    cursor.close()
    conn.close()
    return {"Message" : "Courses List Fetched Successfully", "Courses" : courses_list}


@router.get("/get_single_course/{course_id}")
def get_single_course(course_id : int , token : str = Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database Connection Failed")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token or Token Expired")
    role = payload.get("role")
    token_email = payload.get("sub")
    cursor = conn.cursor(dictionary=True)
    if (role == "admin") or (role == "student"):
        cursor.execute(
            "SELECT * FROM courses WHERE id = %s" , (course_id,)
        )
    
    course_details = cursor.fetchone()
    if not course_details:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Coruse Not Found Given Course ID")
    cursor.close()
    conn.close()
    return {"Message" : "Course Detailes Fetched Successfully" , "Course_Details" : course_details}


@router.put("/update_course_details/{course_id}")
def update_course_details(course_id : int , course : Courses , token : str = Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database Connection Failed")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED , detail="Invalid Token or Token Expired")
    role = payload.get("role")
    if role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied! Admin Only")
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE courses SET course_title = %s , description = %s WHERE id = %s",(course.course_title ,  course.description , course_id)
    )
    conn.commit()
    if cursor.rowcount == 0 :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND , detail="Course Not Found For Given ID")
    cursor.close()
    conn.close()
    return {"Message" : "Course Details Updated Successfully" ,
             "Updated Details" : {
        "Course Title" : course.course_title,
        "Course Description" : course.description
    }}



@router.delete("/detele_course/{course_id}")
def delete_course(course_id : int , token : str = Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn :
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database Connection Failed")
    payload = verify_token(token)
    if not payload :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED , detail="Invalid Token or Token Expired")
    role = payload.get("role")
    if role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied! Admin Only")
    cursor = conn.cursor()
    cursor.execute(
        "DELETE FROM courses WHERE id = %s",(course_id,)
    )
    conn.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course Not Found For Given ID")
    cursor.close()
    conn.close()
    return {"Message": "Course Deleted Successfully" , "Deleted Course ID" : course_id}




