import React from 'react';
import clsx from 'clsx';
import { ToggleButton } from '@mui/material';


export default function MenuItem ({
    children,
    className,
    onClick,
    value,
  }: Readonly<{
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    value?: string;
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