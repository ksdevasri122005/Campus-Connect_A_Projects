import { useState } from 'react';
import { submitBookingRequest } from '../mockApi';
import type { BookingData, Company, Trainer } from '../mockApi';
import { X, Calendar } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  trainer: Trainer | null;
}

const BookingModal: React.FC<Props> = ({ isOpen, onClose, company, trainer }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Create dummy booking data from form
    const form = e.target as HTMLFormElement;
    const data: BookingData = {
      collegeName: (form.elements.namedItem('collegeName') as HTMLInputElement).value,
      contactPerson: (form.elements.namedItem('contactPerson') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      studentsCount: parseInt((form.elements.namedItem('studentsCount') as HTMLInputElement).value),
      companyId: company?.id || '',
      trainerId: trainer?.id || '',
      domain: (form.elements.namedItem('domain') as HTMLSelectElement).value,
      mode: (form.elements.namedItem('mode') as HTMLSelectElement).value,
      startDate: (form.elements.namedItem('startDate') as HTMLInputElement).value,
      duration: (form.elements.namedItem('duration') as HTMLSelectElement).value,
      schedule: (form.elements.namedItem('schedule') as HTMLInputElement).value,
      requirements: (form.elements.namedItem('requirements') as HTMLTextAreaElement).value,
    };

    const res = await submitBookingRequest(data);
    setLoading(false);
    if (res.success) {
      setSuccess(true);
      setMessage(res.message);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="card" style={{ 
        width: '100%', maxWidth: '800px', maxHeight: '90vh', 
        overflowY: 'auto', position: 'relative' 
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-secondary)' }}
        >
          <X size={24} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{ 
              width: '64px', height: '64px', backgroundColor: 'var(--success-color)', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', color: 'white', margin: '0 auto 1.5rem' 
            }}>
              <Calendar size={32} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--success-color)' }}>
              Training Request Submitted Successfully
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
              {message}
            </p>
            <button className="btn btn-primary" onClick={onClose}>Return to Dashboard</button>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Book Trainer</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Fill out the requirements to book {trainer ? trainer.name : `a trainer from ${company?.name}`}.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>College Name</label>
                  <input type="text" name="collegeName" required defaultValue="NIT Trichy" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Contact Person</label>
                  <input type="text" name="contactPerson" required defaultValue="Dr. R. Kumar" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
                  <input type="email" name="email" required defaultValue="placement@nitt.edu" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Phone Number</label>
                  <input type="tel" name="phone" required defaultValue="+91 9876543210" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Number of Students</label>
                  <input type="number" name="studentsCount" required defaultValue={120} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Training Domain</label>
                  <select name="domain" required defaultValue={trainer?.trainingDomains[0] || company?.domains[0]}>
                    {(trainer?.trainingDomains || company?.domains || []).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Training Mode</label>
                  <select name="mode" required defaultValue={trainer?.preferredMode[0] || company?.trainingModes[0]}>
                    {(trainer?.preferredMode || company?.trainingModes || ['Online', 'Offline', 'Hybrid']).map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Start Date</label>
                  <input type="date" name="startDate" required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Duration</label>
                  <select name="duration" required>
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                    <option value="3 Months">3 Months</option>
                    <option value="4 Months">4 Months</option>
                    <option value="5 Months">5 Months</option>
                    <option value="6 Months">6 Months</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Preferred Schedule</label>
                  <input type="text" name="schedule" placeholder="e.g. Weekends, 4 hours/day" required />
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Additional Requirements</label>
                <textarea name="requirements" rows={4} placeholder="Any specific topics or project requirements..." />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Send Training Request'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
