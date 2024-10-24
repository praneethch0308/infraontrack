import React, { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, Button, Box, TablePagination, Avatar, Typography, Autocomplete, TextField } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { PersonAddAlt } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDept } from '../../context/departments/DeptContext';





const Departments = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const { departments = [], getDepts } = useDept();
    const [filters, setFilters]= useState({
        deptname:null})
        
        useEffect(() => {
            getDepts();
        }, []);
    
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

    const filteredDepartments = Array.isArray(departments) ? departments.filter((department) => {
        return (!filters.deptname || department.deptname === filters.deptname);
    }) : [];
    const paginatedDepartments = filteredDepartments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                        onClick={() => navigate('/department-create')}
                    >
                        <span className='font-semibold'>Create Department</span>
                        <PersonAddAlt sx={{ height: '20px', width: '20px', ml: 1 }} />
                    </Button>
                </Box>

                <Box>
                    <Box display={'flex'} alignItems={'center'} mb={3}>
                        <Typography className="font-bold">Department Name : </Typography>
                        <Autocomplete 
                            options={Array.isArray(departments) &&departments.map(department => department.deptName || '')} 
                            value={filters.deptName || null}
                            onChange={(event, newValue) => handleAutoCompleteChange(event, newValue, 'deptName')}
                            renderInput={(params) => <TextField {...params} label="Select Dept Name" />}
                            sx={{ width: 200, marginLeft: 2 }} 
                        />                      
                    </Box>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#002a5c', '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold' } }}>
                                <TableCell>Department Name</TableCell>
                                <TableCell>HOD Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedDepartments.map((department) => (
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
                    count={departments.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid>
    );
};

export default Departments;
