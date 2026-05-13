**All Routes Access List:** 😊

---

**User Routes:**
| Endpoint | Access |
|----------|--------|
| POST /register_user | Public |
| POST /login | Public |

---

**Student Routes:**
| Endpoint | Access |
|----------|--------|
| POST /add_new_student | Admin only |
| GET /get_all_students_list | Admin only |
| GET /get_single_student_details/{id} | Admin + Same Student |
| PUT /update_student_details/{id} | Admin |
| DELETE /delete_student_details/{id} | Admin only |

---

**Course Routes:**
| Endpoint | Access |
|----------|--------|
| POST /add_new_course | Admin only |
| GET /get_all_courses_list | Admin + Student |
| GET /get_single_course/{id} | Admin + Student |
| PUT /update_course_details/{id} | Admin only |
| DELETE /delete_course/{id} | Admin only |

---

**Enrollment Routes:**
| Endpoint | Access |
|----------|--------|
| POST /add_enrollment/{student_id}/{course_id} | Admin + Student |
| GET /students/{id}/courses | Admin + Same Student |

| GET /get_all_enrollments | Admin only |

---

All correct గా implement అయ్యాయా? 😊💪