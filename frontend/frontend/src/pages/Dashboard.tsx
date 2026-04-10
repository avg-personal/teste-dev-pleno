import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Row, Col, Card, Form, Button, Table, Badge} from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const [summary, setSummary] = useState<any>(null);
  const [operations, setOperations] = useState<any[]>([]);
  const [type, setType] = useState('BUY');
  const [product, setProduct] = useState('GASOLINE');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const [resSummary, resOps] = await Promise.all([
        api.get('/operations/summary'),
        api.get('/operations')
      ]);
      setSummary(resSummary.data);
      setOperations(resOps.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadData(); }, []);

  const handleAddOperation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/operations', { type, product, date, quantity: Number(quantity) });
      setQuantity('');
      loadData();
    } catch (err) { alert('Erro ao registrar.'); }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <Navbar bg={theme === 'dark' ? 'dark' : 'white'} expand="lg" className="mb-4 shadow-sm border-bottom">
        <Container>
          <Navbar.Brand href="#" className="fw-bold text-primary fs-3">CloudGed</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center gap-3 mt-3 mt-lg-0">
              
              {}
              <Button 
                variant={theme === 'light' ? 'outline-primary' : 'outline-warning'} 
                onClick={toggleTheme}
                className="rounded-pill px-3 fw-bold btn-sm d-flex align-items-center"
              >
                <span className="me-2">{theme === 'light' ? '🌙' : '☀️'}</span>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>

              <Button variant="danger" size="sm" className="rounded-pill px-3 fw-bold" onClick={handleLogout}>
                SAIR
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="pb-5">
        <Row className="mb-4">
          <Col md={4} className="mb-3 mb-md-0">
            <Card className="h-100 border-0 shadow-sm border-start border-danger border-4">
              <Card.Body>
                <Card.Title className="text-secondary small fw-bold uppercase">TOTAL COMPRAS</Card.Title>
                <Card.Text className="h3 text-danger fw-bold">R$ {summary?.totalBuy || '0.00'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <Card className="h-100 border-0 shadow-sm border-start border-success border-4">
              <Card.Body>
                <Card.Title className="text-secondary small fw-bold uppercase">TOTAL VENDAS</Card.Title>
                <Card.Text className="h3 text-success fw-bold">R$ {summary?.totalSell || '0.00'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-lg bg-primary text-white">
              <Card.Body>
                <Card.Title className="small fw-bold opacity-75">CRÉDITO TRIBUTÁRIO</Card.Title>
                <Card.Text className="h2 fw-bold">R$ {summary?.taxCreditDifference || '0.00'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={4} className="mb-4">
            <Card className="border-0 shadow-sm bg-body">
              <Card.Header className="bg-transparent fw-bold border-bottom py-3">Nova Operação</Card.Header>
              <Card.Body>
                <Form onSubmit={handleAddOperation}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold">Tipo</Form.Label>
                    <Form.Select value={type} onChange={e => setType(e.target.value)}>
                      <option value="BUY">Compra (Crédito)</option>
                      <option value="SELL">Venda (Débito)</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold">Produto</Form.Label>
                    <Form.Select value={product} onChange={e => setProduct(e.target.value)}>
                      <option value="GASOLINE">Gasolina</option>
                      <option value="ETHANOL">Etanol</option>
                      <option value="DIESEL">Diesel</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold">Data</Form.Label>
                    <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} 
                      min="2024-01-01" 
                      max="2024-12-31" required />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-bold">Quantidade (Litros)</Form.Label>
                    <Form.Control type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 fw-bold shadow-sm">
                    REGISTRAR AGORA
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="border-0 shadow-sm bg-body">
              <Card.Header className="bg-transparent fw-bold border-bottom py-3">Histórico de Movimentações</Card.Header>
              <Table responsive hover className="mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Data</th>
                    <th>Tipo</th>
                    <th>Produto</th>
                    <th>Qtd</th>
                  </tr>
                </thead>
                <tbody>
                  {operations.map((op: any) => (
                    <tr key={op.id}>
                      <td>{new Date(op.date).toLocaleDateString()}</td>
                      <td>
                        <Badge pill bg={op.type === 'BUY' ? 'danger' : 'success'}>
                          {op.type === 'BUY' ? 'COMPRA' : 'VENDA'}
                        </Badge>
                      </td>
                      <td className="fw-bold">{op.product}</td>
                      <td>{op.quantity}L</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}