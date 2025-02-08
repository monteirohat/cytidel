// src/components/Panel.js
import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const CustomPaper = styled(Paper)(({ theme }) => ({
  boxShadow: 'rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper, // Using the theme's background color
}));

const Panel = ({ children, ...props }) => {
  return <CustomPaper {...props}>{children}</CustomPaper>;
};

export default Panel;
