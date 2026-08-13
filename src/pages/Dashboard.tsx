import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import CompanyCard from '../components/CompanyCard';
import TrainerModal from '../components/TrainerModal';
import BookingModal from '../components/BookingModal';
import { getCompanies } from '../mockApi';
import type { Company, Trainer } from '../mockApi';
import { Building2, Users, BookOpen, GraduationCap, Filter } from 'lucide-react';

const Dashboard = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isTrainerModalOpen, setIsTrainerModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    getCompanies().then(data => {
      setCompanies(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Topbar />
        
        <div className="content-container">
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Industry Trainer Connect
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
              Connect your students with industry professionals and prepare them for successful placements.
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            {[
              { icon: <Building2 size={24} color="var(--primary-color)" />, value: '100+', label: 'Companies' },
              { icon: <Users size={24} color="var(--primary-color)" />, value: '500+', label: 'Industry Trainers' },
              { icon: <BookOpen size={24} color="var(--primary-color)" />, value: '25+', label: 'Training Domains' },
              { icon: <GraduationCap size={24} color="var(--primary-color)" />, value: '10,000+', label: 'Students Trained' },
            ].map((stat, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  backgroundColor: 'var(--secondary-color)', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-lg)' 
                }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ 
            backgroundColor: 'var(--surface-color)', 
            padding: '1.5rem', 
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            marginBottom: '2rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginRight: '1rem' }}>
              <Filter size={18} /> Filters
            </div>
            <input type="text" placeholder="Company Name" style={{ flex: '1 1 150px' }} />
            <input type="text" placeholder="Trainer/Domain" style={{ flex: '1 1 150px' }} />
            <select style={{ flex: '1 1 150px' }}>
              <option value="">All Domains</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="AI/ML">AI/ML</option>
            </select>
            <select style={{ flex: '1 1 150px' }}>
              <option value="">Duration</option>
              <option value="1 Month">1 Month</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
            </select>
            <select style={{ flex: '1 1 150px' }}>
              <option value="">Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Partner Companies</h2>
          
          {loading ? (
            <div>Loading companies...</div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {companies.map(company => (
                <CompanyCard 
                  key={company.id} 
                  company={company} 
                  onViewTrainers={(id) => {
                    setSelectedCompany(companies.find(c => c.id === id) || null);
                    setIsTrainerModalOpen(true);
                  }} 
                  onBookTrainer={(id) => {
                    setSelectedCompany(companies.find(c => c.id === id) || null);
                    setSelectedTrainer(null);
                    setIsBookingModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <TrainerModal 
        isOpen={isTrainerModalOpen} 
        onClose={() => {
          setIsTrainerModalOpen(false);
          setSelectedCompany(null);
        }} 
        company={selectedCompany} 
        onBookTrainer={(trainer) => {
          setSelectedTrainer(trainer);
          setIsTrainerModalOpen(false);
          setIsBookingModalOpen(true);
        }}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedCompany(null);
          setSelectedTrainer(null);
        }}
        company={selectedCompany}
        trainer={selectedTrainer}
      />
    </div>
  );
};

export default Dashboard;
