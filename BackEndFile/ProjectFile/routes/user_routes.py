from fastapi import APIRouter , HTTPException , status
from models import Users
from database import get_connection
from auth import hash_password , verify_password
from utils.hashing import create_access_token




"""
username: str = Field(...)
password : str = Field(...)
email : EmailStr
role : Literal["admin","student"] = Field(...)
"""


router = APIRouter()



@router.post("/register_user")
def register_admin_or_student(user:Users):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database Connection Was Failed")
    cursor = conn.cursor()

    #Checking if user Already exists
    cursor.execute(
        "SELECT * FROM users WHERE email = %s", (user.email,)
    )
    existing_user = cursor.fetchone()

    # If User Already Exists Raising Error
    if existing_user:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    
    # If User Not Exists Hash The Password
    hass_password = hash_password(user.password)

    cursor.execute(
        "INSERT INTO users (username,password,email,role) VALUES (%s , %s , %s , %s)",
        (user.username , hass_password , user.email , user.role)
    )
    conn.commit()
    cursor.close()
    conn.close()

    return {"message":"User Registered Successfully" ,
             "User Details" : {
                 "username":user.username,
                 "Email":user.email,
                 "Role":user.role
             }}


@router.post("/login")
def login_user(user:Users):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database Connection Was Failed")
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "SELECT * FROM users WHERE email = %s",(user.email,)
    )
    db_user = cursor.fetchone()
    cursor.close()
    conn.close()

    # Check if user exists and password is correct
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    if db_user["role"] != user.role:
        raise HTTPException(status_code=401, detail="Invalid role")
    # Create JWT token with username
    token = create_access_token({"sub": user.email, "username": user.username, "role": db_user["role"]})
                                
    
    return {"token": token}

    

    








