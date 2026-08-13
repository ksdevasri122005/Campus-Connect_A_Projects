
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  ListChecks, 
  UserSquare2,
  PieChart,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { icon: <Building2 size={20} />, label: 'Companies' },
    { icon: <Users size={20} />, label: 'Trainers' },
    { icon: <BookOpen size={20} />, label: 'Training Domains' },
    { icon: <CalendarCheck size={20} />, label: 'Bookings' },
    { icon: <ListChecks size={20} />, label: 'My Requests' },
    { icon: <UserSquare2 size={20} />, label: 'Students' },
    { icon: <PieChart size={20} />, label: 'Reports' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      backgroundColor: 'var(--surface-color)',
      borderRight: '1px solid var(--border-color)',
      position: 'fixed',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        height: 'var(--topbar-height)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        borderBottom: '1px solid var(--border-color)',
        fontWeight: 'bold',
        fontSize: '1.25rem',
        color: 'var(--primary-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building2 size={24} />
          Trainer Connect
        </div>
      </div>
      
      <nav style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item, idx) => (
          <button 
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: item.active ? 'var(--secondary-color)' : 'transparent',
              color: item.active ? 'var(--primary-color)' : 'var(--text-secondary)',
              fontWeight: item.active ? 600 : 500,
              textAlign: 'left',
              width: '100%',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              if (!item.active) e.currentTarget.style.backgroundColor = 'var(--bg-color)';
            }}
            onMouseOut={(e) => {
              if (!item.active) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      
      <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          © 2026 Industry Trainer Connect
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
