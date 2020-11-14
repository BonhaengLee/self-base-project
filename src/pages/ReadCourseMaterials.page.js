import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ReadCourseMaterials from '../components/ReadAndSearchCourseMaterials';

export default function ReadCourseMaterialsPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '50vh' }}
    >
      <ReadCourseMaterials />
    </Container>
  );
}
