import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center">
          <img src="/logo.png" alt="Logo" style={{ width: '50px', marginRight: '15px' }} />
          <Typography variant="h6">
            Order My Food
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
