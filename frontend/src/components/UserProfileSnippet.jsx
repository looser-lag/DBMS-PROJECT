import { User, Star, Award, ShieldCheck } from 'lucide-react';

export default function UserProfileSnippet({ user }) {
    // Mock fallback
    const u = {
        name: user?.name || "Guest User",
        department: user?.department || "Unassigned",
        year: user?.year || "N/A",
        reputation: user?.reputation_score || 0.0,
        role: user?.role || "User",
        tasksCompleted: user?.tasksCompleted || 0,
    };

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left relative overflow-hidden backdrop-blur-xl bg-slate-800/40">

            {/* Decorative bg gradient */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 p-1 flex-shrink-0 relative z-10 shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center border-4 border-slate-900">
                    <User size={40} className="text-white" />
                </div>
            </div>

            <div className="flex-1 space-y-3 relative z-10">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1 flex items-center justify-center md:justify-start gap-2">
                        {u.name} <ShieldCheck size={20} className="text-emerald-400" />
                    </h2>
                    <p className="text-slate-400">{u.department} • {u.year}</p>
                </div>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium text-sm">
                        <Star size={16} className="fill-indigo-300" />
                        <span>{u.reputation} Reputation</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary-color/10 border border-secondary-color/20 text-pink-300 font-medium text-sm">
                        <Award size={16} />
                        <span>{u.tasksCompleted} Tasks Done</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-300 font-medium text-sm">
                        <span>Role: {u.role}</span>
                    </div>

                </div>
            </div>

        </div>
    );
}
