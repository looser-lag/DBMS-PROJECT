import { Star, IndianRupee, Briefcase, Calendar, Trash2 } from 'lucide-react';

export default function SkillCard({ skill, onAction, onDelete }) {
    // Mock data structure fallback
    const s = {
        id: skill?.skill_id || skill?.id || 1,
        name: skill?.skill_name || skill?.name || "Untitled Skill",
        category: skill?.category_name || skill?.category || "Other",
        providerName: skill?.provider_name || skill?.providerName || "Member",
        reputation: (skill?.reputation_score !== undefined && skill.reputation_score !== null && !isNaN(parseFloat(skill.reputation_score))) 
            ? parseFloat(skill.reputation_score).toFixed(1) 
            : "0.0",
        experienceLevel: skill?.experience_level || skill?.experienceLevel || "Intermediate",
        hourlyRate: skill?.hourly_rate || skill?.hourlyRate || "Free",
        availability: skill?.availability || "N/A",
    };

    return (
        <div className="glass-panel p-5 rounded-xl border border-white/10 hover:border-indigo-500/50 transition-all group hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col h-full relative overflow-hidden">

            {/* Decorative gradient orb */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-pink-500/20 rounded-full blur-xl group-hover:bg-indigo-500/40 transition-all"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-pink-400 bg-pink-500/10 px-2 py-1 rounded-md mb-2 inline-block">
                        {s.category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {s.name}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">Offered by <span className="text-slate-200 font-medium">{s.providerName}</span></p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    {onDelete && (
                        <button onClick={() => onDelete(s.id)} className="text-slate-400 hover:text-pink-500 transition-colors p-1 bg-white/5 rounded-full hover:bg-pink-500/10">
                            <Trash2 size={16} />
                        </button>
                    )}
                    <div className="bg-indigo-500/20 text-indigo-300 flex items-center gap-1 px-2 py-1 rounded font-bold border border-indigo-500/30">
                        <Star size={14} className="fill-indigo-300" />
                        <span>{s.reputation}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-2 my-4 text-sm text-slate-300 flex-grow relative z-10">
                <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-slate-500" />
                    <span>{s.experienceLevel}</span>
                </div>
                <div className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-slate-500" />
                    <span>{s.hourlyRate}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                    <Calendar size={16} className="text-slate-500" />
                    <span className="truncate">Avail: {s.availability}</span>
                </div>
            </div>

            <div className="pt-4 mt-auto border-t border-white/10 relative z-10">
                <button
                    onClick={() => onAction && onAction(s.id)}
                    className="w-full py-2.5 rounded-lg font-medium text-white bg-white/5 hover:bg-indigo-500 hover:text-white transition-all border border-white/10 hover:border-transparent flex justify-center items-center gap-2 group/btn"
                >
                    <span>Request Service</span>
                </button>
            </div>

        </div>
    );
}
