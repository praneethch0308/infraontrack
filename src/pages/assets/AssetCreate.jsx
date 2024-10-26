import React, { useState, useEffect, useContext } from 'react';
import { AssetsDto, useAsset } from '../../context/assets/AssetContext';
import { Checkbox, Button, TextField, FormControl, FormLabel, Grid, Typography, Box, MenuItem, Select, InputLabel, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Image from '@mui/icons-material/Image';
import Sidebar from '../../components/Sidebar';
import { useDept } from '../../context/departments/DeptContext';
import EmployeeContext from '../../context/employees/EmployeeContext';
import axios from 'axios';
import { useList } from '../../context/lists/ListContext';
import { useLoctn } from '../../context/locations/LocationContext';
import { useVendor } from '../../context/vendors/VendorContext';

const AssetCreate = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    assetName : '' ,
    description :  '',
    make :  '' ,
    model : '' ,
    isSerialized : true,
    value :'',
     type : '' ,
      level1 :  '' ,
      level2 :  '' ,
      level3 :  '' ,
      level4 :  '' ,
     serialNo :  '' ,
     geoLocation :  '' , 
     purchaseDate :  '' , 
     isUnderWarranty : true,
     warrantyEndDate : '' ,
     amcendDate : '' ,
     underAMC : true,
     status :  '' ,
     phoneNum : '' ,
     isApprovedByHOD : false,
     isApprovedByPrinicipal : false,
     deptInfoDto :'',
     locInfoDto : '',
     vendorInfoDto : '',
     employeeDto : ''
});
  

  const [selectedImage, setSelectedImage] = useState(null);
  const { createAsset, snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar } = useAsset();
  const { departments = [], getDepts } = useDept();
  const { locations = [], getLoctns } = useLoctn();
  const { vendors = [], getVendors } = useVendor();

  const [employees, setEmployees]=useState([]);
  const [listitems, setlistitems]= useState([]);
  const {getSysList,syslist }= useList();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const assetData = {
    ...formValues,
  
  };
  const baseURl= process.env.REACT_APP_API_KEY
const getListItems = async () => {
  try {
    const response = await axios.get(`${baseURl}/list/item-list/${assetData.type}`, {
    });
    setlistitems(response.data.data);
  } catch (error) {
    console.error("Error fetching vendors data:", error);
  }
};

const getEmployees = async () => {
  try {
    console.log(assetData.deptInfoDto)
      const response = await axios.get(`${baseURl}/employees/department/${assetData.deptInfoDto}`);
      setEmployees(response.data);
      console.log(response.data);
  } catch (error) {
      console.error("Error fetching employees data:", error);
  }
};

      useEffect(() => {
        getEmployees();
      }, [assetData.deptInfoDto]); 

     useEffect(() => {
      getDepts();
      getSysList();
      getLoctns();
      }, []);

     useEffect(() => {
      getListItems();
      }, [assetData.type]);

      useEffect(() => {
        getVendors();
    }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
 
const asset={
  assetName : assetData.assetName ,
    description :  assetData.description,
    make :  assetData.make ,
    model : assetData.model ,
    isSerialized : assetData.isSerialized,
    value :assetData.value,
     type : assetData.type ,
      level1 :  assetData.level1 || "" ,
      level2 :  assetData.level1 || "" ,
      level3 :  assetData.level3 || "" ,
      level4 :  assetData.level4 || "" ,
     serialNo :  assetData.serialNo ,
     geoLocation :  assetData.geoLocation || "" , 
     purchaseDate :  assetData.purchaseDate , 
     isUnderWarranty : assetData.isUnderWarranty,
     warrantyEndDate : assetData.warrantyEndDate ,
     amcendDate : assetData.amcendDate,
      underAMC : assetData.underAMC||"",
     status :  assetData.status ,
   phoneNum : assetData.phoneNum ,
     isApprovedByHOD : false,
     isApprovedByPrinicipal : false,
     deptInfoDto : {
         id : assetData.deptInfoDto
    },
     locInfoDto : {
         id : assetData.locInfoDto
    },
     vendorInfoDto : {
         id : assetData.vendorInfoDto
    },
     employeeDto : {
         id : assetData.employeeDto
  }
    }
    createAsset(asset, navigate);
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
               {syslist.map(syslist => (
                                        <MenuItem value={`${syslist.name} `}>{syslist.name}</MenuItem>
                                    ))}
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
                  name="level1"
                  value={formValues.level1}
                  onChange={handleChange}
                  className="w-full"
                >
                  {Array.isArray(listitems) && listitems.map(listitem => (
                                        <MenuItem value={`${listitem.listItem} `}>{listitem.listItem}</MenuItem>
                                    ))}
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
                    <Box className="w-full bg-white mb-3 rounded-md">
                        <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select 
                                labelId="demo-simple-select-label"
                                name='status'
                                value={formValues.status}
                                label="status"
                                onChange={handleChange}
                                className='w-full'
                             >
                                <MenuItem value={"Active"}>Active</MenuItem>
                                <MenuItem value={"In-Active"}>In Active</MenuItem>
                               
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
                <InputLabel>Department</InputLabel>
                <Select
                  name="deptInfoDto"
                  value={formValues.deptInfoDto}
                  onChange={handleChange}
                  className="w-full"
                >
                  {departments.map(dept => (
                    <MenuItem key={dept.id} value={dept.id}>
                      {dept.deptName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
            Incharge Name <span className="text-red-600">*</span>
            </FormLabel>
            <Box className="w-full bg-white mb-3 rounded-md">
              <FormControl fullWidth>
                <InputLabel>Incharge Name</InputLabel>
                <Select
                  name="employeeDto"
                  value={formValues.employeeDto}
                  onChange={handleChange}
                  className="w-full"
                >
                  {employees.map(emp => (
                    <MenuItem key={emp.id} value={emp.id}>
                      {emp.name} 
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Location <span className="text-red-600">*</span>
            </FormLabel>
                <Box className="w-full bg-white mb-3 rounded-md">
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select
                  name="locInfoDto"
                  value={formValues.locInfoDto}
                  onChange={handleChange}
                  className="w-full"
                >
                  {locations.map(location => (
                    <MenuItem key={location.id} value={location.id}>
                      {location.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>

          <div className="flex w-2/3 justify-between items-center">
            <FormLabel className="font-bold text-black w-1/3">
              Location <span className="text-red-600">*</span>
            </FormLabel>
                <Box className="w-full bg-white mb-3 rounded-md">
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select
                  name="vendorInfoDto"
                  value={formValues.vendorInfoDto}
                  onChange={handleChange}
                  className="w-full"
                >
                  {vendors.map(vendor => (
                    <MenuItem key={vendor.id} value={vendor.id}>
                      {vendor.companyName}
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
              type="date"
              value={formValues.purchaseDate}
              onChange={handleChange}
              sx={{ mb: 2, backgroundColor: 'white' }}
              className="w-full rounded-md"
            />
          </div>

          <div className="flex w-2/3 items-center">
            <FormLabel className="font-bold text-black w-1/3">
             Is Serialized <span className="text-red-600">*</span>
            </FormLabel>
            <Checkbox
              fullWidth
              name="isSerialized"
              value={formValues.isSerialized}
              onChange={handleChange}
              sx={{ mb: 2}}
              type="checkbox"
              className="rounded-md justify-start"
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
              <div className="flex w-2/3 items-center">
                <FormLabel className="font-bold text-black w-1/3">
                 Is Under Warranty <span className="text-red-600">*</span>
                </FormLabel>
                <Checkbox
                  fullWidth
                  name="isUnderWarranty"
                  value={formValues.isUnderWarranty}
                  onChange={handleChange}
                  sx={{ mb: 2}}
                  type="checkbox"
                  className="rounded-md justify-start"
                />
              </div>

              <div className="flex w-2/3 justify-between items-center">
                <FormLabel className="font-bold text-black w-1/3">
                  Warranty End Date <span className="text-red-600">*</span>
                    </FormLabel>
                    <TextField
                      fullWidth
     
                      name="warrantyEndDate"
                      type="date"
                      value={formValues.warrantyEndDate}
                      onChange={handleChange}
                      sx={{ mb: 2, backgroundColor: 'white' }}
                      className="w-full rounded-md"
                    />
                </div>
                <div className="flex w-2/3 items-center">
                <FormLabel className="font-bold text-black w-1/3">
                 Is Under AMC <span className="text-red-600">*</span>
                </FormLabel>
                <Checkbox
                  fullWidth
                  name="underAMC"
                  value={formValues.underAMC}
                  onChange={handleChange}
                  sx={{ mb: 2}}
                  type="checkbox"
                  className="rounded-md justify-start"
                />
              </div>

              <div className="flex w-2/3 justify-between items-center">
                <FormLabel className="font-bold text-black w-1/3">
                  AMC End Date <span className="text-red-600">*</span>
                    </FormLabel>
                    <TextField
                      fullWidth
                      name="amcendDate"
                      type="date"
                      value={formValues.amcendDate}
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
