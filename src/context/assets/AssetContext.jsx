import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export class DeptInfoDto {

	  id=0;
	  deptName='';
	  hodName='';
	  phoneNumber='';
	  email='';
}
const AssetContext = createContext();

export const useAsset = () => {
    return useContext(AssetContext);
};

export const DeptProvider = ({ children }) => {
    const [assets,setAssets]=useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const baseURl = process.env.REACT_APP_API_KEY;


    const getAssets = async () => {
        try {
          const response = await axios.get(`${baseURl}/api/assets/create`, {
          });
          setAssets(response.data.data);
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching employees data:", error);
        }
      };
const createAsset = async (asset, navigate) => {
    try {
        const response = await axios.post(`${baseURl}/api/assets/create`, asset);

        if (response.status === 200) {
            setSnackbarMessage('Asset created successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            setTimeout(() => {
                navigate("/assets");
            }, 1000);
        }
    } catch (error) {
        console.error('Creation error:', error);
        setSnackbarMessage('Failed to create asset');
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
        createAsset,
        getAssets,
        assets
    };

    return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>;
};
