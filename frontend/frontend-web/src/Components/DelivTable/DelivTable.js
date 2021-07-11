import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import cls from "./DelivTable.module.css";
import Summary from "./DelivSummary/Summary";
import Waiting from "../../Components/Waiting/Waiting";
import { getDeliv } from "../../Interface/Interface";

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../store/reduxMaps";

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "type", headerName: "Type", width: 140 },
  { field: "status", headerName: "Status", width: 180 },
  { field: "deadline", headerName: "Deadline", width: 200 },
  { field: "course", headerName: "Course", width: 250 },
  { field: "coursecode", headerName: "Coursecode", width: 130 },
  { field: "mark", headerName: "Mark", width: 130 },
];

const perCourseColumn = [
  { field: "name", headerName: "Name", width: 340 },
  { field: "type", headerName: "Type", width: 140 },
  { field: "status", headerName: "Status", width: 180 },
  { field: "deadline", headerName: "Deadline", width: 200 },
  { field: "mark", headerName: "Mark", width: 130 },
];

const cRows = [
  {
    name: "Sever Deployment",
    type: "Assignment",
    status: "In Progress",
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function DeliverableList(props) {
  const [Loading, setLoading] = useState(true);

  const [rows, setRows] = useState([])

  useEffect(() => {
    //TODO: Load Data
    getDeliv(props.id, props.userData.Token).then((res) => {
      setLoading(false);
      console.log("Deliverables Collected Successfully", res);
      var temp = [];
      res.forEach((value) =>
        temp.push(props.id?{
          name: value["deliverable_name"],
          type: 'Assignment',
          status: "Completed",
          course: props.name,
          description: value['description'],
          deadline: value["deadline"],
          mark: value['mark']||"N/A",
          id: value["deliverable_id"],
        }:{
          name: value["deliverable_name"],
          type: value["deliverable_name"],
          status: "Completed",
          course: "Software Engineering",
          coursecode: "CSE412",
          description: "N/A",
          deadline: value["deadline"],
          mark: value['mark']||"N/A",
          id: value["deliverable_id"],
        })
      );
      setRows(temp)
    });
  }, [props.id]);

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
    ]?.count || 0;
  let progressN =
    newArrayOfObjects[
      newArrayOfObjects.findIndex((Ar) => {
        return Ar.status === "In Progress";
      })
    ]?.count || 0;
  let notN =
    newArrayOfObjects[
      newArrayOfObjects.findIndex((Ar) => {
        return Ar.status === "Not Started";
      })
    ]?.count || 0;

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  return (
    <div className={cls.content}>
      <div className={cls.title}>
        {props.name ? props.name : "My"} Deliverables
      </div>
      <Waiting Loading={Loading}>
        {rows.length !== 0 ? (
          <React.Fragment>
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
                columns={!props.id?columns:perCourseColumn}
                pageSize={6}
                onRowClick={(rowData) => props.onRowHand(rowData)}
              />
            </div>
          </React.Fragment>
        ) : (
          <h1>No Deliverables Found</h1>
        )}
      </Waiting>
    </div>
  );
});
