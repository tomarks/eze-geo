import { Button, Card, CardContent, CardHeader, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { DirectoryBreadcrumbs } from '../../components/common/breadcrumbs/directory-breadcrumbs.component';
import { DirectoryPicker } from '../../components/common/directory-picker/directory-picker.component';
import { useFolderExplorerContext } from '../folder-explorer/folder-explorer.context';

export const Home = () => {
  const { directoryStructure, selectFolder, selectedDirectoryId, createFolder, selectedDirectory, selectedDirectoryPath } = useFolderExplorerContext();
  const [folderName, setFolderName] = useState('');

  const onCreateFolderClick = () => {
    setFolderName('');
    createFolder(folderName);
  };

  return (
    <>
      <Paper className="m-5 flex min-h-[calc(100vh-80px)] w-[calc(100vw-80px)] flex-col p-5" elevation={5}>
        <div>
          <Typography className="uppercase" variant="h3" component="h3">
            Welcome to Folder Explorer
          </Typography>
        </div>

        <div className="m-5 flex flex-row gap-5">
          <div className="flex flex-row gap-5 ">
            <Button onClick={onCreateFolderClick} variant="contained">
              Create Folder
            </Button>
            <TextField autoComplete="off" id="folderNameInput" label="Folder Name" variant="standard" value={folderName} onChange={(e) => setFolderName(e.target.value)} />
          </div>
          <div className="flex grow flex-row justify-end">
            <Button variant="contained">Upload File</Button>
          </div>
        </div>
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
