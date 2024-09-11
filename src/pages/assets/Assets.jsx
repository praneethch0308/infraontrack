import React, { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, Button, Box, TablePagination, Avatar, Typography, Autocomplete, TextField } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { PersonAddAlt } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';






const Assets = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const assets = [
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
    const [filters, setFilters]= useState({
        deptname:null})
        
     
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAutoCompleteChange= (event,value,name)=>{
        setFilters((prevFilters)=>({
            ...prevFilters,
            [name]: value,
        }))
        setPage(0);
    }

    const filteredAssets = Array.isArray(assets) ? assets.filter((asset) => {
        return (!filters.deptname || asset.deptname === filters.deptname);
    }) : [];
    const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Grid container>
            <Grid item style={{ width: '240px' }} >
                <Sidebar />
            </Grid>
            <Grid item xs style={{ paddingLeft: '20px', marginRight:'36px' }}>
                <Toolbar />
                <Box display="flex" justifyContent="flex-end" mb={5} mt={2}>
                    <Button
                        variant="contained"
                        className='bg-[#002a5c] rounded-3xl'
                        onClick={() => navigate('/asset-create')}
                    >
                        <span className='font-semibold'>Create Asset</span>
                        <PersonAddAlt sx={{ height: '20px', width: '20px', ml: 1 }} />
                    </Button>
                </Box>

                <Box>
                    <Box display={'flex'} alignItems={'center'} mb={3}>
                        <Typography className="font-bold">Asset Name : </Typography>
                        <Autocomplete 
                            options={assets.map(department => department.deptName || '')} 
                            value={filters.deptName || null}
                            onChange={(event, newValue) => handleAutoCompleteChange(event, newValue, 'deptName')}
                            renderInput={(params) => <TextField {...params} label="Select Asset Name" />}
                            sx={{ width: 200, marginLeft: 2 }} 
                        />                      
                    </Box>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#002a5c', '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold' } }}>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Make</TableCell>
                                <TableCell>Model</TableCell>
                                <TableCell>Warranty</TableCell>
                                <TableCell>In AMC</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>QR Code</TableCell>
                                <TableCell>Approved by Principal</TableCell>
                                <TableCell>Approved by Branch Head</TableCell>
                                <TableCell>Approved by HOD</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedAssets.map((department) => (
                                <TableRow key={department.id}>
                                    <TableCell>{department.deptName}</TableCell>
                                    <TableCell>{department.hodName}</TableCell>
                                    <TableCell>{department.email}</TableCell>
                                    <TableCell>{department.phoneNumber}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 25, 50]}
                    component="div"
                    count={assets.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid>
    );
};

export default Assets;
