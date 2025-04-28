import logo from './logo.svg';
import './App.scss';
import Item from './componets/Item/Item';
import Menu from './componets/Menu/Menu';
import Container from 'react-bootstrap/esm/Container';
import Formulario from './componets/Formulario/Formulario';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
function App() {
  return (
    <div className="App">
      <Menu></Menu>
      <Container>
        <Row>
          <Col><Formulario></Formulario></Col>
          <Col>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
          </Col>
        </Row>
      </Container>      
    </div>
  );
}

export default App;
