import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';
import { Session } from '@supabase/supabase-js';

interface HomeProps {
  session: Session;
}

interface Community {
  id: string;
  name: string;
  description: string;
  created_at: string;
  creator_id: string;
}

const Home: React.FC<HomeProps> = ({ session }) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    fetchCommunities();

    // Set up real-time subscription
    const channel: RealtimeChannel = supabase
        .channel('public:communities')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'communities' },
            (payload) => {
              console.log('Change received!', payload);
              fetchCommunities();
            }
        )
        .subscribe();

    // Clean up subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCommunities = async () => {
    const { data, error } = await supabase
        .from('communities')
        .select('*');

    if (error) {
      console.error('Error:', error);
    } else {
      setCommunities(data as Community[]);
    }
  };

  const addCommunity = async () => {
    const { error } = await supabase.from('communities').insert([
      {
        name,
        creator_id: session.user.id,
      },
    ]);
    if (error) console.error('Error:', error);
    else {
      setName('');
    }
  };

  return (
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6">Communities</h1>
        <div className="mb-6">
          <input
              type="text"
              placeholder="Community name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-2"
          />
          <button
              onClick={addCommunity}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Add Community
          </button>
        </div>
        <ul className="space-y-4">
          {communities.map((community) => (
              <li key={community.id} className="p-4 border rounded">
                <h2 className="text-xl font-semibold">{community.name}</h2>
                <p>{community.description}</p>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default Home;
