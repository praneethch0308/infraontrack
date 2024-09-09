import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, AppBar, Toolbar, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import TaskIcon from '@mui/icons-material/Task';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useSidebar } from '../context/SidebarContext';
import { AccountTree, CheckBox, CorporateFare, Devices, Key, LogoutSharp } from '@mui/icons-material';
import { AuthProvider, useAuth } from '../context/auth/AuthContext';
import { GiTakeMyMoney } from 'react-icons/gi';

const menuItems = [
    { path: '/leaddashboard', icon: <DashboardIcon />, label: 'Dashboard' },
    { path: '/assets', icon: <Devices />, label: 'Assets' },
    { path: '/vendors', icon: <GiTakeMyMoney className='h-7 w-7' />, label: 'Vendors' },
    { path: '/employees', icon: <GroupIcon />, label: 'Employees' },
    { path: '/locations', icon: <LocationOnIcon />, label: 'Locations' },
    { path: '/departments', icon: <AccountTree />, label: 'Departments' },
    { path: '/bulk-approval', icon: <CheckBox />, label: 'Bulk Approval' },
    { path: '/change-password', icon: <Key />, label: 'Change Password' }
];

const Sidebar = () => {
    const { isOpened, toggleSidebar } = useSidebar();
    const [selectedItem, setSelectedItem] = useState('');
    const navigate = useNavigate();
const {logout} = useAuth(); 

    useEffect(() => {
        const savedState = localStorage.getItem('sidebarOpened');
        if (savedState !== null) {
            toggleSidebar(JSON.parse(savedState));
        }

        const currentPath = window.location.pathname;
        setSelectedItem(currentPath);
    }, [toggleSidebar]);

    const handleItemClick = (path) => {
        setSelectedItem(path);
        navigate(path);
    };

    const handleToggle = () => {
        toggleSidebar();
        localStorage.setItem('sidebarOpened', JSON.stringify(!isOpened));
    };

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

            <Drawer
                variant="persistent"
                open={isOpened}
                sx={{
                    width: isOpened ? 240 : 60,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isOpened ? 240 : 60,
                        boxSizing: 'border-box',
                        backgroundColor: '#002a5c',
                        color: 'white',
                        overflowX: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                }}
            >
                <Toolbar />
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.path}
                            selected={selectedItem === item.path}
                            onClick={() => handleItemClick(item.path)}
                            className={`${selectedItem === item.path ? 'bg-blue-900 rounded-3xl' : ''} cursor-pointer mt-1 mb-1`}
                            sx={{
                                width: '100%',
                                justifyContent: isOpened ? 'flex-start' : 'center',
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
                                    minWidth: 40, // Ensure icons have a minimum width
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {isOpened && (
                                <ListItemText
                                    primary={item.label}
                                    sx={{ color: 'white' }}
                                    primaryTypographyProps={{ fontWeight: 'bold' }}
                                />
                            )}
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ color: 'white' }} />
                <List sx={{ mt: '10px' }}  >
                    <ListItem button onClick={()=>{ setTimeout(() => {
                                        logout();
                                        }, 1000)}} 
                className='cursor-pointer'>
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
            </Drawer>

            {/* Main content area */}
            <main style={{ flexGrow: 1, padding: '24px', marginLeft: isOpened ? 200 : 60 }}>
                <Toolbar />
                {/* Content goes here */}
            </main>
        </div>
    );
};

export default Sidebar;
