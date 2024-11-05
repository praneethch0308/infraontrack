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
import { ReportProblem } from '@mui/icons-material';
import axios from 'axios';
import { useBulkApprovalContext } from '../../context/bulkapproval/BulkapprovalContext';

const BulkApprovalPrincipal = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [selected, setSelected] = useState([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const { Principalassets,getAssetsforPrincipal } = useBulkApprovalContext();

   

    useEffect(() => {
        getAssetsforPrincipal();
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
            const newSelecteds = Principalassets.map((asset) => asset.id);
            setSelected(newSelecteds);
            setShowCheckboxes(true);  
        } else {
            setSelected([]);
            setShowCheckboxes(false);  
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

    const paginatedAssets = Array.isArray(Principalassets) 
        ? Principalassets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
        : [];

    const handleApproveAllClick = () => {
        setOpenDialog(true);
    };
    const baseURl = process.env.REACT_APP_API_KEY;
    const handleConfirmApprove = async () => {
        try {
            const response = await axios.post(`${baseURl}/api/assets/approveByPrincipalBulk`);
            console.log(response);
            alert('All selected rows approved!');
            await getAssetsforPrincipal();
            setSelected([]);  
            setShowCheckboxes(false);  
        } catch (error) {
            console.error("Error approving assets:", error);
            alert('There was an error approving the selected assets. Please try again.');
        } finally {
            setOpenDialog(false);
        }
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
                <Box display="flex" justifyContent="flex-end" mb={5} mt={2} className="w-full">
                    <Box display="flex" justifyContent="space-between" mr={5}>
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
                            Approve All Selected </Button>
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
                                            indeterminate={selected.length > 0 && selected.length < Principalassets.length}
                                            checked={Principalassets.length > 0 && selected.length === Principalassets.length}
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
                            {paginatedAssets.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                        No pending approvals
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedAssets.map((asset) => {
                                    const isItemSelected = isSelected(asset.id);

                                    return (
                                        <TableRow key={asset.id} selected={isItemSelected}>
                                            <TableCell>
                                                {showCheckboxes && (
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        onClick={() => handleCheckboxClick(asset.id)} 
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>{asset.assetName || "N/A"}</TableCell>
                                            <TableCell>{asset.type || "N/A"}</TableCell>
                                            <TableCell>{asset.level1 || "N/A"}</TableCell>
                                            <TableCell>{asset.make || "N/A"}</TableCell>
                                            <TableCell>{asset.deptInfoDto?.deptName}</TableCell>
                                            <TableCell>{asset.location || "N/A"}</TableCell>
                                            <TableCell className={`${isItemSelected ? 'hidden' : 'visible'}`}>
                                                <Button variant="contained" color="success" onClick={() => {
                                                    navigate("/assetapprove-principal", { state: { asset } });
                                                }}>Approve</Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 25, 50]}
                    component="div"
                    count={Array.isArray(Principalassets) ? Principalassets.length : 0}
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

export default BulkApprovalPrincipal;