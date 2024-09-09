import { Alert, Box, Button, Grid, IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../context/auth/AuthContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Landing = () => {
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const { login, snackbarOpen, snackbarMessage, snackbarSeverity, handleCloseSnackbar } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = formValues;
        login(username, password);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 h-full">
                <img src="./assets.jpg" alt="Landing" className="object-cover h-full w-full" />
            </div>
            <div className="ml-20 mt-20 w-1/2">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                        className='text-center'
                        sx={{ fontWeight: 'bold', fontFamily: 'cursive' }}
                    >
                        LOGIN
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 3, width: '100%', maxWidth: '500px' }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    value={formValues.username}
                                    onChange={handleChange}
                                    type="text"
                                    variant="outlined"
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    value={formValues.password}
                                    onChange={handleChange}
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 3,
                                mb: 2,
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ borderRadius: '20px' }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Landing;
