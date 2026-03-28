import { Clock, Tag, MessageSquare, AlertCircle } from 'lucide-react';

export default function RequestCard({ request, onAction, actionLabel = "View Details" }) {
    // Mock data mapping
    const r = {
        id: request?.request_id || request?.id || 1,
        skillName: request?.skill_name || request?.skillName || "N/A",
        description: request?.description || "No description provided.",
        providerName: request?.provider_name || request?.providerName || "Pending",
        status: request?.status || "Pending",
        createdAt: request?.preferred_date || request?.created_at || "Just now",
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            case 'assigned': return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20';
            case 'completed': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
        }
    };

    return (
        <div className="glass-panel p-5 rounded-xl border border-white/10 hover:border-slate-600 transition-all flex flex-col h-full bg-slate-800/40">

            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-slate-300 font-bold border border-slate-600">
                        {r.providerName === 'Pending' ? '?' : r.providerName.charAt(0)}
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-200">{r.providerName}</h4>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Clock size={12} />
                            <span>{r.createdAt}</span>
                        </div>
                    </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full border border-solid ${getStatusColor(r.status)} font-medium`}>
                    {r.status}
                </span>
            </div>

            <div className="my-3">
                <div className="flex items-center gap-2 mb-2">
                    <Tag size={16} className="text-secondary-color" />
                    <h3 className="font-bold text-lg text-white">{r.skillName}</h3>
                </div>
                <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
                    {r.description}
                </p>
            </div>

            <div className="mt-auto pt-4 flex gap-2 w-full">
                {onAction && (
                    <button
                        onClick={() => onAction(r.id)}
                        className="flex-1 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                    >
                        {actionLabel}
                    </button>
                )}
                <button className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors border border-slate-600">
                    <MessageSquare size={16} />
                </button>
            </div>

        </div>
    );
}
