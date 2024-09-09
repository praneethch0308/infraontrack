import { Box, Button, FormControl, FormGroup, FormLabel, Grid, Grid2, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import MuiAlert from '@mui/material/Alert';
import { DeptInfoDto, DeptProvider, useDept } from '../../context/departments/DeptContext'
import { LocationInfoDto, useLoctn } from '../../context/locations/LocationContext';

const LocationCreate = () => {
    const navigate= useNavigate()
    const [formValues, setFormValues] = useState({
        name:'',
     incharge:'',
     department:'',
     branch:'',
     roomNum:'',
     phoneNumber:'',
     assetCount:''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    const { createLoctn, snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar } = useLoctn();
    const { departments = [], getDepts } = useDept();

    useEffect(()=>{
        getDepts();
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name,department,incharge,branch,roomNum,assetCount,phoneNumber } = formValues;

        const location = new LocationInfoDto()
        location.name=name
        location.assetInchargeDto=incharge;
        location.roomNum=roomNum;
        location.branch=branch;
        location.assetCount=assetCount;
        location.inchargePhone=phoneNumber;
        location.deptInfoDto={id:department};
        createLoctn(location, navigate);
        console.log(location);
        console.log('Form Data:', formValues);
    };

  return (
    <div>
      <Grid container>
        <Grid item style={{width:'240px'}}>
            <Sidebar/>
        </Grid>

        <form onSubmit={handleSubmit} className='w-full ml-[240px] bg-neutral-200 rounded-lg p-5 mr-5' >
                <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight:'bold' }} className='text-center' >
                   Create Location
                </Typography>
            <Grid2 className='flex w-2/3 justify-between items-center'>
                <FormLabel className='font-bold text-black w-1/3'> Name  <span className='text-red-600'>*</span></FormLabel>
            <TextField
                    fullWidth
                    required
                    label="Enter Location Name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    sx={{ mb: 2 ,  backgroundColor:'white',   border:'none'}}
                    className='w-full rounded-md '
                />
            </Grid2>
            <div className="flex w-2/3 justify-between items-center">
                    <FormLabel className="font-bold text-black w-1/3">
                             Department <span className="text-red-600">*</span>
                        </FormLabel>
                    <Box className="w-full bg-white mb-3 rounded-md">
                        <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" className='rounded-md'>Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name='department'
                                value={formValues.department}
                                label="Department"
                                onChange={handleChange}
                                className='w-full'
                             >
                                {departments.map(department => (
                                       <MenuItem value={department.id}>{department.deptName}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        </Box>
                    </div>
            <div className='flex w-2/3 justify-between items-center'>
            <FormLabel className='font-bold text-black w-1/3'>branch  <span className='text-red-600'>*</span></FormLabel>
                 <TextField
                    fullWidth
                    required
                    label="Enter Branch"
                    name="branch"
                    value={formValues.branch}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ mb: 2 , backgroundColor:'white'}}
                    className='rounded-md'
                />
                </div>
                <div className='flex w-2/3 justify-between items-center'>
                <FormLabel className='font-bold text-black w-1/3'>Incharge <span className='text-red-600'>*</span></FormLabel>
                <TextField
                    fullWidth
                    required
                    label="Enter Email"
                    name="incharge"
                    value={formValues.incharge}
                    onChange={handleChange}
                    type="text"
                    variant="outlined"
                    sx={{ mb: 2,backgroundColor:'white' }}
                    className='rounded-md'
                />
                </div>
                <div className='flex w-2/3 justify-between items-center'>
                <FormLabel className='font-bold text-black w-1/3'>Incharge Phone Number  <span className='text-red-600'>*</span></FormLabel>
                <TextField
                    fullWidth
                    required
                    label="Enter Phone Number"
                    name="phoneNumber"
                    value={formValues.phoneNumber}
                    onChange={handleChange}
                    type="tel"
                    variant="outlined"
                    sx={{ mb: 2 , backgroundColor:'white'}}
                    className='rounded-md'
                />
             </div>
             <div className='flex w-2/3 justify-between items-center'>
                <FormLabel className='font-bold text-black w-1/3'>Room Number </FormLabel>
                <TextField
                    fullWidth
                    label="Enter Alt Phone Number"
                    name="roomNum"
                    value={formValues.roomNum}
                    onChange={handleChange}
                    type="tel"
                    variant="outlined"
                    sx={{ mb: 2 , backgroundColor:'white'}}
                    className='rounded-md'
                />
             </div>
             <div className='flex w-2/3 justify-between items-center'>
            <FormLabel className='font-bold text-black w-1/3'>Asset Count<span className='text-red-600'>*</span></FormLabel>
                 <TextField
                    fullWidth
                    required
                    label={"Enter Hod Name"}
                    name="assetCount"
                    value={formValues.assetCount}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ mb: 2 , backgroundColor:'white'}}
                    className='rounded-md'
                />
                </div>
            <div className='flex justify-center'>
                <Button
                    type="submit"
                    variant="contained"
                    
                    sx={{ borderRadius: '20px',color:"white",backgroundColor:"#002a5c" }}
                    className='justify-center'
                >
                    Submit
                </Button>
                <Button onClick={()=>{
                    navigate('/locations')
                }} className='bg-red-600 text-white rounded-3xl ml-5'>
                    Cancel
                </Button>
                </div>
            </form>

      </Grid>

      <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MuiAlert onClose={closeSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
    </div>
  )
}

export default LocationCreate
