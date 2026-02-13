import React, { useState } from 'react';
import { BlogPost, AVAILABLE_TONES, Tone } from '../types';
import { generateBlogPostContent } from '../services/geminiService';

interface DashboardProps {
    posts: BlogPost[];
    onPostCreate: (post: BlogPost) => void;
    onPostSelect: (post: BlogPost) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ posts, onPostCreate, onPostSelect }) => {
    const [topic, setTopic] = useState('');
    const [selectedTone, setSelectedTone] = useState<Tone>('Friendly');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!topic.trim()) return;

        setIsGenerating(true);
        try {
            const result = await generateBlogPostContent(topic, selectedTone);
            
            const newPost: BlogPost = {
                id: crypto.randomUUID(),
                date: new Date().toISOString().split('T')[0],
                title: result.title,
                content: result.content,
                tone: selectedTone,
                status: 'Published',
                tags: result.tags,
                readingTime: `${Math.ceil(result.content.split(' ').length / 200)} min`,
                wordCount: result.content.split(' ').length
            };

            onPostCreate(newPost);
            setTopic('');
        } catch (error) {
            alert("Failed to generate post. Please check your API key.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <main className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden mx-auto my-8">
            {/* Header Section */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-slate-700 shadow-sm overflow-hidden">
                                <img 
                                    alt="Avatar" 
                                    className="w-full h-full object-cover" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFtkXRGP82SyODrh8moF8N8GoAS4lOdX5tP8ckeW0Db9Z6WaDGL6UhaEcm0JY9fNu4PvESWMbkj3gjZoFjr4tnfvV_zfLNefvIqLn8ErT6oBxAQ7oQm37Q4BYP6NBrla14xPcDCRW928ogPvQwKLbca7F3DO9icK3W0pW2qPDKGqRf5QNpJwcd-g35oBsXlt9d6HWsG7woehRxrhFNOboAq_6C2whPitbYug02yghSQ0PahIny5U71MWR6tQZ4gGZMUWoFyYmzmL1S"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" title="System Online"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold font-display text-slate-900 dark:text-white">Blog Generator</h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Manage and create AI-powered content</p>
                        </div>
                    </div>
                    {/* API Status Indicator */}
                    <div className="flex items-center gap-2 bg-blue-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-blue-100 dark:border-slate-700">
                        <div className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                        </div>
                        <span className="text-xs font-semibold text-primary dark:text-blue-400 uppercase tracking-wide">Gemini API Active</span>
                    </div>
                </div>
            </header>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-8">
                {/* Configuration / Generation Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-icons text-primary text-xl">auto_awesome</span>
                            Create New Post
                        </h2>
                        <span className="text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Gemini 3.0</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 relative overflow-hidden shadow-sm">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
                        <div className="space-y-4 relative z-10">
                            {/* Topic Input */}
                            <div className="flex items-center group">
                                <div className="w-1/3 flex items-center justify-end pr-4">
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Topic Input</span>
                                </div>
                                <div className="flex-shrink-0 text-slate-300 dark:text-slate-600">
                                    <span className="material-icons text-sm">arrow_forward</span>
                                </div>
                                <div className="w-2/3 pl-4">
                                    <input 
                                        type="text"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder="e.g. Benefits of Vitamin D"
                                        className="w-full text-sm font-medium text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>
                            {/* Tone Selection */}
                            <div className="flex items-center group">
                                <div className="w-1/3 flex items-center justify-end pr-4">
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Selected Tone</span>
                                </div>
                                <div className="flex-shrink-0 text-slate-300 dark:text-slate-600">
                                    <span className="material-icons text-sm">arrow_forward</span>
                                </div>
                                <div className="w-2/3 pl-4">
                                    <select
                                        value={selectedTone}
                                        onChange={(e) => setSelectedTone(e.target.value as Tone)}
                                        className="w-full text-sm font-medium text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-2 focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                                    >
                                        {AVAILABLE_TONES.map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {/* Generate Button Row */}
                            <div className="flex items-center group mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                                <div className="w-full flex justify-end">
                                    <button 
                                        onClick={handleGenerate}
                                        disabled={isGenerating || !topic}
                                        className={`flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm transition-all hover:shadow-md ${isGenerating ? 'opacity-70 cursor-wait' : ''}`}
                                    >
                                        <span className={`material-icons text-sm ${isGenerating ? 'animate-spin' : ''}`}>
                                            {isGenerating ? 'refresh' : 'auto_fix_high'}
                                        </span>
                                        {isGenerating ? 'Generating...' : 'Generate Post'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>

                {/* History Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-icons text-primary text-xl">history</span>
                            Generation History
                        </h2>
                    </div>
                    <div className="overflow-x-auto custom-scrollbar border border-slate-200 dark:border-slate-700 rounded-lg">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 w-32">Date</th>
                                    <th className="px-4 py-3">Topic Title</th>
                                    <th className="px-4 py-3 w-24">Tone</th>
                                    <th className="px-4 py-3 w-28 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {posts.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                                            No posts generated yet. Start by creating one above!
                                        </td>
                                    </tr>
                                ) : (
                                    posts.map((post) => (
                                        <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-mono text-xs">{post.date}</td>
                                            <td className="px-4 py-3 text-slate-900 dark:text-slate-200 font-medium">{post.title}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                    post.tone === 'Professional' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                                    post.tone === 'Friendly' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                                                    'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                                                }`}>
                                                    {post.tone}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button 
                                                    onClick={() => onPostSelect(post)}
                                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-sm"
                                                >
                                                    Read
                                                    <span className="material-icons text-[10px]">arrow_forward</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Dashboard;
