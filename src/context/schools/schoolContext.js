import { createContext } from "react";

const SchoolContext = createContext();

const SchoolState = (props) => {
  const value = "I am school";

  















  return (
    <SchoolContext.Provider value={value}>
      {props.children}
    </SchoolContext.Provider>
  );
};

export { SchoolContext, SchoolState };
