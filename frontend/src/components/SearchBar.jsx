import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ onSearch, placeholder = "Search for skills..." }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(query);
    };

    return (
        <div className="w-full max-w-2xl mx-auto flex gap-2">
            <form onSubmit={handleSearch} className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search size={20} className="text-slate-400" />
                </div>
                <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 bg-slate-800/60 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    Search
                </button>
            </form>

            {/* Optional Filter Button - placeholder for now */}
            <button className="px-4 py-3 bg-slate-800/60 hover:bg-slate-700/80 border border-slate-600 rounded-xl text-slate-300 transition-colors flex items-center justify-center">
                <Filter size={20} />
            </button>
        </div>
    );
}
