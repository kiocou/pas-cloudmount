import { useState } from 'react';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import './index.css';

type Page = 'home' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <>
      {currentPage === 'home' && (
        <HomePage onNavigate={setCurrentPage} />
      )}
      {currentPage === 'settings' && (
        <SettingsPage onNavigate={setCurrentPage} />
      )}
    </>
  );
}

export default App;
