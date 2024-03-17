import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Client, DirectoryStructure, DocumentDirectoryDto, DocumentListDto, FileParameter } from '../../../generated/client';
import { handleError } from '../../utils/error-handling-utils';

// Define the initial state of the context
interface FolderExplorerContextState {
  directoryStructure: DirectoryStructure | null;
  selectedDirectoryId: string | null;
  selectFolder: (folder: string) => void;
  createFolder: (folder: string) => void;
  selectedDirectoryPath: DocumentDirectoryDto[];
  selectedDirectory: DocumentDirectoryDto | null;
  uploadFile: (file: File) => void;
  isLoading: boolean;
  documentsList: DocumentListDto[];
}

// Create the context
export const FolderExplorerContext = createContext<FolderExplorerContextState | null>({
  directoryStructure: null,
  selectedDirectoryId: null,
  selectFolder: () => {},
  createFolder: () => {},
  selectedDirectoryPath: [],
  selectedDirectory: null,
  uploadFile: () => {},
  isLoading: false,
  documentsList: [],
});

export const useFolderExplorerContext = () => {
  const folderExplorerContext = useContext(FolderExplorerContext);

  if (!folderExplorerContext) {
    throw new Error('useFolderExplorerContext must be used within a FolderExplorerProvider');
  }

  return folderExplorerContext;
};

// Create the context provider component
export const FolderExplorerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // Setup State
  const [selectedDirectoryId, setselectedDirectoryId] = useState<string | null>(null);
  const [directoryStructure, setDirectoryStructure] = useState<DirectoryStructure | null>(null);
  const [documentsList, setDocumentsList] = useState([] as DocumentListDto[]);

  // Loading flags
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isFetchingDirectoryStructure, setIsFetchingDirectoryStructure] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isFetchingDocuments, setIsFetchingDocuments] = useState(false);
  const isLoading = isUploadingFile || isFetchingDirectoryStructure || isCreatingFolder || isFetchingDocuments;

  const [selectedDirectory, selectedDirectoryPath] = useMemo(() => {
    if (selectedDirectoryId == null || directoryStructure?.rootDirectories == null) {
      return [null, []];
    }

    return findDirectoryRecursive(selectedDirectoryId, directoryStructure.rootDirectories, []);
  }, [selectedDirectoryId, directoryStructure]);

  // API Request to fetch initial folder structure
  useEffect(() => {
    setIsFetchingDirectoryStructure(true);
    const api = new Client('/api');

    api
      .documentDirectoriesGET()
      .then((res) => {
        setDirectoryStructure(res);
        setIsFetchingDirectoryStructure(false);
      })
      .catch((err) => {
        setIsFetchingDirectoryStructure(false);
      });
  }, []);

  // API Request to get documents in the selected directory
  // TODO: Find another way to make api requests. This is not the best way to do it.
  useEffect(() => {
    if (!selectedDirectoryId) return;

    const api = new Client('/api');
    setIsFetchingDocuments(true);

    api
      .documentsGET(selectedDirectoryId)
      .then((res) => {
        setIsFetchingDocuments(false);
        setDocumentsList(res.items ?? []);
      })
      .catch((err) => {
        setIsFetchingDocuments(false);
        handleError(err);
      });

    return () => {
      // TODO Add API CANCELLATION
    };
  }, [selectedDirectoryId]);

  // Define the selectFolder function to update the selected folder
  const selectFolder = (folder: string) => {
    setselectedDirectoryId(folder);
  };

  // API Request to create a folder
  const createFolder = (folder: string) => {
    const api = new Client('/api');
    setIsCreatingFolder(true);

    api
      .documentDirectoriesPOST({ name: folder, parentDirectoryId: selectedDirectoryId! })
      .then((res) => {
        updateDirectoryStructure(selectedDirectoryId, res, directoryStructure!);
        setIsCreatingFolder(false);
      })
      .catch((err) => {
        setIsCreatingFolder(false);
        handleError(err);
      });
  };

  // TODO: Add null checks
  const updateDirectoryStructure = (currentDirectoryId: string | null, newItem: DocumentDirectoryDto, directoryStructure: DirectoryStructure) => {
    const hasRootDirectories = !!directoryStructure.rootDirectories && directoryStructure.rootDirectories?.length > 0;

    // Handle the case where we are adding a root directory
    if (!currentDirectoryId) {
      if (hasRootDirectories) {
        const updatedDirectoryStructure = { ...directoryStructure };
        updatedDirectoryStructure.rootDirectories = [...updatedDirectoryStructure.rootDirectories!, newItem];
        setDirectoryStructure(updatedDirectoryStructure);
      } else {
        setDirectoryStructure({ rootDirectories: [newItem] });
      }
    } else {
      // Handle the case where we are adding a sub-directory
      const updatedDirectoryStructure = { ...directoryStructure };
      const [currentDirectory, _] = findDirectoryRecursive(currentDirectoryId, updatedDirectoryStructure.rootDirectories!, []);

      currentDirectory!.directories = [...currentDirectory?.directories!, newItem];
      setDirectoryStructure(updatedDirectoryStructure);
    }
  };

  // API Request to upload a file
  const uploadFile = (file: File) => {
    setIsUploadingFile(true);
    const api = new Client('/api');

    const fileData: FileParameter = {
      data: file as any,
      fileName: file.name,
    };

    if (selectedDirectoryId) {
      api
        .documentsPOST(selectedDirectoryId, fileData)
        .then((res) => {
          setIsUploadingFile(false);

          // TODO: add files to current files list
        })
        .catch((err) => {
          setIsUploadingFile(false);
          handleError(err);
        });
    }
  };

  // Provide the context value to the children components
  return (
    <FolderExplorerContext.Provider
      value={{ selectedDirectoryId, selectFolder, directoryStructure, createFolder, selectedDirectory, selectedDirectoryPath, uploadFile, isLoading, documentsList }}
    >
      {children}
    </FolderExplorerContext.Provider>
  );
};

export const findDirectoryRecursive = (
  id: string,
  directories: DocumentDirectoryDto[],
  path: DocumentDirectoryDto[] = [],
): [DocumentDirectoryDto | null, DocumentDirectoryDto[]] => {
  for (const item of directories) {
    const newPath = [...path, item]; // create a new path array for each recursive call
    if (item.id === id) {
      return [item, newPath];
    } else if (item.directories && item.directories.length > 0) {
      const found = findDirectoryRecursive(id, item.directories, newPath);
      if (found[0]) return found; // check if the directory was found in the recursive call
    }
  }

  return [null, []]; // return an empty path if the directory was not found
};
