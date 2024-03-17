interface DocumentContentProps {
  documentExtension: '.csv' | '.geojson';
  documentData: Blob;
}

export const DocumentContent: React.FC<DocumentContentProps> = ({ documentExtension, documentData }) => {
  return <div></div>;
};
