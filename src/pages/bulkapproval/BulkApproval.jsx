import React, { useContext, useEffect, useState } from 'react';
import {
    Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Toolbar, Button, Box, Checkbox, TablePagination, Avatar, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle,
    Tooltip
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import EmployeeContext from '../../context/employees/EmployeeContext';
import ExportToExcelButton from '../../components/excelbutton/ExcelButton';
import { Dangerous, ReportProblem } from '@mui/icons-material';
import { CgDanger } from 'react-icons/cg';
import { IoAlert } from 'react-icons/io5';
import { MdReportGmailerrorred, MdReportProblem } from 'react-icons/md';
import { FaBeer } from 'react-icons/fa';

const BulkApproval = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [selected, setSelected] = useState([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
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

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = employees.map((employee) => employee.id);
            setSelected(newSelecteds);
            setShowCheckboxes(true);  // Show individual checkboxes after selecting all
        } else {
            setSelected([]);
            setShowCheckboxes(false);  // Hide individual checkboxes if unselecting all
        }
    };

    const handleCheckboxClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const paginatedemployees = Array.isArray(employees) 
        ? employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
        : [];


    const handleApproveAllClick = () => {
        setOpenDialog(true);
    };

    const handleConfirmApprove = () => {
        
        alert('All selected rows approved!');
        setOpenDialog(false);
        setSelected([]);  
        setShowCheckboxes(false);  
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    return (
        <Grid container>
            <Grid item style={{ width: '240px' }}>
                <Sidebar />
            </Grid>
            <Grid item xs style={{ paddingLeft: '20px', marginRight: '28px' }}>
                <Toolbar />
                
                <Box display="flex" justifyContent="flex-end" mb={5} mt={2} className="w-full" >
                    <Box display="flex" justifyContent="space-between" mr={5} >
                        <Box mr={3}>
                            <ExportToExcelButton tableId="EmployeeTable"/>
                        </Box>
                    </Box>
                </Box>
                <Box mb={2}>
                {selected.length > 0 && (
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleApproveAllClick}
                    className='justify-center'>
                        Approve All Selected
                    </Button>
                )}
                </Box>
                <TableContainer component={Paper}>
                    <Table id="EmployeeTable">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#002a5c', '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold' } }}>
                                <TableCell title='Select all' placement="bottom" arrow >
                                  <Tooltip>
                                    <Checkbox 
                                        color="white"
                                        className='bg-white'
                                        indeterminate={selected.length > 0 && selected.length < employees.length}
                                        checked={employees.length > 0 && selected.length === employees.length}
                                        onChange={handleSelectAllClick}
                                    />
                                    </Tooltip>
                                </TableCell>
                                <TableCell>Asset Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Sub-Type</TableCell>
                                <TableCell>Make</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell >Approve</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedemployees.map((employee) => {
                                const isItemSelected = isSelected(employee.id);

                                return (
                                    <TableRow key={employee.id} selected={isItemSelected}>
                                        <TableCell>
                                            {showCheckboxes && (
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    onClick={() => handleCheckboxClick(employee.id)}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>{employee.assetName || "N/A"}</TableCell>
                                        <TableCell>{employee.type || "N/A"}</TableCell>
                                        <TableCell>{employee.subType || "N/A"}</TableCell>
                                        <TableCell>{employee.make || "N/A"}</TableCell>
                                        <TableCell>{employee.deptInfoDto?.deptName}</TableCell>
                                        <TableCell>{employee.location || "N/A"}</TableCell>
                                        <TableCell className={`${isItemSelected ?' hidden': 'visible'}`}>
                                            <Button variant="contained" color="success">Approve</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
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

            <Dialog
                open={openDialog}
                onClose={handleDialogClose}>
                <DialogTitle sx={{fontWeight:'bold'}}>Confirm Approval</DialogTitle>
                <DialogContent >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                    <ReportProblem color="error" sx={{fontSize:50}} />
                </Box>
                  <i className="bi bi-exclamation-triangle"></i>
                    <DialogContentText sx={{ color:'black'}}>
                        Are you sure you want to approve all selected Assets?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmApprove} sx={{backgroundColor:'green',color:'white', borderRadius:'18px'}}>Confirm</Button>
                    <Button onClick={handleDialogClose} sx={{backgroundColor:'red',color:'white', borderRadius:'18px'}} >Cancel</Button>
                    
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default BulkApproval;
