import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateStudent, ShowAllStd, StdInfo } from "../components";

import { TeacherState } from "../context/teachers/teacherContext";
import { UpdateStudent } from "../page";
const StudentRoute = () => {
  return (
    <TeacherState>
      <Routes>
        <Route path="/" exact element={<ShowAllStd />} />
        <Route path="add student" exact element={<CreateStudent />} />
        <Route path="/update/:id" exact element={<UpdateStudent />} />
        <Route path=":id" exact element={<StdInfo />} />
      </Routes>
    </TeacherState>
  );
};

export default StudentRoute;
