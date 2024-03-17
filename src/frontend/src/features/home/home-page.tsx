import { useEffect, useState } from 'react';
import { Client, DirectoryStructure } from '../../../generated/client';
import { DirectoryPicker } from '../../components/directory-picker/directory-picker.component';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  DialogTitle,
  Paper,
  TextField,
} from '@mui/material';
import { DirectoryBreadcrumbs } from '../../components/breadcrumbs/directory-breadcrumbs.component';

export const Home = () => {
  const [directoryStructure, setDirectoryStructure] =
    useState<DirectoryStructure | null>(null);

  const api = import.meta.env.VITE_API;

  useEffect(() => {
    const api = new Client(import.meta.env.VITE_API);

    api.documentDirectoriesGET().then((res) => {
      setDirectoryStructure(res);
    });

    return () => {};
  }, []);

  return (
    <>
      <Paper
        className="m-5 min-h-[calc(100vh-80px)] w-[calc(100vw-80px)] p-5 flex flex-col"
        elevation={5}
      >
        <div className="m-5 flex flex-row gap-5">
          <div className="flex flex-row gap-5 ">
            <Button variant="contained">Create Folder</Button>
            <TextField
              id="folderNameInput"
              label="Folder Name"
              variant="standard"
            />
          </div>
          <div className='grow flex justify-end flex-row'>
          <Button variant="contained">Upload File</Button>

          </div>

        </div>
        <div className="m-5 flex flex-1 h-full flex-row gap-5">
            <Card elevation={2} className=" h-full w-96">
              <CardHeader className="text-left" title="Folders" />
              <CardContent>
                <DirectoryPicker />
              </CardContent>
            </Card>

            <Card elevation={2}  className='w-full'>
              <CardHeader className="text-left" title={<DirectoryBreadcrumbs />} />
              <CardContent className="">
                <div>Content...</div>
              </CardContent>
            </Card>
        </div>
      </Paper>
    </>
  );
};
