import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from "react";
import cls from "./PDFsPage.module.css";
import { getPDFs } from "../../Interface/Interface";
import Card from '../Card/Card'

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
    name: "Creating FSD",
    type: "Quiz",
    status: "In Progress",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "40 minutes",
    mark: "N/A",
    id: 1,
  },
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
    name: "Configuration analysis",
    type: "Quiz",
    status: "Completed",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "40 minutes",
    mark: "7",
    id: 3,
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
    status: "Not Started",
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
    name: "Genetic Breeding model",
    type: "Quiz",
    status: "In Progress",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "40 minutes",
    mark: "N/A",
    id: 8,
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

export default function PDFsPage(props) {

    useEffect(() => {
        console.log();
        //TODO: Load Data
        getPDFs(props.match.params.id).then(()=>{
            console.log('PDFs Collected Successfully');
        })
    }, [props.match.params.id])

    const loadPDF=(PDF)=>{
      props.history.push({
        pathname: `/Course/${props.match.params.id}/PDFs/${PDF.id}`,
      });
    }

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  return (
    <Card>
      <div className={cls.content}>
        <div className={cls.title}>{props.location.state.name} PDFs</div>
        <div className={cls.list}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={8}
            onRowClick={(rowData) => loadPDF(rowData)}
          />
        </div>
      </div>
    </Card>
  );
}
