import React from "react";
import { useParams } from "react-router-dom";

const StdInfo = () => {
    const {id}= useParams()
  return <div>{id} is is</div>;
};

export default StdInfo;
