import React from 'react';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../types';

interface PostDetailProps {
    post: BlogPost;
    onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
    return (
        <div className="flex justify-center w-full py-8 px-4 h-screen">
            {/* Main Container - Simulating Narrow Window/Panel */}
            <main className="w-full max-w-[480px] bg-white dark:bg-[#151b2b] shadow-xl rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-full max-h-[800px]">
                {/* Header Section */}
                <header className="p-6 border-b border-slate-100 dark:border-slate-700/50 bg-white dark:bg-[#151b2b] sticky top-0 z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-icons text-xl">article</span>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg text-slate-900 dark:text-white leading-tight truncate max-w-[200px]">{post.title}</h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Post Detail View</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded text-xs font-medium border border-green-100 dark:border-green-800">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Active
                        </div>
                    </div>
                    {/* Breadcrumbs */}
                    <nav className="flex text-xs text-slate-400 mb-1">
                        <button onClick={onBack} className="hover:text-primary transition-colors flex items-center gap-1">
                            <span className="material-icons text-[12px]">arrow_back</span>
                            Dashboard
                        </button>
                        <span className="mx-1">/</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium truncate">{post.title}</span>
                    </nav>
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
                    {/* Stats Dashboard */}
                    <section>
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                            <span className="material-icons text-base text-primary">analytics</span>
                            Post Metrics
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {/* Stat Card 1 */}
                            <div className="p-4 rounded-lg bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-700 relative overflow-hidden group">
                                <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-icons text-4xl text-primary">text_fields</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Word Count</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{post.wordCount || 0}</p>
                            </div>
                            {/* Stat Card 2 */}
                            <div className="p-4 rounded-lg bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-700 relative overflow-hidden group">
                                <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-icons text-4xl text-primary">schedule</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Reading Time</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{post.readingTime || '1 min'}</p>
                            </div>
                            
                            {/* Tags Row */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="col-span-2 p-3 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-medium text-primary bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm border border-primary/10">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Content Viewer (Replacing Schema Table) */}
                    <section>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-icons text-base text-primary">description</span>
                                Content Preview
                            </h2>
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">Markdown</span>
                        </div>
                        <div className="bg-white dark:bg-[#151b2b] rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm p-4">
                            <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-slate-600 dark:prose-p:text-slate-300">
                                <ReactMarkdown>{post.content}</ReactMarkdown>
                            </div>
                        </div>
                    </section>

                    {/* Alert / Notification */}
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg flex gap-3">
                        <span className="material-icons text-primary text-sm mt-0.5">info</span>
                        <div>
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Editing Disabled</h4>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                                This post is in read-only mode. To make changes, please create a new generation request from the dashboard.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="p-4 border-t border-slate-100 dark:border-slate-700/50 bg-background-light dark:bg-[#121721] flex gap-3 justify-center">
                    <button 
                        onClick={onBack}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors shadow-sm"
                    >
                        <span className="material-icons text-sm">arrow_back</span>
                        Back to List
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm font-medium transition-colors shadow-md shadow-primary/20">
                        <span className="material-icons text-sm">share</span>
                        Share
                    </button>
                </footer>
            </main>
        </div>
    );
};

export default PostDetail;
