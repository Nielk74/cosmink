import React from "react";
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import PieChart from "../chart/PieChart";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import clsx from "clsx";
import DimensionPicker from "./DimensionPicker";
import MeasurePicker from "./MeasurePicker";
ChartJS.register(ArcElement, Tooltip, Legend);

export class Data {
        // labels: string[];
        // datasets: {
        //     data: (string | undefined)[];
        //     backgroundColor: never[];
        //     borderColor: never[];
        //     borderWidth: number;
        // }[];

    constructor(
        public labels: string[],
        public datasets: {
            data: (string | undefined)[];
            backgroundColor: never[];
            borderColor: never[];
            borderWidth: number;
        }[]
    ) {}
}

export default function ChartWrapper({
    className,
    chartType,
}: Readonly<{
    className?: string;
    chartType: React.ReactNode;
}>) {
    
    const [dimensions, setDimensions] = React.useState<string[]>([]);
    const [measures, setMeasures] = React.useState<string[]>([]);

    return (
        <div className={clsx('flex flex-col items-center justify-center h-full', className)}>
           {    dimensions.length && measures.length && (
            chartType === 'Pie Chart' && <PieChart dimensions={dimensions} measures={measures} />
            || chartType === 'Bar Chart' && <BarChartIcon />
            || chartType === 'Line Chart' && <ShowChartIcon />
            || chartType === 'Scatter Plot' && <ScatterPlotIcon />
           )
           || <div className='flex'>
                <DimensionPicker setDimensions={setDimensions} dimensions={dimensions} />
                <MeasurePicker setMeasures={setMeasures} measures={measures} />
           </div>
        }
        </div>
    );
}