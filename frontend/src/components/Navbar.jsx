import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const capitalizeName = (name) => {
        if (!name) return 'User';
        return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <nav className="glass-panel sticky top-0 z-50 w-full border-b border-white/10 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <Link to="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <span className="text-indigo-400">Campus</span>
                    <span className="text-pink-500">Skill</span>
                    <span>Exchange</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
                    <Link to="/browse" className="text-slate-300 hover:text-white transition-colors">Browse Skills</Link>

                    {user ? (
                        <>
                            {!isHome && (
                                <div className="flex items-center gap-6">
                                    <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</Link>
                                    <Link to="/requests" className="text-slate-300 hover:text-white transition-colors">My Requests</Link>
                                    {(user.role === 'Provider' || user.role === 'Both' || user.role === 'Admin') && (
                                        <Link to="/assignments" className="text-slate-300 hover:text-white transition-colors">My Assignments</Link>
                                    )}
                                    {user.role === 'Admin' && (
                                        <Link to="/analytics" className="text-pink-400 font-semibold hover:text-pink-300 transition-colors flex items-center gap-1">
                                            📊 Analytics (DW)
                                        </Link>
                                    )}
                                </div>
                            )}
                            <div className="flex items-center gap-4 border-l border-white/10 pl-6 ml-2">
                                <Link to="/profile" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/50">
                                        <User size={16} className="text-indigo-400" />
                                    </div>
                                    <span className="font-medium">{capitalizeName(user.name)}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm text-slate-400 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/0 hover:decoration-pink-400"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-4 ml-4">
                            <Link to="/login" className="text-slate-300 hover:text-white font-medium transition-colors">Log in</Link>
                            <Link to="/register" className="btn-primary px-5 py-2 rounded-lg font-medium shadow-lg shadow-indigo-500/20">Sign up</Link>
                        </div>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-slate-300 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden pt-4 pb-2 border-t border-white/10 mt-4 flex flex-col gap-4">
                    <Link to="/" className="text-slate-300 px-2 py-1" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/browse" className="text-slate-300 px-2 py-1" onClick={() => setIsOpen(false)}>Browse Skills</Link>

                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-slate-300 px-2 py-1" onClick={() => setIsOpen(false)}>Dashboard</Link>
                            <Link to="/requests" className="text-slate-300 px-2 py-1" onClick={() => setIsOpen(false)}>My Requests</Link>
                            {(user.role === 'Provider' || user.role === 'Both' || user.role === 'Admin') && (
                                <Link to="/assignments" className="text-slate-300 px-2 py-1" onClick={() => setIsOpen(false)}>My Assignments</Link>
                            )}
                            {user.role === 'Admin' && (
                                <Link to="/analytics" className="text-pink-400 font-semibold px-2 py-1" onClick={() => setIsOpen(false)}>📊 Analytics (DW)</Link>
                            )}
                            <Link to="/profile" className="text-indigo-400 px-2 py-1 font-medium" onClick={() => setIsOpen(false)}>Profile ({capitalizeName(user.name)})</Link>
                            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-left text-pink-400 px-2 py-1">Logout</button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
                            <Link to="/login" className="text-slate-300 px-2 py-1" onClick={() => setIsOpen(false)}>Log in</Link>
                            <Link to="/register" className="text-indigo-400 px-2 py-1 font-medium" onClick={() => setIsOpen(false)}>Sign up</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
