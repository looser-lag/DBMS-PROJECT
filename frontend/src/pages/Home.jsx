import HeroSection from '../components/HeroSection';

export default function Home() {
    return (
        <div className="animate-in fade-in duration-700">
            <HeroSection />

            {/* Feature section */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">Join a community built on mutual exchange. Trade your skills for the help you need.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Create a Profile",
                            desc: "Sign up and list the skills you can offer to others. Build a reputation as you help fellow students.",
                            icon: "1"
                        },
                        {
                            title: "Find or Request Skills",
                            desc: "Browse available services or post a request for exactly what you need.",
                            icon: "2"
                        },
                        {
                            title: "Exchange & Review",
                            desc: "Complete the task, earn reputation points, and leave feedback to keep the community thriving.",
                            icon: "3"
                        }
                    ].map((step, i) => (
                        <div key={i} className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl font-bold mb-6 border border-indigo-500/30">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
