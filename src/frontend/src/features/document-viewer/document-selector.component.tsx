import React, { useState } from 'react';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DocumentListDto } from '../../../generated/client';

interface DocumentSelectorProps {
  documents: DocumentListDto[];
  onSelect: (document: DocumentListDto) => void;
}

const DocumentSelector: React.FC<DocumentSelectorProps> = ({ documents, onSelect }) => {
  const [selectedId, setselectedId] = useState<string | null>(null);

  const handleDocumentClick = (e: any, id: string) => {
    if (!id) return;

    const document = documents.find((doc) => doc.id === id);
    if (!document) return;

    setselectedId(id);
    onSelect(document);
  };

  return (
    <div>
      <ToggleButtonGroup color="primary" value={selectedId} exclusive onChange={handleDocumentClick}>
        {documents.map((document) => (
          <ToggleButton key={document.id} value={document.id!}>
            {document.name}.{document.extension}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default DocumentSelector;
