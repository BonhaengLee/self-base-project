import React from 'react';
import { Container } from 'react-bootstrap';
import UpdateClassMaterial from '../components/UpdateClassMaterial';

export default function UpdateClassMaterialPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-75" style={{ maxWidth: '400px' }}>
        <UpdateClassMaterial />
      </div>
    </Container>
  );
}
