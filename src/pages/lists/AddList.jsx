import { Alert, Box, Button, FormControl, FormGroup, FormLabel, Grid, Grid2, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { DeptInfoDto, DeptProvider, useDept } from '../../context/departments/DeptContext';
import { LocationInfoDto, useLoctn } from '../../context/locations/LocationContext';
import EmployeeContext from '../../context/employees/EmployeeContext';
import axios from 'axios';
import { useList } from '../../context/lists/ListContext';
const AddList = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name:"",
        status:""


    });
const {createSysList, snackbarOpen, snackbarMessage, snackbarSeverity, handleCloseSnackbar }= useList();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };


    
    const baseURl = process.env.REACT_APP_API_KEY;

    const handleSubmit = (e) => {
        e.preventDefault();
        const {name,status}= formValues
        const syslist = {
          name:name,
          status:'Active'
        };
        console.log(syslist);
        createSysList(syslist, navigate);
    };

  return (
    <div>
    <Grid container>
        <Grid item style={{ width: '240px' }}>
            <Sidebar />
        </Grid>
        <form onSubmit={handleSubmit} className='w-full ml-[240px] bg-neutral-200 rounded-lg p-5 mr-5'>
            <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }} className='text-center'>
                Add System List
            </Typography>
            <Grid2 className='flex w-2/3 justify-between items-center'>
                <FormLabel className='font-bold text-black w-1/3'> Name <span className='text-red-600'>*</span></FormLabel>
                <TextField
                    fullWidth
                    required
                    label="Enter Asset Type"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    sx={{ mb: 2, backgroundColor: 'white', border: 'none' }}
                    className='w-full rounded-md'
                />
            </Grid2>
            <div className='flex justify-center'>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ borderRadius: '20px', color: "white", backgroundColor: "#002a5c" }}
                        >
                            Submit
                        </Button>
                        <Button onClick={() => navigate('/lists')} className='bg-red-600 text-white rounded-3xl ml-5'>
                            Cancel
                        </Button>
                    </div>
        </form>
                        <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
    </Grid>  
</div>
  )
}

export default AddList
