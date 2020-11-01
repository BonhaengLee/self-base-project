import React from 'react';
import { Container } from 'react-bootstrap';
import ClassMaterialsList from '../components/ClassMaterialsList';

export default function MypagePage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-50" style={{ maxWidth: '5500px' }}>
        <ClassMaterialsList />
      </div>
    </Container>
  );
}
