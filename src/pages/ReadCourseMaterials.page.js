import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ReadCourseMaterials from '../components/ReadCourseMaterials';

export default function ReadCourseMateriasPlage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '70vh' }}
    >
      <Row className="w-100" style={{ maxWidth: '5500px' }}>
        <ReadCourseMaterials />
      </Row>
    </Container>
  );
}
