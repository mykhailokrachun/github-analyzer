// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';
// Include the fusioncharts library
import FusionCharts from 'fusioncharts';
// Include the chart type
import Chart from 'fusioncharts/fusioncharts.charts';
// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

interface ChartDataProps {
  label: string;
  value: number;
}

interface ChartComponentProps {
  data: ChartDataProps[];
}

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }: ChartComponentProps) => {
  const chartConfigs = {
    type: 'pie3d', // The chart type
    width: '400', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: 'Languages',
        theme: 'fusion',
        decimals: 0,
        pieRadius: '35%',
      },
      // Chart Data
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
