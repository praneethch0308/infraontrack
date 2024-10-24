import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { DeptInfoDto } from '../departments/DeptContext';
import { Employee } from '../../pages/employees/EmployeeCreate';

export class AssetInchargeDto {
	  id='';
	  inchargeName='';
	  inchargePhno='';
	  employeeId=''; 
    }

export class LocationInfoDto {
    
        id='';
        name='';
        roomNum='';
        deptName='';
        branch='';
        assetCount='';
        inchargeName='';
        inchargePhone='';
        qrCode=[]
        deptInfoDto=new DeptInfoDto();
        employeeDto= new Employee()
 
}


const LocContext = createContext();

export const useLoctn = () => {
    return useContext(LocContext);
};

export const LocProvider = ({ children }) => {
    const [locations,setLocations]=useState([]);
    const [employees,setEmployees]=useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const baseURl = process.env.REACT_APP_API_KEY;


    const getLoctns = async () => {
        try {
          const response = await axios.get(`${baseURl}/Locations/getAllLocations`, {
          });
          setLocations(response.data.data);
          console.log(response.data.data)
        } catch (error) {
          console.error("Error fetching employees data:", error);
        }
      };
const createLoctn = async (location, navigate) => {
    try {
        const response = await axios.post(`${baseURl}/Locations/save`, location);

        if (response.status === 200) {
            setSnackbarMessage('Location created successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            setTimeout(() => {
                navigate("/locations");
            }, 1000);
        }
    } catch (error) {
        console.error('Creation error:', error);
        setSnackbarMessage('Failed to create Location');
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
        createLoctn,
        getLoctns,
        locations
    };

    return <LocContext.Provider value={value}>{children}</LocContext.Provider>;
};
