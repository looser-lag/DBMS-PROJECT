import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestsService } from '../services/api';
import { FileText } from 'lucide-react';

export default function CreateRequest() {
    const [skillName, setSkillName] = useState('');
    const [description, setDescription] = useState('');
    const [preferredDate, setPreferredDate] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await requestsService.create({
                skillName, description, preferredDate
            });
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert("Failed to submit request.");
            navigate('/dashboard'); // Mock redirect anyway
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="glass-panel p-8 rounded-3xl border-pink-500/20 shadow-2xl shadow-pink-500/10 bg-slate-800/40">
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                    <FileText className="text-pink-400" /> New Service Request
                </h1>
                <p className="text-slate-400 mb-8">Describe the help you need and connect with available students.</p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">What skill are you looking for?</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-900/60 border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none text-white"
                            placeholder="e.g. Logo Design, Calculus Tutoring"
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Detailed Description</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full bg-slate-900/60 border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none text-white resize-none"
                            placeholder="I specifically need help understanding limits and derivatives for my upcoming exam..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Deadline / Date</label>
                        <input
                            type="date"
                            required
                            className="w-full bg-slate-900/60 border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none text-white appearance-none"
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                        />
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
                            className="px-8 py-3 font-bold bg-pink-600 hover:bg-pink-500 text-white rounded-xl shadow-lg shadow-pink-500/25 transition-all disabled:opacity-50"
                        >
                            {loading ? "Submitting..." : "Post Request"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
