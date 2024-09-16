import { Box, Button, FormGroup, FormLabel, Grid, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import MuiAlert from '@mui/material/Alert';
import { DeptInfoDto, DeptProvider, useDept } from '../../context/departments/DeptContext'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const deptSchema = z.object({
    deptName: z.string().min(1, "Department Name is required"),
    hodName: z.string().min(1, "HOD Name is required"),
    email: z.string().email("Invalid email format"),
    phoneNumber: z.string().min(10).max(10).regex(/^\d{10}$/, "Phone number must be 10 digits"),
    altphnno: z.string().optional(),
});

const DepartmentCreate = () => {
    const navigate = useNavigate();
    const { createDept, snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar } = useDept();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(deptSchema),
    });

    const onSubmit = (data) => {
        const { deptName, hodName, phoneNumber, email } = data;
        const department = new DeptInfoDto();
        department.deptName = deptName;
        department.hodName = hodName;
        department.phoneNumber = phoneNumber;
        department.email = email;
        createDept(department, navigate);
        console.log('Form Data:', data);
    };

    return (
        <div>
            <Grid container>
                <Grid item style={{ width: '240px' }}>
                    <Sidebar />
                </Grid>

                <form onSubmit={handleSubmit(onSubmit)} className='w-full ml-[240px] bg-neutral-200 rounded-lg p-5 mr-5'>
                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }} className='text-center'>
                        Create Department
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormLabel className='font-bold text-black'>Department Name <span className='text-red-600'>*</span></FormLabel>
                            <TextField
                                fullWidth
                                label="Enter Department Name"
                                {...register('deptName')}
                                error={!!errors.deptName}
                                helperText={errors.deptName?.message}
                                sx={{ mb: 2, backgroundColor: 'white' }}
                                className='rounded-md'
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormLabel className='font-bold text-black'>HOD Name <span className='text-red-600'>*</span></FormLabel>
                            <TextField
                                fullWidth
                                label="Enter HOD Name"
                                {...register('hodName')}
                                error={!!errors.hodName}
                                helperText={errors.hodName?.message}
                                sx={{ mb: 2, backgroundColor: 'white' }}
                                className='rounded-md'
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormLabel className='font-bold text-black'>Email ID <span className='text-red-600'>*</span></FormLabel>
                            <TextField
                                fullWidth
                                label="Enter Email"
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                type="email"
                                sx={{ mb: 2, backgroundColor: 'white' }}
                                className='rounded-md'
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormLabel className='font-bold text-black'>Phone Number <span className='text-red-600'>*</span></FormLabel>
                            <TextField
                                fullWidth
                                label="Enter Phone Number"
                                {...register('phoneNumber')}
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber?.message}
                                type="tel"
                                sx={{ mb: 2, backgroundColor: 'white' }}
                                className='rounded-md'
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormLabel className='font-bold text-black'>Alternate Phone Number</FormLabel>
                            <TextField
                                fullWidth
                                label="Enter Alt Phone Number"
                                {...register('altphnno')}
                                type="tel"
                                sx={{ mb: 2, backgroundColor: 'white' }}
                                className='rounded-md'
                            />
                        </Grid>
                    </Grid>

                    <div className='flex justify-center'>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ borderRadius: '20px', color: "white", backgroundColor: "#002a5c" }}
                        >
                            Submit
                        </Button>
                        <Button onClick={() => navigate('/departments')} className='bg-red-600 text-white rounded-3xl ml-5'>
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
    );
};

export default DepartmentCreate;
