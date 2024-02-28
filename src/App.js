import React from "react";
import { Route, Routes } from "react-router-dom";
//
import { Navbar, About, GTOverview, GrowthTracker } from "./components";
import LoginRoute from "./routes/LoginRoute";
import { Homepage } from "./page";
import StudentRoute from "./routes/StudentRoute";
import { StudentState } from "./context/student/studentContext";
import { GrowthState } from "./context/growthChart/growthContext";

const App = () => {
  return (
    <>
      <Navbar />
      <div id="main">
        <GrowthState>
          <StudentState>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="student/*" element={<StudentRoute />} />
              <Route path="/login/*" element={<LoginRoute />} />
              <Route path="/about" element={<About />} />
              <Route path="/growthtracker/:id" exact element={<GTOverview />} />
              <Route
                path="/growthtracker/add/:id"
                exact
                element={<GrowthTracker />}
              />
            </Routes>
          </StudentState>
        </GrowthState>
      </div>
    </>
  );
};

export default App;
