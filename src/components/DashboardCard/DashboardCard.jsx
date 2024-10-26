import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box, Grid, Toolbar } from '@mui/material';
import Sidebar from '../../components/Sidebar';

const DashboardCard = ({title,count}) => {
  return (
    <Card sx={{ minWidth: 280, marginTop: 5, backgroundColor: "#002a5c" }} className='rounded-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
    <CardActionArea>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90x',
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize:28,
              marginTop:1
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', textAlign: 'center',fontSize:28 }}>
            {count}
          </Typography>
        </Box>
      </CardContent>
    </CardActionArea>
</Card>
  )
}

export default DashboardCard
