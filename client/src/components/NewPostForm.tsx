import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

interface NewPostFormProps {
    communityId: string;
    onPostCreated: () => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ communityId, onPostCreated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const createPost = async () => {
        const user = supabase.auth.user();
        if (!user) {
            alert('You must be logged in to create a post.');
            return;
        }

        const { error } = await supabase.from('posts').insert([
            {
                title,
                content,
                community_id: communityId,
                user_id: user.id,
            },
        ]);

        if (error) {
            console.error('Error creating post:', error);
        } else {
            setTitle('');
            setContent('');
            onPostCreated();
        }
    };

    return (
        <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2"
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2"
            />
            <button
                onClick={createPost}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Post
            </button>
        </div>
    );
};

export default NewPostForm;
