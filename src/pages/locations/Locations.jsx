import React, { useEffect, useState } from 'react';
import {
    Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Toolbar, Button, Box, TablePagination, Avatar, Modal, Typography, IconButton, Menu, MenuItem
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { Download, PersonAddAlt, Share as ShareIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ExportToExcelButton from '../../components/excelbutton/ExcelButton';
import { useLoctn } from '../../context/locations/LocationContext';
import axios from 'axios';

const Locations = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [qr, setQr] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const { locations = [], getLoctns } = useLoctn();
    const [locationName, setLocationName]= useState('');

    const [anchorEl, setAnchorEl] = useState(null); 
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        getLoctns();
    }, []);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewQRCode = async (id,name) => {
        try {
            setLocationName(name);
            const response = await axios.get(
                `${process.env.REACT_APP_API_KEY}/Locations/${id}/qrcode`,
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
        link.download =`${name}_QRcode.png`;
        link.click();
    };

    const paginatedLocations = Array.isArray(locations) && locations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Grid container>
            <Grid item style={{ width: '240px' }}>
                <Sidebar />
            </Grid>
            <Grid item xs style={{ paddingLeft: '20px', marginRight: '36px' }}>
                <Toolbar />
                <Box display="flex" justifyContent="flex-end" mb={5} mt={2} className="w-full">
                    <Box display="flex" justifyContent="space-between" mr={5}>
                        <Box mr={3}>
                            <ExportToExcelButton tableId="LocationTable" />
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
                                <TableCell className='text-center'>Name</TableCell>
                                <TableCell className='text-center'>Incharge</TableCell>
                                <TableCell className='text-center'>Department</TableCell>
                                <TableCell className='text-center'>Branch</TableCell>
                                <TableCell className='text-center'>Room No</TableCell>
                                <TableCell className='text-center'>Asset Count</TableCell>
                                <TableCell className='text-center'>QR Code</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(paginatedLocations) && paginatedLocations.map((location) => (
                                <TableRow key={location.id}>
                                    <TableCell className='text-center'>{location.name}</TableCell>
                                    <TableCell className='text-center'>{location.inchargeName}</TableCell>
                                    <TableCell className='text-center'>{location.deptName}</TableCell>
                                    <TableCell className='text-center'>{location.branch}</TableCell>
                                    <TableCell className='text-center'>{location.roomNum}</TableCell>
                                    <TableCell className='text-center'>{location.assetCount}</TableCell>
                                    <TableCell className='text-center'>
                                        <Button
                                            className='bg-green-700 text-white text-sm'
                                            onClick={() => handleViewQRCode(location.id,location.name)}
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
                    count={locations.length}
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
                                    onClick={() => handleDownload(locationName)}
                                        > Download </Button>
                                <IconButton onClick={handleShareClick}>
                                    <ShareIcon />
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

export default Locations;
