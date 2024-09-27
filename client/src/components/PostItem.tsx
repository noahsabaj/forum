import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Post, Vote } from '../types/types';

interface PostItemProps {
    post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
    const [voteCount, setVoteCount] = useState<number>(0);
    const [userVote, setUserVote] = useState<number>(0);

    useEffect(() => {
        fetchVoteCount();
        fetchUserVote();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchVoteCount = async () => {
        const { data, error } = await supabase
            .from('votes')
            .select('vote_type')
            .eq('post_id', post.id);
        if (error) {
            console.error('Error fetching votes:', error);
        } else {
            const votes = data as Vote[];
            const count = votes.reduce((acc, vote) => acc + vote.vote_type, 0);
            setVoteCount(count);
        }
    };

    const fetchUserVote = async () => {
        const user = supabase.auth.user();
        if (!user) return;

        const { data, error } = await supabase
            .from('votes')
            .select('vote_type')
            .eq('post_id', post.id)
            .eq('user_id', user.id)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching user vote:', error);
        } else if (data) {
            setUserVote(data.vote_type);
        }
    };

    const handleVote = async (voteType: number) => {
        const user = supabase.auth.user();
        if (!user) {
            alert('You must be logged in to vote.');
            return;
        }

        const { error } = await supabase.from('votes').upsert({
            post_id: post.id,
            user_id: user.id,
            vote_type: voteType,
        });

        if (error) {
            console.error('Error voting:', error);
        } else {
            setUserVote(voteType);
            fetchVoteCount();
        }
    };

    return (
        <div className="p-4 border rounded flex items-start">
            <div className="mr-4 flex flex-col items-center">
                <button
                    onClick={() => handleVote(1)}
                    className={`text-xl ${userVote === 1 ? 'text-green-500' : ''}`}
                >
                    ▲
                </button>
                <span>{voteCount}</span>
                <button
                    onClick={() => handleVote(-1)}
                    className={`text-xl ${userVote === -1 ? 'text-red-500' : ''}`}
                >
                    ▼
                </button>
            </div>
            <div>
                <Link to={`/post/${post.id}`}>
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                </Link>
                <p className="text-gray-600 text-sm">
                    Posted on {new Date(post.created_at).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default PostItem;
