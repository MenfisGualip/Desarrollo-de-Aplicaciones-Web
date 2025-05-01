import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Formulario.scss'
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from "react";
import {
  removeTodo,
  addTodo
} from '../../reducers/todoSlice';

function Formulario() {
  const dispatch = useDispatch();
  const inputRefName = useRef();
  const inputRefDescription = useRef();
  const inputRefDueDate = useRef();

  const addItem = (e) => {
    e.preventDefault();
    
    
    const selectedDate = new Date(inputRefDueDate.current.value);
    const timezoneOffset = selectedDate.getTimezoneOffset() * 60000;
    const correctedDate = new Date(selectedDate.getTime() + timezoneOffset);
    const isoDate = correctedDate.toISOString().split('T')[0]; 
    
    dispatch(addTodo({
      name: inputRefName.current.value,
      description: inputRefDescription.current.value,
      dueDate: isoDate, 
    }));

    inputRefName.current.value = "";
    inputRefDescription.current.value = "";
    inputRefDueDate.current.value = "";
  }

  return (
  <div className='space'>
       <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="" ref={inputRefName}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} ref={inputRefDescription}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date" ref={inputRefDueDate}  />
      </Form.Group>
      <Button variant="info" onClick={addItem}>Add Goal</Button>
    </Form>
  </div>
 
  );
}

export default Formulario;