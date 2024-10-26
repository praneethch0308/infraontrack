import React from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddList = ({ title, count, navigateTo }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <Card
      sx={{ minWidth: 280, marginTop: 5, backgroundColor: "#002a5c" }}
      className="rounded-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
    >
      <CardActionArea onClick={handleCardClick}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '20px',
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
                fontSize: 12,
                marginTop: 1,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'white', textAlign: 'center', fontSize: 12 }}
            >
              {count}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AddList;
