import React, { useState } from 'react';
import { IDocument } from './IDocument';

interface DocumentSelectorProps {
  documents: IDocument[];
  onSelect: (document: IDocument) => void;
}

const DocumentSelector: React.FC<DocumentSelectorProps> = ({ documents, onSelect }) => {
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(null);

  const handleDocumentClick = (document: IDocument) => {
    setSelectedDocument(document);
    onSelect(document);
  };

  return (
    <div>
      <h2>Document Selector</h2>
      <ul>
        {documents.map((document) => (
          <li key={document.id} onClick={() => handleDocumentClick(document)} style={{ fontWeight: selectedDocument?.id === document.id ? 'bold' : 'normal' }}>
            {document.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentSelector;
