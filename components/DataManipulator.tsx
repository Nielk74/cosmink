import { useState } from "react";


export function DataManipulator({ data, onUpdate }: { data: any[]; onUpdate: (updatedData: any[]) => void }) {
    const [config, setConfig] = useState<{ [key: string]: "dimension" | "measure" | "ignore" }>({});
  
    const handleSelectionChange = (column: string, type: "dimension" | "measure" | "ignore") => {
      setConfig((prev) => ({ ...prev, [column]: type }));
    };
  
    return (
      <div>
        <h3>Configuration des colonnes</h3>
        {data.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Colonne</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data[0]).map((col) => (
                <tr key={col}>
                  <td>{col}</td>
                  <td>
                    <select value={config[col] || "dimension"} onChange={(e) => handleSelectionChange(col, e.target.value as any)}>
                      <option value="dimension">Dimension</option>
                      <option value="measure">Mesure</option>
                      <option value="ignore">Ignorer</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
  