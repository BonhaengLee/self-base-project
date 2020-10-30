import React from 'react';
import { Container } from 'react-bootstrap';
import Logout from '../components/Logout';

export default function LogoutPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Logout />
      </div>
    </Container>
  );
}
