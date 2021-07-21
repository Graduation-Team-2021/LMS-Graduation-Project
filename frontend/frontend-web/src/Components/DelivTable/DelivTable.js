import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import cls from "./DelivTable.module.css";
import Summary from "./DelivSummary/Summary";
import Waiting from "../../Components/Waiting/Waiting";
import { getDeliv, getStudentDeliver } from "../../Interface/Interface";

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
    { field: "course", headerName: "Course", width: 150 },
    { field: "coursecode", headerName: "Course Code", width: 150 },
    { field: "group_id", headerName: "Group", width: 170 },
    { field: "smark", headerName: "Mark", width: 130 },
    { field: "mark", headerName: "Total Mark", width: 130 },
  ];

  const perCourseColumn = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status", width: 180 },
    { field: "deadline", headerName: "Deadline", width: 200 },
    { field: "group_id", headerName: "Group", width: 130 },
    { field: "smark", headerName: "Mark", width: 130 },
    { field: "mark", headerName: "Total Mark", width: 130 },
  ];

  const dColumn = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status", width: 180 },
    { field: "deadline", headerName: "Deadline", width: 200 },
    { field: "course", headerName: "Course", width: 150 },
    { field: "coursecode", headerName: "Course Code", width: 150 },
    { field: "mark", headerName: "Total Mark", width: 130 },
    { field: "notgraded", headerName: "Not Graded", width: 130 },
  ];

  const dPerCourseColumn = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status", width: 180 },
    { field: "deadline", headerName: "Deadline", width: 200 },
    { field: "mark", headerName: "Total Mark", width: 130 },
    { field: "notgraded", headerName: "Not Graded", width: 130 },
  ];

  const dperStudentColumn = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status", width: 180 },
    { field: "mark", headerName: "Mark", width: 130 },
  ];

  const [Loading, setLoading] = useState(true);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!props.student) {
      getDeliv(props.id, props.userData.Token).then((res) => {
        var temp = [];
        res.forEach((value) => {
          if (props.userData.Role === "student") {
            if (props.id) {
              temp.push({
                name: value["deliverable_name"],
                status: value["status"],
                course: props.name,
                description: value["description"] || "No Description",
                deadline: value["deadline"],
                mark: value["mark"] || "Not Graded yet",
                smark: value["mark"] || "Not Graded yet",
                id: value["deliverable_id"],
                group_id: value["group_id"] || "Not Chosen Yet",
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
                  mark: v2["mark"] || "Not Graded yet",
                  smark: value["mark"] || "Not Graded yet",
                  id: v2["deliverable_id"],
                  group_id: value["group_id"] || "Not Chosen Yet",
                })
              );
            }
          } else {
            if (props.id) {
              temp.push({
                name: value["deliverable_name"],
                status: value["status"],
                description: value["description"] || "No Description",
                deadline: value["deadline"],
                mark: value["mark"] || "Not Graded yet",
                id: value["deliverable_id"],
                notgraded: value["notgraded"] || 0,
              });
            } else {
              var delivs2 = value["deliverables"];
              delivs2.forEach((v2) =>
                temp.push({
                  name: v2["deliverable_name"],
                  status: v2["status"],
                  course: value["course_name"], //Need Adjustment
                  coursecode: value["course_id"],
                  description: v2["description"] || "No Description",
                  deadline: v2["deadline"],
                  mark: v2["mark"] || "Not Graded yet",
                  id: v2["deliverable_id"],
                })
              );
            }
          }
          setLoading(false);
        });
        setRows(temp);
      });
    } else {
      //Todo: Get All Delivering Groups
      getStudentDeliver(props.id).then((res) => {
        if (res) {
          setRows(
            res.map((v2) => ({
              name: v2["group_name"],
              status: v2["status"],
              mark: v2["mark"] || "Not Graded yet",
              id: props.id,
              gid: v2['group_id'], 
              did: v2["delivers_id"],
            }))
          );
          setLoading(false)
        }
      });
    }
  }, [props.id, props.userData.Token, props.name, props.userData.Role, props.student]);

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
                columns={
                  props.userData.Role === "student"
                    ? (!props.id
                      ? columns
                      : perCourseColumn)
                    : (props.student
                    ? dperStudentColumn
                    : !props.id
                    ? dColumn
                    : dPerCourseColumn)
                }
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
