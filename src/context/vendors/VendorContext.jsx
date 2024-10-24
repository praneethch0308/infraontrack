import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export class VendorInfoDto {
  
      id ='';
      companyName = '';
      address = '';
      email = '';
      phoneNumber = '';
      altPhoneNumber = '';
      companyType = '';
      contacts = []; 
    
  }
  
 export class ContactInfoDto {
    
      name = '';
      designation= '';
      phone = '';
      email = ''
    
  }
  
const VendorContext = createContext();

export const useVendor = () => {
    return useContext(VendorContext);
};

export const VendorProvider = ({ children }) => {
    const [vendors,setVendors]=useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const baseURl = process.env.REACT_APP_API_KEY;


    const getVendors = async () => {
        try {
          const response = await axios.get(`${baseURl}/vendor/all`, {
          });
          setVendors(response.data.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching vendors data:", error);
        }
      };
      
const createVendor = async (vendor, navigate) => {
    try {
        const response = await axios.post(`${baseURl}/vendor/save`, vendor);

        if (response.status === 200) {
            setSnackbarMessage('Vendor created successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            setTimeout(() => {
                navigate("/vendors");
            }, 1000);
        }
    } catch (error) {
        console.error('Creation error:', error);
        setSnackbarMessage('Failed to create Vendor ');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    }
};

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const value = {
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        handleCloseSnackbar,
        createVendor,
        getVendors,
        vendors
    };

    return <VendorContext.Provider value={value}>{children}</VendorContext.Provider>;
};
