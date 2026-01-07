import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export const Header: React.FC = () => {
  const router = useRouter();
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="logo">
          <h1>Mind Whiz</h1>
        </Link>
        <nav className="header-nav">
          {user ? (
            <>
              {isAdmin && (
                <Link href="/add-product" className="nav-link">
                  Add Product
                </Link>
              )}
              <div className="user-info">
                <span className="user-email">{user.email}</span>
                <span className="user-role">({user.role})</span>
              </div>
              <button className="btn-secondary btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button 
              className="btn-primary btn-sm"
              onClick={() => router.push('/login')}
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

