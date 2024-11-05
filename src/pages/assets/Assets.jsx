import React, { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, Button, Box, TablePagination, Avatar, Typography, Autocomplete, TextField, Modal, IconButton, Menu, MenuItem } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { AddBox, Edit, RemoveRedEye, Share } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAsset } from '../../context/assets/AssetContext';

const Assets = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const { assets, getAssets } = useAsset();
    const [qr, setQr] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [filters, setFilters] = useState({
        assetName: null,
        assetType: null  
    });
    const [assetName, setAssetName] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [assetTypes, setAssetTypes] = useState([]); 

    useEffect(() => {
        getAssets();
        fetchAssetTypes(); 
    }, []);

    const fetchAssetTypes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_KEY}/list/system-list`);
            if (response.data.status === "OK") {
                setAssetTypes(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching asset types:', error);
        }
    };

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
        setFilters(( prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        setPage(0);
    };

    const handleEditAsset = (asset) => {
        navigate(`/asset-update`, { state: { asset } });
    };

    const filteredAssets = Array.isArray(assets) ? assets.filter((asset) => {
        return (
            (!filters.assetName || asset.assetName === filters.assetName) &&
            (!filters.assetType || asset.type === filters.assetType) 
        );
    }) : [];

    const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Grid container>
            <Grid item style={{ width: '240px' }}>
                <Sidebar />
            </Grid>
            <Grid item xs style={{ paddingLeft: '20px', marginRight: '36px', overflowX: 'auto' }}>
                <Toolbar />
                <Box display="flex" justifyContent="flex-end" mb={5} mt={2} borderRadius={20} >
                    <Button
                        variant="contained"
                        className='bg-[#002a5c] rounded -3xl'
                        onClick={() => navigate('/asset-create')}
                    >
                        <span className='font-semibold'>Create Asset</span>
                        <AddBox sx={{ height: '20px', width: '20px', ml: 1 }} />
                    </Button>
                </Box>

                <Box display={'flex'}>
                    <Box display={'flex'} alignItems={'center'} mb={3}>
                        <Typography className="font-bold">Asset Name: </Typography>
                        <Autocomplete
                            options={assets.map(asset => asset.assetName || '')}
                            value={filters.assetName || null}
                            onChange={(event, newValue) => handleAutoCompleteChange(event, newValue, 'assetName')}
                            renderInput={(params) => <TextField {...params} label="Select Asset Name" />}
                            sx={{ width: 200, marginLeft: 2 }}
                        />
                    </Box>

                    <Box display={'flex'} alignItems={'center'} mb={3} ml={3}>
                        <Typography className="font-bold">Asset Type: </Typography>
                        <Autocomplete
                            options={assetTypes.map(type => type.name)} 
                            value={filters.assetType || null}
                            onChange={(event, newValue) => handleAutoCompleteChange(event, newValue, 'assetType')}
                            renderInput={(params) => <TextField {...params} label="Select Asset Type" />}
                            sx={{ width: 200, marginLeft: 2 }}
                        />
                    </Box>
                </Box>

                <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#002a5c', '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold' } }}>
                                <TableCell className='text-center'>Name</TableCell>
                                <TableCell className='text-center'>Type</TableCell>
                                <TableCell className='text-center'>Make</TableCell>
                                <TableCell className='text-center'>Model</TableCell>
                                <TableCell className='text-center'>Warranty</TableCell>
                                <TableCell className='text-center'>In AMC</TableCell>
                                <TableCell className='text-center'>Status</TableCell>
                                <TableCell className='text-center'>Image</TableCell>
                                <TableCell className='text-center'>QR Code</TableCell>
                                <TableCell className='text-center'>Approved by Principal</TableCell>
                                <TableCell className='text-center'>Approved by HOD</TableCell>
                                <TableCell className='text-center'>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedAssets.map((asset) => (
                                <TableRow key={asset.id}>
                                    <TableCell className='text-center'>{asset.assetName}</TableCell>
                                    <TableCell className='text-center'>{asset.type}</TableCell>
                                    <TableCell className='text-center'>{asset.make}</TableCell>
                                    <TableCell className='text-center'>{asset.model}</TableCell>
                                    <TableCell className='text-center'>{asset.warrantyEndDate || "N/A"}</TableCell>
                                    <TableCell className='text-center'>{asset.underAMC ? '✅' : '❌'}</TableCell>
                                    <TableCell className='text-center'>{asset.status}</TableCell>
                                    <TableCell className='text-center'>{asset.underAMC}</TableCell>
                                    <TableCell className='text-center'>
                                        <Button
                                            className='bg-green-700 text-white text-sm'
                                            onClick={() => handleViewQRCode(asset.id, asset.assetName)}
                                        > View
                                        </Button>   
                                    </TableCell>
                                    <TableCell className='text-center'>{asset.isApprovedByPrinicipal ? '✅' : '❌'}</TableCell>
                                    <TableCell className='text-center'>{asset.isApprovedByHOD ? '✅' : '❌'}</TableCell> 
                                    <TableCell className='text-center'>
                                        <div className='flex items-center justify-center'>
                                            <Button onClick={() => {
                                                navigate("/assetview", { state: { asset } });
                                            }}> <RemoveRedEye/> </Button>    
                                            <Button onClick={() => {
                                                handleEditAsset(asset);
                                            }}><Edit /></Button>
                                        </div>
                                    </TableCell>       
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 25, 50]}
                    component="div"
                    count={filteredAssets.length}
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