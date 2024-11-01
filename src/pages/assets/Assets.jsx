import React, { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, Button, Box, TablePagination, Avatar, Typography, Autocomplete, TextField, Modal, IconButton, Menu, MenuItem } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { PersonAddAlt, Share } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAsset } from '../../context/assets/AssetContext';
import axios from 'axios';

const Assets = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const { assets, getAssets } = useAsset();
    const [qr, setQr] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [filters, setFilters] = useState({
        deptname: null
    });
    const [assetName, setAssetName] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        getAssets();
    }, []);

    const handleViewQRCode = async (assetid, name) => {
        try {
            setAssetName(name);
            const response = await axios.get(
                `${process.env.REACT_APP_API_KEY}/api/assets/${assetid}/qrcode`,
                { responseType: 'blob' }
            );
            const imageUrl = URL.createObjectURL(response.data);
            setQr(imageUrl);
            setOpenModal(true);
        } catch (error) {
            console.error('Error fetching QR code:', error);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setQr(null);
    };

    const handleShareClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleShareClose = () => {
        setAnchorEl(null);
    };

    const handleShareEmail = () => {
        const mailtoLink = `mailto:?subject=QR Code&body=Check out this QR Code: ${qr}`;
        window.location.href = mailtoLink;
        handleShareClose();
    };

    const handleShareWhatsApp = () => {
        const whatsappLink = `https://wa.me/?text=Check out this QR Code: ${qr}`;
        window.open(whatsappLink, '_blank');
        handleShareClose();
    };

    const handlePrint = () => {
        const printWindow = window.open(qr, '_blank');
        if (printWindow) {
            printWindow.print();
        }
        handleShareClose();
    };

    const handleDownload = (name) => {
        const link = document.createElement('a');
        link.href = qr;
        link.download = `${name}_QRcode.png`;
        link.click();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAutoCompleteChange = (event, value, name) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        setPage(0);
    };

    const filteredAssets = Array.isArray(assets) ? assets.filter((asset) => {
        return (!filters.deptname || asset.deptname === filters.deptname);
    }) : [];
    const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Grid container>
            <Grid item style={{ width: '240px' }}>
                <Sidebar />
            </Grid>
            <Grid item xs style={{ paddingLeft: '20px', marginRight: '36px', overflowX: 'auto' }}>
                <Toolbar />
                <Box display="flex" justifyContent="flex-end" mb={5} mt={2}>
                    <Button
                        variant="contained"
                        className='bg-[#002a5c] rounded -3xl'
                        onClick={() => navigate('/asset-create')}
                    >
                        <span className='font-semibold'>Create Asset</span>
                        <PersonAddAlt sx={{ height: '20px', width: '20px', ml: 1 }} />
                    </Button>
                </Box>

                <Box>
                    <Box display={'flex'} alignItems={'center'} mb={3}>
                        <Typography className="font -bold">Asset Name : </Typography>
                        <Autocomplete
                            options={assets.map(department => department.deptName || '')}
                            value={filters.deptName || null}
                            onChange={(event, newValue) => handleAutoCompleteChange(event, newValue, 'deptName')}
                            renderInput={(params) => <TextField {...params} label="Select Asset Name" />}
                            sx={{ width: 200, marginLeft: 2 }}
                        />
                    </Box>
                </Box>

                <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
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
                                    <TableCell>{department.assetName}</TableCell>
                                    <TableCell>{department.type}</TableCell>
                                    <TableCell>{department.make}</TableCell>
                                    <TableCell>{department.model}</TableCell>
                                    <TableCell>{department.warrantyEndDate}</TableCell>
                                    <TableCell>{department.underAMC}</TableCell>
                                    <TableCell>{department.status}</TableCell>
                                    <TableCell>{department.underAMC}</TableCell>
                                    <TableCell className='text-center'>
                                        <Button
                                            className='bg-green-700 text-white text-sm'
                                            onClick={() => handleViewQRCode(department.id, department.assetName)}
                                        >
                                            View QR code
                                        </Button>
                                    </TableCell>
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
                <Modal open={openModal} onClose={handleCloseModal}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 300,
                            maxWidth: '90%',
                            padding: 4,
                            backgroundColor: 'white',
                            borderRadius: 2,
                            boxShadow: 24,
                            mx: 'auto',
                            mt: '15%',
                        }}
                    >
                        {qr ? (
                            <Box sx={{ textAlign: 'center' }}>
                                <Avatar
                                    variant="square"
                                    src={qr}
                                    alt="QR Code"
                                    sx={{ width: 200, height: 200, mb: 2 }}
                                />
                                <Button
                                    className='bg-green-700 text-white text-sm'
                                    onClick={() => handleDownload(assetName)}
                                > Download </Button>
                                <IconButton onClick={handleShareClick}>
                                    <Share />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleShareClose}
                                >
                                    <MenuItem onClick={handleShareEmail}>Share via Email</MenuItem>
                                    <MenuItem onClick={handleShareWhatsApp}>Share on WhatsApp</MenuItem>
                                    <MenuItem onClick={handlePrint}>Print</MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <Typography variant="h6" sx={{ mb: 2 }}>Loading QR code...</Typography>
                        )}
                        <Button onClick={handleCloseModal} variant="contained" sx={{ mt: 2 }}>
                            Close
                        </Button>
                    </Box>
                </Modal>
            </Grid>
        </Grid>
    );
};

export default Assets;