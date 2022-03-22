import * as React from 'react';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import EditCliente from './components/cliente/edit';
import ClienteList from './components/cliente/list';
import CreateCliente from './components/cliente/create';

function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Listado Clientes
        </Link>
      </Container>
    </Navbar>
    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path='/cliente/create' element={<CreateCliente />} />
            <Route path='/cliente/edit/:id' element={<EditCliente />} />
            <Route exact path='/' element={<ClienteList />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}
export default App;
