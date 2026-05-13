from fastapi import APIRouter , HTTPException , status , Depends
from models import Students
from database import get_connection
from utils.hashing import oauth2_scheme , verify_token





router = APIRouter()


@router.post("/add_new_student")
def add_new_students(student:Students, token: str=Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database Connection Was Failed")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token or Token Expired")
    role = payload.get("role")
    if role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Access Denied! Admin Only")
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM students WHERE email = %s",(student.email,)
    )
    existing_student = cursor.fetchone()
    if existing_student:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User Already Exists")
    cursor.execute(
        "INSERT INTO students (name,age,course,email) VALUES (%s,%s,%s,%s)",
        (student.name , student.age , student.course , student.email)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {
        "message":"Student Details Added Successfully",
        "Student Details" : {
            "Student Name": student.name,
            "Student Age" : student.age,
            "Student Course": student.course,
            "Student Email":student.email
        }
    }


@router.get("/get_all_students_list")
def getting_all_students(token : str=Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database Connection Was Failed")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token or Token Expired")
    role = payload.get("role")
    if role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Access Denied! Admin Only")
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "SELECT * FROM students"
    )
    Students_List = cursor.fetchall()
    if not Students_List :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Students Table Was Empty")
    cursor.close()
    conn.close()
    return {
        "Message": "Students List Fetched Successfully",
        "Students List": Students_List
    }


@router.get("/get_single_student_detials/{student_id}")
def getting_single_student_details(student_id:int, token : str=Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Database Connection Failed")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalied Token OR Token Expired")
    role = payload.get("role")
    token_eamil = payload.get("sub")
    cursor = conn.cursor(dictionary=True)
    if role == "admin":
        cursor.execute(
            "SELECT * FROM students WHERE id = %s", (student_id,)
        )
    elif role == "student":
        cursor.execute(
            "SELECT * FROM students WHERE id = %s AND email = %s",(student_id, token_eamil )
        )
       
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN , detail="")
    
    student_details = cursor.fetchone()
    if not student_details:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    cursor.close()
    conn.close()

    return {"Message":"Student Details Fetched Successfully" , "Student": student_details}



@router.put("/update_student_details/{student_id}")
def update_student_details(student_id:int , student : Students , token : str = Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Database Connection Failed")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="401")
    role = payload.get("role")
    token_email = payload.get("sub")
    cursor = conn.cursor()
    if role == "admin":
        cursor.execute(
            "UPDATE students SET name = %s , age=%s , course=%s , email=%s WHERE id = %s",
            (student.name , student.age , student.course , student.email , student_id)
        )
    elif role == "student":
        cursor.execute(
            "UPDATE students SET name = %s , age = %s , course = %s , email = %s WHERE id = %s AND email = %s",
            (student.name , student.age , student.course , student.email , student_id , token_email)
        )
    else:
        raise  HTTPException(status_code=status.HTTP_403_FORBIDDEN , detail="403")
    conn.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404 , detail="No student found with given ID")
    cursor.close()
    conn.close()
    return {"Message":"Student Details Updated Successfully"}



@router.delete("/delete_student_details/{student_id}")
def remove_student_details(student_id : int , token : str = Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn :
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database Connection Failed")
    
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid Token or Token Expired")
    role = payload.get("role")
    if role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied! Admin Only")
    cursor = conn.cursor()
    cursor.execute(
        "DELETE FROM students WHERE id = %s",(student_id,)
    )
    conn.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404 , detail="No student found with given ID")
    cursor.close()
    conn.close()
    return {"Message" : "Student Deleted Successfully", "Deleted Student ID" : student_id}
    

