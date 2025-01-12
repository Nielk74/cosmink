'use client';

import Workspace from "@/components/layout/Workspace";
import Menu from "@/components/ui/Menu";
import { useState } from "react";


export default function ViewDashBoard() {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  return (
    <main className="flex gap-4 p-4 h-screen">
      <Menu setSelectedItem={setSelectedItem} value={selectedItem} className="w-1/6"/>
      <Workspace selectedItem={selectedItem} className="w-5/6">
        <span></span>
      </Workspace>
    </main>
  );
}
