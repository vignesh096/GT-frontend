import { createContext } from "react";
const server = process.env.REACT_APP_SERVER_URL;
const GrowthContext = createContext();

const GrowthState = (props) => {
  async function addGT(gt) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    try {
      const respon = await fetch(`${server}api/gt/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(gt),
      });
      const gtinfo = await respon.json();
      console.log("GT info is ");
      console.log(gtinfo);

      return gtinfo;
    } catch (error) {
      console.error("Error adding new GT info:", error);
      throw error;
    }
  }
  async function getAllDataByID(rollnumber) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found in localStorage");
    }
    try {
      const Allrespons = await fetch(`${server}api/gt/getData/${rollnumber}`, {
        method: "GET",
        headers: {
          token: token,
        },
      });
      const getData = Allrespons.json();
      if (getData) {
        return getData;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching student growth data :", error);
      throw error;
    }
  }
  return (
    <GrowthContext.Provider value={{ addGT, getAllDataByID }}>
      {props.children}
    </GrowthContext.Provider>
  );
};

export { GrowthContext, GrowthState };
