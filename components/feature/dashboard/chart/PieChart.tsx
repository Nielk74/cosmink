import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';



export default function PieChart({
    data,
    options,
    className,
}: Readonly<{
    data: ChartData<'pie'>;
    options?: ChartOptions<'pie'>;
    className?: string;
}>) {
    return (
        <Pie data={data} options={options} className={className} />
    );
}