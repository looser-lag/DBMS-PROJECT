import { useAuth } from '../contexts/AuthContext';
import UserProfileSnippet from '../components/UserProfileSnippet';
import { Mail, Briefcase, Award, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { userService } from '../services/api';

export default function Profile() {
    const { user } = useAuth();
    const [stats, setStats] = useState({ skillsCount: 0, requestsCount: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (user?.user_id) {
                try {
                    const res = await userService.getStats(user.user_id);
                    setStats(res.data);
                } catch (err) {
                    console.error("Failed to fetch stats", err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchStats();
    }, [user]);

    if (!user) return <div className="p-20 text-center">Please log in.</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

            <UserProfileSnippet user={user} />

            <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="glass-panel p-6 rounded-2xl border-white/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Mail className="text-indigo-400" /> Contact Info</h3>
                    <p className="text-slate-300"><strong>Email:</strong> {user.email}</p>
                    <p className="text-slate-300 mt-2"><strong>Campus ID:</strong> STU-{user.user_id?.toString().padStart(6, '0')}</p>
                </div>

                <div className="glass-panel p-6 rounded-2xl border-white/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Award className="text-pink-400" /> Statistics</h3>
                    {loading ? (
                        <div className="flex justify-center p-4">
                            <Loader2 className="animate-spin text-indigo-400" />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-slate-400">Total Requests Created</span>
                                <span className="font-bold text-white">{stats.requestsCount}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-slate-400">Total Skills Offered</span>
                                <span className="font-bold text-white">{stats.skillsCount}</span>
                            </div>
                            <div className="flex justify-between pb-2">
                                <span className="text-slate-400">Average Rating</span>
                                <span className="font-bold text-emerald-400">
                                    {user.reputation_score ? `${parseFloat(user.reputation_score).toFixed(1)} / 5.0` : '0.0 / 5.0'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
