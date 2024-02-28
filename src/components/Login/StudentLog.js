import React, { useContext, useState } from "react";
import { StudentContext } from "../../context/student/studentContext";
const StudentLog = () => {
  const data = useContext(StudentContext);
  const { studentInfo } = data;
  const [rollnumber, setrollnumber] = useState("");
  async function checkStudent() {
    try {
      let std = await studentInfo(rollnumber);
      if (typeof std === "object") {
        window.location.href = `/growthtracker/${rollnumber}`;
      } else {
        alert("Wrong Rollnumber");
      }
    } catch (error) {
      alert("Wrong Rollnumber");
      console.error("Student login error ", error);
    }
  }

  return (
    <>
      <div className="login-form">
        <form className="form" onChange={(e) => e.preventDefault()}>
          <h1 className="form__title">Student Login</h1>
          <div className="form__div">
            <input
              className="form__input"
              name="rollnumber"
              value={rollnumber}
              onChange={(e) => setrollnumber(e.target.value)}
              type="number"
              required
              placeholder=""
            />
            <label className="form__label" htmlFor="">
              Roll Number
            </label>
          </div>

          <div className="form-btn-container">
            <button
              className="form__button"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                checkStudent();
              }}
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

export default StudentLog;
