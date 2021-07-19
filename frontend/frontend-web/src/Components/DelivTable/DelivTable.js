import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import cls from "./DelivTable.module.css";
import Summary from "./DelivSummary/Summary";
import Waiting from "../../Components/Waiting/Waiting";
import { getDeliv } from "../../Interface/Interface";

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../store/reduxMaps";



/* const cRows = [
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
]; */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function DeliverableList(props) {

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status", width: 180 },
    { field: "deadline", headerName: "Deadline", width: 200 },
    { field: "course", headerName: "Course", width: 250 },
    { field: "coursecode", headerName: "Coursecode", width: 130 },
    { field: "mark", headerName: "Mark", width: 130 },
  ];
  
  const perCourseColumn = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status", width: 180 },
    { field: "deadline", headerName: "Deadline", width: 200 },
    { field: "mark", headerName: "Mark", width: 130 },
  ];

  if (props.userData.Role!=='student') {
    columns.splice(1,1)
    perCourseColumn.splice(1,1)
  }

  const [Loading, setLoading] = useState(true);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    //TODO: Load Data
    getDeliv(props.id, props.userData.Token).then((res) => {
      setLoading(false);
      var temp = [];
      res.forEach((value) => {
        if (props.id) {
          temp.push({
            name: value["deliverable_name"],
            status: value["status"],
            course: props.name,
            description: value["description"] || "No Description",
            deadline: value["deadline"],
            mark: value["mark"] || "N/A",
            id: value["deliverable_id"],
          });
        } else {
          var delivs = value["deliverables"];
          delivs.forEach((v2) =>
            temp.push({
              name: v2["deliverable_name"],
              status: v2["status"],
              course: value["course_name"], //Need Adjustment
              coursecode: value["course_id"],
              description: v2["description"] || "No Description",
              deadline: v2["deadline"],
              mark: v2["mark"] || "N/A",
              id: v2["deliverable_id"],
            })
          );
        }
      });
      setRows(temp);
    });
  }, [props.id, props.userData.Token, props.name]);

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
                columns={!props.id ? columns : perCourseColumn}
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
