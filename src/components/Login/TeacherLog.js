import React, { useContext, useState } from "react";
import "../componet.css";
import { TeacherContext } from "../../context/teachers/teacherContext";

const TeacherLog = () => {
  const { verifyTeacher } = useContext(TeacherContext);

  const checkTeacher = async () => {
    verifyTeacher({ staffID, password });
  };
  const [staffID, setstaffID] = useState("");
  const [password, setpassword] = useState("");

  function handleTeacherForm() {}
  return (
    <>
      <div className="login-form">
        <form
          className="form"
          onClick={(e) => {
            e.preventDefault();
            handleTeacherForm();
          }}
        >
          <h1 className="form__title">Teacher Login</h1>
          <div className="form__div">
            <input
              className="form__input"
              name="fname"
              type="text"
              placeholder=""
              value={staffID}
              onChange={(e) => {
                setstaffID(e.target.value);
              }}
              required
            />
            <label className="form__label" htmlFor="">
              Staff ID
            </label>
          </div>
          <div className="form__div">
            <input
              className="form__input"
              name="fname"
              type="password"
              placeholder=""
              required
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <label className="form__label" htmlFor="">
              Password
            </label>
          </div>

          <div className="form-btn-container">
            <button
              className="form__button"
              type="submit"
              onClick={checkTeacher}
            >
              Submit
            </button>
            <button className="form__button" type="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TeacherLog;
