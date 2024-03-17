import React, { useEffect, useState } from 'react';
import { Client, DocumentListDto } from '../../../generated/client';
import DocumentSelector from './document-selector.component';
import { CsvToTable } from './csv-to-table.component';

interface DocumentViewerProps {
  documents: DocumentListDto[];
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ documents }) => {
  const [selectedDocument, setselectedDocument] = useState<DocumentListDto | null>(null);
  const [documentContent, setDocumentContent] = useState<string | null>(null);

  useEffect(() => {
    if (!!selectedDocument) {
      const api = new Client('/api');

      api
        .documentsGET2(selectedDocument.id!)
        .then((res) => {
          var blob = new Blob([res.data!], { type: 'text' });
          var reader = new FileReader();
          reader.readAsText(blob);
          reader.onload = function (e) {
            var text = reader.result;
            console.log(text);
          };

          setDocumentContent(res.data!);
        })
        .catch((err) => {});
    }
  }, [selectedDocument]);

  return (
    <div>
      <DocumentSelector documents={documents} onSelect={setselectedDocument}></DocumentSelector>

      {!!documentContent && !!selectedDocument?.extension ? selectedDocument.extension.endsWith('csv') ? <CsvToTable documentData={documentContent}></CsvToTable> : null : null}
    </div>
  );
};
