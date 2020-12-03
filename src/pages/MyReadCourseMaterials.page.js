import React from 'react';
import { Container, Row } from 'react-bootstrap';
import MyReadCourseMaterials from '../components/MyReadAndSearchCourseMaterials';

export default function MyReadCourseMaterialsPage() {
  return (
    <Container
      fluid="lg"
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '600px' }}
    >
      <MyReadCourseMaterials />
    </Container>
  );
}
