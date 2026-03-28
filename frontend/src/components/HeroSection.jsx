import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { statsService } from '../services/api';

export default function HeroSection() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        activeStudents: '2,000+',
        skillsAvailable: '150+',
        tasksCompleted: '5,000+',
        campusRating: '4.8/5'
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await statsService.getGlobalStats();
                setStats({
                    activeStudents: data.activeStudents.toLocaleString() + '+',
                    skillsAvailable: data.skillsAvailable.toLocaleString() + '+',
                    tasksCompleted: data.tasksCompleted.toLocaleString() + '+',
                    campusRating: data.campusRating + '/5'
                });
            } catch (error) {
                console.error("Failed to fetch platform stats", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="relative overflow-hidden py-20 lg:py-32">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 blur-[100px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border border-indigo-500/30 text-indigo-300 text-sm font-medium animate-float">
                        <Sparkles size={16} className="text-pink-400" />
                        <span>Connect, Learn, and Grow together</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                        Exchange Skills. <br />
                        <span className="gradient-text">Empower Your Campus.</span>
                    </h1>

                    <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
                        A peer-to-peer ecosystem where students trade expertise. Need a logo? Offer a coding lesson. Build your reputation and master new abilities today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link
                            to={user ? "/dashboard" : "/register"}
                            className="btn-primary px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
                        >
                            {user ? "Go to Dashboard" : "Get Started Now"} <ArrowRight size={20} />
                        </Link>
                        <Link
                            to="/browse"
                            className="px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 glass-panel hover:bg-slate-800/50 transition-colors border border-slate-600"
                        >
                            Explore Skills
                        </Link>
                    </div>

                    {/* Stats quick view */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/5 w-full">
                        {[
                            { label: 'Active Students', value: stats.activeStudents },
                            { label: 'Skills Available', value: stats.skillsAvailable },
                            { label: 'Tasks Completed', value: stats.tasksCompleted },
                            { label: 'Campus Rating', value: stats.campusRating },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col space-y-2">
                                <span className="text-3xl font-bold text-slate-200">{stat.value}</span>
                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
