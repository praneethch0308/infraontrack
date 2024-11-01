import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { boolean } from 'zod';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [role,setRole]= useState('');
    const [isFirstLogin,setisFirstLogin]=useState(false);

    const [userName,setUsername]=useState('');
    const navigate = useNavigate();

    const baseURl = process.env.REACT_APP_API_KEY;

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${baseURl}/login/authenticate`, {
                userName: username,
                password: password,
            });
            if (response.status === 200) {
                const token = response.data;
                localStorage.setItem('token', token);
                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken);
                setUsername(decodedToken.sub);
                setisFirstLogin(decodedToken.isFirstLogin);
                const roles = decodedToken.roles[0] || [];
                setRole(roles);
                console.log('Roles:', roles); 
                setSnackbarMessage('Login successful!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                localStorage.setItem('userName', username);
                localStorage.setItem('role', JSON.stringify(roles));
                setTimeout(() => {
                    if (decodedToken.isFirstLogin) {
                        navigate('/change-password');
                    } else {
                        navigate('/dashboard');
                    }
                }, 1000);
            }
        } catch (error) {
            setSnackbarMessage('Invalid credentials');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };
    
    const getRole= async()=>{
        return role;
        console.log("Return role",role)
    }
    
    const logout = () => {
        localStorage.removeItem('token');
        setSnackbarMessage('Logout successful!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => {
            window.location.reload();
            navigate('/');
        }, 1000);
    };

    const ChangePassword= async (formData)=>{
                    
        try {
            const response = await axios.post(`${baseURl}/login/update-password1`, formData,{
                headers: {
                    'Content-Type':'multi-part/form-data'
                  },
        });

            if (response.status === 200) {
                setSnackbarMessage('Password Updated!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            
            }
        } catch (error) {
            setSnackbarMessage('Invalid Credentials');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const value = {
        login,
        logout,
        userName,
        role,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        handleCloseSnackbar,
        ChangePassword
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
