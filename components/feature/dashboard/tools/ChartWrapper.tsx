import React from "react";
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import PieChart from "../chart/PieChart";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DataPicker from "./DimensionPicker";
import clsx from "clsx";
import DimensionPicker from "./DimensionPicker";
import MeasurePicker from "./MeasurePicker";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function ChartWrapper({
    className,
    chartType,
}: Readonly<{
    className?: string;
    chartType: React.ReactNode;
}>) {
    
    const [dimensions, setDimensions] = React.useState([]);
    const [measures, setMeasures] = React.useState([]);

    React.useEffect(() => {
        // if dimensions length is more than 0 and measures is more than 0 we create dataset
        if(dimensions.length > 0 && measures.length > 0) {

        }
    }, [dimensions, measures]);

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
           || <div className='flex'>
                <DimensionPicker setData={setDimensions} /><MeasurePicker setData={setMeasures} />
           </div>
        }
        </div>
    );
}