import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { skillsService } from '../services/api';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function AddSkill() {
    const { user } = useAuth();
    const [skillName, setSkillName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [experienceLevel, setExperienceLevel] = useState('Beginner');
    const [hourlyRate, setHourlyRate] = useState('');
    const [availability, setAvailability] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/categories');
                setCategories(res.data);
                if (res.data.length > 0) setCategoryId(String(res.data[0].category_id));
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await skillsService.addSkill({
                skillName,
                categoryId,
                experienceLevel,
                hourlyRate,
                availability,
                userId: user?.user_id
            });
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.msg || "Failed to add skill. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="glass-panel p-8 rounded-3xl border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                    <PlusCircle className="text-indigo-400" /> Share a Skill
                </h1>
                <p className="text-slate-400 mb-8">Offer your expertise to the campus community.</p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Skill Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-800/60 border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-white"
                            placeholder="e.g. Advanced Python Tutoring"
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                            <select
                                className="w-full bg-slate-800/60 border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-white"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <option key={cat.category_id} value={cat.category_id}>
                                        {cat.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Experience Level</label>
                            <select
                                className="w-full bg-slate-800/60 border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-white"
                                value={experienceLevel}
                                onChange={(e) => setExperienceLevel(e.target.value)}
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Hourly Rate (₹)</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                required
                                className="w-full bg-slate-800/60 border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-white"
                                placeholder="e.g. 15.00"
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Availability</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-800/60 border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-white"
                                placeholder="e.g. Weekends, Everyday"
                                value={availability}
                                onChange={(e) => setAvailability(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end gap-3 mt-8">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors border border-slate-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Publish Skill"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
