import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import React from 'react';
import { DirectoryStructure, DocumentDirectoryDto } from '../../../generated/client';

interface DirectoryPickerProps {
  disabled: boolean;
  structure: DirectoryStructure;
  onDirectorySelected: (directory: string) => void;
  selectedId: string | undefined;
}

const renderTreeItem = (directory: DocumentDirectoryDto): JSX.Element => {
  return (
    <TreeItem key={directory.id} nodeId={directory.id!} label={directory.name} className="text-left">
      {directory.directories?.map(renderTreeItem)}
    </TreeItem>
  );
};

export const DirectoryPicker: React.FC<DirectoryPickerProps> = ({ onDirectorySelected, structure, disabled, selectedId }) => {

  return (
    <TreeView
      disableSelection={disabled}
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultExpanded={structure.rootDirectories?.map((x) => x.id!)}
      selected={selectedId}
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
