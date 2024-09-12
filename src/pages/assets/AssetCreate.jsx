import React, { useState, useEffect } from 'react';
import { useAsset } from '../../context/assets/AssetContext';
import { Checkbox, Button, TextField, FormControl, FormLabel, Grid, Typography, Box, MenuItem, Select, InputLabel, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Image from '@mui/icons-material/Image';
import Sidebar from '../../components/Sidebar';
import { useDept } from '../../context/departments/DeptContext';

const AssetCreate = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    assetName: '',
    description: '',
    type: '',
    subType: '',
    make: '',
    model: '',
    value: '',
    status: '',
    location: '',
    incharge: '',
    userDept: '',
    phoneNumber: '',
    purchaseDate: '',
    isSerialized: false,
    isUnderWarranty: false,
    isUnderAmc: false,
    serialNo: '',
    warrantyEndDate: '',
    AMCendDate: ''
  });
  

  const [selectedImage, setSelectedImage] = useState(null);
  const { createAsset, snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar } = useAsset();
  const { departments = [], getDepts } = useDept();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  useEffect(() => {
    getDepts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const assetData = {
      ...formValues,
      department: formValues.userDept,
    };
    
    createAsset(assetData, navigate);
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
            Create Asset
          </Typography>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Asset Name <span className="text-red-600">*</span>
            </FormLabel>
            <TextField
              fullWidth
              label="Enter Asset Name"
              name="assetName"
              value={formValues.assetName}
              onChange={handleChange}
              sx={{ mb: 2, backgroundColor: 'white' }}
              className="w-full rounded-md"
            />
          </div>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Description <span className="text-red-600">*</span>
            </FormLabel>
            <TextField
              fullWidth
              label="Enter Description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              sx={{ mb: 2, backgroundColor: 'white' }}
              className="w-full rounded-md"
            />
          </div>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Type <span className="text-red-600">*</span>
            </FormLabel>
            <Box className="w-full bg-white mb-3 rounded-md">
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={formValues.type}
                  onChange={handleChange}
                  className="w-full"
                >
                  <MenuItem value="Type1">Type 1</MenuItem>
                  <MenuItem value="Type2">Type 2</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Sub-Type <span className="text-red-600">*</span>
            </FormLabel>
            <Box className="w-full bg-white mb-3 rounded-md">
              <FormControl fullWidth>
                <InputLabel>Sub-Type</InputLabel>
                <Select
                  name="subType"
                  value={formValues.subType}
                  onChange={handleChange}
                  className="w-full"
                >
                  <MenuItem value="SubType1">Sub-Type 1</MenuItem>
                  <MenuItem value="SubType2">Sub-Type 2</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Make <span className="text-red-600">*</span>
            </FormLabel>
            <TextField
              fullWidth
              label="Enter Make"
              name="make"
              value={formValues.make}
              onChange={handleChange}
              sx={{ mb: 2, backgroundColor: 'white' }}
              className="w-full rounded-md"
            />
          </div>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Model <span className="text-red-600">*</span>
            </FormLabel>
            <TextField
              fullWidth
              label="Enter Model"
              name="model"
              value={formValues.model}
              onChange={handleChange}
              sx={{ mb: 2, backgroundColor: 'white' }}
              className="w-full rounded-md"
            />
          </div>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Value <span className="text-red-600">*</span>
            </FormLabel>
            <TextField
              fullWidth
              label="Enter Value"
              name="value"
              value={formValues.value}
              onChange={handleChange}
              sx={{ mb: 2, backgroundColor: 'white' }}
              className="w-full rounded-md"
            />
          </div>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Status <span className="text-red-600">*</span>
            </FormLabel>
            <TextField
              fullWidth
              label="Enter Status"
              name="status"
              value={formValues.status}
              onChange={handleChange}
              sx={{ mb: 2, backgroundColor: 'white' }}
              className="w-full rounded-md"
            />
          </div>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Location <span className="text-red-600">*</span>
            </FormLabel>
            <TextField
              fullWidth
              label="Enter Location"
              name="location"
              value={formValues.location}
              onChange={handleChange}
              sx={{ mb: 2, backgroundColor: 'white' }}
              className="w-full rounded-md"
            />
          </div>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Incharge <span className="text-red-600">*</span>
            </FormLabel>
            <TextField
              fullWidth
              label="Enter Incharge"
              name="incharge"
              value={formValues.incharge}
              onChange={handleChange}
              sx={{ mb: 2, backgroundColor: 'white' }}
              className="w-full rounded-md"
            />
          </div>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Department <span className="text-red-600">*</span>
            </FormLabel>
            <Box className="w-full bg-white mb-3 rounded-md">
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  name="userDept"
                  value={formValues.userDept}
                  onChange={handleChange}
                  className="w-full"
                >
                  {departments.map(dept => (
                    <MenuItem key={dept.id} value={dept.deptName}>
                      {dept.deptName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
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
              sx={{ mb: 2, backgroundColor: 'white' }}
              className="w-full rounded-md"
            />
          </div>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Purchase Date <span className="text-red-600">*</span>
            </FormLabel>
            <TextField
              fullWidth
              label="Enter Purchase Date"
              name="purchaseDate"
              type="date"
              value={formValues.purchaseDate}
              onChange={handleChange}
              sx={{ mb: 2, backgroundColor: 'white' }}
              className="w-full rounded-md"
            />
          </div>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Serial No. <span className="text-red-600">*</span>
            </FormLabel>
            <TextField
              fullWidth
              label="Enter Serial No."
              name="serialNo"
              value={formValues.serialNo}
              onChange={handleChange}
              sx={{ mb: 2, backgroundColor: 'white' }}
              className="w-full rounded-md"
            />
          </div>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Asset Image <span className="text-red-600">*</span>
            </FormLabel>
            <Button
              variant="contained"
              component="label"
              sx={{ backgroundColor: '#3b82f6' }}
            >
              <Image />
              Upload Image
              <VisuallyHiddenInput
                accept="image/*"
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </Button>
          </div>

          {selectedImage && (
            <div className="flex w-2/3 justify-between items-center mt-4">
              <FormLabel className="font-bold text-black w-1/3">Image Preview</FormLabel>
              <img src={selectedImage} alt="Preview" className="w-full h-40 rounded-md object-cover" />
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Create Asset
          </Button>
        </form>

        {/* Snackbar for Success/Error Messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={closeSnackbar}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={closeSnackbar}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Grid>
    </div>
  );
};

export default AssetCreate;
