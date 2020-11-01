import React from 'react';
import { Container } from 'react-bootstrap';
import ReadCourseMaterias from '../components/ReadCourseMaterias';

export default function ReadCourseMateriasPlage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-50" style={{ maxWidth: '5500px' }}>
        <ReadCourseMaterias />
      </div>
    </Container>
  );
}
