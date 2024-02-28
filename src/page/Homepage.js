import React from "react";
import { Card } from "../components";
import "./pagestyle.css";
const Homepage = () => {
  return (
    <div className="home-container">
      <Card title="Overview" />
      <Card title="Students" path="/student" />
      <Card title="Schemes of NGO" />
      <Card title="Add New Student" path="/student/add student" />
    </div>
  );
};

export default Homepage;
