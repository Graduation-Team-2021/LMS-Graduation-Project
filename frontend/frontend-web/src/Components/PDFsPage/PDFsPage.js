import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import cls from "./PDFsPage.module.css";
import { getPDFs } from "../../Interface/Interface";
import Card from "../Card/Card";
import Waiting from '../../Components/Waiting/Waiting'

const columns = [{ field: "name", headerName: "Name", width: 340 }];

/* const cRows = [
  {
    name: "Creating FSD",
    id: 1,
  },
  {
    name: "Sever Deployment",
    id: 2,
  },
  {
    name: "Configuration analysis",
    id: 3,
  },
  {
    name: "Data Architecture",
    id: 4,
  },
  {
    name: "Data Architecture",
    id: 5,
  },
  {
    name: "Dynamic Routing",
    id: 6,
  },
  {
    name: "noSQL",
    id: 7,
  },
]; */

export default function PDFsPage(props) {
  const [rows, setRows] = useState([]);
  const [loaded, setloaded] = useState(false);
  useEffect(() => {
    console.log();
    //TODO: Load Data
    getPDFs(props.match.params.id).then((res) => {
      setloaded(true);
      const Data = [];
      res.forEach((value, index) => {
        Data.push({ name: value["material_name"], id: value["material_id"] });
      });
      setRows(Data);
      console.log("PDFs Collected Successfully");
    });
  }, [props.match.params.id]);

  const loadPDF = (PDF) => {
    props.history.push({
      pathname: `/Course/${props.match.params.id}/PDFs/${PDF.id}`,
    });
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  return (
    <Card>
      <div className={cls.content}>
        <div className={cls.title}>{props.location.state.name} PDFs</div>
        <div className={cls.list}>
          <Waiting Loading={!loaded}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              onRowClick={(rowData) => loadPDF(rowData)}
            />
          </Waiting>
        </div>
      </div>
    </Card>
  );
}
