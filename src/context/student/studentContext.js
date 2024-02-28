import { createContext, useState } from "react";
const StudentContext = createContext();
const server = process.env.REACT_APP_SERVER_URL;

const StudentState = (props) => {
  async function AllStudent() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const respon = await fetch(`${server}api/student/byStaffID`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({}),
        });
        const student = await respon.json();

        if (!student) {
          return [];
        } else {
          return student;
        }
      } catch (error) {
        return [];
      }
    }
    return [];
  }
  async function UpdateStudent(updatedStd) {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const respon = await fetch(
          `${server}api/student/update/${updatedStd.rollnumber}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            body: JSON.stringify(updatedStd),
          }
        );
        const student = await respon.json();

        if (!student) {
          return [];
        } else {
          window.location.href = "/student";
          alert("Student Information Updated Successfuly");

          return student;
        }
      } catch (error) {
        return [];
      }
    }
    return [];
  }

  async function DelectStudent(id) {
    console.log("id is ", id);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const respon = await fetch(`${server}api/student/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });
        const student = await respon.json();

        if (!student) {
          return [];
        } else {
          alert("Student Deleted on database Successfully");
          return student;
        }
      } catch (error) {
        return [];
      }
    }
    return [];
  }

  async function AddStudent(std) {
    console.log("std is ");
    console.log(std);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const respon = await fetch(`${server}api/student/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify(std),
        });
        const student = await respon.json();

        if (!student) {
          return [];
        } else {
          console.log(student);
          alert("Student Added Successfully");
          window.location = "/student";
          return student;
        }
      } catch (error) {
        return [];
      }
    }
    return [];
  }
  async function studentInfo(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    try {
      const respon = await fetch(`${server}api/student/student/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const stdInfo = await respon.json();
      console.log("Student info is ");
      return stdInfo;
    } catch (error) {
      console.error("Error fetching student info:", error);
      throw error;
    }
  }

  const [updatedStd, setupdatedStd] = useState("1");
  const [currentGT, setcurrentGT] = useState("1");

  return (
    <StudentContext.Provider
      value={{
        AllStudent,
        updatedStd,
        setupdatedStd,
        UpdateStudent,
        DelectStudent,
        studentInfo,
        AddStudent,
        currentGT,
        setcurrentGT,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};
export { StudentContext, StudentState };
