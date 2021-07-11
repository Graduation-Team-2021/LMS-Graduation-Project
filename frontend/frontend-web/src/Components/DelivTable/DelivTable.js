import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import cls from "./DelivTable.module.css";
import Summary from "./DelivSummary/Summary";
import { getDeliv } from "../../Interface/Interface";

const columns = [
  { field: "name", headerName: "Name", width: 340 },
  { field: "type", headerName: "Type", width: 140 },
  { field: "status", headerName: "Status", width: 180 },
  { field: "leeway", headerName: "Allowed Time", width: 150 },
  { field: "deadline", headerName: "Deadline", width: 130 },
  { field: "course", headerName: "Course", width: 250 },
  { field: "coursecode", headerName: "Coursecode", width: 130 },
  { field: "mark", headerName: "Mark", width: 130 },
];

const rows = [
  {
    name: "Sever Deployment",
    type: "Assignment",
    status: "Not Started",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "N/A",
    mark: "N/A",
    id: 2,
  },
  {
    name: "Data Architecture",
    type: "Assignment",
    status: "Completed",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "N/A",
    mark: "9",
    id: 4,
  },
  {
    name: "Data Architecture",
    type: "Assignment",
    status: "In Progress",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "N/A",
    mark: "N/A",
    id: 5,
  },
  {
    name: "Dynamic Routing",
    type: "Assignment",
    status: "Completed",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "N/A",
    mark: "N/A",
    id: 6,
  },
  {
    name: "noSQL",
    type: "Assignment",
    status: "In Progress",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "N/A",
    mark: "N/A",
    id: 7,
  },
  {
    name: "Phenomenological model",
    type: "Assignment",
    status: "Completed",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "N/A",
    mark: "N/A",
    id: 9,
  },
];

export default function DeliverableList(props) {

    useEffect(() => {
        console.log();
        //TODO: Load Data
        getDeliv(props.id).then(()=>{
            console.log('Quizzes Collected Successfully');
        })
    }, [props.id])

  let newArrayOfObjects = Object.values(
    rows.reduce((mapping, item) => {
      const { [item.status]: matchingItem } = mapping;
      if (matchingItem) {
        matchingItem.count++;
      } else {
        mapping[item.status] = { ...item, count: 1 };
      }
      return mapping;
    }, {})
  );

  let completedN =
    newArrayOfObjects[
      newArrayOfObjects.findIndex((Ar) => {
        return Ar.status === "Completed";
      })
    ].count;
  let progressN =
    newArrayOfObjects[
      newArrayOfObjects.findIndex((Ar) => {
        return Ar.status === "In Progress";
      })
    ].count;
  let notN =
    newArrayOfObjects[
      newArrayOfObjects.findIndex((Ar) => {
        return Ar.status === "Not Started";
      })
    ].count;

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  return (
    <div className={cls.content}>
      <div className={cls.title}>{props.name?props.name:"My"} Deliverables</div>
      <Summary
        total={rows.length}
        complete={completedN}
        progress={progressN}
        notS={notN}
      />
      <div className={cls.title}>Deliverables List</div>
      <div className={cls.list}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={6}
          onRowClick={(rowData) => props.onRowHand(rowData)}
        />
      </div>
    </div>
  );
}
