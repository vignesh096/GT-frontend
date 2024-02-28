import React, { useContext, useState } from "react";
import { GrowthContext } from "../../context/growthChart/growthContext";
import { useParams } from "react-router-dom";
const GrowthTracker = () => {
  const { id } = useParams();
  const gtContext = useContext(GrowthContext);
  const { addGT } = gtContext;
  const [height, setheight] = useState("");
  const [weight, setweight] = useState("");
  const [vision, setvision] = useState("");
  const [hearing, sethearing] = useState("");
  const [flexibility, setflexibility] = useState("");
  const [posture, setposture] = useState("");
  const [BP, setBP] = useState("");
  const [cavities, setcavities] = useState("");
  const [gumProblems, setgumProblems] = useState("");

  async function handleGTForm() {
    if (cavities !== "yes" || cavities !== "true") {
      setcavities(false);
    } else {
      setcavities(true);
    }
    if (gumProblems !== "yes" || gumProblems !== "true") {
      setgumProblems(false);
    } else {
      setgumProblems(true);
    }
    let date = new Date();
    const newGT = {
      rollnumber: id,
      time: date.toLocaleDateString().toString(),
      height,
      weight,
      vision,
      hearing,
      flexibility,
      posture,
      bloodPressure: BP,
      dentalHealth: {
        cavities,
        gumProblems,
      },
    };
    let rep = await addGT(newGT);

    if (rep) {
      alert("Data saved successfully...");
    }
  }

  return (
    <>
      <div className="login-form">
        <form
          className="form"
          onClick={(e) => {
            e.preventDefault();
            // handleGTForm();
          }}
        >
          <h1 className="form__title">Child Growth Tracker</h1>

          <div className="form__div">
            <input
              className="form__input"
              name="hight"
              type="number"
              placeholder=""
              required
              value={height}
              onChange={(e) => {
                setheight(e.target.value);
              }}
            />
            <label className="form__label" htmlFor="">
              Height
            </label>
          </div>
          <div className="form__div">
            <input
              className="form__input"
              name="weight"
              type="number"
              placeholder=""
              required
              value={weight}
              onChange={(e) => {
                setweight(e.target.value);
              }}
            />
            <label className="form__label" htmlFor="">
              weight
            </label>
          </div>
          <div className="form__div">
            <input
              className="form__input"
              name="vision"
              type="number"
              placeholder=""
              required
              value={vision}
              onChange={(e) => {
                setvision(e.target.value);
              }}
            />
            <label className="form__label" htmlFor="">
              Vision
            </label>
          </div>
          <div className="form__div">
            <input
              className="form__input"
              name="hearing"
              type="number"
              placeholder=""
              required
              value={hearing}
              onChange={(e) => {
                sethearing(e.target.value);
              }}
            />
            <label className="form__label" htmlFor="">
              Hearing
            </label>
          </div>
          <div className="form__div">
            <input
              className="form__input"
              name="flexibility"
              type="text"
              placeholder=""
              required
              value={flexibility}
              onChange={(e) => {
                setflexibility(e.target.value);
              }}
            />
            <label className="form__label" htmlFor="">
              Flexibility
            </label>
          </div>
          <div className="form__div">
            <input
              className="form__input"
              name="posture"
              type="text"
              placeholder=""
              required
              value={posture}
              onChange={(e) => {
                setposture(e.target.value);
              }}
            />
            <label className="form__label" htmlFor="">
              Posture
            </label>
          </div>
          <div className="form__div">
            <input
              className="form__input"
              name="BP"
              type="text"
              placeholder=""
              required
              value={BP}
              onChange={(e) => {
                setBP(e.target.value);
              }}
            />
            <label className="form__label" htmlFor="">
              BP
            </label>
          </div>

          <div className="form__div">
            <input
              className="form__input"
              name="cavity"
              type="text"
              placeholder=""
              required
              value={cavities}
              onChange={(e) => {
                setcavities(e.target.value);
              }}
            />
            <label className="form__label" htmlFor="">
              Cavities
            </label>
          </div>

          <div className="form__div">
            <input
              className="form__input"
              name="gum"
              type="text"
              placeholder=""
              required
              value={gumProblems}
              onChange={(e) => {
                setgumProblems(e.target.value);
              }}
            />
            <label className="form__label" htmlFor="">
              Gum Problems
            </label>
          </div>

          {/*  */}
          <div className="form-btn-container">
            <button
              className="form__button"
              type="submit"
              onClick={handleGTForm}
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

export default GrowthTracker;
