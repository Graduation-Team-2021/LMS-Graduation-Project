import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import cls from "./DelivTable.module.css";
import Summary from "./DelivSummary/Summary";
import { getDeliv } from "../../Interface/Interface";

const columns = [
  { field: "name", headerName: "Name", width: 340 },
  { field: "status", headerName: "Status", width: 180 },
  { field: "leeway", headerName: "Allowed Time", width: 150 },
  { field: "mark", headerName: "Mark", width: 130 },
];

const rows = [
  {
    name: "Creating FSD",
    status: "Not Started",
    leeway: "1 minutes",
    mark: "N/A",
    id: 1,
  },
  {
    name: "Configuration analysis",
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
  },
];

export default function DeliverableList(props) {
  useEffect(() => {
    console.log();
    //TODO: Load Data
    getDeliv(props.id).then(() => {
      console.log("Quizzes Collected Successfully");
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
      <div className={cls.title}>{props.name} Quizzes</div>
      <Summary
        total={rows.length}
        complete={completedN}
        notS={notN}
      />
      <div className={cls.title}>Quizzes List</div>
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
