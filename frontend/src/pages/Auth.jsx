import { useState } from 'react';
import { ArrowLeft, UserPlus, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Auth({ isLogin = true }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('1');
    const [role, setRole] = useState('Provider');

    const navigate = useNavigate();
    const { login, register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(isLogin ? 'Logging in:' : 'Registering:', { email, name, role });
            if (isLogin) {
                await login(email, password);
            } else {
                await register({ name, email, password, role, phone, department, year: parseInt(year) });
            }
            navigate('/dashboard');
        } catch (error) {
            console.error('Auth Error Details:', error.response || error);
            alert(error.response?.data?.msg || 'Authentication failed. Please check your credentials or network.');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6 animate-in fade-in duration-500 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 to-pink-900/10 pointer-events-none"></div>

            <div className="glass-panel p-8 md:p-12 rounded-3xl max-w-md w-full relative z-10 border-indigo-500/20 shadow-2xl shadow-indigo-500/10">

                <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8 text-sm gap-2">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400 mb-2 flex items-center gap-2">
                        {isLogin ? <LogIn /> : <UserPlus />}
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-slate-400 text-sm">
                        {isLogin ? "Sign in to continue exploring skills." : "Join the Campus Skill Exchange today."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {!isLogin && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800/60 border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-500"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    className="w-full bg-slate-800/60 border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-500"
                                    placeholder="+91 99003 15409"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Department</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-800/60 border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-500"
                                        placeholder="Computer Science"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Year</label>
                                    <select
                                        className="w-full bg-slate-800/60 border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                    >
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                        <option value="5">5th Year</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Primary Role</label>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setRole('Provider')}
                                            className={`py-2 rounded-xl border text-sm font-medium transition-all ${role === 'Provider' ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' : 'bg-slate-800/40 border-slate-600 text-slate-400 hover:bg-slate-700/50'}`}
                                        >
                                            I Offer Skills
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRole('Receiver')}
                                            className={`py-2 rounded-xl border text-sm font-medium transition-all ${role === 'Receiver' ? 'bg-pink-500/20 border-pink-500/50 text-pink-300' : 'bg-slate-800/40 border-slate-600 text-slate-400 hover:bg-slate-700/50'}`}
                                        >
                                            I Need Help
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setRole('Both')}
                                        className={`py-2 rounded-xl border text-sm font-medium transition-all ${role === 'Both' ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' : 'bg-slate-800/40 border-slate-600 text-slate-400 hover:bg-slate-700/50'}`}
                                    >
                                        Both (Exchange Skills)
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-slate-800/60 border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-500"
                            placeholder="you@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full bg-slate-800/60 border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-500"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full btn-primary py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/25 mt-2 text-lg">
                        {isLogin ? "Log In" : "Sign Up"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-slate-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <Link to={isLogin ? "/register" : "/login"} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        {isLogin ? "Sign up here" : "Log in here"}
                    </Link>
                </p>

            </div>
        </div>
    );
}
