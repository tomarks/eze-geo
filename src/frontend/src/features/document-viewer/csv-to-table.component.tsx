import Papa from 'papaparse';

interface CsvToTableProps {
  documentData: string;
}

export const CsvToTable: React.FC<CsvToTableProps> = ({ documentData }) => {
  const parsedData = Papa.parse(documentData);
  if (parsedData.errors.length > 0) {
    // Handle parsing errors
    return <div>Error parsing CSV file</div>;
  }

  const { data } = parsedData;
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
