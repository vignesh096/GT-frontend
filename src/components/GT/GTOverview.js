import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StudentContext } from "../../context/student/studentContext";
import Chart from "react-apexcharts";
import { GrowthContext } from "../../context/growthChart/growthContext";
import OverviewCard from "../card/OverviewCard";

const GTOverview = () => {
  const gtContext = useContext(GrowthContext);
  const { getAllDataByID } = gtContext;
  const { id } = useParams();
  const GTstdContext = useContext(StudentContext);
  const { studentInfo } = GTstdContext;
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState([]);
  const [weight, setWeight] = useState([]);
  const [height, setHeight] = useState([]);
  const [bmi, setBMI] = useState([]);
  const [chWeight, setChWeight] = useState({});
  const [chHeight, setChHeight] = useState({});
  const [chBMI, setChBMI] = useState({});
  const [vision, setvision] = useState({});
  const [hearing, sethearing] = useState({});

  const [chhearing, setchhearing] = useState({});
  const [chvision, setchvision] = useState({});
  const [GTreport, setGTreport] = useState([]);

  async function fetchAlldata() {
    try {
      let report = await getAllDataByID(id);
      setGTreport(report);

      const times = [];
      const weights = [];
      const heights = [];
      const bmis = [];
      const visions = [];
      const hearings = [];

      report.forEach((ele) => {
        times.push(ele.time);
        weights.push(ele.weight);
        heights.push(ele.height);
        bmis.push(ele.bmi);
        visions.push(ele.vision);
        hearings.push(ele.hearing);
      });

      setTime(times);
      setWeight(weights);
      setHeight(heights);
      setBMI(bmis);
      sethearing(hearings);
      setvision(visions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    setChHeight({
      options: {
        chart: { id: "basic-bar" },
        xaxis: { categories: time },
      },
      series: [{ name: "Height in cm", data: height }],
    });
    setChWeight({
      options: {
        chart: { id: "basic-bar" },
        xaxis: { categories: time },
      },
      series: [{ name: "Weight in KG", data: weight }],
    });
    setChBMI({
      options: {
        chart: { id: "basic-bar" },
        xaxis: { categories: time },
      },
      series: [{ name: "BMI", data: bmi }],
    });
    setchhearing({
      options: {
        chart: { id: "basic-bar" },
        xaxis: { categories: time },
      },
      series: [{ name: "Hearing", data: hearing }],
    });
    setchvision({
      options: {
        chart: { id: "basic-bar" },
        xaxis: { categories: time },
      },
      series: [{ name: "Vision", data: vision }],
    });
  }, [time, weight, height, bmi, vision, hearing]);

  const fetchStudent = async () => {
    try {
      let std = await studentInfo(id);
      setStudent(std);
    } catch (error) {
      console.error("Error fetching student:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlldata();
    fetchStudent();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (GTreport.length <= 0) {
    return (
      <>
        <h1>No Data Found</h1>
        <button className="addGT__btn">
          <Link
            className="Link btn-content"
            to={`/growthtracker/add/${student.rollnumber}`}
          >
            Add Growth Info
          </Link>
        </button>
      </>
    );
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="addGT__btn">
          <Link
            className="Link btn-content"
            to={`/growthtracker/add/${student.rollnumber}`}
          >
            Add Growth Info
          </Link>
        </button>
      </div>
      <div className="chart-container">
        <div className="chart">
          <p>Height</p>
          <div className="mixed-chart ">
            <Chart
              options={chHeight.options}
              series={chHeight.series}
              type="line"
              width="500"
            />
          </div>
        </div>
        <div className="chart">
          <p>Weight</p>
          <div className="mixed-chart ">
            <Chart
              options={chWeight.options}
              series={chWeight.series}
              type="line"
              width="500"
            />
          </div>
        </div>
        <div className="chart">
          <p>BMI</p>
          <div className="mixed-chart ">
            <Chart
              options={chBMI.options}
              series={chBMI.series}
              type="line"
              width="500"
            />
          </div>
        </div>
        <div className="chart">
          <p>Vision</p>
          <div className="mixed-chart ">
            <Chart
              options={chvision.options}
              series={chvision.series}
              type="line"
              width="500"
            />
          </div>
        </div>
        <div className="chart">
          <p>Hearing</p>
          <div className="mixed-chart ">
            <Chart
              options={chhearing.options}
              series={chhearing.series}
              type="line"
              width="500"
            />
          </div>
        </div>
      </div>
      <div className="card-flex">
        <OverviewCard
          title="Flexibility"
          data={GTreport[GTreport.length - 1].flexibility}
        />
        <OverviewCard
          title="Posture"
          data={GTreport[GTreport.length - 1].posture}
        />
      </div>
      {/* <div className="dental-health__container">
        <section>
          <h1 className="dental-health-title">Dental Health</h1>
          <div className="dental-health__body">
            <OverviewCard
              title="Cavities"
              data={
                GTreport[GTreport.length - 1].dentalHealth.cavities !== ""
                  ? GTreport[GTreport.length - 1].dentalHealth.cavities
                  : "Null"
              }
            />
            <OverviewCard
              title="Gum Problems"
              data={
                GTreport[GTreport.length - 1].dentalHealth.gumProblems === ""
                  ? "Null"
                  : GTreport[GTreport.length - 1].dentalHealth.gumProblems
              }
            />
          </div>
        </section>
      </div> */}
    </>
  );
};

export default GTOverview;
