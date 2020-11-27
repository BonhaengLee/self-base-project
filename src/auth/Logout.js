import { Button } from 'react-bootstrap';
import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Logout() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch {
      setError('로그아웃에 실패했습니다.');
    }
  }
  return (
    <>
      {currentUser ? (
        <Button
          variant="dark"
          onClick={handleLogout}
          className="w-100 text-center mt-3 mr-1 bg-transprant rounded"
          style={{ fontWeight: '700' }}
        >
          LOG OUT
        </Button>
      ) : null}
    </>
  );
}
