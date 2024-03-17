import { useEffect, useState } from 'react';
import { Client, DirectoryStructure } from '../../../generated/client';
import { DirectoryPicker } from '../../components/directory-picker/directory-picker-component';

export const Home = () => {

  const [directoryStructure, setDirectoryStructure] = useState<DirectoryStructure|null>(null)

  const api = import.meta.env.VITE_API;


  useEffect(() => {
    const api = new Client(import.meta.env.VITE_API)

    api.documentDirectoriesGET().then(res => {
      setDirectoryStructure(res)
    });
  
    return () => {

    }
  }, [])
  


  

  return (
    <>
      <div className="flex justify-center align-middle ">
        <div className="flex w-fit flex-col gap-2"></div>


        <DirectoryPicker></DirectoryPicker>

      </div>
    </>
  );
};
