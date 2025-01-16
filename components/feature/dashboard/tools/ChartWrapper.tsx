import React from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import PieChart from "../chart/PieChart";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart } from '@/lib/classes/chart';

import clsx from "clsx";
import DimensionPicker from "./DimensionPicker";
import MeasurePicker from "./MeasurePicker";
import { Pie } from "@/lib/classes/charts/pie";
ChartJS.register(ArcElement, Tooltip, Legend);

const chartComponents : Record<string, React.ComponentType<{ dimensions: string[]; measures: string[] }>> = {
    [Pie.type]: PieChart,
}
// const chartComponents : Record<string, React.ComponentType<{ dimensions: string[]; measures: string[] }>> = {
//     'Pie Chart' : PieChart,
// }

export default function ChartWrapper({
    className,
    chart,
    deleteChart
}: Readonly<{
    className?: string;
    chart : Chart;
    deleteChart: (chartToDelete: Chart) => void;
}>) {
    
    const [dimensions, setDimensions] = React.useState<string[]>([]);
    const [measures, setMeasures] = React.useState<string[]>([]);
    const ChartComponent = chartComponents[chart.getType()] || null;
    return (
        <>
        <div className='chart-toolbar'>
            <button onClick={() => deleteChart(chart)}><DeleteIcon/></button>
        </div>
            <div className={clsx('flex flex-col items-center justify-center h-full', className)}>
            {    dimensions.length && measures.length && (
               <ChartComponent dimensions={dimensions} measures={measures} />
            )
            || <div className='flex'>
                    <DimensionPicker setDimensions={setDimensions} dimensions={dimensions} />
                    <MeasurePicker setMeasures={setMeasures} measures={measures} />
            </div>
            }
            </div>
        </>
    );
}