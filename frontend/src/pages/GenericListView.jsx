import { useState, useEffect } from 'react';
import { requestsService, assignmentsService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import RequestCard from '../components/RequestCard';
import AssignmentCard from '../components/AssignmentCard';
import { Loader2, ListTodo, Inbox } from 'lucide-react';

export default function GenericListView({ type = 'requests' }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const isRequests = type === 'requests';

    useEffect(() => {
        const fetchItems = async () => {
            if (!user) return;
            try {
                setLoading(true);
                const data = isRequests
                    ? await requestsService.getUserRequests(user.user_id)
                    : await assignmentsService.getProviderAssignments(user.user_id);
                setItems(data?.data || data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [isRequests, user]);

    const handleStatusUpdate = async (assignmentId, status) => {
        try {
            await assignmentsService.updateStatus(assignmentId, status);
            // Refresh the list to show new status
            const data = await assignmentsService.getProviderAssignments(user.user_id);
            setItems(data?.data || data || []);
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Error updating status: " + (err.response?.data?.msg || err.message));
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500">
            <div className="mb-10 flex items-center gap-3 border-b border-white/10 pb-6">
                {isRequests ? <Inbox size={32} className="text-pink-400" /> : <ListTodo size={32} className="text-indigo-400" />}
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        {isRequests ? "My Service Requests" : "My Assignments"}
                    </h1>
                    <p className="text-slate-400 mt-1">
                        {isRequests ? "Track the help you've asked for." : "Manage tasks you've agreed to complete."}
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="animate-spin text-indigo-500" size={48} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.length > 0 ? (
                        items.map(item => (
                            isRequests
                                ? <RequestCard key={item.id} request={item} actionLabel="Cancel Request" />
                                : <AssignmentCard key={item.id} assignment={item} onStatusUpdate={handleStatusUpdate} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center glass-panel rounded-2xl border-white/5">
                            <p className="text-xl text-slate-400">
                                You have no active {isRequests ? 'requests' : 'assignments'}.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
