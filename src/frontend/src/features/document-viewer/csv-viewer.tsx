// @ts-ignore
import Papa from 'papaparse';
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface CsvViewerProps {
  documentData: string;
}

export const CsvViewer: React.FC<CsvViewerProps> = ({ documentData }) => {
  const parsedData = Papa.parse(documentData);
  if (parsedData.errors.length > 0) {
    // Handle parsing errors
    return <div>Error parsing CSV file</div>;
  }

  const { data } = parsedData as { data: string[][] };

  return (
    <>
      {data[0].length == 2 ? renderGraph(data) : null}

      {renderTable(data)}
    </>
  );
};

const renderGraph = (data: string[][]) => {
  const columns = data[0];
  const rows = data.slice(1);

  const options = {
    title: {
      text: 'Line Chart',
    },
    axisX: {
      title: columns[0],
    },
    axisY: {
      title: columns[1],
    },
    animationEnabled: true,
    theme: 'light2',
    data: [
      {
        type: 'line',

        dataPoints: rows.map((x) => ({ label: x[0], y: Number(x[1]) })),
      },
    ],
  };

  return (
    <div>
      {' '}
      <CanvasJSChart
        options={options}
        /* onRef = {ref => this.chart = ref} */
      />
    </div>
  );
};

const renderTable = (data: string[][]) => {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          {data[0].map((header: string, index: number) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row: string[], rowIndex: number) => (
          <tr key={rowIndex}>
            {row.map((cell: string, cellIndex: number) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
