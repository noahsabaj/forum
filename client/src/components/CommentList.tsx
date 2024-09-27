import React from 'react';
import { Comment } from '../types/types';

interface CommentListProps {
    comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                <ul className="space-y-4">
                    {comments.map((comment) => (
                        <li key={comment.id} className="p-4 border rounded">
                            <p>{comment.content}</p>
                            <p className="text-gray-600 text-sm">
                                Posted on {new Date(comment.created_at).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CommentList;
