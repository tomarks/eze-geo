import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { FolderExplorerProvider } from './features/folder-explorer/folder-explorer.context';
import { FolderExplorerPage } from './features/folder-explorer/folder-explorer.page';

function App() {
  return (
    <BrowserRouter>
      <FolderExplorerProvider>
        <Routes>
          <Route path="/*" element={<FolderExplorerPage />} />
        </Routes>
      </FolderExplorerProvider>
    </BrowserRouter>
  );
}

export default App;
