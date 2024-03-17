import { Button, Card, CardContent, CardHeader, Paper, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { DirectoryBreadcrumbs } from '../../components/breadcrumbs/directory-breadcrumbs.component';
import { DirectoryPicker } from '../../components/directory-picker/directory-picker.component';
import { useFolderExplorerContext } from './folder-explorer.context';

export const FolderExplorerPage = () => {
  const { directoryStructure, selectFolder, createFolder, selectedDirectoryId, selectedDirectoryPath, uploadFile } = useFolderExplorerContext();
  const [folderName, setFolderName] = useState('');
  const fileUploadInput = useRef<HTMLInputElement>(null);

  const onCreateFolderClick = () => {
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

        {/* Action Bar */}
        <div className="m-5 flex flex-row gap-5">
          <div className="flex flex-row gap-5 ">
            <Button onClick={onCreateFolderClick} variant="contained">
              Create Folder
            </Button>
            <TextField autoComplete="off" id="folderNameInput" label="Folder Name" variant="standard" value={folderName} onChange={(e) => setFolderName(e.target.value)} />
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
            <CardContent>{directoryStructure && <DirectoryPicker structure={directoryStructure} onDirectorySelected={selectFolder} />}</CardContent>
          </Card>

          <Card elevation={2} className="w-full">
            <CardHeader className="text-left" title={<DirectoryBreadcrumbs items={selectedDirectoryPath?.map((x) => x.name!)} />} />
            <CardContent className="">
              <div>Content...</div>
            </CardContent>
          </Card>
        </div>
      </Paper>
    </>
  );
};
