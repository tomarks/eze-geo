interface DocumentContentProps {
  documentExtension: string;
  documentData: string;
}

export const DocumentContent: React.FC<DocumentContentProps> = ({ documentExtension, documentData }) => {
  return <div>{documentData}</div>;
};
