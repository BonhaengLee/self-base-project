import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function UserIcon() {
  const { currentUser } = useAuth();
  return (
    <div className="w-100 text-center mt-3 mr-5 bg-transparent">
      <a href="/read-review">
        {currentUser ? (
          <>
            <AccountCircle
              className="mr-2 mb-1 mt-1"
              style={{ color: 'black', height: '35px', width: '35px' }}
            />
            <strong
              style={{
                fontSize: '14px',
                color: 'black',
              }}
            >
              {currentUser.displayName}({currentUser.email})
            </strong>
          </>
        ) : null}
      </a>
    </div>
  );
}
