import React, { useContext, useEffect, useState } from 'react';
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, Button, Box, TablePagination, Avatar, Grid2, Grid } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { PersonAddAlt } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EmployeeContext from '../../context/employees/EmployeeContext';
import ExportToExcelButton from '../../components/excelbutton/ExcelButton';


const Employees = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const context = useContext(EmployeeContext);
    const { employees = [], getEmployees } = context;

    useEffect(() => {
        getEmployees();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

 
    const paginatedemployees = Array.isArray(employees) 
        ? employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
        : [];

    return (
        <Grid2 container>
            <Grid item style={{ width: '240px' }}>
                <Sidebar />
            </Grid>
            <Grid item xs style={{ paddingLeft: '20px', marginRight: '28px' }}>
                <Toolbar />
                <Box display="flex" justifyContent="flex-end" mb={5} mt={2} className="w-full" >
                    <Box display="flex" justifyContent="space-between" mr={5} >
                        <Box mr={3}>
                    <ExportToExcelButton  tableId="EmployeeTable"/>
                    </Box>
                    <Button
                        variant="contained"
                        className='bg-[#002a5c] rounded-3xl'
                        onClick={() => navigate('/employee-create')}
                    >
                        <span className='font-semibold'>Create Employee</span>
                        <PersonAddAlt sx={{ height: '20px', width: '20px', ml: 1 }} />
                    </Button>
                    </Box>
                </Box>

                <TableContainer component={Paper}>
                    <Table id="EmployeeTable">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#002a5c', '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold' } }}>
                                <TableCell>Image</TableCell>
                                <TableCell>Employee Name</TableCell>
                                <TableCell>Designation</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Email Id</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedemployees.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell>
                                       <Avatar src={employee.profilePicUrl}/>
                                    </TableCell>
                                    <TableCell>{employee.name}</TableCell>
                                    <TableCell>{employee.designation}</TableCell>
                                    <TableCell>{employee.deptInfoDto?.deptName}</TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 25, 50]}
                    component="div"
                    count={Array.isArray(employees) ? employees.length : 0} 
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid2>
    );
};

export default Employees;
