import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Droplet, MapPin, Calendar, CheckCircle2, XCircle, 
  ChevronDown, UserPlus, Activity, Heart, ShieldCheck, Users, Award 
} from 'lucide-react';
import api from '../services/api';

const Home = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bloodGroup, setBloodGroup] = useState('');
  const [search, setSearch] = useState('');

  const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        let url = '/api/v1/donors/';
        const params = new URLSearchParams();
        if (bloodGroup) params.append('blood_group', bloodGroup);
        if (search) params.append('search', search);
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const response = await api.get(url);
        setDonors(response.data);
      } catch {
        console.error('Error fetching donors');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchDonors, 300);
    return () => clearTimeout(timeoutId);
  }, [bloodGroup, search]);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl min-h-[500px] flex items-center justify-center text-center p-8 md:p-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-banner.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-background/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 space-y-6 max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl"
          >
            Give the Gift of <span className="text-primary">Life</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-lg"
          >
            Connecting blood donors with recipients instantly. Join our community and help save lives today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="pt-4"
          >
            <Link 
              to="/register" 
              className="btn btn-primary px-10 py-4 text-lg font-bold rounded-2xl shadow-2xl shadow-primary/40"
            >
              Become a Donor
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">How It Works</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">Saving lives is simple. Follow these three easy steps to make a difference.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <UserPlus size={32} />, title: 'Register', desc: 'Create an account and provide your blood group and location details.' },
            { icon: <Activity size={32} />, title: 'Find or Notify', desc: 'Search for donors near you or get notified when someone needs your blood type.' },
            { icon: <Heart size={32} />, title: 'Donate & Save', desc: 'Connect with the recipient and complete the donation process safely.' }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card text-center space-y-4 p-10 relative overflow-hidden group"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold">{step.title}</h3>
              <p className="text-text-muted leading-relaxed">{step.desc}</p>
              <div className="absolute -bottom-2 -right-2 text-primary/5 font-black text-8xl pointer-events-none">{i + 1}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content Area (Filter + Donor List) */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold">Find Donors</h2>
            <p className="text-text-muted text-lg">Search for available blood donors in your area.</p>
          </div>
        </div>

        {/* Filter Section */}
        <section className="glass-card">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
            }} 
            className="flex flex-col md:flex-row gap-6 items-end"
          >
            <div className="flex-grow space-y-2">
              <label className="text-sm font-medium text-text-muted">Search Donors</label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by name or location..." 
                  className="pl-12 pr-32 h-14"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 btn-primary py-2 px-6 rounded-lg text-sm font-bold shadow-md hover:shadow-primary/40 transition-all duration-300"
                >
                  Search
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-64 space-y-2">
              <label className="text-sm font-medium text-text-muted">Blood Group</label>
              <div className="relative group">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors pointer-events-none" size={20} />
                <select 
                  className="pl-12 pr-10 appearance-none h-14"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  <option value="">All Groups</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors pointer-events-none" size={18} />
              </div>
            </div>
          </form>
        </section>

        {/* Donor List */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="glass-card h-64 animate-pulse bg-surface-light/20" />
            ))
          ) : donors.length > 0 ? (
            donors.map((donor) => (
              <motion.div 
                key={donor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Droplet className="text-primary" size={32} fill="currentColor" />
                  </div>
                  <span className="text-2xl font-bold text-primary">{donor.blood_group}</span>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold">{donor.name}</h3>
                  <div className="flex items-center gap-2 text-text-muted mt-1">
                    <MapPin size={16} />
                    <span>{donor.address}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="space-y-1">
                    <span className="text-xs text-text-muted uppercase">Last Donated</span>
                    <div className="flex items-center gap-1 font-medium">
                      <Calendar size={14} />
                      <span>{donor.last_donation_date || 'Never'}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-text-muted uppercase">Status</span>
                    <div className={`flex items-center gap-1 font-medium ${donor.availability_status ? 'text-success' : 'text-error'}`}>
                      {donor.availability_status ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      <span>{donor.availability_status ? 'Available' : 'Unavailable'}</span>
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary w-full mt-4">Request Blood</button>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 glass-card">
              <Search size={48} className="mx-auto text-text-muted mb-4" />
              <h3 className="text-2xl font-bold">No donors found</h3>
              <p className="text-text-muted">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </section>
      </div>

      {/* Why Donate Section */}
      <section className="bg-primary/5 -mx-6 px-6 py-24 rounded-[3rem] space-y-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Why Your Donation Matters</h2>
          <p className="text-xl text-text-muted leading-relaxed">
            Every drop of blood you donate can save up to three lives. Your contribution builds a stronger, healthier community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 container">
          {[
            { icon: <ShieldCheck size={40} />, title: 'Health Benefits', desc: 'Regular donation helps reduce the risk of certain health issues and keeps your heart healthy.' },
            { icon: <Users size={40} />, title: 'Community Support', desc: 'Help maintain a stable blood supply for emergencies, surgeries, and chronic illnesses.' },
            { icon: <Award size={40} />, title: 'Heroic Act', desc: 'Know that you have made a direct, positive impact on someone else\'s life today.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="text-primary mb-2 p-4 bg-white dark:bg-surface rounded-3xl shadow-xl shadow-primary/5">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-text-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
