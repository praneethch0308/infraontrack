import { Box, Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Image } from '@mui/icons-material';
import { useContext } from 'react';

import MuiAlert from '@mui/material/Alert';
import EmployeeContext from '../../context/employees/EmployeeContext';
import { DeptInfoDto, useDept } from '../../context/departments/DeptContext';

export class Employee {
    id = 0;
    name = '';
    designation = '';
    phoneNum = '';
    email = '';
    status = '';
    role = '';
     deptInfoDto= new DeptInfoDto();
}

const EmployeeCreate = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        empName: '',
        designation: '',
        email: '',
        phoneNumber: '',
        altphnno: '',
        status: '',
        department:[]
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const { createEmployee, snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar } = useContext(EmployeeContext);
    const { departments = [], getDepts } = useDept();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    useEffect(()=>{
        getDepts()
    },[])
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { empName, email, designation, status, phoneNumber ,department} = formValues;

        const employee = new Employee();
        employee.name = empName;
        employee.designation = designation;
        employee.phoneNum = phoneNumber;
        employee.email = email;
        employee.status = status;
        employee.deptInfoDto={id:department};

        createEmployee(employee, navigate);
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <div>
            <Grid container>
                <Grid item style={{ width: '240px' }}>
                    <Sidebar />
                </Grid>

                <form onSubmit={handleSubmit} className="w-full ml-[240px] bg-neutral-200 rounded-lg p-5 mr-5">
                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Create Employee
                    </Typography>
                    <div className="flex w-2/3 justify-between items-center">
                        <FormLabel className="font-bold text-black w-1/3">
                            Employee Name <span className="text-red-600">*</span>
                        </FormLabel>
                        <TextField
                            fullWidth
                            label="Enter Employee Name"
                            name="empName"
                            value={formValues.empName}
                            onChange={handleChange}
                            sx={{ mb: 2, backgroundColor: 'white', border: 'none' }}
                            className="w-full rounded-md"
                        />
                    </div>
                    <div className="flex w-2/3 justify-between items-center">
                    <FormLabel className="font-bold text-black w-1/3">
                             Designation <span className="text-red-600">*</span>
                        </FormLabel>
                    <Box className="w-full bg-white mb-3 rounded-md">
                        <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Designation</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name='designation'
                                value={formValues.designation}
                                label="Age"
                                onChange={handleChange}
                                className='w-full'
                             >
                                <MenuItem value={"ROLE_SYS_ADMIN"}>SYS_ADMIN</MenuItem>
                                <MenuItem value={"ROLE_PRINCIPAL"}>PRINCIPAL</MenuItem>
                                <MenuItem value={"ROLE_HOD"}>HOD</MenuItem>
                                <MenuItem value={"ROLE_INCHARGE"}>INCHARGE</MenuItem>
                                <MenuItem value={"ROLE_USER"}>USER</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                    </div>

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

                    <div className="flex w-2/3 justify-between items-center">
                        <FormLabel className="font-bold text-black w-1/3">
                            Email ID <span className="text-red-600">*</span>
                        </FormLabel>
                        <TextField
                            fullWidth
                            label="Enter Email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            type="email"
                            variant="outlined"
                            sx={{ mb: 2, backgroundColor: 'white' }}
                            className="rounded-md"
                        />
                    </div>
                    <div className="flex w-2/3 justify-between items-center">
                        <FormLabel className="font-bold text-black w-1/3">
                            Phone Number <span className="text-red-600">*</span>
                        </FormLabel>
                        <TextField
                            fullWidth
                            label="Enter Phone Number"
                            name="phoneNumber"
                            value={formValues.phoneNumber}
                            onChange={handleChange}
                            type="tel"
                            variant="outlined"
                            sx={{ mb: 2, backgroundColor: 'white' }}
                            className="rounded-md"
                        />
                    </div>
                    <div className="flex w-2/3 justify-between items-center">
                        <FormLabel className="font-bold text-black w-1/3">Status</FormLabel>
                        <TextField
                            fullWidth
                            label="Enter Status"
                            name="status"
                            value={formValues.status}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{ mb: 2, backgroundColor: 'white' }}
                            className="rounded-md"
                        />
                    </div>
                    <div className="flex w-2/3 items-center">
                        <FormLabel className="font-bold text-black w-1/3">Employee Image</FormLabel>
                        <Button
                            component="label"
                            variant="contained"
                            className='justify-start'
                            startIcon={<Image />}
                        >
                            Upload Image
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleImageChange}
                            />
                        </Button>
                    </div>
                    {selectedImage && (
                        <div className="mt-4 w-2/3">
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="rounded-md max-w-full max-h-40 object-cover"
                            />
                        </div>
                    )}
                    <div className="flex justify-center mt-4">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ borderRadius: '20px', color: "white", backgroundColor: "#002a5c" }}
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={() => navigate('/employees')}
                            className="bg-red-600 text-white rounded-3xl ml-5"
                        >
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

export default EmployeeCreate;
