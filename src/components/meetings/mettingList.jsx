import {useState} from 'react';

import { observer } from "mobx-react-lite";
import { toJS } from 'mobx';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Chip } from "@mui/joy";


import meetingsStore from '../../Store/meetingsStore';


const MeetingList = observer(() => {
    const [bool, setBool]=useState(false);
  

    const columns = [
        {
            field: 'serviceName',
            headerName: 'סוג השירות',
            type: 'string',
            width: 150,
        },
        {
            field: 'clientName',
            headerName: 'שם הלקוח',
            type: 'string',
            width: 150,

        },
        {
            field: 'clientPhone',
            headerName: 'טלפון',
            type: 'number',
            width: 150,

        },
        {
            field: 'clientEmail',
            headerName: 'מייל',
            type: 'email',
            width: 150,

        },
        {
            field: 'date',
            headerName: 'תאריך',
            type: 'Date',
            width: 150,
            sortable: true,
            sortComparator: (v1, v2) => {
                const date1 = new Date(v1);
                const date2 = new Date(v2);
                return date1.getTime() - date2.getTime();
            },
            valueGetter: (params) => {
                const date = new Date(params.row.dateTime);
                return date.toDateString();
            },
        },
        {
            field: 'time',
            headerName: 'שעה',
            type: 'Date',
            width: 100,
            sortable: true,
            sortComparator: (v1, v2) => {
                const date1 = new Date(v1);
                const date2 = new Date(v2);
                return date1.getTime() - date2.getTime();
            },
            valueGetter: (params) => {
                const date = new Date(params.row.dateTime);
                return date.toLocaleTimeString();
            },
        }
        ,
        {
            field: 'status',
            headerName: 'הערות',
            width: 150,
            sortable: true,
            renderCell: (params) => {
                const date = new Date(params.row.dateTime);
                const today = new Date();
                const thisWeek = new Date();
                thisWeek.setDate(thisWeek.getDate() + 7);

                let status;
                if (date.toDateString() === today.toDateString()) {
                    status = 'Today';
                } else if (date <= thisWeek) {
                    status = 'This week';
                } else {
                    status = 'later';
                }

                if (status === 'Today') {
                    return <Chip color="danger">Today</Chip>;
                } else if (status === 'This week') {
                    return <Chip color="warning">This week</Chip>;
                } else {
                    return <Chip color="success">Later</Chip>;
                }
            },
        }


    ];
    const rows = toJS(meetingsStore.data);
    console.log("rows",toJS(rows));
    let index=0;// Assuming you have an 'id' property in your data
    const getRowId = () => index++;
    return (
        <>
            <Box sx={{ height: 425, width: '100%' , direction: 'rtl'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 6,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    getRowId={getRowId}
                />
            </Box>
        
        </>
    );
});

export default MeetingList;