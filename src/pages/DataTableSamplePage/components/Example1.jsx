import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// APIs
import { mockupDatas } from '../../../apis/mockupDataAPI';
// Components
import { Box } from '@mui/material';

function Example1() {
  // Example 1
  const columns = [
    { field: 'id', type: 'number' },
    { field: 'name', type: 'string' },
    { field: 'age', type: 'number' },
    { field: 'dateCreated', type: 'date' },
    { field: 'lastLogin', type: 'dateTime' },
    { field: 'isAdmin', type: 'boolean' },
    { field: 'country', type: 'string' },
  ];
  const [rows1, setRows1] = useState([]);

  useEffect(() => {
    setRows1(mockupDatas);
  }, []);

  return (
    <div>
      <div className='pb-5'>
        <h2 className='text-xl font-semibold'>Simple Table</h2>
      </div>
      <Box sx={{ height: 500, width: 1 }}>
        <DataGrid
          columns={columns}
          rows={rows1}
          getRowId={(row) => row.id}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{
            boxShadow: 1,
            borderRadius: 2,
            background: 'white',
            padding: 1,
          }}
        />
      </Box>
    </div>
  );
}

export default Example1;
