import { useState, useEffect } from 'react';
import { skillsService, requestsService } from '../services/api';
import SkillCard from '../components/SkillCard';
import SearchBar from '../components/SearchBar';
import RequestModal from '../components/RequestModal';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function BrowseSkills() {
    const [skills, setSkills] = useState([]);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const { user } = useAuth(); // Needed to check if user owns the skill

    const fetchSkills = async () => {
        try {
            const data = await skillsService.getAll();
            setSkills(data);
            setFilteredSkills(data);
        } catch (error) {
            console.error("Failed to fetch skills", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleOpenRequest = (skill) => {
        if (!user) {
            alert("Please log in to request a service.");
            return;
        }
        if (user.user_id === skill.provider_id) {
            alert("You can't request your own skill!");
            return;
        }
        setSelectedSkill(skill);
    };

    const handleConfirmRequest = async ({ description, preferredDate }) => {
        try {
            await requestsService.create({
                requesterId: user.user_id,
                skillId: selectedSkill.skill_id || selectedSkill.id,
                description,
                preferredDate,
                providerId: selectedSkill.provider_id
            });
            alert("Request sent successfully! 🎉");
            setSelectedSkill(null);
        } catch (error) {
            console.error("Failed to create request", error);
            alert("Error sending request: " + (error.response?.data?.msg || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this skill?")) return;
        try {
            await skillsService.deleteSkill(id, user?.user_id);
            fetchSkills(); // Refresh list after deletion
        } catch (error) {
            console.error("Failed to delete skill", error);
            alert("Error deleting skill");
        }
    };

    const handleSearch = (query) => {
        if (!query) {
            setFilteredSkills(skills);
            return;
        }
        const lowerQuery = query.toLowerCase();
        const filtered = skills.filter(s =>
            s.skill_name?.toLowerCase().includes(lowerQuery) ||
            s.category_name?.toLowerCase().includes(lowerQuery) ||
            s.provider_name?.toLowerCase().includes(lowerQuery)
        );
        setFilteredSkills(filtered);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500">

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400 mb-4">
                    Discover Campus Skills
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
                    Find the perfect student to help you with your next project, or learn something entirely new.
                </p>
                <SearchBar onSearch={handleSearch} placeholder="Search by skill name, category, or provider..." />
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="animate-spin text-indigo-500" size={48} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkills.length > 0 ? (
                        filteredSkills.map(skill => (
                            <SkillCard
                                key={skill.skill_id || skill.id}
                                skill={skill}
                                onAction={() => handleOpenRequest(skill)}
                                onDelete={(user && (user.name === skill.provider_name)) ? handleDelete : null}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center glass-panel rounded-2xl border-white/5">
                            <p className="text-xl text-slate-400">No skills found matching your search.</p>
                        </div>
                    )}
                </div>
            )}

            {selectedSkill && (
                <RequestModal
                    skill={selectedSkill}
                    onClose={() => setSelectedSkill(null)}
                    onSubmit={handleConfirmRequest}
                />
            )}

        </div>
    );
}
