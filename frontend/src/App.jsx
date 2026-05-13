import { BrowserRouter, Routes, Route, } from "react-router-dom";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import StudentsPage from "./components/pages/StudentsPage";
import Enrollments from "./components/pages/EnrollmentPage";
import Courses from "./components/pages/CoursesPage";


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={< RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/enrollments" element={<Enrollments />} />
    </Routes>
  </BrowserRouter>
)

export default App;


