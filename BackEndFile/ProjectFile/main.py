from fastapi import FastAPI # pip install fastapi uvicorn
from routes.user_routes import router as  user_routes
from routes.student_routes import router as student_routes
from routes.course_routes import router as course_routes
from routes.enroll_routes import router as enroll_routes

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(debug=True)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_routes) 
app.include_router(student_routes)
app.include_router(course_routes)
app.include_router(enroll_routes)