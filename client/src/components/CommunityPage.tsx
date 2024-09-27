import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Community, Post } from '../types/types';
import NewPostForm from './NewPostForm';
import PostList from './PostList';

const CommunityPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [community, setCommunity] = useState<Community | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchCommunity();
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchCommunity = async () => {
        const { data, error } = await supabase
            .from('communities')
            .select('*')
            .eq('id', id)
            .single();
        if (error) console.error('Error fetching community:', error);
        else setCommunity(data as Community);
    };

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('community_id', id)
            .order('created_at', { ascending: false });
        if (error) console.error('Error fetching posts:', error);
        else setPosts(data as Post[]);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            {community && (
                <>
                    <h1 className="text-3xl font-bold mb-4">{community.name}</h1>
                    <p className="mb-6">{community.description}</p>
                    <NewPostForm communityId={community.id} onPostCreated={fetchPosts} />
                    <PostList posts={posts} />
                </>
            )}
        </div>
    );
};

export default CommunityPage;
