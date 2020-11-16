import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReadAndSearchCourseMaterials from '../components/ReadAndSearchCourseMaterials';

export default function MypagePage() {
  return (
    <Container
      fluid="lg"
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '600px' }}
    >
      <ReadAndSearchCourseMaterials />
    </Container>
  );
}
