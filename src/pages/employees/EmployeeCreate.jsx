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
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export class Employee {
    id = 0;
    name = '';
    designation = '';
    phoneNum = '';
    email = '';
    status = '';
    role = '';
    deptInfoDto = new DeptInfoDto();
}

const employeeSchema = z.object({
    empName: z.string().min(1, "Employee name is required"),
    designation: z.string().min(1, "Designation is required"),
    email: z.string().email("Invalid email format"),
    phoneNumber: z.string().min(10).max(10).regex(/^\d{10}$/, "Phone number must be 10 digits"),
    department: z.number().min(1, "Department is required").optional(),
});

const EmployeeCreate = () => {
    const navigate = useNavigate();
    const { createEmployee, snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar } = useContext(EmployeeContext);
    const { departments = [], getDepts } = useDept();

    const [selectedImage, setSelectedImage] = useState(null);

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            empName: '',
            designation: '',
            email: '',
            phoneNumber: '',
            department:'',
        },
    });

    useEffect(() => {
        getDepts();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    const onSubmit = (data) => {
        const { empName, email, designation, status, phoneNumber, department } = data;

        const employee = new Employee();
        employee.name = empName;
        employee.designation = designation;
        employee.phoneNum = phoneNumber;
        employee.email = email;
        employee.status = status;
        employee.deptInfoDto = { id: department };
        console.log(employee);
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

                <form onSubmit={handleSubmit(onSubmit)} className="w-full ml-[240px] bg-neutral-200 rounded-lg p-5 mr-5">
                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Create Employee
                    </Typography>

                    <div className="flex w-2/3 justify-between items-center">
                        <FormLabel className="font-bold text-black w-1/3">
                            Employee Name <span className="text-red-600">*</span>
                        </FormLabel>
                        <Controller
                            name="empName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Enter Employee Name"
                                    sx={{ mb: 2, backgroundColor: 'white' }}
                                    error={!!errors.empName}
                                    helperText={errors.empName?.message}
                                    className="w-full rounded-md"
                                />
                            )}
                        />
                    </div>

                    <div className="flex w-2/3 justify-between items-center">
                        <FormLabel className="font-bold text-black w-1/3">
                            Designation <span className="text-red-600">*</span>
                        </FormLabel>
                        <Controller
                            name="designation"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth sx={{ mb: 3, backgroundColor: 'white' }}>
                                    <InputLabel>Designation</InputLabel>
                                    <Select {...field} error={!!errors.designation}>
                                        <MenuItem value="" selected>SELECT ROLE</MenuItem>
                                        <MenuItem value="ROLE_SYS_ADMIN">SYS_ADMIN</MenuItem>
                                        <MenuItem value="ROLE_PRINCIPAL">PRINCIPAL</MenuItem>
                                        <MenuItem value="ROLE_HOD">HOD</MenuItem>
                                        <MenuItem value="ROLE_INCHARGE">INCHARGE</MenuItem>
                                        <MenuItem value="ROLE_USER">USER</MenuItem>
                                    </Select>
                                    {errors.designation && <Typography color="error">{errors.designation.message}</Typography>}
                                </FormControl>
                            )}
                        />
                    </div>

                    <div className="flex w-2/3 justify-between items-center">
                        <FormLabel className="font-bold text-black w-1/3">
                            Department <span className="text-red-600">*</span>
                        </FormLabel>
                        <Controller
                            name="department"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth sx={{ mb: 3, backgroundColor: 'white' }}>
                                    <InputLabel>Department</InputLabel>
                                    <Select {...field} error={!!errors.department}>
                                        {Array.isArray(departments) &&departments.map(dept => (
                                            <MenuItem key={dept.id} value={dept.id}>
                                                {dept.deptName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.department && <Typography color="error">{errors.department.message}</Typography>}
                                </FormControl>
                            )}
                        />
                    </div>

                    <div className="flex w-2/3 justify-between items-center">
                        <FormLabel className="font-bold text-black w-1/3">
                            Email ID <span className="text-red-600">*</span>
                        </FormLabel>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Enter Email"
                                    type="email"
                                    sx={{ mb: 2, backgroundColor: 'white' }}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    className="rounded-md"
                                />
                            )}
                        />
                    </div>

                    <div className="flex w-2/3 justify-between items-center">
                        <FormLabel className="font-bold text-black w-1/3">
                            Phone Number <span className="text-red-600">*</span>
                        </FormLabel>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Enter Phone Number"
                                    type="tel"
                                    sx={{ mb: 2, backgroundColor: 'white' }}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber?.message}
                                    className="rounded-md"
                                />
                            )}
                        />
                    </div>
                    <div className="flex w-2/3 justify-between items-center">
                        <FormLabel className="font-bold text-black w-1/3">
                            Status <span className="text-red-600">*</span>
                        </FormLabel>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth sx={{ mb: 3, backgroundColor: 'white' }}>
                                    <InputLabel>Select Status</InputLabel>
                                    <Select {...field} error={!!errors.status}>
                                    
                                            <MenuItem value={"Active"}>
                                                {"Active"}
                                            </MenuItem>
                                            <MenuItem value={"InActive"}>
                                                {"InActive"}
                                            </MenuItem>
                                      
                                    </Select>
                                    {errors.status && <Typography color="error">{errors.status.message}</Typography>}
                                </FormControl>
                            )}
                        />
                    </div>

                    <div className="flex w-2/3 items-center">
                        <FormLabel className="font-bold text-black w-1/3">Employee Image</FormLabel>
                        <Button
                            component="label"
                            variant="contained"
                            className="justify-start"
                            startIcon={<Image />}
                        >
                            Upload Image
                            <VisuallyHiddenInput type="file" onChange={handleImageChange} />
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
                            sx={{ borderRadius: '20px', color: 'white', backgroundColor: '#002a5c' }}
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={() => navigate('/employees')}
                            className="bg-red-600 text-white ml-2"
                            sx={{ borderRadius: '20px' }}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Grid>

            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={closeSnackbar}>
                <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default EmployeeCreate;
