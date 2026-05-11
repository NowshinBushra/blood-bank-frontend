import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const { activate } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading, success, error

  useEffect(() => {
    const performActivation = async () => {
      try {
        await activate(uid, token);
        setStatus('success');
        setTimeout(() => navigate('/login'), 3000);
      } catch {
        setStatus('error');
      }
    };
    performActivation();
  }, [uid, token, activate, navigate]);

  return (
    <div className="max-w-md mx-auto py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card text-center space-y-6"
      >
        {status === 'loading' && (
          <>
            <Loader2 className="mx-auto text-primary animate-spin" size={64} />
            <h2 className="text-2xl font-bold">Activating Account...</h2>
            <p className="text-text-muted">Please wait while we verify your account.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="mx-auto text-success" size={64} />
            <h2 className="text-2xl font-bold">Account Activated!</h2>
            <p className="text-text-muted">Your account is now active. Redirecting you to login...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="mx-auto text-error" size={64} />
            <h2 className="text-2xl font-bold">Activation Failed</h2>
            <p className="text-text-muted">The link might be expired or invalid. Please try registering again.</p>
            <button 
              onClick={() => navigate('/register')}
              className="btn btn-primary w-full"
            >
              Back to Registration
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ActivateAccount;
