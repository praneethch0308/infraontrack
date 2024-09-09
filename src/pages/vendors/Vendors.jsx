import React, { useContext, useEffect, useState } from 'react';
import {
    Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Toolbar, Button, Box, TablePagination, Autocomplete, TextField,
    Typography
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { PersonAddAlt } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useVendor } from '../../context/vendors/VendorContext';

const VendorsPage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [filters, setFilters] = useState({
        name: null,
        phoneNumber: null,
        companyType: null,
    });
    const { vendors = [], getVendors } = useVendor();

    useEffect(() => {
        getVendors();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAutocompleteChange = (event, value, name) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        setPage(0); 
    };

    const filteredVendors = Array.isArray(vendors) ? vendors.filter((vendor) => {
        return (
            (!filters.name || vendor.companyName === filters.name) &&
            (!filters.phoneNumber || vendor.phoneNumber === filters.phoneNumber) &&
            (!filters.companyType || vendor.companyType === filters.companyType)
        );
    }) : [];

    const paginatedVendors = filteredVendors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Grid container>
            <Grid item style={{ width: '240px' }}>
                <Sidebar />
            </Grid>
            <Grid item xs style={{ paddingLeft: '10px', marginRight: '36px' }}>
                <Toolbar />
                <Box display="flex" justifyContent="flex-end" mb={5} mt={2}>
                    <Button
                        variant="contained"
                        className='bg-[#002a5c] rounded-3xl'
                        onClick={() => navigate('/vendor-create')}>
                        <span className='font-semibold'>Create Vendor</span>
                        <PersonAddAlt sx={{ height: '20px', width: '20px', ml: 1 }} />
                    </Button>
                </Box>

                <Box display="flex" justifyContent={"space-between"} mb={2}>
                    <Box display="flex" justifyContent={"space-evenly"} className='items-center w-1/3'>
                        <Typography className='font-bold'>Company Name :</Typography>
                        <Autocomplete
                            options={filteredVendors.map(vendor => ({ label: vendor.companyName, value: vendor.companyName }))}
                            value={filters.name ? { label: filters.name, value: filters.name } : null}
                            onChange={(event, newValue) => handleAutocompleteChange(event, newValue ? newValue.value : null, 'name')}
                            renderInput={(params) => <TextField {...params} label="Select Company Name" />}
                            getOptionLabel={(option) => option.label || ""}
                            sx={{ width: 170, borderRadius: 30 }}
                        />
                    </Box>

                    <Box display="flex" justifyContent={"space-evenly"} alignItems={"center"} className="w-1/3">
                        <Typography className='font-bold'>Phone No :</Typography>
                        <Autocomplete
                            options={filteredVendors.map(vendor => ({ label: vendor.phoneNumber, value: vendor.phoneNumber }))}
                            value={filters.phoneNumber ? { label: filters.phoneNumber, value: filters.phoneNumber } : null}
                            onChange={(event, newValue) => handleAutocompleteChange(event, newValue ? newValue.value : null, 'phoneNumber')}
                            renderInput={(params) => <TextField {...params} label="Select Phone Number" />}
                            getOptionLabel={(option) => option.label || ""}
                            sx={{ width: 170 }}
                        />
                    </Box>

                    <Box display="flex" justifyContent={"space-evenly"} alignItems={"center"} className="w-1/3">
                        <Typography className='font-bold'>Company Type :</Typography>
                        <Autocomplete
                            options={filteredVendors.map(vendor => ({ label: vendor.companyType, value: vendor.companyType }))}
                            value={filters.companyType ? { label: filters.companyType, value: filters.companyType } : null}
                            onChange={(event, newValue) => handleAutocompleteChange(event, newValue ? newValue.value : null, 'companyType')}
                            renderInput={(params) => <TextField {...params} label="Select Company Type" />}
                            getOptionLabel={(option) => option.label || ""}
                            sx={{ width: 170 }}
                        />
                    </Box>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#002a5c', '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold', fontSize: '14px' } }}>
                                <TableCell>Company Name</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Company Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedVendors.map((vendor) => (
                                <TableRow key={vendor.id}>
                                    <TableCell>{vendor.companyName}</TableCell>
                                    <TableCell>{vendor.address}</TableCell>
                                    <TableCell>{vendor.email}</TableCell>
                                    <TableCell>{vendor.phoneNumber}</TableCell>
                                    <TableCell>{vendor.companyType}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 25, 50]}
                    component="div"
                    count={filteredVendors.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid>
    );
};

export default VendorsPage;
