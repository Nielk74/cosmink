import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import clsx from "clsx";
import { useCellContext } from "../../sheet/CellContext";

export default function DataPicker({
    className,
    setData,
    }: Readonly<{
    className?: string;
    setData: (value: any) => void;
    }>) {
    const { cellsMap } = useCellContext();
    let columnsName = Array.from(cellsMap.values())[0];
    function selectColumn(columnName: string) {
        console.log(columnName);
    }
    return (
        <ToggleButtonGroup
        color="primary"
        exclusive
        orientation="vertical"
        className={clsx(
            'p-8 rounded-lg overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:[&::-webkit-scrollbar-track]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"',
            className,
        )}
        >
        {columnsName && Array.from(columnsName.values()).map((cell, index) => (
            <ToggleButton key={index} value={cell} onClick={()=>selectColumn(cell)}>{cell}</ToggleButton>
        ))}
        </ToggleButtonGroup>
    );
    }