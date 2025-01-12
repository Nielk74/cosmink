import React from 'react';
import { ToggleButton } from '@mui/material';


export default function MenuItem ({
    children,
    onClick,
  }: Readonly<{
    children: React.ReactNode;
    onClick?: () => void;
}>) {
  return (
    <ToggleButton
      value
      
      onClick={onClick}
    >
      {children}
    </ToggleButton>
  );
};