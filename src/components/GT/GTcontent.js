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

  const [time, settime] = useState([]);
  const [weight, setweight] = useState([]);
  const [height, setheight] = useState([]);
  const [bmi, setbmi] = useState([]);
  const [chweight, setchweight] = useState({});
  const [chheight, setchheight] = useState({});
  const [chbmi, setchbmi] = useState({});
  const [GTreport, setGTreport] = useState([]);
  async function fetchAlldata() {
    try {
      let report = await getAllDataByID(id);
      setGTreport(report);

      const times = [];
      const weights = [];
      const heights = [];
      const bmis = [];

      GTreport.forEach((ele) => {
        times.push(ele.time);
        weights.push(ele.weight);
        heights.push(ele.height);
        bmis.push(ele.bmi);
      });

      settime(times);
      setweight(weights);
      setheight(heights);
      setbmi(bmis);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    console.log("Time has changed:", time);
    console.log("weight has changed:", weight);
    console.log("height has changed:", height);
    setchheight({
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: time,
        },
      },
      series: [
        {
          name: "Weight in KG",
          // data: [100, 102, 104, 105, 106, 109, 111, 115],
          data: height,
        },
      ],
    });
    setchweight({
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: time,
        },
      },
      series: [
        {
          name: "Height in cm",
          // data: [100, 102, 104, 105, 106, 109, 111, 115],
          data: weight,
        },
      ],
    });
    setchbmi({
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: time,
        },
      },
      series: [
        {
          name: "BMI",
          // data: [100, 102, 104, 105, 106, 109, 111, 115],
          data: bmi,
        },
      ],
    });
  }, [time, weight, height, bmi]);

  const fetchStudent = async () => {
    try {
      let std = await studentInfo(id);
      console.log("std:", std);
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

  return (
    <>
      <div>
        <button>
          <Link
            className="Link"
            to={`/growthtracker/add/${student.rollnumber}`}
          >
            Add Growth
          </Link>
        </button>
      </div>
      <div className="chart-container">
        <div className="chart">
          <p>Height</p>
          <div className="mixed-chart ">
            <Chart
              options={chheight.options}
              series={chheight.series}
              type="line"
              width="500"
            />
          </div>
        </div>
        <div
          className="
        chart"
        >
          <p>Weight</p>
          <div className="mixed-chart ">
            <Chart
              options={chweight.options}
              series={chweight.series}
              type="line"
              width="500"
            />
          </div>
        </div>
        <div
          className="
        chart"
        >
          <p>BMI</p>
          <div className="mixed-chart ">
            <Chart
              options={chbmi.options}
              series={chbmi.series}
              type="line"
              width="500"
            />
          </div>
        </div>
        <OverviewCard
          title="Hearing"
          data={GTreport[GTreport.length - 1].hearing}
        />
        <OverviewCard
          title="Vision"
          data={GTreport[GTreport.length - 1].vision}
        />
        <OverviewCard
          title="Flexibility"
          data={GTreport[GTreport.length - 1].flexibility}
        />
        <OverviewCard
          title="Posture"
          data={GTreport[GTreport.length - 1].posture}
        />
      </div>

      <div className="dental-health__container">
        <section>
          <h1 className="dental-health-title">Dental Health</h1>
          <div className="dental-health__body">
            <OverviewCard
              title="Cavities"
              data={
                GTreport[GTreport.length - 1].dentalHealth.cavities !== ""
                  ? GTreport[GTreport.length - 1].dentalHealth.cavities
                  : "NuLL"
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
      </div>
    </>
  );
};

export default GTOverview;
