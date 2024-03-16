import { useEffect, useState } from 'react';
import { Button } from '../../components/common/button/button';

export const Home = () => {
  const api = import.meta.env.VITE_API;

  return (
    <>
      <div className="flex justify-center align-middle ">
        <div className="flex w-fit flex-col gap-2">Hi {api}</div>
      </div>
    </>
  );
};
