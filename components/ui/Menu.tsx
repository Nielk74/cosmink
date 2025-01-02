import React from 'react';
import clsx from 'clsx';
import { ToggleButton, ToggleButtonGroup }  from '@mui/material';

export default function Menu ({
  className,
  setSelectedItem,
  value
}: Readonly<{
  className?: string;
  setSelectedItem: (value: string) => void;
  value: string;
}>) {
  return (
    <ToggleButtonGroup
    color="primary"
      exclusive
      orientation="vertical"
      value={value}
      className={clsx(
        'p-8 rounded-lg',
        className,
      )}
    >
      <ToggleButton value="Sheet" onClick={()=>setSelectedItem("Sheet")} >Sheet</ToggleButton>
      <ToggleButton value="Dashboard" onClick={()=>setSelectedItem("Dashboard")}> Dashboard</ToggleButton>
      <ToggleButton value="Team" onClick={()=>setSelectedItem("Team")}> Team</ToggleButton>
      <ToggleButton value="Settings" onClick={()=>setSelectedItem("Settings")}> Settings</ToggleButton>
    </ToggleButtonGroup>
  );
}