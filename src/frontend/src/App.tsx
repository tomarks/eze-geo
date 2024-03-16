import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppLayout } from './components/layout/app-layout';
import { Home } from './features/home/home-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;