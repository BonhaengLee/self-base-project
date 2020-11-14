import React from 'react';
import { Container } from 'react-bootstrap';
import Dashboard from '../auth/Dashboard';

export default function DashboardPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-75" style={{ maxWidth: '400px' }}>
        <Dashboard />
      </div>
    </Container>
  );
}
