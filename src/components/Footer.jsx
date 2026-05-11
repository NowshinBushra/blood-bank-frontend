import { Link } from 'react-router-dom';
// import { Droplet, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border py-12 bg-surface">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 text-2xl font-bold text-primary mb-4">
            {/* <Droplet fill="currentColor" size={28} /> */}
            <span>BloodBank</span>
          </div>
          <p className="text-text-muted max-w-sm">
            Empowering communities by connecting blood donors with those in need.
            Every donation is a gift of life. Join our mission today.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-text-muted">
            <li><Link to="/" className="hover:text-primary">Find Donors</Link></li>
            <li><Link to="/register" className="hover:text-primary">Become a Donor</Link></li>
            <li><Link to="/create-request" className="hover:text-primary">Request Blood</Link></li>
            <li><Link to="#" className="hover:text-primary">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <div className="flex gap-4">
            {/* <a href="#" className="p-2 glass-card rounded-full hover:text-primary"><Github size={20} /></a> */}
            {/* <a href="#" className="p-2 glass-card rounded-full hover:text-primary"><Twitter size={20} /></a> */}
            {/* <a href="#" className="p-2 glass-card rounded-full hover:text-primary"><Linkedin size={20} /></a> */}
          </div>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t border-border text-center text-text-muted text-sm">
        © {new Date().getFullYear()} BloodBank System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
