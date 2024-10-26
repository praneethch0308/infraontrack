import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
 
const ListContext = createContext();

export const useList = () => {
    return useContext(ListContext);
};

export const ListProvider = ({ children }) => {
    const [syslist,setSyslist]=useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const baseURl = process.env.REACT_APP_API_KEY;

   //list/system-list

   const getSysList = async () => {
    try {
      const response = await axios.get(`${baseURl}/list/system-list`, {
      });
      setSyslist(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching vendors data:", error);
    }
  };
 
const createSysList = async (syslist, navigate) => {
    try {
        const response = await axios.post(`${baseURl}/list/savesyslist`, syslist);

        if (response.status === 200) {
            setSnackbarMessage('List created successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            setTimeout(() => {
                navigate("/lists");
            }, 1000);
        }
    } catch (error) {
        console.error('Creation error:', error);
        setSnackbarMessage('Failed to create List ');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    }
};

const createSysListTwo = async (syslist,name, navigate) => {
    try {
        const response = await axios.post(`${baseURl}/list/save-list/${name}`, syslist);
        console.log(syslist);
        if (response.status === 200) {
            setSnackbarMessage('List created successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            setTimeout(() => {
                navigate("/lists");
            }, 1000);
        }
    } catch (error) {
        console.error('Creation error:', error);
        setSnackbarMessage('Failed to create List ');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    }
};

const createSysListThree = async (subitemlist,listitem, navigate) => {
    try {
        const response = await axios.post(`${baseURl}/list/save-sublist/${listitem}`, subitemlist);

        if (response.status === 200) {
            setSnackbarMessage('Sub List created successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            setTimeout(() => {
                navigate("/lists");
            }, 1000);
        }
    } catch (error) {
        console.error('Creation error:', error);
        setSnackbarMessage('Failed to create Sub List ');
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
        createSysList,
        createSysListTwo,
        createSysListThree,
        getSysList,
        syslist,

       
    };

    return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};
