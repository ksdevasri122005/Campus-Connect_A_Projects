
import { Search, Bell, UserCircle, LogOut } from 'lucide-react';

const Topbar = () => {
  return (
    <header style={{
      height: 'var(--topbar-height)',
      backgroundColor: 'var(--surface-color)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: 'var(--bg-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.5rem 1rem',
          width: '400px'
        }}>
          <Search size={18} color="var(--text-secondary)" style={{ marginRight: '0.5rem' }} />
          <input 
            type="text" 
            placeholder="Search companies, trainers, domains..." 
            style={{ 
              border: 'none', 
              background: 'transparent', 
              outline: 'none', 
              width: '100%',
              boxShadow: 'none'
            }} 
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button style={{ color: 'var(--text-secondary)' }}>
          <Bell size={20} />
        </button>
        
        <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-color)' }}></div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <UserCircle size={24} color="var(--text-secondary)" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>NIT Trichy</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>College Admin</span>
          </div>
        </div>
        
        <button style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
