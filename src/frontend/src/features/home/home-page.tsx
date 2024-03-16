import { useEffect, useState } from 'react';
import { Button } from '../../components/common/button/button';
import { Client, DirectoryStructure } from '../../../generated/client';

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
        <div className="flex w-fit flex-col gap-2">URL: {api}</div>
        {
          directoryStructure?.rootDirectories ?
            <> {directoryStructure.rootDirectories.map(item => <div>{item.name}</div>)} </>
          : null
        }

      </div>
    </>
  );
};
