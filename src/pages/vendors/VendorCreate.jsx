import React, { useState } from 'react';
import {
    Box, Button, FormGroup, FormLabel, Grid, Snackbar, TextField, Typography,
    Table, TableBody, TableCell, TableHead, TableRow, MenuItem, Select, FormControl,
    InputLabel, Alert
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useVendor, ContactInfoDto, VendorInfoDto } from '../../context/vendors/VendorContext';

const VendorCreate = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        companyName: '',
        address: '',
        email: '',
        phoneNumber: '',
        altPhoneNumber: '',
        companyType: '',
    });

    const [contactFormValues, setContactFormValues] = useState({
        name: '',
        designation: '',
        phone: '',
        email: '',
    });

    const [contacts, setContacts] = useState([]);
    const { createVendor, snackbarOpen, snackbarMessage, snackbarSeverity, handleCloseSnackbar } = useVendor();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactFormValues({
            ...contactFormValues,
            [name]: value,
        });
    };

    const addContact = () => {
        const { name, phone } = contactFormValues;
        if (name && phone) {
            setContacts([...contacts, contactFormValues]);
            setContactFormValues({ name: '', designation: '', phone: '', email: '' });
        } else {
            alert("Please provide at least a name and phone number for the contact.");
        }
    };

    

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const { companyName,
            address,
            email,
            phoneNumber,
            altPhoneNumber,
            companyType} = formValues;
        const vendor = new VendorInfoDto();
        vendor.companyName=companyName;
        vendor.companyType=companyType;
        vendor.address=address;
        vendor.phoneNumber=phoneNumber;
        vendor.altPhoneNumber=altPhoneNumber;
        vendor.email=email;
        vendor.contacts = contacts.map(contact => new ContactInfoDto(contact))
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

                <form onSubmit={handleSubmit} className='w-full ml-[240px] bg-neutral-200 rounded-lg p-5 mr-5'>
                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }} className='text-center'>
                        Create Vendor
                    </Typography>

                    <Grid className='flex w-2/3 justify-between items-center'>
                        <FormLabel className='font-bold text-black w-1/3'>
                            Company Name <span className='text-red-600'>*</span>
                        </FormLabel>
                        <TextField
                            fullWidth
                            required
                            label="Enter Company Name"
                            name="companyName"
                            value={formValues.companyName}
                            onChange={handleChange}
                            sx={{ mb: 2, backgroundColor: 'white',border: 'none', 
                                '& .MuiInputBase-root': { 
                                  height: '44px'  
                                }, 
                                '& .MuiInputBase-input': {
                                  padding: '5px',  
                                }  }}
                            className='w-full rounded-md'
                        />
                    </Grid>

                    <Grid className='flex w-2/3 justify-between items-center'>
                        <FormLabel className='font-bold text-black w-1/3'>
                            Address <span className='text-red-600'>*</span>
                        </FormLabel>
                        <TextField
                            fullWidth
                            required
                            label="Enter Address"
                            name="address"
                            value={formValues.address}
                            onChange={handleChange}
                            multiline
                            sx={{ mb: 2, backgroundColor: 'white',border: 'none', 
                                '& .MuiInputBase-root': { 
                                  height: '44px'  
                                }, 
                                '& .MuiInputBase-input': {
                                  padding: '5px',  
                                }  }}
                            className='rounded-md '
                        />
                    </Grid>

                    <Grid className='flex w-2/3 justify-between items-center'>
                        <FormLabel className='font-bold text-black w-1/3'>
                            Email ID <span className='text-red-600'>*</span>
                        </FormLabel>
                        <TextField
                            fullWidth
                            required
                            label="Enter Email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            type="email"
                            variant="outlined"
                            sx={{ mb: 2, backgroundColor: 'white',border: 'none', 
                                '& .MuiInputBase-root': { 
                                  height: '44px'  
                                }, 
                                '& .MuiInputBase-input': {
                                  padding: '5px', 
                                }  }}
                            className='rounded-md'
                        />
                    </Grid>

                    <Grid className='flex w-2/3 justify-between items-center'>
                        <FormLabel className='font-bold text-black w-1/3'>
                            Phone Number <span className='text-red-600'>*</span>
                        </FormLabel>
                        <TextField
                            fullWidth
                            required
                            label="Enter Phone Number"
                            name="phoneNumber"
                            value={formValues.phoneNumber}
                            onChange={handleChange}
                            type="tel"
                            variant="outlined"
                            sx={{ mb: 2, backgroundColor: 'white',border: 'none', 
                                '& .MuiInputBase-root': { 
                                  height: '44px'  
                                }, 
                                '& .MuiInputBase-input': {
                                  padding: '5px',  
                                }  }}
                            className='rounded-md'
                        />
                    </Grid>

                    <Grid className='flex w-2/3 justify-between items-center'>
                        <FormLabel className='font-bold text-black w-1/3'>
                            Alternate Phone Number
                        </FormLabel>
                        <TextField
                            fullWidth
                            label="Enter Alternate Phone Number"
                            name="altPhoneNumber"
                            value={formValues.altPhoneNumber}
                            onChange={handleChange}
                            type="tel"
                            variant="outlined"
                            sx={{ mb: 2, backgroundColor: 'white',border: 'none', 
                                '& .MuiInputBase-root': { 
                                  height: '44px'  
                                }, 
                                '& .MuiInputBase-input': {
                                  padding: '5px', 
                                }  }}
                            className='rounded-md'
                        />
                    </Grid>

                    <div className="flex w-2/3 justify-between items-center">
                        <FormLabel className="font-bold text-black w-1/3">
                            Company Type <span className="text-red-600">*</span>
                        </FormLabel>
                        <Box className="w-full bg-white mb-3 rounded-md "  sx={{ mb: 2, backgroundColor: 'white',border: 'none', 
                                '& .MuiInputBase-root': { 
                                  height: '44px'  
                                }, 
                                '& .MuiInputBase-input': {
                                  padding: '5px',  
                                }  }}>
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Company Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    name='companyType'
                                    value={formValues.companyType}
                                    label="Company Type"
                                    onChange={handleChange}
                                    
                                    className='w-full'
                                    required
                                >
                                    <MenuItem value={"AMC Vendor"}>AMC Vendor</MenuItem>
                                    <MenuItem value={"Vendor"}>Vendor</MenuItem>
                                    <MenuItem value={"Service Provider"}>Service Provider</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <Box sx={{ backgroundColor: 'white', '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold', fontSize: '14px' } }} className='p-5 rounded-md'>
                        <Typography variant="h6" sx={{ mb: 2 }} className='bg-neutral-300 text-center p-3 rounded-full font-bold'>
                            Add Contacts
                        </Typography>

                        <Grid className='flex w-2/3 justify-between items-center'>
                            <TextField
                                fullWidth
                                label="Contact Name"
                                name="name"
                                value={contactFormValues.name}
                                onChange={handleContactChange}
                                sx={{ mb: 2, backgroundColor: 'white' }}
                                className='w-full rounded-md'
                            />
                        </Grid>

                        <Grid className='flex w-2/3 justify-between items-center'>
                            <TextField
                                fullWidth
                                label="Designation"
                                name="designation"
                                value={contactFormValues.designation}
                                onChange={handleContactChange}
                                sx={{ mb: 2, backgroundColor: 'white' }}
                                className='w-full rounded-md'
                            />
                        </Grid>

                        <Grid className='flex w-2/3 justify-between items-center'>
                            <TextField
                                fullWidth
                                label="Contact Phone"
                                name="phone"
                                value={contactFormValues.phone}
                                onChange={handleContactChange}
                                type="tel"
                                sx={{ mb: 2, backgroundColor: 'white' }}
                                className='w-full rounded-md'
                            />
                        </Grid>

                        <Grid className='flex w-2/3 justify-between items-center'>
                            <TextField
                                fullWidth
                                label="Contact Email"
                                name="email"
                                value={contactFormValues.email}
                                onChange={handleContactChange}
                                type="email"
                                sx={{ mb: 2, backgroundColor: 'white' }}
                                className='w-full rounded-md'
                            />
                        </Grid>

                        <Button variant="contained" onClick={addContact} sx={{ mb: 2 }}>
                            Add Contact
                        </Button>
                    </Box>

                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Contacts
                    </Typography>

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

                    <Box className='flex justify-center'>
                        <Button type="submit" variant="contained" color="primary" className='mt-5'>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                action={
                    <Button color="inherit" onClick={handleCloseSnackbar}>
                        Close
                    </Button>
                }
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default VendorCreate;
