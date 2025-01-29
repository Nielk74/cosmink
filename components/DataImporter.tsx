import { useState } from "react";
import { read, utils } from "xlsx";


export function DataImporter({ onDataLoaded }: { onDataLoaded: (data: any[]) => void }) {
    const [fileName, setFileName] = useState<string>("");
  
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = utils.sheet_to_json(sheet);
          onDataLoaded(jsonData);
        };
        reader.readAsArrayBuffer(file);
      }
    };
  
    return (
      <div>
        <input type="file" accept=".xls,.xlsx,.csv" onChange={handleFileUpload} />
        {fileName && <p>Fichier sélectionné : {fileName}</p>}
      </div>
    );
  }
  