import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('Blood Bank App Starting...');

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
  console.log('App Rendered to DOM');
} else {
  console.error('CRITICAL: Root element #root not found in HTML');
}
