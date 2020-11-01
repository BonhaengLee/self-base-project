import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import userIcon from './images/edumeet_userIcon.png';

export default function UserIcon() {
  const { currentUser } = useAuth();
  return (
    <a href="/" className="navbar-brand w-100 text-center mt-1">
      <img src={userIcon} width="55" height="55" alt="testA" style={{}} />
      {currentUser ? (
        <>
          <strong style={{ fontSize: '14px' }}>{currentUser.email}</strong>
        </>
      ) : null}
    </a>
  );
}
