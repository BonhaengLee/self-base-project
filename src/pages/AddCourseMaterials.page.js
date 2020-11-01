import React from 'react';
import { Container } from 'react-bootstrap';
import AddCourseMeterials from '../components/AddCourseMaterials';

export default function AddCourseMaterialsPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-50" style={{ maxWidth: '5500px' }}>
        <AddCourseMeterials />
      </div>
    </Container>
  );
}
