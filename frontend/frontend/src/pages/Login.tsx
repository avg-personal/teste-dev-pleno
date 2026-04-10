import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext'; // Importe o hook de tema
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('@App:token', response.data.token);
      localStorage.setItem('@App:user', JSON.stringify(response.data.user));
      navigate('/'); 
    } catch (err: any) {
      setError(err.response?.data?.error || 'Falha na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center bg-body-tertiary" style={{ minHeight: '100vh' }}>
      
      {}
      <div style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 1000 }}>
              <Button 
                variant={theme === 'light' ? 'dark' : 'light'} 
                onClick={toggleTheme}
                className="shadow-lg px-4 fw-bold rounded-pill border-2"
              >
                {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </Button>
            </div>

      <Row className="w-100">
        <Col md={{ span: 6 }} lg={{ span: 4 }} className="mx-auto">
          {}
          <Card className="shadow-lg border-0 bg-body">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">CloudGed</h2>
                <p className="text-secondary">Gestão de Créditos</p>
              </div>

              {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="exemplo@email.com" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Sua senha" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 fw-bold" 
                  disabled={loading}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : 'Entrar'}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <span className="text-secondary small">Não tem uma conta? </span>
                <Link to="/register" className="text-decoration-none small fw-bold">
                  Cadastre-se
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;