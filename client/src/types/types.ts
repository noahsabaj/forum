export interface Community {
    id: string;
    name: string;
    description: string;
    created_at: string;
    creator_id: string;
}

export interface Post {
    id: string;
    user_id: string;
    community_id: string;
    title: string;
    content: string;
    created_at: string;
}

export interface Comment {
    id: string;
    post_id: string;
    user_id: string;
    content: string;
    created_at: string;
}

export interface Vote {
    id: string;
    post_id: string;
    user_id: string;
    vote_type: number;
    created_at: string;
}
