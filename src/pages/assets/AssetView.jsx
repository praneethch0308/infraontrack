import { Box, Button, Grid, Toolbar, Typography, Modal, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AssetDetails from '../../components/Assetdetails/AssetDetails';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const AssetView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { asset } = location.state || {};

    const [openModal, setOpenModal] = useState(false);
    const [assetHistory, setAssetHistory] = useState([]); 


    const fetchAssetHistory = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/history/${asset.id}`);
            setAssetHistory(response.data.data); 
            setOpenModal(true);
        } catch (error) {
            console.error("Error fetching asset history:", error);
            setSnackbarMessage('Failed to fetch asset history');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    
    return (
        <Grid container>
            <Grid item style={{ width: '240px' }}>
                <Sidebar />
            </Grid>
            <Grid item xs style={{ paddingLeft: '20px', marginRight: '36px' }}>
                <Toolbar />
                <Typography className='font-bold text-xl text-center'>ASSET DETAILS</Typography>
                <div className='flex justify-between p-2'>
                    <Button variant="contained" color="primary" onClick={fetchAssetHistory}>
                        View History
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => navigate('/assets')}>
                        Back
                    </Button>
                </div>
                <div className='flex justify-around bg-blue-50 rounded-lg p-4'>
                    <div className='w-1/2'>
                        <AssetDetails title={"Asset Name"} value={asset.assetName} />
                        <AssetDetails title={"Description"} value={asset.description} />
                        <AssetDetails title={"Type"} value={asset.type} />
                        <AssetDetails title={"Item List"} value={asset.level1} />
                        <AssetDetails title={"Sub-Item list"} value={asset.level2} />
                        <AssetDetails title={"Sub-Item list 2"} value={asset.level3 || " N/A"} />
                        <AssetDetails title={"Make"} value={asset.make} />
                        <AssetDetails title={"Model"} value={asset.model} />
                        <AssetDetails title={"Is Serialized"} value={asset.isSerialized ? "Yes" : "No"} />
                        <AssetDetails title={"Serial No"} value={asset.serialNo} />
                    </div>
                    <div className='w-1/2'>
                        <AssetDetails title={"Phone Number"} value={asset.phoneNum || "N/A"} />
                        <AssetDetails title={"Geo Location"} value={asset.geoLocation || "N/A"} />
                        <AssetDetails title={"Value"} value={asset.value} />
                        <AssetDetails title={"Purchase Date"} value={asset.purchaseDate} />
                        <AssetDetails title={"Is Under Warranty"} value={asset.isUnderWarranty ? "Yes" : "No"} />
                        <AssetDetails title={"Warranty End Date"} value={asset.warrantyEndDate || "N/A"} />
                        <AssetDetails title={"Is Under AMC"} value={asset.underAMC ? "Yes" : "No"} />
                        <AssetDetails title={"AMC End Date"} value={asset.amcEndDate || "N/A"} />
                        <AssetDetails title={"Status"} value={asset.status} />
                        <AssetDetails title={"Approved by HOD "} value={asset.isApprovedByHOD ? "Yes" : "No"} />
                    </div>
                </div>

                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '1px solid #000',
                        borderRadius:'10px',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        {Array.isArray(assetHistory) && assetHistory.length > 0 ? (
                            assetHistory.map((historyItem, index) => (
                                <Typography key={index}>
                                    <b>Act Code:</b> {historyItem.actCode}<br />
                                    <b>Description:</b> {historyItem.description}<br />
                                    <b>Act Time:</b> {historyItem.actTime}<br />
                                    <br />
                                </Typography>
                            ))
                        ) : (
                            <Typography>No history available</Typography>
                        )}
                    </Box>
                </Modal>
            </Grid>
        </Grid>
    );
};

export default AssetView;