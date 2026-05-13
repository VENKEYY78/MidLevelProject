from pydantic import BaseModel , Field , EmailStr
from typing import Literal 


class Students(BaseModel):
    name : str = Field(..., min_length=3)
    age : int = Field(...)
    course : Literal["MECH","EEE","CSE","CIVIL","ECE"] = Field(...)
    email : EmailStr

class Courses(BaseModel):
    course_title : str = Field(...)
    description : str = Field(...,)
    
    
class Users(BaseModel):
    username: str = Field(...)
    password : str = Field(...)
    email : EmailStr
    role : Literal["admin","student"] = Field(...)

class Enrollment(BaseModel):
    student_id : int = Field(...)
    course_id : int = Field(...)
