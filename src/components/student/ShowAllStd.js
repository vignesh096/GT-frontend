import React, { useState, useContext, useEffect } from "react";
import { StudentContext } from "../../context/student/studentContext";
import "./std.css";
import AllStdEdit from "../card/AllStdEdit";
const ShowAllStd = () => {
  const context = useContext(StudentContext);
  const { AllStudent } = context;
  const [students, setstudents] = useState([]);
  const fetchStudents = async () => {
    let stds = await AllStudent();
    setstudents(stds);
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <div className="allstudent__container">
      {students.map((std) => (
        // <Card
        //   key={std.rollnumber}
        //   title={`${std.name.fname} ${std.name.mname} ${std.name.lname}`}
        // />
        <AllStdEdit key={std.rollnumber} std={std} />
      ))}
    </div>
  );
};

export default ShowAllStd;
