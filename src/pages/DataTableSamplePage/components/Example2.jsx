import { useState, useEffect } from 'react';
// APIs
import { mockupDatas } from '../../../apis/mockupDataAPI';
// Components
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

function Example2() {
  const columns = [
    { field: 'id', type: 'number' },
    { field: 'name', type: 'string' },
    { field: 'age', type: 'number' },
    { field: 'dateCreated', type: 'date' },
    { field: 'lastLogin', type: 'dateTime' },
    { field: 'isAdmin', type: 'boolean' },
    { field: 'country', type: 'string' },
  ];
  const [rows, setRows] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    setRows(mockupDatas);
    setRowSelectionModel([1, 2, 3]);
  }, []);

  useEffect(() => {
    setSelectedItem(rowSelectionModel.map((idx) => rows[idx - 1]));
  }, [rowSelectionModel, rows]);

  return (
    <div>
      <div className='py-5'>
        <h2 className='text-xl font-semibold'>Select Table</h2>
      </div>
      <Box sx={{ height: 500, width: 1 }}>
        <DataGrid
          columns={columns}
          rows={rows}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
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
      <pre className='bg-white p-5 mt-5 overflow-auto max-h-80'>
        {JSON.stringify(selectedItem, null, 4)}
      </pre>
    </div>
  );
}

export default Example2;
