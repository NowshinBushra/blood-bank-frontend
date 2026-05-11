import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [donorData, setDonorData] = useState({
    name: '',
    age: '',
    address: '',
    blood_group: 'O+',
    last_donation_date: '',
    availability_status: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  useEffect(() => {
    const fetchDonorProfile = async () => {
      try {
        const response = await api.get('/api/v1/donors/me/');
        if (response.data) {
          setDonorData(response.data);
        }
      } catch {
        console.error('Error fetching profile');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchDonorProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await api.put('/api/v1/donors/me/', donorData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-primary/10 rounded-2xl text-primary">
          <User size={40} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Donor Profile</h1>
          <p className="text-text-muted">Keep your information up to date to help recipients find you.</p>
        </div>
      </div>

      {message.text && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' ? 'bg-success/10 text-success border border-success/20' : 'bg-error/10 text-error border border-error/20'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="glass-card space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <input 
              type="text" 
              required
              value={donorData.name}
              onChange={(e) => setDonorData({ ...donorData, name: e.target.value })}
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Age</label>
            <input 
              type="number" 
              required
              value={donorData.age}
              onChange={(e) => setDonorData({ ...donorData, age: e.target.value })}
              placeholder="Minimum 18"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Blood Group</label>
            <select 
              value={donorData.blood_group}
              onChange={(e) => setDonorData({ ...donorData, blood_group: e.target.value })}
            >
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Donation Date</label>
            <input 
              type="date" 
              value={donorData.last_donation_date || ''}
              onChange={(e) => setDonorData({ ...donorData, last_donation_date: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Address</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-text-muted" size={20} />
            <textarea 
              className="pl-12 pt-2 min-h-[100px]"
              required
              value={donorData.address}
              onChange={(e) => setDonorData({ ...donorData, address: e.target.value })}
              placeholder="Your current address"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-border">
          <input 
            type="checkbox" 
            className="w-5 h-5 accent-primary"
            checked={donorData.availability_status}
            onChange={(e) => setDonorData({ ...donorData, availability_status: e.target.checked })}
          />
          <div>
            <p className="font-semibold">I am currently available to donate</p>
            <p className="text-xs text-text-muted">Uncheck this if you are feeling unwell or have recently donated.</p>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={saving}
          className="btn btn-primary w-full py-3"
        >
          {saving ? 'Saving...' : (
            <>
              <Save size={20} />
              <span>Save Profile Details</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Profile;
