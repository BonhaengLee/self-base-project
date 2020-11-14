import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReadAndSearchCourseMaterials from '../components/ReadAndSearchCourseMaterials';

export default function MypagePage() {
  return (
    // <Container
    //   className="d-flex align-items-center justify-content-center"
    //   style={{ minHeight: '100vh' }}
    // >
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '50vh' }}
    >
      <ReadAndSearchCourseMaterials />
    </Container>
  );
}
