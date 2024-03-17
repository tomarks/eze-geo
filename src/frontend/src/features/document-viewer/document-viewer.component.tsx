import React, { useEffect, useState } from 'react';
import { Client, DocumentListDto } from '../../../generated/client';
import DocumentSelector from './document-selector.component';
import { DocumentContent } from './document-content.component';

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
          setDocumentContent(res.data!);
        })
        .catch((err) => {});
    }
  }, [selectedDocument]);

  return (
    <div>
      <DocumentSelector documents={documents} onSelect={setselectedDocument}></DocumentSelector>

      {!!documentContent && !!selectedDocument?.extension ? (
        <DocumentContent documentData={documentContent} documentExtension={selectedDocument.extension}></DocumentContent>
      ) : null}
    </div>
  );
};
