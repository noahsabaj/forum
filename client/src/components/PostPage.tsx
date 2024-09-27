import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Post, Comment } from '../types/types';
import CommentList from './CommentList';
import NewCommentForm from './NewCommentForm';

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetchPost();
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();
        if (error) console.error('Error fetching post:', error);
        else setPost(data as Post);
    };

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', id)
            .order('created_at', { ascending: true });
        if (error) console.error('Error fetching comments:', error);
        else setComments(data as Comment[]);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            {post && (
                <>
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <p className="mb-6">{post.content}</p>
                    <NewCommentForm postId={post.id} onCommentAdded={fetchComments} />
                    <CommentList comments={comments} />
                </>
            )}
        </div>
    );
};

export default PostPage;
