import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('입력하신 이메일의 받은 편지함에서 이메일을 확인하십시오.');
    } catch {
      setError('비밀번호 재설정에 실패했습니다.');
    }

    setLoading(false);
  }

  return (
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">비밀번호 재설정</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>이메일</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                비밀번호 재설정
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">로그인</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          계정이 없으신가요? <Link to="/signup">가입하기</Link>
        </div>
      </>
    </div>
  );
}
