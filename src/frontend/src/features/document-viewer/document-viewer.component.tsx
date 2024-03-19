import React, { useEffect, useState } from 'react';
import { Client, DocumentListDto } from '../../../generated/client';
import { handleError } from '../../utils/error-handling-utils';
import { CsvViewer } from './csv-viewer';
import DocumentSelector from './document-selector.component';
import { MapViewer } from './geojson-viewer.component';

interface DocumentViewerProps {
  documents: DocumentListDto[];
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ documents }) => {
  const [selectedDocument, setselectedDocument] = useState<DocumentListDto | null>(null);
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const renderDocument = (document: DocumentListDto) => {
    if (document.extension?.endsWith('csv')) {
      return <CsvViewer documentData={documentContent!}></CsvViewer>;
    } else if (document.extension?.endsWith('geojson')) {
      return <MapViewer data={{ data: JSON.parse(documentContent!) }}></MapViewer>;
    }
  };

  useEffect(() => {
    if (!!selectedDocument) {
      setIsLoading(true);
      const api = new Client('/api');

      api
        .documentsGET2(selectedDocument.id!)
        .then((res) => {
          setIsLoading(false);

          setDocumentContent(res.data!);
        })
        .catch((err) => {
          setIsLoading(false);
          handleError(err);
        });
    }
  }, [selectedDocument]);

  return (
    <div>
      <DocumentSelector documents={documents} onSelect={setselectedDocument}></DocumentSelector>

      {isLoading ? <div className="m-5">Loading...</div> : <>{!!documentContent && !!selectedDocument?.extension ? renderDocument(selectedDocument) : null}</>}
    </div>
  );
};
