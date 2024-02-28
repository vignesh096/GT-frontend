import React from "react";
import { Route, Routes } from "react-router-dom";
import { StudentLog, TeacherLog } from "../components";
import { StudentState } from "../context/student/studentContext";
import { TeacherState } from "../context/teachers/teacherContext";
const LoginRoute = () => {
  return (
    <TeacherState>
      <StudentState>
        <Routes>
          <Route path="teacher" element={<TeacherLog />} />
          <Route path="student" element={<StudentLog />} />
        </Routes>
      </StudentState>
    </TeacherState>
  );
};

export default LoginRoute;
