import React from 'react';
import { Container } from 'react-bootstrap';
import AddCourse from '../components/AddCourse';

export default function DashboardPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '75vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <AddCourse />
      </div>
    </Container>
  );
}
