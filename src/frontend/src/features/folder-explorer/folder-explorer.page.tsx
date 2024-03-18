import { Button, Card, CardContent, CardHeader, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DirectoryBreadcrumbs } from '../../components/breadcrumbs/directory-breadcrumbs.component';
import { DirectoryPicker } from '../../components/directory-picker/directory-picker.component';
import { DocumentViewer } from '../document-viewer/document-viewer.component';
import { useFolderExplorerContext } from './folder-explorer.context';

export const FolderExplorerPage = () => {
  var navigate = useNavigate();

  const { directoryStructure, selectFolder, createFolder, selectedDirectoryId, selectedDirectoryPath, uploadFile, documentsList, isLoading } = useFolderExplorerContext();
  const [folderName, setFolderName] = useState('');
  const fileUploadInput = useRef<HTMLInputElement>(null);

  const { id } = useParams();

  useEffect(() => {
    // TODO: This was added as an afterthought. Code in the useFolderExplorerContext should be refactored to use the useParams hook directly
    if (id != null && selectedDirectoryId !== id) {
      selectFolder(id!);
    }
  }, [id]);

  const onCreateFolderClick = () => {
    if (folderName == null || folderName === '') return;
    setFolderName('');
    createFolder(folderName);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const fileToUpload = files[0];
      uploadFile(fileToUpload);
    }
  };

  return (
    <>
      <Paper className="m-5 flex min-h-[calc(100vh-80px)] w-[calc(100vw-80px)] flex-col p-5" elevation={5}>
        {/* Heading */}

        <div>
          <Typography className="uppercase" variant="h3" component="h3">
            Welcome to Folder Explorer
          </Typography>
        </div>

        {/* Action Bar - TODO: Make this a Create Folder component? */}
        <div className="m-5 flex flex-row gap-5">
          <div className="flex flex-row gap-5 ">
            <Button onClick={onCreateFolderClick} variant="contained">
              Create Folder
            </Button>
            <TextField
              autoComplete="off"
              id="folderNameInput"
              label="Folder Name"
              variant="standard"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onCreateFolderClick();
                }
              }}
            />
          </div>
          <div className="flex grow flex-row justify-end">
            <input ref={fileUploadInput} onChange={handleFileUpload} id="fileUploadInput" type="file" hidden />

            <Button disabled={selectedDirectoryId == null} onClick={() => fileUploadInput.current?.click()} variant="contained">
              Upload File
            </Button>
          </div>
        </div>

        {/* Folder Picker and Content */}
        <div className="m-5 flex h-full flex-1 flex-row gap-5">
          <Card elevation={2} className=" h-full w-96">
            <CardHeader className="text-left" title="Folders" />
            <CardContent>{directoryStructure && <DirectoryPicker disabled={isLoading} structure={directoryStructure} onDirectorySelected={selectFolder} />}</CardContent>
          </Card>

          <Card elevation={2} className="w-full">
            <CardHeader className="text-left" title={<DirectoryBreadcrumbs items={selectedDirectoryPath?.map((x) => ({ name: x.name!, id: x.id! }))} />} />

            {isLoading ? (
              <div className="m-5">Loading...</div>
            ) : (
              <CardContent className="">{isLoading ? null : <DocumentViewer documents={documentsList}></DocumentViewer>}</CardContent>
            )}
          </Card>
        </div>
      </Paper>
    </>
  );
};
