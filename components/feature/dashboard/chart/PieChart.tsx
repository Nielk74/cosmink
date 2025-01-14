import { useEffect, useState} from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { useCellContext } from '../../sheet/CellContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChart({
    dimensions,
    measures,
    options,
    className,
}: Readonly<{
    dimensions: string[];
    measures: string[];
    options?: ChartOptions<'pie'>;
    className?: string;
}>) {
    const { getPossibleValuesByColumnName, getMeasureSumByDimensionValues } = useCellContext();

    const [data, setData] = useState<ChartData<'pie'>>({ labels: [], datasets: [] });
    
    const possibleColors : string[] = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ]
    useEffect(() => {
        if (dimensions && measures) {
            const possibleValues = getPossibleValuesByColumnName(dimensions[0]);
            const measureSumValues = getMeasureSumByDimensionValues(measures[0], dimensions[0], possibleValues);
            setData({
                labels: possibleValues,
                datasets: [{
                    data: measureSumValues,
                    backgroundColor: possibleColors,
                    borderColor: [],
                    borderWidth: 1,
                }],
            });
        }
    }, [dimensions, measures]);
    return (
        <Pie data={data} options={options} className={className} />
    );
}