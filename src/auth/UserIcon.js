import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import userIcon from '../images/edumeet_userIcon.png';

export default function UserIcon() {
  const { currentUser } = useAuth();
  return (
    <a href="/" className="navbar-brand w-100 text-center mt-1">
      {currentUser ? (
        <>
          <AccountCircle />
          <strong
            style={{
              fontSize: '14px',
              color: 'black',
            }}
          >
            {currentUser.email}
          </strong>
        </>
      ) : null}
    </a>
  );
}
