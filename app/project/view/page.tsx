'use client';

import Workspace from "@/components/layout/Workspace";
import Menu from "@/components/ui/Menu";
import MenuItem from "@/components/ui/MenuItem";
import { useState } from "react";


export default function ViewDashBoard() {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  return (
    <main className="flex gap-4 p-4">
      <Menu>
        <MenuItem onClick={() => setSelectedItem('Sheet')}>Sheet</MenuItem>
        <MenuItem onClick={() => setSelectedItem('Dashboard')}>Dashboard</MenuItem>
        <MenuItem onClick={() => setSelectedItem('Team')}>Team</MenuItem>
        <MenuItem onClick={() => setSelectedItem('Settings')}>Settings</MenuItem>
      </Menu>
      <Workspace selectedItem={selectedItem}>
        <h1>{selectedItem.toLowerCase()}</h1>
      </Workspace>
    </main>
  );
}
