import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';

export default function FeedbackForm({ assignmentId, receiverId, providerId, onSubmit, onCancel }) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comments, setComments] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert("Please select a rating.");
            return;
        }
        onSubmit({ assignmentId, receiverId, providerId, rating, comments });
    };

    return (
        <div className="glass-panel p-6 rounded-xl border border-white/10 max-w-md w-full mx-auto relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-pink-500"></div>

            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <MessageSquare className="text-pink-400" /> Leave Feedback
            </h3>
            <p className="text-slate-400 text-sm mb-6">Rate your experience and leave a comment to help others.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Rating Stars */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="focus:outline-none focus:scale-110 transition-transform"
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                onClick={() => setRating(star)}
                            >
                                <Star
                                    size={32}
                                    className={`transition-colors ${(hoveredRating || rating) >= star ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-slate-600 hover:text-slate-500'}`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comments */}
                <div>
                    <label htmlFor="comments" className="block text-sm font-medium text-slate-300 mb-2">Comments</label>
                    <textarea
                        id="comments"
                        rows={4}
                        className="w-full rounded-lg bg-slate-800/50 border border-slate-600 p-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                        placeholder="How was the service?"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    ></textarea>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 font-medium bg-slate-700/50 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="flex-1 py-2 font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-600/20 transition-all"
                    >
                        Submit Feedback
                    </button>
                </div>

            </form>
        </div>
    );
}
