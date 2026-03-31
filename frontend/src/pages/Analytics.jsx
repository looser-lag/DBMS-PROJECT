import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function Analytics() {
    const { token } = useAuth();
    const [departments, setDepartments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activity, setActivity] = useState([]);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch all 4 endpoints in parallel
                const [depsRes, catsRes, actRes, provRes] = await Promise.all([
                    api.get('/bi/departments', { headers: { Authorization: `Bearer ${token}` } }),
                    api.get('/bi/categories', { headers: { Authorization: `Bearer ${token}` } }),
                    api.get('/bi/activity', { headers: { Authorization: `Bearer ${token}` } }),
                    api.get('/bi/providers', { headers: { Authorization: `Bearer ${token}` } })
                ]);

                setDepartments(depsRes.data);
                setCategories(catsRes.data);
                setActivity(actRes.data);
                setProviders(provRes.data);
            } catch (err) {
                setError('Failed to load Data Warehouse metrics: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [token]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
    );

    if (error) return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="glass-panel border-red-500/30 p-8 text-center">
                <p className="text-red-400 font-semibold">{error}</p>
                <p className="text-sm mt-2 text-slate-400">Did you run the ETL script (node run_etl.js) first?</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
                        Data Warehouse
                    </span> Analytics
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg hover:text-slate-300 transition-colors">
                    Real-time Business Intelligence powered by our PostgreSQL Star Schema (OLAP).
                </p>
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-xs font-medium text-indigo-300">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Live Connection
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Panel 1: Department Performance */}
                <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-colors">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        🏫 Performance by Department
                    </h2>
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/10 text-slate-400">
                                <th className="pb-3 font-medium">Department</th>
                                <th className="pb-3 font-medium text-center">Completed Jobs</th>
                                <th className="pb-3 font-medium text-right">Avg Rating</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {departments.map((d, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="py-4 font-medium">{d.department}</td>
                                    <td className="py-4 text-center">
                                        <span className="bg-indigo-500/20 text-indigo-300 py-1 px-3 rounded-md text-xs font-bold">
                                            {d.total_completed_jobs}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right text-pink-400 font-bold">{d.avg_rating} ⭐</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Panel 2: Popular Categories */}
                <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 transition-colors">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        🏆 Highest Demand Categories
                    </h2>
                    <div className="space-y-4">
                        {categories.map((c, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                <span className="font-medium text-slate-200">{c.category_name}</span>
                                <span className="text-pink-400 font-bold">{c.total_jobs} Requests</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Panel 3: Temporal Activity */}
                <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-colors">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        📅 Student Activity (When do they work?)
                    </h2>
                    <div className="flex flex-col gap-4 justify-center h-48">
                        {activity.map((a, i) => {
                            const max = Math.max(...activity.map(x => x.jobs_completed));
                            const percent = (a.jobs_completed / max) * 100;
                            return (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-slate-300">{a.time_of_week}</span>
                                        <span className="text-indigo-400 font-bold">{a.jobs_completed} completions</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-1000 ease-out"
                                            style={{ width: `${percent}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Panel 4: Top Providers */}
                <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 transition-colors">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        🌟 Top Student Providers
                    </h2>
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/10 text-slate-400">
                                <th className="pb-3 font-medium">Provider Name</th>
                                <th className="pb-3 font-medium text-center">Jobs Done</th>
                                <th className="pb-3 font-medium text-right">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {providers.map((p, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="py-3">
                                        <p className="font-medium">{p.provider_name}</p>
                                        <p className="text-xs text-slate-500">{p.department}</p>
                                    </td>
                                    <td className="py-3 text-center">
                                        <div className="w-8 h-8 mx-auto bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30 font-bold text-indigo-300">
                                            {p.total_jobs_done}
                                        </div>
                                    </td>
                                    <td className="py-3 text-right">
                                        <span className="bg-pink-500/20 text-pink-300 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                                            {p.avg_rating} ⭐
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
