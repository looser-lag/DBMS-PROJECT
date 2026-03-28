import { CheckCircle, Clock, XCircle, Check } from 'lucide-react';

export default function AssignmentCard({ assignment, onStatusUpdate }) {
    const a = {
        id: assignment?.assignment_id || assignment?.id || 1,
        skillName: assignment?.skill_name || assignment?.skillName || "N/A",
        requesterName: assignment?.requester_name || assignment?.requesterName || "Unknown",
        status: assignment?.status || "Pending",
        assignedDate: assignment?.assigned_date || assignment?.assignedDate || "Today",
    };

    const status = a.status.toLowerCase();
    const isPending = status === 'pending';
    const isAccepted = status === 'accepted' || status === 'assigned';
    const isCompleted = status === 'completed';
    const isDeclined = status === 'declined';

    const getStatusStyles = () => {
        if (isCompleted) return 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10';
        if (isPending) return 'text-amber-400 border-amber-400/20 bg-amber-400/10';
        if (isDeclined) return 'text-rose-400 border-rose-400/20 bg-rose-400/10';
        return 'text-indigo-400 border-indigo-400/20 bg-indigo-400/10';
    };

    return (
        <div className={`glass-panel p-5 rounded-xl border flex flex-col h-full transition-all ${isCompleted ? 'border-emerald-500/30 bg-emerald-900/10' : 'border-indigo-500/20 hover:border-indigo-500/40'}`}>

            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">{a.skillName}</h3>
                    <p className="text-sm text-slate-400">From: <span className="text-slate-200">{a.requesterName}</span></p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles()}`}>
                    {a.status}
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 font-medium">
                <Clock size={16} />
                <span>Requested: {new Date(a.assignedDate).toLocaleDateString()}</span>
            </div>

            <div className="mt-auto flex flex-col gap-2">
                {isPending && onStatusUpdate && (
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => onStatusUpdate(a.id, 'Accepted')}
                            className="py-2.5 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex justify-center items-center gap-2 shadow-lg shadow-indigo-600/20"
                        >
                            <Check size={18} />
                            Accept
                        </button>
                        <button
                            onClick={() => onStatusUpdate(a.id, 'Declined')}
                            className="py-2.5 rounded-lg font-bold text-slate-300 bg-slate-800 hover:bg-rose-900/40 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 transition-all flex justify-center items-center gap-2"
                        >
                            <XCircle size={18} />
                            Decline
                        </button>
                    </div>
                )}

                {isAccepted && onStatusUpdate && (
                    <button
                        onClick={() => onStatusUpdate(a.id, 'Completed')}
                        className="w-full py-2.5 rounded-lg font-bold text-white bg-indigo-600 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-500/20 transition-all flex justify-center items-center gap-2 shadow-lg shadow-indigo-600/20 hover:shadow-emerald-600/20"
                    >
                        <CheckCircle size={18} />
                        Mark as Completed
                    </button>
                )}

                {isCompleted && (
                    <div className="w-full py-2.5 rounded-lg font-medium text-emerald-400 bg-emerald-900/20 text-center border border-emerald-500/20 flex justify-center items-center gap-2">
                        <CheckCircle size={18} />
                        Completed
                    </div>
                )}

                {isDeclined && (
                    <div className="w-full py-2.5 rounded-lg font-medium text-rose-400 bg-rose-900/20 text-center border border-rose-500/20 flex justify-center items-center gap-2">
                        <XCircle size={18} />
                        Declined
                    </div>
                )}
            </div>
        </div>
    );
}
