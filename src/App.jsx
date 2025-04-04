import React, { useState } from 'react';
import { supabase } from './lib/supabase';

function App() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Successfully signed in
      alert('Successfully signed in!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      alert('Check your email for the confirmation link!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="content">
        {/* Left side with logo */}
        <div className="logo-section">
          <h1 className="logo-title">Welcome to</h1>
          <div className="logo-container">
            <img 
              src="/leche-plan-logo.png" 
              alt="Leche Plan Logo" 
              className="logo"
            />
          </div>
        </div>

        {/* Right side with form */}
        <div className="form-section">
          <div className="form-container">
            <h2 className="form-title">Sign-in</h2>
            <form onSubmit={handleSignIn}>
              <div className="form-group">
                <label className="form-label">
                  Email/Username
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type in your username..."
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type in your password..."
                  className="form-input"
                  required
                />
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="sign-in-button"
              >
                {loading ? 'Loading...' : 'Sign In'}
              </button>

              <button
                type="button"
                onClick={handleSignUp}
                disabled={loading}
                className="sign-up-button"
              >
                Don't have an account? Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;