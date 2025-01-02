'use client';

import Workspace from "@/components/layout/Workspace";
import Menu from "@/components/ui/Menu";
import MenuItem from "@/components/ui/MenuItem";
import { useState } from "react";


export default function ViewDashBoard() {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  return (
    <main className="flex gap-4 p-4 h-screen">
      <Menu setSelectedItem={setSelectedItem} value={selectedItem}/>
      <Workspace selectedItem={selectedItem}>
        <span></span>
      </Workspace>
    </main>
  );
}
