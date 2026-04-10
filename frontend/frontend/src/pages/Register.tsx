import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao criar conta.');
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
          <Card className="shadow-lg border-0 bg-body">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-success">Criar Conta</h2>
                <p className="text-secondary">Cadastre-se no TaxFlow</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control type="text" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control type="email" placeholder="email@exemplo.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={e => setPassword(e.target.value)} required />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100 py-2 fw-bold" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'FINALIZAR CADASTRO'}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <span className="text-secondary small">Já possui conta? </span>
                <Link to="/login" className="text-decoration-none small fw-bold text-success">
                  Fazer Login
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;