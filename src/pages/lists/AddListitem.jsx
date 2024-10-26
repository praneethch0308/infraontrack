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
const AddListitem = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name:"",
        status:"",
        listitem:''


    });
const {createSysListTwo, snackbarOpen, snackbarMessage, snackbarSeverity, handleCloseSnackbar,getSysList,syslist }= useList();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    useEffect(()=>{
        getSysList();
    },[]);

    
    const baseURl = process.env.REACT_APP_API_KEY;

    const handleSubmit = (e) => {
        e.preventDefault();
        const {name,status,listitem}= formValues
        const syslist = {
            listName:name,
          status:'Active',
          listItem:listitem
        };
        console.log(syslist);
        createSysListTwo(syslist,name,navigate);
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
            <div className="flex w-2/3 justify-between items-center">
                        <FormLabel className="font-bold text-black w-1/3">
                            List Name <span className="text-red-600">*</span>
                        </FormLabel>
                        <Box className="w-full bg-white mb-3 rounded-md">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" className='rounded-md'>List Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    name='name'
                                    required
                                    value={formValues.name}
                                    label="name"
                                    onChange={handleChange}
                                    className='w-full'
                                >
                                    {syslist.map(syslist => (
                                        <MenuItem value={`${syslist.name}`}>{syslist.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
            <Grid2 className='flex w-2/3 justify-between items-center'>
                <FormLabel className='font-bold text-black w-1/3'> List-Item Name <span className='text-red-600'>*</span></FormLabel>
                <TextField
                    fullWidth
                    required
                    label="Enter List-Item Name"
                    name="listitem"
                    value={formValues.listitem}
                    onChange={handleChange}
                    sx={{ mb: 2, backgroundColor: 'white', border: 'none' }}
                    className='w-full rounded-md '
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

export default AddListitem
