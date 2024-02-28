import { createContext } from "react";

const TeacherContext = createContext();

// const url = "";

const TeacherState = (props) => {
  async function verifyTeacher(teacher) {
    console.log("verifyTeacher is called");
    try {
      const respon = await fetch("http://localhost:5000/api/teacher/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: teacher.staffID,
          password: teacher.password,
        }),
      });
      // .then((res) => res.json)
      // .then((data) => console.log(data));
      try {
        const tokenOBJ = await respon.json();
        const token = tokenOBJ.token;
        if (!token) {
          alert("Login unsuccessful");
          localStorage.removeItem("token");
        } else {
          alert("Login successful");
          localStorage.setItem("token", token);
          window.location.href = "/";
        }
      } catch (error) {
        alert("Login unsuccessful");
        localStorage.removeItem("token");
        console.log(error);
      }
      // console.log(data[0].name);
    } catch (erro) {
      console.log(erro);
    }
  }

  return (
    <TeacherContext.Provider value={{ verifyTeacher, msg: "Hi" }}>
      {props.children}
    </TeacherContext.Provider>
  );
};

export { TeacherContext, TeacherState };
