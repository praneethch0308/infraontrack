import { Box, Button, Grid, Toolbar, Typography, Dialog, DialogActions, DialogContent, DialogContentText, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AssetDetails from '../../components/Assetdetails/AssetDetails';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const  AssetApproveHod = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { asset } = location.state || {};

    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
const baseUrl= process.env.REACT_APP_API_KEY
    const handleApprove = async () => {
        try {
           
            const role = localStorage.getItem('role');
            console.log("Role retrieved from localStorage:", role); 
            console.log(asset.id);
            const response = await axios.post(`${baseUrl}/api/assets/approve/hod/${asset.id}`);
            console.log(response.data);
          

            console.log("API response:", response.data);
            setSnackbarMessage('Asset approved successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            navigate('/bulkapproval-hod');
        
        } catch (error) {
            console.error("Error approving asset:", error);
            setSnackbarMessage('Failed to approve asset');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleDialogConfirm = () => {
        handleApprove();
        setOpenDialog(false);
    };

    return (
        <Grid container>
            <Grid item style={{ width: '240px' }}>
                <Sidebar />
            </Grid>
            <Grid item xs style={{ paddingLeft: '20px', marginRight: '36px' }}>
                <Toolbar />
                <Typography className='font-bold text-xl text-center'>ASSET DETAILS</Typography>
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
                        <AssetDetails title ={"Is Under AMC"} value={asset.underAMC ? "Yes" : "No"} />
                        <AssetDetails title={"AMC End Date"} value={asset.amcEndDate || "N/A"} />
                        <AssetDetails title={"Status"} value={asset.status} />
                        <AssetDetails title={"Approved by HOD "} value={asset.isApprovedByHOD ? "Yes" : "No"} />
                    </div>
                </div>
                <div className='flex justify-center p-2'>
                    <Button variant="contained" color="success" onClick={() => setOpenDialog(true)}>APPROVE</Button>
                </div>
                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to approve this asset?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>No</Button>
                        <Button onClick={handleDialogConfirm} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                    severity={snackbarSeverity}
                />
            </Grid>
        </Grid>
    );
};

export default  AssetApproveHod;