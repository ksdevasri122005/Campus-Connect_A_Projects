export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  trainersCount: number;
  domains: string[];
  trainingModes: string[];
  experienceLevel: string;
  durations: string[];
  website?: string;
  hqLocation?: string;
  domainFeeRanges: Record<string, { min: number, max: number }>; // Domain -> min and max price per student per month
}

export interface Trainer {
  id: string;
  companyId: string;
  name: string;
  photo: string;
  company: string;
  designation: string;
  experience: number;
  expertise: string[];
  skills: string[];
  certifications: string[];
  trainingDomains: string[];
  previousExperience: string[];
  availability: 'Available' | 'Busy' | 'Unavailable';
  preferredMode: string[];
  rating: number;
  languages?: string[];
  bio?: string;
}

export interface BookingData {
  collegeName: string;
  contactPerson: string;
  email: string;
  phone: string;
  studentsCount: number;
  companyId: string;
  trainerId: string;
  domain: string;
  mode: string;
  startDate: string;
  duration: string;
  schedule: string;
  requirements: string;
}

const companyNames = [
  'Campus Connection', 'TCS', 'Infosys', 'Wipro', 'HCLTech', 'Tech Mahindra',
  'Cognizant', 'Capgemini', 'Accenture', 'IBM', 'Oracle',
  'Microsoft', 'Google', 'Amazon', 'Cisco', 'Intel',
  'Zoho', 'Freshworks', 'ThoughtWorks', 'Mindtree', 'LTI'
];

const domainsList = [
  'Java Full Stack', 'MERN Stack', 'Python & Django', 'Data Science',
  'Machine Learning', 'Artificial Intelligence', 'Cloud Computing (AWS/Azure)',
  'DevOps & CI/CD', 'Cybersecurity', 'Software Testing', 'Blockchain',
  'UI/UX Design', 'Data Analytics', 'Mobile App Dev (Flutter/React Native)'
];

const mockCompanies: Company[] = companyNames.map((name, index) => {
  // Generate random data for variety
  const numDomains = Math.floor(Math.random() * 4) + 3;
  const shuffledDomains = [...domainsList].sort(() => 0.5 - Math.random());
  const selectedDomains = name === 'Campus Connection' ? ['Java Full Stack', 'MERN Stack', 'Interview Preparation', 'Aptitude & Logical Reasoning'] : shuffledDomains.slice(0, numDomains);
  
  const domainFeeRanges: Record<string, { min: number, max: number }> = {};
  selectedDomains.forEach(domain => {
    // Generate realistic fees per student per month (e.g., max ₹4000 - ₹8000, min ₹2000 - ₹5000)
    const maxFee = Math.floor(Math.random() * 40 + 40) * 100;
    const minFee = maxFee - (Math.floor(Math.random() * 15 + 10) * 100);
    domainFeeRanges[domain] = { min: minFee, max: maxFee };
  });

  return {
    id: `c${index + 1}`,
    name,
    logo: name === 'Campus Connection' ? 'https://ui-avatars.com/api/?name=CC&background=4f46e5&color=fff&size=128' : `https://logo.clearbit.com/${name.toLowerCase().replace(/\s+/g, '')}.com`,
    description: name === 'Campus Connection' ? 'Your dedicated partner for bridging the gap between campus and corporate. Specializing in high-impact placement training.' : `Leading provider of digital solutions and industry-standard training in emerging technologies. Partnered with top universities.`,
    trainersCount: name === 'Campus Connection' ? 45 : Math.floor(Math.random() * 50) + 10,
    domains: selectedDomains,
    trainingModes: ['Online', 'Offline', 'Hybrid'].filter(() => Math.random() > 0.3).concat(Math.random() > 0.8 ? [] : ['Online']),
    experienceLevel: `${Math.floor(Math.random() * 5) + 3}+ Years`,
    durations: ['1 Month', '2 Months', '3 Months', '6 Months'].filter(() => Math.random() > 0.4),
    hqLocation: ['Bangalore', 'Chennai', 'Pune', 'Hyderabad', 'Mumbai', 'Noida'][Math.floor(Math.random() * 6)],
    website: `https://www.${name.toLowerCase().replace(/\s+/g, '')}.com`,
    domainFeeRanges
  };
});

// Fix logos for specific companies that might not resolve cleanly on clearbit
const logoOverrides: Record<string, string> = {
  'TCS': 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
  'Infosys': 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
  'Wipro': 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg',
  'LTI': 'https://upload.wikimedia.org/wikipedia/commons/e/e5/LTIMindtree_Logo.svg'
};

mockCompanies.forEach(c => {
  if (logoOverrides[c.name]) c.logo = logoOverrides[c.name];
  // Deduplicate modes/durations
  c.trainingModes = [...new Set(c.trainingModes)];
  c.durations = [...new Set(c.durations)];
  if (c.trainingModes.length === 0) c.trainingModes = ['Hybrid'];
  if (c.durations.length === 0) c.durations = ['3 Months'];
});

const trainerNames = [
  'Arun Kumar', 'Priya Sharma', 'Rahul Verma', 'Sneha Patel', 'Amit Singh',
  'Kavita Reddy', 'Vikram Malhotra', 'Neha Gupta', 'Suresh Iyer', 'Divya Desai'
];

const mockTrainers: Trainer[] = [];

mockCompanies.forEach(company => {
  // Add 2-3 trainers per company
  const numTrainers = Math.floor(Math.random() * 2) + 2;
  for (let i = 0; i < numTrainers; i++) {
    const trainerName = trainerNames[Math.floor(Math.random() * trainerNames.length)] + ' ' + String.fromCharCode(65 + Math.floor(Math.random() * 26));
    mockTrainers.push({
      id: `t_${company.id}_${i}`,
      companyId: company.id,
      name: trainerName,
      photo: `https://i.pravatar.cc/150?u=${company.id}_${i}`,
      company: company.name,
      designation: ['Senior Engineer', 'Lead Architect', 'Principal Consultant', 'Technical Manager'][Math.floor(Math.random() * 4)],
      experience: Math.floor(Math.random() * 10) + 5,
      expertise: company.domains.slice(0, 3),
      skills: ['React', 'Node.js', 'Docker', 'Kubernetes', 'AWS', 'Python', 'Java'].sort(() => 0.5 - Math.random()).slice(0, 4),
      certifications: ['AWS Certified', 'Google Cloud Pro', 'Scrum Master', 'Microsoft Certified'].sort(() => 0.5 - Math.random()).slice(0, 2),
      trainingDomains: company.domains.slice(0, 2),
      previousExperience: ['Trained 500+ students', 'Corporate Trainer for 3 years', 'Mentored startups'],
      availability: Math.random() > 0.3 ? 'Available' : (Math.random() > 0.5 ? 'Busy' : 'Unavailable'),
      preferredMode: company.trainingModes,
      rating: +(Math.random() * (5 - 4.2) + 4.2).toFixed(1),
      languages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada'].sort(() => 0.5 - Math.random()).slice(0, 2),
      bio: `Passionate about upskilling students and bridging the industry-academia gap. Over ${Math.floor(Math.random() * 5) + 3} years of mentoring experience.`
    });
  }
});

// Mock API Functions
export const getCompanies = async (): Promise<Company[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCompanies);
    }, 600);
  });
};

export const getTrainers = async (companyId?: string): Promise<Trainer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (companyId) {
        resolve(mockTrainers.filter(t => t.companyId === companyId));
      } else {
        resolve(mockTrainers);
      }
    }, 800);
  });
};

export const submitBookingRequest = async (data: BookingData): Promise<{success: boolean, message: string}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Booking submitted:', data);
      resolve({
        success: true,
        message: 'Training Request Submitted Successfully. Your request has been sent to the company. The company will review your requirements and contact you shortly.'
      });
    }, 1500);
  });
};
