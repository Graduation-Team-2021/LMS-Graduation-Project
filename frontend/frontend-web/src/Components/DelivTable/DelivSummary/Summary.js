import cls from "./Summary.module.css";
import Chart from "react-google-charts";
import React from "react";

export default function Item(props) {
  return (
    <div className={cls.tab}>
      <div className={cls.tabcontent}>
        <div className={cls.button}>
          <div
            style={{
              fontSize: "15pt",
              color: "yellow",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {props.total}
          </div>
          Total Deliverables
        </div>
        <div className={cls.button}>
          <div
            style={{
              fontSize: "15pt",
              color: "green",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {props.complete}
          </div>
          Completed
        </div>
        <div className={cls.button}>
          <div
            style={{
              fontSize: "15pt",
              color: "orange",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {props.progress}
          </div>
          In Progress
        </div>
        <div className={cls.button}>
          <div
            style={{
              fontSize: "15pt",
              color: "yellowgreen",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {props.notS}
          </div>
          Not Started
        </div>
        <div className={cls.button}>
          <div
            style={{
              fontSize: "15pt",
              color: "red",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {props.over}
          </div>
          Overdue
        </div>
        <div className={cls.button}>
          <div
            style={{
              fontSize: "15pt",
              color: "blue",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {props.graded}
          </div>
          Graded
        </div>
        <div className={cls.chart}>
          <Chart
            width={"20vw"}
            height={"20vh"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Status", "Number"],
              ["Completed", props.complete],
              ["In Progress", props.progress],
              ["Not Started", props.notS],
              ["Overdue", props.over],
              ["Graded", props.graded],
            ]}
            options={{
              legend: "none",
              // Just add this option
              pieHole: 0.65,
              slices: {
                0: { color: "green" },
                1: { color: "orange" },
                2: { color: "yellowgreen" },
                3: { color: "red" },
                4: { color: "blue" },
              },
              backgroundColor: "#262a34",
            }}
            rootProps={{ "data-testid": "3" }}
          />
        </div>
      </div>
    </div>
  );
}
