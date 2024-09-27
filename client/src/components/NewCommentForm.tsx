import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

interface NewCommentFormProps {
    postId: string;
    onCommentAdded: () => void;
}

const NewCommentForm: React.FC<NewCommentFormProps> = ({ postId, onCommentAdded }) => {
    const [content, setContent] = useState('');

    const addComment = async () => {
        const user = supabase.auth.user();
        if (!user) {
            alert('You must be logged in to comment.');
            return;
        }

        const { error } = await supabase.from('comments').insert([
            {
                content,
                post_id: postId,
                user_id: user.id,
            },
        ]);

        if (error) {
            console.error('Error adding comment:', error);
        } else {
            setContent('');
            onCommentAdded();
        }
    };

    return (
        <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Add a Comment</h2>
            <textarea
                placeholder="Your comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2"
            />
            <button
                onClick={addComment}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
                Comment
            </button>
        </div>
    );
};

export default NewCommentForm;
