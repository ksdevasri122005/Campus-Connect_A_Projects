import React, { useState } from 'react';
import { CalendarCheck, Search, Filter } from 'lucide-react';

const MyBookings = () => {
  // Mock bookings data
  const [bookings] = useState([
    { id: 'REQ-1029', company: 'Campus Connection', domain: 'Java Full Stack', date: '2026-09-01', duration: '3 Months', students: 120, status: 'Approved' },
    { id: 'REQ-1028', company: 'TCS', domain: 'Cloud Computing', date: '2026-10-15', duration: '1 Month', students: 50, status: 'Pending' },
    { id: 'REQ-1025', company: 'Infosys', domain: 'Artificial Intelligence', date: '2026-08-01', duration: '6 Months', students: 250, status: 'In Progress' },
    { id: 'REQ-1020', company: 'Zoho', domain: 'UI/UX Design', date: '2026-05-10', duration: '2 Months', students: 40, status: 'Completed' },
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved': return { bg: '#dcfce7', text: '#166534' };
      case 'Pending': return { bg: '#fef9c3', text: '#854d0e' };
      case 'In Progress': return { bg: '#dbeafe', text: '#1e40af' };
      case 'Completed': return { bg: '#f3f4f6', text: '#374151' };
      default: return { bg: 'var(--bg-color)', text: 'var(--text-secondary)' };
    }
  };

  return (
    <div className="content-container">
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            My Bookings
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            Track and manage your college's training requests.
          </p>
        </div>
        <button className="btn btn-primary">
          <CalendarCheck size={18} /> New Request
        </button>
      </div>

      <div style={{ 
        backgroundColor: 'var(--surface-color)', 
        borderRadius: 'var(--radius-lg)', 
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-color)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', flex: 1 }}>
              <Search size={18} color="var(--text-secondary)" />
              <input type="text" placeholder="Search Request ID, Company, or Domain..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', padding: 0 }} />
           </div>
           <button className="btn btn-outline"><Filter size={18} /> Filter</button>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Request ID</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Company</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Training Domain</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Start Date</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Students / Duration</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => {
                const colors = getStatusColor(booking.status);
                return (
                  <tr key={booking.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} className="hover-bg">
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--primary-color)' }}>{booking.id}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{booking.company}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>{booking.domain}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{booking.date}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{booking.students} • {booking.duration}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ 
                        backgroundColor: colors.bg, 
                        color: colors.text, 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
