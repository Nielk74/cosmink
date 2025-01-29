'use client';

import { useState } from "react";
import { DataImporter } from "@/components/DataImporter";
import { DataManipulator } from "@/components/DataManipulator";
import { DataJoiner } from "@/components/DataJoiner";
import { TableView } from "@/components/TableView";

export default function ImportationPage() {
  const [tables, setTables] = useState<any[][]>([]);
  const [processedData, setProcessedData] = useState<any[][]>([]);

  const handleDataLoaded = (data: any[]) => {
    setTables((prev) => [...prev, data]);
  };

  const handleDataUpdate = (updatedData: any[]) => {
    setProcessedData(updatedData);
  };

  const handleJoin = (joinedData: any[]) => {
    setProcessedData(joinedData);
  };

  return (
    <div>
      <h1>Importation et Traitement des Données</h1>
      <DataImporter onDataLoaded={handleDataLoaded} />
      {tables.length > 0 && tables.map((table, index) => (
        <DataManipulator key={index} data={table} onUpdate={handleDataUpdate} />
      ))}
      {tables.length > 1 && <DataJoiner tables={tables} onJoin={handleJoin} />}
      {processedData.length > 0 && <TableView data={processedData} />}

    </div>
  );
}
