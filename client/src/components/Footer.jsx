import { Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-black/80 backdrop-blur-md mt-20 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
                <div className="space-y-4">
                    <Link to="/" className="text-2xl font-bold font-display tracking-tighter bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent hover:scale-105 transition-transform">
                        KNOWVY.
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        The ultimate ecosystem for student developers to build, ship, and grow together.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-white mb-6">Platform</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link to="/hackathons" className="hover:text-neon-green transition-colors">Hackathons</Link></li>
                        <li><Link to="/sessions" className="hover:text-neon-blue transition-colors">Sessions</Link></li>
                        <li><Link to="/mentorship" className="hover:text-neon-pink transition-colors">Mentorship</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-white mb-6">Connect</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><a href="https://chat.whatsapp.com/JUFnHeZ35kz1zXPAwknbKH?mode=ems_copy_t" target="_blank" rel="noopener noreferrer" className="hover:text-neon-green transition-colors">Whatsapp group</a></li>
                        <li><a href="https://linkedin.com/company/knowvy" target="_blank" rel="noopener noreferrer" className="hover:text-neon-blue transition-colors">Linkedin page</a></li>
                        <li><a href="https://x.com/the_blockzen" target="_blank" rel="noopener noreferrer" className="hover:text-neon-pink transition-colors">Twitter page</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-white mb-6">Community</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link to="/feedback" className="hover:text-neon-green transition-colors">💬 Feedback</Link></li>
                        <li><Link to="/about-admin" className="hover:text-neon-blue transition-colors">👤 Know About Admin</Link></li>
                    </ul>
                    <br />
                    <div className="flex gap-4">
                        <a href="https://github.com/mohneesh-gupta" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-green hover:text-black transition-all">
                            <Github size={20} />
                        </a>
                        <a href="https://x.com/the_blockzen" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-blue hover:text-black transition-all">
                            <Twitter size={20} />
                        </a>
                        <a href="https://linkedin.com/company/knowvy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-purple hover:text-black transition-all">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-center items-center gap-2">
                <p>&copy; {new Date().getFullYear()} Knowvy Technologies. All rights reserved.</p>
                <div className="hidden md:block w-1 h-1 bg-gray-700 rounded-full"></div>
                <p className="flex items-center gap-1">
                    Made with <Heart size={14} className="text-red-500 fill-current" /> by Mohneesh Gupta
                </p>
            </div>
        </footer >
    );
};

export default Footer;
