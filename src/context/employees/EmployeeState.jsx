import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeContext from "./EmployeeContext";


const EmployeeState =(props)=>{
    const host=process.env.REACT_APP_API_KEY;
    const[employees,setEmployees] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
const accessToken=localStorage.getItem('token')
    const getEmployees = async () => {
        try {
          const response = await axios.get(`${host}/employees/all`, {
          });
          setEmployees(response.data.data);
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching employees data:", error);
        }
      };
      const createEmployee = async (employee, navigate) => {
        try {
            const response = await axios.post(`${host}/employees/save`, employee);

            if (response.status === 200) {
                setSnackbarMessage('Employee created successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);

                setTimeout(() => {
                    navigate("/employees");
                }, 1000);
            }
        } catch (error) {
            console.error('Creation error:', error);
            setSnackbarMessage('Failed to create employee');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };
      return (
        <EmployeeContext.Provider value={{employees,getEmployees, createEmployee }}>
            {props.children}
        </EmployeeContext.Provider>
);

}
export default EmployeeState
    