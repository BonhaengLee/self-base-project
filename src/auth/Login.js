import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import logo from '../images/edumeet_logo.PNG';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #a1c4fd 30%, #c2e9fb 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 2px 4px 1px #667eea',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('로그인에 실패했습니다.');
    }

    setLoading(false);
  }

  return (
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">
              <img src={logo} width="300" height="185" alt="testA" style={{}} />
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>이메일</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <MyButton disabled={loading} className="w-100" type="submit">
                로그인
              </MyButton>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">비밀번호 재설정</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          계정이 없으신가요?{' '}
          <Button variant="light">
            <Link to="/signup" style={{ color: 'black' }}>
              가입하기
            </Link>
          </Button>
        </div>
      </>
    </div>
  );
}
