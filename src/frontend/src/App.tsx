import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './features/home/home-page';
import {
  FolderExplorerContext,
  FolderExplorerProvider,
} from './features/folder-explorer/folder-explorer.context';

function App() {
  return (
    <BrowserRouter>
      <FolderExplorerProvider>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </FolderExplorerProvider>
    </BrowserRouter>
  );
}

export default App;
