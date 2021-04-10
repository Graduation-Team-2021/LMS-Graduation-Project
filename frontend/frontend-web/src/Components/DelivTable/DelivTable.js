import { useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import cls from "./DelivTable.module.css"
import SearchBar from './SearchBar/SearchBar'
import Summary from './DelivSummary/Summary';


const columns = [
    { field: 'name', headerName: 'Name', width: 340 },
    { field: 'type', headerName: 'Type', width: 140 },
    { field: 'status', headerName: 'Status', width: 180 },
    { field: 'course', headerName: 'Course', width: 250 },
    { field: 'coursecode', headerName: 'Coursecode', width: 130 },
    { field: 'deadline', headerName: 'Deadline', width: 130 },
    { field: 'id', headerName: 'ID', width: 80 }
];

const rows = [
    { name: 'Creating FSD', type: 'Quiz', status: 'In Progress', course: 'Software Engineering', coursecode: 'CSE412', deadline: '09-04-2021', id: 1 },
    { name: 'Sever Deployment', type: 'Assignment', status: 'Not Started', course: 'Software Engineering', coursecode: 'CSE412', deadline: '09-04-2021', id: 2 },
    { name: 'Configuration analysis', type: 'Quiz', status: 'Completed', course: 'Software Engineering', coursecode: 'CSE412', deadline: '09-04-2021', id: 3 },
    { name: 'Data Architecture', type: 'Assignment', status: 'Completed', course: 'Software Engineering', coursecode: 'CSE412', deadline: '09-04-2021', id: 4 },
    { name: 'Data Architecture', type: 'Assignment', status: 'Not Started', course: 'Software Engineering', coursecode: 'CSE412', deadline: '09-04-2021', id: 5 },
    { name: 'Dynamic Routing', type: 'Assignment', status: 'Completed', course: 'Software Engineering', coursecode: 'CSE412', deadline: '09-04-2021', id: 6 },
    { name: 'noSQL', type: 'Assignment', status: 'In Progress', course: 'Software Engineering', coursecode: 'CSE412', deadline: '09-04-2021', id: 7 },
    { name: 'Genetic Breeding model', type: 'Quiz', status: 'In Progress', course: 'Software Engineering', coursecode: 'CSE412', deadline: '09-04-2021', id: 8 },
    { name: 'Phenomenological model', type: 'Assignment', status: 'Completed', course: 'Software Engineering', coursecode: 'CSE412', deadline: '09-04-2021', id: 9 },
];


export default function DataGridDemo() {

    let newArrayOfObjects = Object.values(rows.reduce((mapping, item) => {
        const { [item.status]: matchingItem } = mapping;
        if (matchingItem) {
            matchingItem.count++;
        }
        else {
            mapping[item.status] = { ...item, count: 1 };
        }
        return mapping;
    }, {}))

    let completedN = newArrayOfObjects[newArrayOfObjects.findIndex(Ar => { return Ar.status === 'Completed' })].count
    let progressN = newArrayOfObjects[newArrayOfObjects.findIndex(Ar => { return Ar.status === 'In Progress' })].count
    let notN = newArrayOfObjects[newArrayOfObjects.findIndex(Ar => { return Ar.status === 'Not Started' })].count

    const [searchVis, setSearchVis] = useState({ showSearch: false });

    const toggleSearch = () => {
        setSearchVis({ showSearch: !searchVis.showSearch })
    }
    /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////

    let searchbb = null;
    if (searchVis.showSearch) {
        searchbb = <SearchBar />;
    }
    return (
        <div className={cls.content}>
            <div className={cls.title}>
                My Deliverables
            </div>
            <Summary total={rows.length} complete={completedN} progress={progressN} notS={notN} />
            <div className={cls.title}>
                Deliverables List
                <button className={cls.search} onClick={toggleSearch}>
                    <i><img src="/Search_Icon.svg" width="20" height="20" alt="search button" /></i>
                </button>
            </div>
            {searchbb}
            <div className={cls.list}>
                <DataGrid rows={rows} columns={columns} pageSize={6} />
            </div>
        </div>
    );
}