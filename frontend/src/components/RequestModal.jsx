import { X, Calendar, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export default function RequestModal({ skill, onClose, onSubmit }) {
    const [description, setDescription] = useState('');

    // Explicitly get local YYYY-MM-DD to avoid timezone shifts
    const getLocalToday = () => {
        const d = new Date();
        // Manual extraction is safest for "today in my locale"
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const dayOfMonth = String(d.getDate()).padStart(2, '0');
        const result = `${y}-${m}-${dayOfMonth}`;
        console.log("Antigravity: Initializing Modal Date to", result);
        return result;
    };

    const [preferredDate, setPreferredDate] = useState(getLocalToday());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const checkAvailability = (dateStr, availStr) => {
        if (!availStr) return true;
        const date = new Date(dateStr);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase(); // e.g. "monday"
        const avail = availStr.toLowerCase();

        if (avail.includes('everyday') || avail.includes('anytime')) return true;
        if (avail.includes('weekend')) {
            return dayName === 'saturday' || dayName === 'sunday';
        }
        if (avail.includes('weekday')) {
            return !['saturday', 'sunday'].includes(dayName);
        }
        
        // Check for specific day names (plural or singular)
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        for (const day of days) {
            if (avail.includes(day)) {
                // If avail is "sundays", avail.includes("sunday") is true
                if (dayName === day) return true;
            }
        }

        return false;
    };

    const isDateValid = checkAvailability(preferredDate, skill.availability);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isDateValid) {
            setError(`Provider is only available on: ${skill.availability}`);
            return;
        }
        setLoading(true);
        try {
            await onSubmit({ description, preferredDate });
        } finally {
            setLoading(false);
        }
    };

    if (!skill) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="glass-panel w-full max-w-lg rounded-3xl border-white/10 shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden">

                {/* Header */}
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-indigo-500/5">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Request Service</h2>
                        <p className="text-slate-400 text-sm mt-1">For <span className="text-indigo-400 font-medium">{skill.skill_name || skill.name}</span></p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="bg-pink-500/10 border border-pink-500/30 text-pink-400 px-4 py-3 rounded-xl text-sm animate-pulse">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                            <MessageSquare size={16} className="text-indigo-400" />
                            How can they help you?
                        </label>
                        <textarea
                            className="w-full bg-slate-800/60 border border-slate-600 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-500 min-h-[120px] text-white"
                            placeholder="Describe what you need help with... (e.g. 'I need help debugging my React project' or 'I want to learn Basic Python')"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            autoFocus
                        ></textarea>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                            <Calendar size={16} className="text-pink-400" />
                            Preferred Date (Provider Avail: <span className="text-white font-semibold">{skill.availability || 'N/A'}</span>)
                        </label>
                        <input
                            type="date"
                            className={`w-full bg-slate-800/60 border ${!isDateValid ? 'border-pink-500' : 'border-slate-600'} rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white`}
                            value={preferredDate}
                            min={getLocalToday()}
                            onChange={(e) => {
                                setPreferredDate(e.target.value);
                                setError('');
                            }}
                            required
                        />
                        {!isDateValid && (
                            <p className="text-xs text-pink-400 mt-2 ml-1 flex items-center gap-1">
                                <X size={12} /> Selected date does not match provider availability.
                            </p>
                        )}
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !isDateValid}
                            className="flex-1 btn-primary py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send Request
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
