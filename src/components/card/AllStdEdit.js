import React, { useContext } from "react";
import deleteIcon from "../../Assets/icons/delete_FILL.svg";
import editIcon from "../../Assets/icons/edit_FILL.svg";
import { Link } from "react-router-dom";
import { StudentContext } from "../../context/student/studentContext";

const AllStdEdit = (props) => {
  const context = useContext(StudentContext);
  const { setupdatedStd, DelectStudent, setcurrentGT, currentGT } = context;
  async function HandleupdatedStd() {
    const student = await props.std;
    console.log("setupdatedStudent is ");
    console.log(student);
    await setupdatedStd(student);
  }
  async function HandlcurrentGT() {
    const currentStudent = await props.std;
    setcurrentGT(currentStudent);
  }
  const { name, rollnumber } = props.std;
  const { fname, lname, mname } = name;
  async function deleteStd() {
    let str = "Are You Sure to Delete rollnumber Student";

    if (window.confirm(str)) {
      DelectStudent(rollnumber);
    }
  }

  return (
    <div className="student-row-container">
      <span className="rollnumber">{rollnumber}</span>
      <div className="std-board">
        <div className="card-info-part">
          <Link className=""
            to={`/growthtracker/${rollnumber}`}
            onClick={HandlcurrentGT}
          >{`${fname} ${mname} ${lname} `}</Link>
        </div>
        <div className="card-edit-part">
          <Link to={`/student/update/${rollnumber}`} onClick={HandleupdatedStd}>
            <img src={editIcon} alt="edit-Icon" height="25px" />
          </Link>
          <img
            src={deleteIcon}
            alt="delete-icon"
            onClick={deleteStd}
            height="25px"
          />
        </div>
      </div>
    </div>
  );
};

export default AllStdEdit;
