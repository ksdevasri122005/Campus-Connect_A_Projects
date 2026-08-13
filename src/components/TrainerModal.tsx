import { useState, useEffect } from 'react';
import { getTrainers } from '../mockApi';
import type { Company, Trainer } from '../mockApi';
import { X, CheckCircle, Star, MessageSquare } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  onBookTrainer: (trainer: Trainer) => void;
}

const TrainerModal: React.FC<Props> = ({ isOpen, onClose, company, onBookTrainer }) => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && company) {
      setLoading(true);
      getTrainers(company.id).then(data => {
        setTrainers(data);
        setLoading(false);
      });
    }
  }, [isOpen, company]);

  if (!isOpen || !company) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 90,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="card" style={{ 
        width: '100%', maxWidth: '900px', maxHeight: '90vh', 
        overflowY: 'auto', position: 'relative',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Available Trainers from {company.name}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Select a trainer to proceed with booking.</p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-secondary)' }}>
            <X size={24} />
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>Loading trainers...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {trainers.map(trainer => (
              <div key={trainer.id} style={{ 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                display: 'flex', gap: '1.5rem',
                flexDirection: 'row'
              }}>
                <div style={{ flexShrink: 0 }}>
                  <img src={trainer.photo} alt={trainer.name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ 
                    marginTop: '1rem', textAlign: 'center', 
                    padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)',
                    backgroundColor: trainer.availability === 'Available' ? '#dcfce7' : '#fee2e2',
                    color: trainer.availability === 'Available' ? '#166534' : '#991b1b',
                    fontSize: '0.75rem', fontWeight: 600
                  }}>
                    {trainer.availability}
                  </div>
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{trainer.name}</h3>
                      <p style={{ color: 'var(--text-secondary)' }}>{trainer.designation} — {trainer.company}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#fef3c7', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                      <Star size={16} fill="#f59e0b" color="#f59e0b" />
                      <span style={{ fontWeight: 600, color: '#92400e' }}>{trainer.rating}</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>EXPERTISE</div>
                      <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {trainer.expertise.map(exp => (
                          <li key={exp} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckCircle size={14} color="var(--success-color)" /> {exp}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>TRAINING DOMAINS</div>
                      <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {trainer.trainingDomains.map(td => (
                          <li key={td} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckCircle size={14} color="var(--primary-color)" /> {td}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {trainer.bio && (
                    <div style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                        "{trainer.bio}"
                      </div>
                      {trainer.languages && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          <MessageSquare size={14} /> Speaks: {trainer.languages.join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border-color)' }}>
                    <div style={{ fontSize: '0.875rem' }}>
                      <span style={{ fontWeight: 600 }}>Experience:</span> {trainer.experience} Years
                    </div>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => onBookTrainer(trainer)}
                      disabled={trainer.availability !== 'Available'}
                    >
                      Book Trainer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerModal;
