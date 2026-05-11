import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  Clock, 
  CheckCircle2
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('requests');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [requestsRes, historyRes] = await Promise.all([
          api.get('/api/v1/blood_requests/'),
          api.get('/api/v1/donations/')
        ]);
        setRequests(requestsRes.data);
        setHistory(historyRes.data);
      } catch {
        console.error('Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  const handleAccept = async (requestId) => {
    try {
      await api.post('/api/v1/donations/', { blood_request: requestId });
      // Refresh data
      const [requestsRes, historyRes] = await Promise.all([
        api.get('/api/v1/blood_requests/'),
        api.get('/api/v1/donations/')
      ]);
      setRequests(requestsRes.data);
      setHistory(historyRes.data);
    } catch {
      alert('Failed to accept request. You might have already donated recently.');
    }
  };

  if (!user) return <div className="text-center py-20">Please login to view your dashboard.</div>;

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">Welcome, {user.username}!</h1>
          <p className="text-text-muted">Manage your donations and requests here.</p>
        </div>
        <div className="flex gap-4 bg-surface p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('requests')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${activeTab === 'requests' ? 'bg-primary text-white' : 'hover:bg-surface-light'}`}
          >
            Recipient Requests
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${activeTab === 'history' ? 'bg-primary text-white' : 'hover:bg-surface-light'}`}
          >
            Donation History
          </button>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3).fill(0).map((_, i) => <div key={i} className="glass-card h-48 animate-pulse" />)}
        </div>
      ) : activeTab === 'requests' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.filter(r => r.user !== user.id).map((request) => (
              <motion.div 
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="badge badge-info flex items-center gap-1">
                      <Clock size={12} />
                      <span>Urgent</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">{request.blood_group}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold">Recipient: {request.recipient_name}</h3>
                    <p className="text-sm text-text-muted">Location: {request.location}</p>
                    <p className="text-sm mt-2 line-clamp-2">{request.reason}</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleAccept(request.id)}
                  className="btn btn-primary w-full mt-6"
                >
                  Accept & Donate
                </button>
              </motion.div>
            ))}
            {requests.filter(r => r.user !== user.id).length === 0 && (
              <div className="col-span-full py-12 text-center glass-card text-text-muted">
                No active requests found at the moment.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-light/50 border-b border-border">
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Recipient</th>
                <th className="px-6 py-4 font-semibold">Blood Group</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-surface-light/20 transition-colors">
                  <td className="px-6 py-4 text-text-muted">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {item.blood_request_details?.recipient_name || 'System Request'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-primary font-bold">{item.blood_request_details?.blood_group}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 size={16} />
                      <span>Donated</span>
                    </div>
                  </td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-text-muted">
                    Your donation history is empty. Start saving lives today!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
