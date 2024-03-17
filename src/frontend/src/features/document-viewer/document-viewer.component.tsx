import React, { useEffect, useState } from 'react';
import { Client, DocumentListDto } from '../../../generated/client';
import { handleError } from '../../utils/error-handling-utils';
import { CsvViewer } from './csv-viewer';
import DocumentSelector from './document-selector.component';

interface DocumentViewerProps {
  documents: DocumentListDto[];
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ documents }) => {
  const [selectedDocument, setselectedDocument] = useState<DocumentListDto | null>(null);
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {!!documentContent && !!selectedDocument?.extension ? selectedDocument.extension.endsWith('csv') ? <CsvViewer documentData={documentContent}></CsvViewer> : null : null}
        </>
      )}
    </div>
  );
};
