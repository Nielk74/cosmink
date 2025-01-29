import { useState } from "react";

interface TableViewProps {
  data: any[];
}

export function TableView({ data }: TableViewProps) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <h3>Tableau des Données</h3>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} onClick={() => requestSort(key)} style={{ cursor: "pointer" }}>
                  {key} {sortConfig?.key === key ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex}>{value as React.ReactNode}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune donnée disponible.</p>
      )}
    </div>
  );
}
