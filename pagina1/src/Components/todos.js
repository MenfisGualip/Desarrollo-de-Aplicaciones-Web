import List from "./list";
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, selectTodos } from '../reducers/todoSlice';
import { useRef } from "react";

export function Todos() {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const inputRefName = useRef();
    const inputRefDescription = useRef();
    const inputRefDueDate = useRef();

    const addItem = (e) => {
        e.preventDefault();
        dispatch(addTodo({
            name: inputRefName.current.value,
            description: inputRefDescription.current.value,
            dueDate: inputRefDueDate.current.value
        }));
        // Limpiar campos después de agregar
        inputRefName.current.value = "";
        inputRefDescription.current.value = "";
        inputRefDueDate.current.value = "";
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input type="text" placeholder="Todo name" ref={inputRefName} />
            <input type="text" placeholder="Description" ref={inputRefDescription} />
            <input type="date" placeholder="Due Date" ref={inputRefDueDate} />
            <button onClick={addItem}>Add Todo</button>

            <List items={todos} />
        </div>
    );
}