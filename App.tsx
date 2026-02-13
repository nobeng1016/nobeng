import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import PostDetail from './components/PostDetail';
import { BlogPost } from './types';

const INITIAL_POSTS: BlogPost[] = [
    {
        id: '1',
        date: '2023-10-24',
        title: 'Managing Diabetes in Winter',
        content: `
# Managing Diabetes in Winter

Winter brings cozy sweaters and hot cocoa, but for those managing diabetes, it also brings unique challenges. The cold weather can affect your blood sugar levels and your equipment.

## Why Winter is Tricky

1. **Less Activity**: It's cold, so we stay inside more.
2. **Comfort Food**: Higher carb intake is common.
3. **Illness**: Flu season can wreak havoc on glucose levels.

## Top Tips

* Keep your meter warm.
* Stay hydrated, even if you aren't thirsty.
* Moisturize your feet to prevent cracking.
        `,
        tone: 'Professional',
        status: 'Published',
        tags: ['Health', 'Winter', 'Diabetes'],
        wordCount: 120,
        readingTime: '1 min'
    },
    {
        id: '2',
        date: '2023-10-23',
        title: 'Flu Symptoms & Care',
        content: '# Flu Symptoms & Care\n\nThe flu hits hard and fast. Knowing the signs can help you get treatment sooner...',
        tone: 'Friendly',
        status: 'Draft',
        tags: ['Flu', 'Care'],
        wordCount: 45,
        readingTime: '< 1 min'
    }
];

const App: React.FC = () => {
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [posts, setPosts] = useState<BlogPost[]>(() => {
        const saved = localStorage.getItem('nodak_posts');
        return saved ? JSON.parse(saved) : INITIAL_POSTS;
    });

    useEffect(() => {
        localStorage.setItem('nodak_posts', JSON.stringify(posts));
    }, [posts]);

    const handleCreatePost = (newPost: BlogPost) => {
        setPosts([newPost, ...posts]);
    };

    const handleSelectPost = (post: BlogPost) => {
        setSelectedPost(post);
        setView('detail');
    };

    const handleBack = () => {
        setView('list');
        setSelectedPost(null);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display transition-colors duration-200">
            {view === 'list' ? (
                <Dashboard 
                    posts={posts} 
                    onPostCreate={handleCreatePost} 
                    onPostSelect={handleSelectPost} 
                />
            ) : (
                selectedPost && (
                    <PostDetail 
                        post={selectedPost} 
                        onBack={handleBack} 
                    />
                )
            )}
        </div>
    );
};

export default App;
