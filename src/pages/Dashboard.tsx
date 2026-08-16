import { useState, useEffect } from 'react';
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

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [modeFilter, setModeFilter] = useState('');

  useEffect(() => {
    getCompanies().then(data => {
      setCompanies(data);
      setLoading(false);
    });
  }, []);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          company.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = domainFilter ? company.domains.includes(domainFilter) : true;
    const matchesMode = modeFilter ? company.trainingModes.includes(modeFilter) : true;
    return matchesSearch && matchesDomain && matchesMode;
  });

  return (
    <>
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
            <input 
              type="text" 
              placeholder="Search Company..." 
              style={{ flex: '1 1 150px' }} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select style={{ flex: '1 1 150px' }} value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)}>
              <option value="">All Domains</option>
              <option value="Java Full Stack">Java Full Stack</option>
              <option value="MERN Stack">MERN Stack</option>
              <option value="Data Science">Data Science</option>
              <option value="Cloud Computing (AWS/Azure)">Cloud</option>
              <option value="Artificial Intelligence">AI</option>
            </select>
            <select style={{ flex: '1 1 150px' }} value={modeFilter} onChange={(e) => setModeFilter(e.target.value)}>
              <option value="">All Modes</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Partner Companies</h2>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Showing {filteredCompanies.length} result{filteredCompanies.length !== 1 && 's'}
            </div>
          </div>
          
          {loading ? (
            <div>Loading companies...</div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {filteredCompanies.map(company => (
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
    </>
  );
};

export default Dashboard;
