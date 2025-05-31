import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { changeOption } from '../../reducers/optionSlice';  // Ajusta esta ruta si es necesario

import "./Menu.scss";

function Menu() {
  const option = useSelector((state) => state.option.value);
  const dispatch = useDispatch();

  const changeOptionFunction = (e) => {
    e.preventDefault();
    if (option === 'tasks')
      dispatch(changeOption('goals'));
    else
      dispatch(changeOption('tasks'));
  }

  return (
    <Navbar expand="lg" className="navbar navbar-dark bg-dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav activeKey={option}>
            <Nav.Link eventKey="tasks" onClick={changeOptionFunction}>Tasks</Nav.Link>
            <Nav.Link eventKey="goals" onClick={changeOptionFunction}>Goals</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
