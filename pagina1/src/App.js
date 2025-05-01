
// import { Todos } from './components/todos';
// import { Goals } from './components/goals';
import  Menu  from './Components/Menu/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormTaskAndGoal from './Components/Formulario/Formulario';
import Item from './Components/Item/Item';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddingMobileButton from './Components/AddingMobileButton/AddingMobileButton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import{
  addTodo,
  initAddTodo
} from './reducers/todoSlice'

import './Components/todos'

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.value);
  const arr = [
    {
      'name':'caminar al perro 1'
    },
    {
      'name':'caminar al perro 2'
    }
  ]
  useEffect(() => {
    arr.map((item) => {
      dispatch(initAddTodo(item))
    })
  }, []);

  return (
    <div className="App">
      <Menu/>
      
      
      { /*<Todos/> }
      { <Goals/> */}

      <Container>
      <Row>
        <Col xs={0} md={0}  className='d-none d-sm-block d-sm-none d-md-block '><FormTaskAndGoal/></Col>
        <Col xs ={0}  sm ={0}>
          <Row className='d-md-none'>
            <div className='bg-transparent overlapping-div ' >
              <AddingMobileButton className='float-left'/>
            </div>
          </Row>
          <Row>
            <div className='scrolling'>
              {
                todos.map((todo, index) => {
                  return (
                    <Item key={index} name={todo.name}
                    description={todo.description}
                    dueDate={todo.dueDate} 
                    />
                  )
                }
                )
              }
          </div>
          </Row>

        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;
