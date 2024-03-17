import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import React, { useMemo } from 'react';
import { DirectoryStructure, DocumentDirectoryDto } from '../../../../generated/client';
interface DirectoryPickerProps {
  structure: DirectoryStructure;
  onDirectorySelected: (directory: string) => void;
}

const renderTreeItem = (directory: DocumentDirectoryDto): JSX.Element => {
  return (
    <TreeItem key={directory.id} nodeId={directory.id!} label={directory.name}>
      {directory.directories?.map(renderTreeItem)}
    </TreeItem>
  );
};

export const DirectoryPicker: React.FC<DirectoryPickerProps> = ({ onDirectorySelected, structure }) => {
  const keys = useMemo(() => structure.rootDirectories?.flatMap(getChildKeys), [structure]);

  console.debug(keys);

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultExpanded={keys}
      onNodeSelect={(event, node) => {
        if (node) {
          onDirectorySelected(node);
        }
      }}
    >
      {structure?.rootDirectories?.map(renderTreeItem)}
    </TreeView>
  );
};

const getChildKeys = (directory: DocumentDirectoryDto): string[] => {
  return directory.directories?.map((d) => d.id!) ?? [];
};
