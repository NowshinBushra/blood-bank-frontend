import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet, MapPin, ClipboardList, Send, AlertCircle } from 'lucide-react';
import api from '../services/api';

const CreateRequest = () => {
  const [formData, setFormData] = useState({
    recipient_name: '',
    blood_group: 'O+',
    location: '',
    reason: '',
    required_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/api/v1/blood_requests/', formData);
      navigate('/dashboard');
    } catch {
      setError('Failed to create request. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-primary/10 rounded-2xl text-primary">
          <Droplet fill="currentColor" size={40} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Request Blood</h1>
          <p className="text-text-muted">Create a request to reach out to available donors.</p>
        </div>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/20 text-error p-4 rounded-lg flex items-center gap-3">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Recipient Name</label>
            <input 
              type="text" 
              required
              placeholder="Patient's full name"
              value={formData.recipient_name}
              onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Blood Group Required</label>
            <select 
              value={formData.blood_group}
              onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
            >
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Hospital/Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
              <input 
                type="text" 
                required
                className="pl-12"
                placeholder="Hospital name or city"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Required By Date</label>
            <input 
              type="date" 
              required
              value={formData.required_date}
              onChange={(e) => setFormData({ ...formData, required_date: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Reason for Request</label>
          <div className="relative">
            <ClipboardList className="absolute left-3 top-3 text-text-muted" size={20} />
            <textarea 
              className="pl-12 pt-2 min-h-[100px]"
              required
              placeholder="Briefly explain the urgency or medical condition..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="btn btn-primary w-full py-3"
        >
          {loading ? 'Submitting...' : (
            <>
              <Send size={20} />
              <span>Post Request</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateRequest;
