import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider,
    AppBar, Toolbar, Avatar, Box, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Button,
    Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSidebar } from '../context/SidebarContext';
import { LogoutSharp } from '@mui/icons-material';
import LoadingSpinner from './loadingspinner/LoadingSpinner';
import { useAuth } from '../context/auth/AuthContext';
import { useBulkApprovalContext } from '../context/bulkapproval/BulkapprovalContext';

const Sidebar = () => {
    const { isOpened, toggleSidebar } = useSidebar();
    const [selectedItem, setSelectedItem] = useState('');
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const { logout,role } = useAuth(); 
   
    const { getAssetsforPrincipal,getAssetsforHod, HodbulkApprovalCount,PrincipalbulkApprovalCount } = useBulkApprovalContext()

   useEffect(()=>{
    getAssetsforHod();
    getAssetsforPrincipal()
    
   },[])

   
    let userRole = localStorage.getItem('role');
    userRole = userRole.replace(/^"|"$/g, '');


    const menuItems = {
        ROLE_HOD: [
            { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
            { path: '/assets', icon: '📦', label: 'Assets' },
            { path: '/vendors', icon: '💰', label: 'Vendors' },
            { path: '/employees', icon: '👥', label: 'Employees' },
            { path: '/locations', icon: '📍', label: 'Locations' },
            { path: '/departments', icon: '🏢', label: 'Departments' },
            {
                path: '/bulkapproval-hod',
                icon: '✅',
                label: 'Bulk Approval',
                badgeCount: HodbulkApprovalCount
            },
            { path: '/change-password', icon: '🔑', label: 'Change Password' },
            { path: '/lists', icon: '📝', label: 'Lists' }
        ],
        ROLE_PRINCIPAL: [
            { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
            { path: '/assets', icon: '📦', label: 'Assets' },
            { path: '/vendors', icon: '💰', label: 'Vendors' },
            { path: '/employees', icon: '👥', label: 'Employees' },
            { path: '/locations', icon: '📍', label: 'Locations' },
            { path: '/departments', icon: '🏢', label: 'Departments' },
            {
                path: '/bulkapproval-principal',
                icon: '✅',
                label: 'Bulk Approval',
                badgeCount: PrincipalbulkApprovalCount 
            },
            { path: '/change-password', icon: '🔑', label: 'Change Password' },
            { path: '/lists', icon: '📝', label: 'Lists' }
        ],
        ROLE_INCHARGE: [
            { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
            { path: '/assets', icon: '📦', label: 'Assets' },
            { path: '/vendors', icon: '💰', label: 'Vendors' },
            { path: '/employees', icon: '👥', label: 'Employees' },
            { path: '/locations', icon: '📍', label: 'Locations' },
            { path: '/departments', icon: '🏢', label: 'Departments' },
            { path: '/change-password', icon: '🔑', label: 'Change Password' },
            { path: '/lists', icon: '📝', label: 'Lists' }
        ],
        
    };

    useEffect(() => {
        const savedState = localStorage.getItem('sidebarOpened');
        if (savedState !== null) {
            toggleSidebar(JSON.parse(savedState));
        }
        const currentPath = window.location.pathname;
        setSelectedItem(currentPath);
    }, [toggleSidebar]);

    
    const handleItemClick = (path) => {
        setLoading(true);
        setSelectedItem(path);
        setTimeout(() => {
            navigate(path);
            setLoading(false);
        }, 500);
    };

    const handleToggle = () => {
        toggleSidebar();
        localStorage.setItem('sidebarOpened', JSON.stringify(!isOpened));
    };

    const handleConfirmApprove = () => {
        setLoading(true);
        setTimeout(() => {
            logout();
            setLoading(false);
        }, 500);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleLogoutClick = () => {
        setOpenDialog(true);
    };

    const userName = localStorage.getItem('userName');

    return (
        <div style={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#002a5c' }}>
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleToggle}
                        sx={{ marginRight: 2, backgroundColor: '#002a5c', color: 'white' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Avatar alt="User Name" src="/assets.jpg" sx={{ bgcolor: '#fff', color: '#002a5c' }} />
                </Toolbar>
            </AppBar>

            <div className={`fixed top-0 left-0 h-full bg-[#002a5c] text-white flex flex-col transition-all duration-500
                ${isOpened ? 'w-60' : 'w-16'}`}
                style={{ overflowY: 'auto', height: '100vh' }}  
            >
                <Toolbar />
                <List>
                    <div className='ml-8 mr-8 mt-1 text-white'>{userName}</div>
                    
                    {menuItems[userRole].map((item) => (
                        <ListItem
                            button
                            key={item.path}
                            selected={selectedItem === item.path}
                            onClick={() => handleItemClick(item.path)}
                            className={`${selectedItem === item.path ? 'bg-blue-900 rounded-3xl' : ''} cursor-pointer mt-1 mb-1`}
                            sx={{
                                width: '100%',
                                justifyContent: 'center',
                                padding: isOpened ? '8px 16px' : '8px',
                                '&.Mui-selected': {
                                    backgroundColor: '#003a6c',
                                },
                                '&:hover': {
                                    backgroundColor: '#003a6c',
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: 'white',
                                    minWidth: 60,
                                    justifyContent: 'center'
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                        
                            {isOpened && (
                                <ListItemText primary={item.label} sx={{ color: 'white' }}
                                primaryTypographyProps={{ fontWeight: 'semibold' }} />
                            )}
                            {item.label === 'Bulk Approval' && item.path==='/bulkapproval-principal' && PrincipalbulkApprovalCount > 0 && (
                                <Badge badgeContent={PrincipalbulkApprovalCount}  color="primary" />
                            )}
                            {item.label === 'Bulk Approval' && item.path==='/bulkapproval-hod' && HodbulkApprovalCount > 0 && (
                                <Badge badgeContent={HodbulkApprovalCount}  color="primary" />
                            )}
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ color: 'white' }} />
                <List sx={{ mt: '10px' }}>
                    <ListItem button onClick={handleLogoutClick} className='cursor-pointer'>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <LogoutSharp />
                        </ListItemIcon>
                        {isOpened && (
                            <ListItemText
                                sx={{ color: 'white' }}
                                primary="Logout"
                                primaryTypographyProps={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
                            />
                        )}
                    </ListItem>
                </List>
            </div>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle sx={{ fontWeight: 'bold' }}>Confirm Logout</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                        <img src="doubtful.png" alt="doubtful" style={{ width: '50px', height: '50px' }} />
                    </Box>
                    <DialogContentText sx={{ color: 'black' }}>
                        Are you sure you want to Logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmApprove} sx={{ backgroundColor: 'green', color: 'white', borderRadius: '18px' }}>
                        Confirm
                    </Button>
                    <Button onClick={handleDialogClose} sx={{ backgroundColor: 'red', color: 'white', borderRadius: '18px' }}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {loading && <LoadingSpinner />} 

            <main style={{ flexGrow: 1, padding: '24px', marginLeft: isOpened ? 240 : 60 }}>
                <Toolbar />
            </main>
        </div>
    );
};

export default Sidebar;
