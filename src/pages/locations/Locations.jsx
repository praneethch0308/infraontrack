import React, { useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, Button, Box, TablePagination, Avatar } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { Download, PersonAddAlt } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ExportToExcelButton from '../../components/excelbutton/ExcelButton';

const locations = [
    {  name: 'Vendor A', department: 'CSE', branch: 'CSE',incharge:'ABCDEF', assetcount: 10, roomno:'101' },
    {  name: 'Vendor B', department: 'CSE', branch: 'CSE',incharge:'ABCDEF', assetcount: 10, roomno:'101' },
    {  name: 'Vendor C', department: 'CSE', branch: 'CSE',incharge:'ABCDEF', assetcount: 10, roomno:'101' },
    {  name: 'Vendor C', department: 'CSE', branch: 'CSE',incharge:'ABCDEF', assetcount: 10, roomno:'101' },
    {  name: 'Vendor C', department: 'CSE', branch: 'CSE',incharge:'ABCDEF', assetcount: 10, roomno:'101' },
    {  name: 'Vendor C', department: 'CSE', branch: 'CSE',incharge:'ABCDEF', assetcount: 10, roomno:'101' },
    {  name: 'Vendor C', department: 'CSE', branch: 'CSE',incharge:'ABCDEF', assetcount: 10, roomno:'101' },
    {  name: 'Vendor C', department: 'CSE', branch: 'CSE',incharge:'ABCDEF', assetcount: 10, roomno:'101' },
    {  name: 'Vendor C', department: 'CSE', branch: 'CSE',incharge:'ABCDEF', assetcount: 10, roomno:'101' },
    {  name: 'Vendor C', department: 'CSE', branch: 'CSE',incharge:'ABCDEF', assetcount: 10, roomno:'101' },
];

const Locations = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedLocations = locations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Grid container>
            <Grid item style={{ width: '240px' }} >
                <Sidebar />
            </Grid>
            <Grid item xs style={{ paddingLeft: '20px', marginRight:'36px' }}>
                <Toolbar />
                <Box display="flex" justifyContent="flex-end" mb={5} mt={2} className="w-full" >
                    <Box display="flex" justifyContent="space-between" mr={5} >
                        <Box mr={3}>
                    <ExportToExcelButton  tableId="LocationTable"/>
                    </Box>
                    <Button
                        variant="contained"
                        className='bg-[#002a5c] rounded-3xl'
                        onClick={() => navigate('/location-create')}
                    >
                        <span className='font-semibold'>Create Location</span>
                        <PersonAddAlt sx={{ height: '20px', width: '20px', ml: 1 }} />
                    </Button>
                    </Box>
                </Box>

                <TableContainer component={Paper}>
                    <Table id="LocationsTable">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#002a5c', '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold' } }}>
                                <TableCell>Name</TableCell>
                                <TableCell>Incharge</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Branch</TableCell>
                                <TableCell>Room No</TableCell>
                                <TableCell>Asset Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedLocations.map((location) => (
                                <TableRow key={location.id}>
                                    <TableCell>{location.name}</TableCell>
                                    <TableCell>{location.incharge}</TableCell>
                                    <TableCell>{location.department}</TableCell>
                                    <TableCell>{location.branch}</TableCell>
                                    <TableCell>{location.roomno}</TableCell>
                                    <TableCell>{location.assetcount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 25, 50]}
                    component="div"
                    count={locations.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid>
    );
};

export default Locations;
