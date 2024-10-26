import { Alert, Box, Button, FormControl, FormGroup, FormLabel, Grid, Grid2, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useList } from '../../context/lists/ListContext';
const AddSubList = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
 
        listItem: "",
        status: "",
        subListItem: "",
        listName:''
     
    });
const {createSysListThree, snackbarOpen, snackbarMessage, snackbarSeverity, handleCloseSnackbar,getSysList,syslist }= useList();
const [listitems, setlistitems]= useState();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
console.log(formValues.listName)
    useEffect(()=>{
        getSysList();
 
    },[]);
    const getListItems = async () => {
        try {
          const response = await axios.get(`${baseURl}/list/item-list/${formValues.listName}`, {
          });
          setlistitems(response.data.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching vendors data:", error);
        }
      };
      useEffect(() => {
        getListItems();
    }, [formValues.listName]); 
    const baseURl = process.env.REACT_APP_API_KEY;

    const handleSubmit = (e) => {
        e.preventDefault();
        const {listItem,status,subListItem}= formValues
        const syslist = {
            listItem:listItem,
            status:'Active',
            subListItem:subListItem
        };
        console.log(syslist);
        createSysListThree(syslist,listItem,navigate);
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
                                    name='listName'
                                    required
                                    value={formValues.listName}
                                    label="listName"
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
            <div className="flex w-2/3 justify-between items-center">
                        <FormLabel className="font-bold text-black w-1/3">
                            List Item <span className="text-red-600">*</span>
                        </FormLabel>
                        <Box className="w-full bg-white mb-3 rounded-md">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" className='rounded-md'>List Item</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    name='listItem'
                                    required
                                    value={formValues.listItem}
                                    label="name"
                                    onChange={handleChange}
                                    className='w-full'
                                >
                                    {Array.isArray(listitems) && listitems.map(listitem => (
                                        <MenuItem value={`${listitem.listItem}`}>{listitem.listItem}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
            <Grid2 className='flex w-2/3 justify-between items-center'>
                <FormLabel className='font-bold text-black w-1/3'> Sub List-Item Name <span className='text-red-600'>*</span></FormLabel>
                <TextField
                    fullWidth
                    required
                    label="Enter List-Item Name"
                    name="subListItem"
                    value={formValues.subListItem}
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

export default AddSubList
