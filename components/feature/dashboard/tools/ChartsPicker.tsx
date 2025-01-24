import React from 'react';
import clsx from 'clsx';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { ListSubheader } from '@mui/material';
import { Position } from '@/lib/classes/position';
import { Chart } from '@/lib/classes/chart';
import { Pie } from '@/lib/classes/charts/pie';

export default function ChartPicker({
  children,
  className,
  addChart,
  displayHighlight,
  setHighlightVisible,
}: Readonly<{
  children?: React.ReactNode;
  className?: string;
    displayHighlight: (cursorPosition: Position) => void;
    setHighlightVisible: (visible: boolean) => void;
    addChart: (cursorPosition: Position, newChart : Chart ) => void;
}>) {
    const [dragClone, setDragClone] = React.useState<HTMLElement | null>(null);
    
    const charts = [
    { name: 'Pie Chart', icon: <PieChartIcon /> },
    { name: 'Bar Chart', icon: <BarChartIcon /> },
    { name: 'Line Chart', icon: <ShowChartIcon /> },
    { name: 'Scatter Plot', icon: <ScatterPlotIcon /> },
  ];
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, chartName: string) => {
    // prevent the default drag behavior
    
    // Create a clone element
    const clone = e.currentTarget.cloneNode(true) as HTMLElement;
    clone.style.position = 'fixed';
    clone.style.pointerEvents = 'none';
    clone.style.opacity = '1';
    clone.style.zIndex = '1000';
    clone.style.backgroundColor = 'white';
    clone.style.left = `${e.clientX}px`;
    clone.style.top = `${e.clientY}px`;
    clone.style.transform = 'translate(-50%, -50%)';
    clone.style.width = '200px';
    document.body.appendChild(clone);

    // set drag image as white
    e.dataTransfer.setDragImage(new Image(), 0, 0);
    setHighlightVisible(true);
    setDragClone(clone);

    e.dataTransfer.setData('text/plain', chartName); // Optional: Set drag data
    e.dataTransfer.effectAllowed = 'move'; // Optional: Set effect allowed
  };

  const handleDrag = (e: React.DragEvent<HTMLLIElement>) => {
    if (dragClone) {
      // Move the clone with the cursor
      dragClone.style.left = `${e.clientX}px`;
      dragClone.style.top = `${e.clientY}px`;
      setHighlightVisible(true);
      displayHighlight(new Position(e.clientX, e.clientY ));
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    if (dragClone) {
        // create a React element from the clone value
        const chartType = dragClone.textContent;
        const cursorPosition = new Position( e.clientX, e.clientY);
        switch (chartType) {
          case 'Pie Chart':
            addChart(cursorPosition, new Pie(new Position(0, 0), new Position(0, 0)));
            break;
          default:
            console.log('Unknown chart type');
        }

      dragClone.remove(); // Remove the clone
      setHighlightVisible(false);
      setDragClone(null);
    }
  };

  return (
    <List
        className={clsx('flex flex-col gap-4 p-4', className)}
        subheader={
            <ListSubheader>
                Charts
            </ListSubheader>
        }
        >
      {charts.map((chart, index) => (
        <ListItem
          key={index}
          className="w-full h-12 border border-gray-300 flex items-center rounded-xl hover:bg-gray-100 hover:cursor-pointer"
          draggable
          onDragStart={(e) => handleDragStart(e, chart.name)}
          onDrag={(e) => handleDrag(e)}
          onDragEnd={handleDragEnd}

        >
          <ListItemIcon>{chart.icon}</ListItemIcon>
          <ListItemText primary={chart.name} />
        </ListItem>
      ))}
      {children}
    </List>
  );
}
