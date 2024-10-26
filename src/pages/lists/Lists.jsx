import { Grid, Toolbar } from '@mui/material'
import React from 'react'
import Sidebar from '../../components/Sidebar'
import DashboardCard from '../../components/DashboardCard/DashboardCard'
import { Add } from '@mui/icons-material'
import AddList from '../../components/ListsCard/AddList'

const Lists = () => {
  return (
    <Grid container>
    <Grid item style={{ width: '240px' }}>
        <Sidebar />
    </Grid>
    <Grid item xs style={{ paddingLeft: '20px', marginRight: '36px' }}>
        <Toolbar/>
      <div className='flex justify-between'>
        <AddList  title={"Add Types"} count={<Add/>} navigateTo={'/add-lists'}  />
        <AddList title={"Add Sub-Types"} count={<Add/>} navigateTo={'/add-listitem'}/>
        <AddList title={"Add Sub-Types"} count={<Add/>} navigateTo={'/add-sublistitem'}/>
      </div>
    </Grid>
</Grid>
  )
}

export default Lists
