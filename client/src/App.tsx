import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CommunityPage from './components/CommunityPage';
import PostPage from './components/PostPage';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Home from './components/Home';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Fetch the session on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes in authentication state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, authSession) => {
      setSession(authSession);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
      <Router>
        <Navbar />
        {session ? (
            <Switch>
              <Route exact path="/" component={() => <Home session={session} />} />
              <Route path="/community/:id" component={CommunityPage} />
              <Route path="/post/:id" component={PostPage} />
              {/* Add other authenticated routes here */}
            </Switch>
        ) : (
            <Auth />
        )}
      </Router>
  );
};

export default App;
