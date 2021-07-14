import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import cls from "./DelivTable.module.css";
import Summary from "./DelivSummary/Summary";
import { getQuizzes } from "../../Interface/Interface";
import Waiting from "../../Components/Waiting/Waiting";
import { mapStateToProps, mapDispatchToProps } from "../../store/reduxMaps";
import { connect } from "react-redux";

const columns = [
  { field: "name", headerName: "Name", width: 340 },
  { field: "status", headerName: "Status", width: 180 },
  { field: "leeway", headerName: "Allowed Time", width: 150 },
  { field: "mark", headerName: "Mark", width: 130 },
  { field: "smark", headerName: "Your Score", width: 130 },
];

/* const cRows = [
  {
    name: "Creating FSD",
    date: "Now",
    status: "Not Started",
    leeway: "1 minutes",
    mark: "N/A",
    id: 1,
  },
  {
    name: "Configuration analysis",
    date: "Now",
    status: "Completed",
    leeway: "40 minutes",
    mark: "7",
    id: 3,
  },
  {
    name: "Genetic Breeding model",
    status: "Not Started",
    leeway: "40 minutes",
    mark: "N/A",
    id: 8,
    date: "Now",
  },
]; */

export default connect(mapStateToProps, mapDispatchToProps)(function DeliverableList(props) {
  const [rows, setRows] = useState([]);

  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    getQuizzes(props.id, props.userData.ID).then((res) => {
      const temp = [];
      res.forEach((value, index) =>
        temp.push({
          id: value["exam_id"],
          name: `Quiz ${index + 1}`,
          leeway: value["exam_duration"],
          status: value["status"],
          course: props.name,
          mark: value["exam_marks"],
          smark: value["marks"],
        })
      );
      setRows(temp);
      setLoading(false);
    });
  }, [props.id, props.name, props.userData.ID]);

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
      <div className={cls.title}>{props.name} Quizzes</div>
      <Waiting Loading={Loading}>
        <Summary total={rows.length} complete={completedN} notS={notN} />
        <div className={cls.title}>Quizzes List</div>
        <div className={cls.list}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={6}
            onRowClick={(rowData) => props.onRowHand(rowData)}
          />
        </div>
      </Waiting>
    </div>
  );
});
