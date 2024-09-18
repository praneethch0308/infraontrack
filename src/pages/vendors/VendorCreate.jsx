import React, { useState } from 'react';
import {
    Box, Button, FormGroup, FormLabel, Grid, Snackbar, TextField, Typography,
    Table, TableBody, TableCell, TableHead, TableRow, MenuItem, Select, FormControl,
    InputLabel, Alert
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useVendor, ContactInfoDto, VendorInfoDto } from '../../context/vendors/VendorContext';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const vendorSchema = z.object({
    companyName: z.string().min(1, "Company Name is required"),
    address: z.string().min(1, "Address is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    altPhoneNumber: z.string().optional(),
    companyType: z.string().min(1, "Company Type is required"),
});


const contactSchema = z.object({
    name: z.string().min(1, "Contact Name is required"),
    phone: z.string().min(1, "Phone Number is required"),
    designation: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
});

const VendorCreate = () => {
    const navigate = useNavigate();
    const { createVendor, snackbarOpen, snackbarMessage, snackbarSeverity, handleCloseSnackbar } = useVendor();

    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(vendorSchema),
        defaultValues: {
            companyName: '',
            address: '',
            email: '',
            phoneNumber: '',
            altPhoneNumber: '',
            companyType: '',
        },
    });

    const [contactFormValues, setContactFormValues] = useState({
        name: '',
        designation: '',
        phone: '',
        email: '',
    });

    const [contacts, setContacts] = useState([]);

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactFormValues({
            ...contactFormValues,
            [name]: value,
        });
    };

    const addContact = () => {
        const { name, phone, designation, email } = contactFormValues;
        if (name && phone) {
            setContacts([...contacts, { name, phone, designation, email }]);
            setContactFormValues({ name: '', designation: '', phone: '', email: '' });
        } else {
            alert("Please provide at least a name and phone number for the contact.");
        }
    };

    const onSubmit = (data) => {
        const vendor = new VendorInfoDto();
        vendor.companyName = data.companyName;
        vendor.companyType = data.companyType;
        vendor.address = data.address;
        vendor.phoneNumber = data.phoneNumber;
        vendor.altPhoneNumber = data.altPhoneNumber;
        vendor.email = data.email;
        vendor.contacts = contacts.map(contact => new ContactInfoDto(contact));
        createVendor(vendor, navigate);
        console.log('Form Data:', vendor);
        console.log('Contacts:', contacts);
    };

    return (
        <div>
            <Grid container>
                <Grid item style={{ width: '240px' }}>
                    <Sidebar />
                </Grid>

                <form onSubmit={handleSubmit(onSubmit)} className='w-full ml-[240px] bg-neutral-200 rounded-lg p-5 mr-5'>
                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }} className='text-center'>
                        Create Vendor
                    </Typography>

                    <Grid className='flex w-2/3 justify-between items-center'>
                        <FormLabel className='font-bold text-black w-1/3'>
                            Company Name <span className='text-red-600'>*</span>
                        </FormLabel>
                        <Controller
                            name="companyName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    required
                                    label="Enter Company Name"
                                    {...field}
                                    error={!!errors.companyName}
                                    helperText={errors.companyName ? errors.companyName.message : ''}
                                    sx={{ mb: 2, backgroundColor: 'white', border: 'none', 
                                        '& .MuiInputBase-root': { height: '44px' }, 
                                        '& .MuiInputBase-input': { padding: '5px' }}}
                                    className='w-full rounded-md'
                                />
                            )}
                        />
                    </Grid>

                    <Grid className='flex w-2/3 justify-between items-center'>
                        <FormLabel className='font-bold text-black w-1/3'>
                            Address <span className='text-red-600'>*</span>
                        </FormLabel>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    required
                                    label="Enter Address"
                                    {...field}
                                    multiline
                                    error={!!errors.address}
                                    helperText={errors.address ? errors.address.message : ''}
                                    sx={{ mb: 2, backgroundColor: 'white', border: 'none', 
                                        '& .MuiInputBase-root': { height: '44px' }, 
                                        '& .MuiInputBase-input': { padding: '5px' }}}
                                    className='rounded-md '
                                />
                            )}
                        />
                    </Grid>

                    <Grid className='flex w-2/3 justify-between items-center'>
                        <FormLabel className='font-bold text-black w-1/3'>
                            Email ID <span className='text-red-600'>*</span>
                        </FormLabel>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    required
                                    label="Enter Email"
                                    type="email"
                                    {...field}
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email.message : ''}
                                    sx={{ mb: 2, backgroundColor: 'white', border: 'none', 
                                        '& .MuiInputBase-root': { height: '44px' }, 
                                        '& .MuiInputBase-input': { padding: '5px' }}}
                                    className='rounded-md'
                                />
                            )}
                        />
                    </Grid>

                    <Grid className='flex w-2/3 justify-between items-center'>
                        <FormLabel className='font-bold text-black w-1/3'>
                            Phone Number <span className='text-red-600'>*</span>
                        </FormLabel>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    required
                                    label="Enter Phone Number"
                                    type="tel"
                                    {...field}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                                    sx={{ mb: 2, backgroundColor: 'white', border: 'none', 
                                        '& .MuiInputBase-root': { height: '44px' }, 
                                        '& .MuiInputBase-input': { padding: '5px' }}}
                                    className='rounded-md'
                                />
                            )}
                        />
                    </Grid>

                    <Grid className='flex w-2/3 justify-between items-center'>
                        <FormLabel className='font-bold text-black w-1/3'>
                            Alternate Phone Number
                        </FormLabel>
                        <Controller
                            name="altPhoneNumber"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Enter Alternate Phone Number"
                                    type="tel"
                                    {...field}
                                    sx={{ mb: 2, backgroundColor: 'white', border: 'none', 
                                        '& .MuiInputBase-root': { height: '44px' }, 
                                        '& .MuiInputBase-input': { padding: '5px' }}}
                                    className='rounded-md'
                                />
                            )}
                        />
                    </Grid>

                    <div className="flex w-2/3 justify-between items-center">
                        <FormLabel className="font-bold text-black w-1/3">
                            Company Type <span className="text-red-600">*</span>
                        </FormLabel>
                        <Box className="w-full bg-white mb-3 rounded-md " sx={{ mb: 2, backgroundColor: 'white', border: 'none', 
                                '& .MuiInputBase-root': { height: '44px' }, 
                                '& .MuiInputBase-input': { padding: '5px' }}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Company Type</InputLabel>
                                <Controller
                                    name="companyType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            labelId="demo-simple-select-label"
                                            {...field}
                                            label="Company Type"
                                            error={!!errors.companyType}
                                            required
                                        >
                                            <MenuItem value={"AMC Vendor"}>AMC Vendor</MenuItem>
                                            <MenuItem value={"Manufacturing Vendor"}>Manufacturing Vendor</MenuItem>
                                            <MenuItem value={"Supplier Vendor"}>Supplier Vendor</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Box>
                    </div>
                <Grid className='bg-white p-4 rounded-lg'>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Contact Info
                    </Typography>

                    <Grid className='flex w-2/3 justify-between items-center'>
                        <FormLabel className='font-bold text-black w-1/3'>
                            Contact Name <span className='text-red-600'>*</span>
                        </FormLabel>
                        <TextField
                            fullWidth
                            label="Enter Contact Name"
                            name="name"
                            value={contactFormValues.name}
                            onChange={handleContactChange}
                            sx={{ mb: 2, backgroundColor: 'white', border: 'none', 
                                '& .MuiInputBase-root': { height: '44px' }, 
                                '& .MuiInputBase-input': { padding: '5px' }}}
                            className='rounded-md'
                        />
                    </Grid>

                    <Grid className='flex w-2/3 justify-between items-center'>
                        <FormLabel className='font-bold text-black w-1/3'>
                            Phone Number <span className='text-red-600'>*</span>
                        </FormLabel>
                        <TextField
                            fullWidth
                            label="Enter Phone Number"
                            name="phone"
                            value={contactFormValues.phone}
                            onChange={handleContactChange}
                            sx={{ mb: 2, backgroundColor: 'white', border: 'none', 
                                '& .MuiInputBase-root': { height: '44px' }, 
                                '& .MuiInputBase-input': { padding: '5px' }}}
                            className='rounded-md'
                        />
                    </Grid>

                    <Grid className='flex w-2/3 justify-between items-center'>
                        <FormLabel className='font-bold text-black w-1/3'>
                            Designation
                        </FormLabel>
                        <TextField
                            fullWidth
                            label="Enter Designation"
                            name="designation"
                            value={contactFormValues.designation}
                            onChange={handleContactChange}
                            sx={{ mb: 2, backgroundColor: 'white', border: 'none', 
                                '& .MuiInputBase-root': { height: '44px' }, 
                                '& .MuiInputBase-input': { padding: '5px' }}}
                            className='rounded-md'
                        />
                    </Grid>

                    <Grid className='flex w-2/3 justify-between items-center'>
                        <FormLabel className='font-bold text-black w-1/3'>
                            Email
                        </FormLabel>
                        <TextField
                            fullWidth
                            label="Enter Email"
                            name="email"
                            value={contactFormValues.email}
                            onChange={handleContactChange}
                            sx={{ mb: 2, backgroundColor: 'white', border: 'none', 
                                '& .MuiInputBase-root': { height: '44px' }, 
                                '& .MuiInputBase-input': { padding: '5px' }}}
                            className='rounded-md'
                        />
                    </Grid>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addContact}
                        sx={{ mb: 2 }}
                    >
                        Add Contact
                    </Button>

                    {contacts.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#002a5c', '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold' } }}>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Designation</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{backgroundColor:'white'}}>
                                {contacts.map((contact, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{contact.name}</TableCell>
                                        <TableCell>{contact.designation}</TableCell>
                                        <TableCell>{contact.phone}</TableCell>
                                        <TableCell>{contact.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <Typography>No contacts added</Typography>
                    )}
                    </Grid>
                    <Grid container justifyContent="center">
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </Grid>

                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </form>
            </Grid>
        </div>
    );
};

export default VendorCreate;
