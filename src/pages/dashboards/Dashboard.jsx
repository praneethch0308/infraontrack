import React from 'react'
import { Box, Grid, Toolbar } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import DashboardCard from '../../components/DashboardCard/DashboardCard';

const Dashboard = () => {
  return (
    <Grid container>
    <Grid item style={{ width: '240px' }} >
        <Sidebar />
    </Grid>
    <Grid item xs style={{ paddingLeft: '20px', marginRight:'36px' }}>
        <Toolbar />
        <div className='flex justify-between m-4'>
          <DashboardCard title={"Total Assets 📦"} count={10} />
          <DashboardCard title={"Total Departments 🏢"} count={10} />
          <DashboardCard title={"Total Vendors 💰"} count={10} />

        </div>
        <div className='flex justify-between m-4'>
        <DashboardCard title={"Total Employees 👥"} count={10} />
          <DashboardCard title={"Total Locations 📍"} count={10} />
          <DashboardCard title={"Pending Approvals ✅"} count={10}/>
        </div>
</Grid>
</Grid>
  )
}

export default Dashboard
