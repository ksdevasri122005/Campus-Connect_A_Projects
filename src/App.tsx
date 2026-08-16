import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import MyBookings from './pages/MyBookings';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import './index.css';

function App() {
  const [currentPath, setCurrentPath] = useState('dashboard');

  return (
    <div className="layout">
      <Sidebar currentPath={currentPath} onNavigate={setCurrentPath} />
      <main className="main-content">
        <Topbar />
        {currentPath === 'dashboard' && <Dashboard />}
        {currentPath === 'bookings' && <MyBookings />}
      </main>
    </div>
  );
}

export default App;
