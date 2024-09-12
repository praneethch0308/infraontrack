import { Box, Button, FormGroup, FormLabel, Grid, Grid2, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import MuiAlert from '@mui/material/Alert';
import { DeptInfoDto, DeptProvider, useDept } from '../../context/departments/DeptContext'

const DepartmentCreate = () => {
    const navigate= useNavigate()
    const [formValues, setFormValues] = useState({
     deptName:'',
     hodName:'',
     phoneNumber:'',
     altphnno:'',
     email:''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    const { createDept, snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar } = useDept();
    const handleSubmit = (e) => {
        e.preventDefault();
        const { deptName,hodName,phoneNumber,email } = formValues;
        const department = new DeptInfoDto();
        department.deptName=deptName;
        department.hodName=hodName;
        department.phoneNumber=phoneNumber;
        department.email=email;
        createDept(department, navigate);
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
                   Create Department
                </Typography>
            <Grid2 className='flex w-2/3 justify-between items-center'>
                <FormLabel className='font-bold text-black w-1/3'>Department Name  <span className='text-red-600'>*</span></FormLabel>
            <TextField
                    fullWidth
                    required
                    label="Enter Department Name"
                    name="deptName"
                    value={formValues.deptName}
                    onChange={handleChange}
                    sx={{ mb: 2 ,  backgroundColor:'white',   border:'none'}}
                    className='w-full rounded-md '
                />
            </Grid2>
            <div className='flex w-2/3 justify-between items-center'>
            <FormLabel className='font-bold text-black w-1/3'>HOD Name  <span className='text-red-600'>*</span></FormLabel>
                 <TextField
                    fullWidth
                    required
                    label="Enter Hod Name"
                    name="hodName"
                    value={formValues.hodName}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ mb: 2 , backgroundColor:'white'}}
                    className='rounded-md'
                />
                </div>
                <div className='flex w-2/3 justify-between items-center'>
                <FormLabel className='font-bold text-black w-1/3'>Email ID  <span className='text-red-600'>*</span></FormLabel>
                <TextField
                    fullWidth
                    required
                    label="Enter Email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    type="email"
                    variant="outlined"
                    sx={{ mb: 2,backgroundColor:'white' }}
                    className='rounded-md'
                />
                </div>
                <div className='flex w-2/3 justify-between items-center'>
                <FormLabel className='font-bold text-black w-1/3'>Phone Number  <span className='text-red-600'>*</span></FormLabel>
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
                <FormLabel className='font-bold text-black w-1/3'>Alternate Phone Number </FormLabel>
                <TextField
                    fullWidth
                    label="Enter Alt Phone Number"
                    name="altphnno"
                    value={formValues.altphnno}
                    onChange={handleChange}
                    type="tel"
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
                    navigate('/departments')
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

export default DepartmentCreate
