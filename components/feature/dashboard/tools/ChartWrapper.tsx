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
    
    const [dimensions, setDimensions] = React.useState<Data | null>(null);
    const [measures, setMeasures] = React.useState<Data | null>(null);

    React.useEffect(() => {
        // if dimensions length is more than 0 and measures is more than 0 we create dataset
        if(dimensions && measures) {
            setData({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
        }],
    })
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
                <DimensionPicker setData={(data: Data) => setDimensions(data)} /><MeasurePicker setData={(data: Data) => setMeasures(data)} />
           </div>
        }
        </div>
    );
}