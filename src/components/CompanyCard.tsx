import type { Company } from '../mockApi';
import { Users, GraduationCap, Clock, MonitorPlay, MapPin, IndianRupee } from 'lucide-react';

interface Props {
  company: Company;
  onViewTrainers: (companyId: string) => void;
  onBookTrainer: (companyId: string) => void;
}

const CompanyCard: React.FC<Props> = ({ company, onViewTrainers, onBookTrainer }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <img 
          src={company.logo} 
          alt={company.name} 
          style={{ width: '56px', height: '56px', objectFit: 'contain', borderRadius: 'var(--radius-md)', padding: '4px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)' }}
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${company.name}&background=random`;
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{company.name}</h3>
            {company.hqLocation && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <MapPin size={12} /> {company.hqLocation}
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {company.description}
          </p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <Users size={16} color="var(--primary-color)" />
          <span>{company.trainersCount} Trainers</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <GraduationCap size={16} color="var(--primary-color)" />
          <span>{company.experienceLevel}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <Clock size={16} color="var(--primary-color)" />
          <span>{company.durations.join(' / ')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <MonitorPlay size={16} color="var(--primary-color)" />
          <span>{company.trainingModes.join(' / ')}</span>
        </div>
      </div>
      
      <div style={{ marginTop: '0.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>DOMAINS & FEES (per student/mo)</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {company.domains.map(d => (
            <div key={d} style={{ 
              backgroundColor: 'var(--bg-color)', 
              padding: '0.25rem 0.5rem', 
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid var(--border-color)'
            }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{d}</span>
              <span style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', marginTop: '0.125rem', fontWeight: 600 }}>
                <IndianRupee size={10} /> {company.domainFeeRanges[d]?.min.toLocaleString('en-IN')} - {company.domainFeeRanges[d]?.max.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem' }}>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => onViewTrainers(company.id)}>
          View Trainers
        </button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => onBookTrainer(company.id)}>
          Book Trainer
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
