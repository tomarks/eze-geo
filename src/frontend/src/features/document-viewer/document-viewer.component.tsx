import React, { useEffect, useRef, useState } from 'react';
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
  const currentDocument = useRef<DocumentListDto | null>(null);

  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const api = new Client('/api');

  const renderDocument = (document: DocumentListDto, content: string) => {
    if (isLoading) return <div>Loading...</div>;

    if (!document || !content) return documents?.length ? <div>Select a document...</div> : <div>There are no documents to display...</div>;

    if (currentDocument.current?.id === selectedDocument?.id) {
      if (document.extension?.endsWith('csv')) {
        return <CsvViewer documentData={documentContent!}></CsvViewer>;
      } else if (document.extension?.endsWith('geojson')) {
        return <MapViewer data={{ data: JSON.parse(documentContent!) }}></MapViewer>;
      }
    }

    return null;
  };

  useEffect(() => {
    setDocumentContent(null);

    if (selectedDocument?.id != null) {
      setIsLoading(true);

      api
        .documentsGET2(selectedDocument.id!)
        .then((res) => {
          setDocumentContent(res.data!);
          currentDocument.current = selectedDocument;
          setIsLoading(false);
        })
        .catch((err) => {
          handleError(err);
          currentDocument.current = null;
          setIsLoading(false);
        });
    }
  }, [selectedDocument]);

  return (
    <div>
      <DocumentSelector documents={documents} onSelect={setselectedDocument}></DocumentSelector>
      {renderDocument(selectedDocument!, documentContent!)}
    </div>
  );
};
