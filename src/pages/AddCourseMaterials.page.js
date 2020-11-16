import React from 'react';
import { Container } from 'react-bootstrap';
import AddCourseMeterials from '../components/AddCourseMaterials';

export default function AddCourseMaterialsPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        width: '90%',
        margin: '3rem auto',
        display: 'grid',
        gridTemplateColumns: '1fr',
        rowGap: '1.5rem',
      }}
    >
      <div className="w-100">
        <AddCourseMeterials />
      </div>
    </Container>
  );
}
