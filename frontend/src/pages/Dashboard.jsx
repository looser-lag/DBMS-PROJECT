import UserProfileSnippet from '../components/UserProfileSnippet';
import { ArrowRight, PlusCircle, LayoutDashboard, Clock, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { userService } from '../services/api';

export default function Dashboard() {
    const { user } = useAuth();
    const [activity, setActivity] = useState([]);
    const [loadingActivity, setLoadingActivity] = useState(true);
    const isProvider = user?.role === 'Provider' || user?.role === 'Both';

    useEffect(() => {
        const fetchActivity = async () => {
            if (user?.user_id) {
                try {
                    const res = await userService.getActivity(user.user_id);
                    setActivity(res.data);
                } catch (err) {
                    console.error("Failed to fetch activity", err);
                } finally {
                    setLoadingActivity(false);
                }
            }
        };
        fetchActivity();
    }, [user]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="mb-10 flex flex-col md:flex-row gap-6 md:items-end justify-between">
                <div>
                    <div className="flex items-center gap-3 text-indigo-400 mb-2">
                        <LayoutDashboard size={24} />
                        <span className="font-semibold tracking-wider uppercase text-sm">Dashboard</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white">Welcome back, {user?.name || 'User'}</h1>
                </div>

                <div className="flex gap-3">
                    {isProvider ? (
                        <Link to="/add-skill" className="btn-primary px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                            <PlusCircle size={18} /> Add New Skill
                        </Link>
                    ) : (
                        <Link to="/browse" className="btn-primary px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                            <PlusCircle size={18} /> New Request
                        </Link>
                    )}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Left Column - Profile & Quick Actions */}
                <div className="space-y-8">
                    <UserProfileSnippet user={user} />

                    <div className="glass-panel p-6 rounded-2xl border-white/5">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><ArrowRight className="text-pink-500" /> Platform Shortcuts</h3>
                        <div className="flex flex-col gap-3">
                            <Link to="/browse" className="bg-slate-800/50 hover:bg-slate-700 p-4 rounded-xl border border-slate-600 transition-colors flex justify-between items-center group">
                                <span className="font-medium text-slate-300 group-hover:text-white">Browse Skills</span>
                                <ArrowRight size={16} className="text-slate-500 group-hover:text-pink-400 transition-colors" />
                            </Link>
                            {isProvider && (
                                <Link to="/assignments" className="bg-slate-800/50 hover:bg-slate-700 p-4 rounded-xl border border-slate-600 transition-colors flex justify-between items-center group">
                                    <span className="font-medium text-slate-300 group-hover:text-white">My Assignments</span>
                                    <ArrowRight size={16} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                                </Link>
                            )}
                            <Link to="/requests" className="bg-slate-800/50 hover:bg-slate-700 p-4 rounded-xl border border-slate-600 transition-colors flex justify-between items-center group">
                                <span className="font-medium text-slate-300 group-hover:text-white">My Requests</span>
                                <ArrowRight size={16} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Column - Activity */}
                <div className="lg:col-span-2 space-y-8">

                    <div className="glass-panel p-6 rounded-2xl border-white/5 min-h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2"><Clock className="text-indigo-400" /> Recent Activity</h3>
                            <Link to="/analytics" className="text-sm text-indigo-400 hover:text-indigo-300">View History</Link>
                        </div>

                        <div className="flex flex-col gap-4">
                            {loadingActivity ? (
                                <div className="p-8 flex justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                                </div>
                            ) : activity.length > 0 ? (
                                activity.map((item, index) => (
                                    <div key={index} className="p-4 rounded-xl border border-white/5 bg-slate-800/30 flex gap-4 items-start animate-in fade-in slide-in-from-right-4 duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.type === 'Skill Added' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-pink-500/20 text-pink-400'
                                            }`}>
                                            {item.type === 'Skill Added' ? <Star size={18} /> : <Zap size={18} />}
                                        </div>
                                        <div>
                                            <p className="text-slate-300">
                                                {item.type}: <span className="text-white font-medium">{item.title}</span>
                                            </p>
                                            <p className="text-sm text-slate-500 mt-1">
                                                {new Date(item.date).toLocaleDateString()} • Just now
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 rounded-xl border border-dashed border-white/10 bg-slate-800/10 flex flex-col items-center justify-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 text-slate-500">
                                        <Clock size={24} />
                                    </div>
                                    <p className="text-slate-300 font-medium">No recent activity yet</p>
                                    <p className="text-sm text-slate-500 mt-1 max-w-[200px]">
                                        Start by browsing skills or sharing your own!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
