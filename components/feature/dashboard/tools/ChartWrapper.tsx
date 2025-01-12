import React from "react";
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import PieChart from "../chart/PieChart";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DataPicker from "./DataPicker";
import clsx from "clsx";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function ChartWrapper({
    className,
    chartType,
}: Readonly<{
    className?: string;
    chartType: React.ReactNode;
}>) {
    
    const [data, setData] = React.useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
        }],
    });
    return (
        <div className={clsx('flex flex-col items-center justify-center h-full', className)}>
           {    data?.datasets[0].data.length > 0 && (
            chartType === 'Pie Chart' && <PieChart data={data} />
            || chartType === 'Bar Chart' && <BarChartIcon />
            || chartType === 'Line Chart' && <ShowChartIcon />
            || chartType === 'Scatter Plot' && <ScatterPlotIcon />
           )
           || <DataPicker setData={setData}/>
        }
        </div>
    );
}