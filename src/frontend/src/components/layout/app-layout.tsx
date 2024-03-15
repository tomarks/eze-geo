import React, { ReactNode } from 'react';
import NavBar from './nav-bar/nav-bar';
import { AppFooter } from './app-footer';

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen">
      <NavBar />
      <div className="grid h-[calc(100vh-50px)] w-full grid-cols-[200px,1fr] gap-2">
        <div className="w-48">Sidebar</div>
        <main className="p-2">{children}</main>
      </div>
      <AppFooter />
    </div>
  );
};
