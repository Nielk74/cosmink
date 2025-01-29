import { useState } from "react";

export function DataJoiner({ tables, onJoin }: { tables: any[][]; onJoin: (joinedData: any[]) => void }) {
    const [selectedColumn, setSelectedColumn] = useState<string>("");
  
    const handleJoin = () => {
      if (!selectedColumn) return;
      const [table1, table2] = tables;
      const joinedData = table1.map((row1) => {
        const match = table2.find((row2) => row1[selectedColumn] === row2[selectedColumn]);
        return { ...row1, ...(match || {}) };
      });
      onJoin(joinedData);
    };
  
    return (
      <div>
        <h3>Jointure des données</h3>
        <select value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)}>
          <option value="">Sélectionner une colonne</option>
          {tables.length > 1 && Object.keys(tables[0][0]).map((col) => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
        <button onClick={handleJoin}>Effectuer la jointure</button>
      </div>
    );
  }