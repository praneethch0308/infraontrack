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
const DeptContext = createContext();

export const useDept = () => {
    return useContext(DeptContext);
};

export const DeptProvider = ({ children }) => {
    const [departments,setDepartments]=useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const baseURl = process.env.REACT_APP_API_KEY;


    const getDepts = async () => {
        try {
          const response = await axios.get(`${baseURl}/dept/all`, {
          });
          setDepartments(response.data.data);
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching employees data:", error);
        }
      };
const createDept = async (department, navigate) => {
    try {
        const response = await axios.post(`${baseURl}/dept/save`, department);

        if (response.status === 200) {
            setSnackbarMessage('Department created successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            setTimeout(() => {
                navigate("/departments");
            }, 1000);
        }
    } catch (error) {
        console.error('Creation error:', error);
        setSnackbarMessage('Failed to create employee');
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
        createDept,
        getDepts,
        departments
    };

    return <DeptContext.Provider value={value}>{children}</DeptContext.Provider>;
};
