import List from "./list";
import { useSelector, useDispatch } from 'react-redux';
import { addGoal, selectGoals, removeGoal } from '../reducers/goalsSlice';
import { useRef } from "react";

export function Goals() {
    const dispatch = useDispatch();
    const goals = useSelector(selectGoals);
    const inputRefName = useRef();
    const inputRefDescription = useRef();
    const inputRefDueDate = useRef();

    const addItem = (e) => {
        e.preventDefault();
        
        if (!inputRefName.current.value.trim()) {
            alert('El nombre de la meta es obligatorio');
            return;
        }

        dispatch(addGoal({
            name: inputRefName.current.value,
            description: inputRefDescription.current.value,
            dueDate: inputRefDueDate.current.value || new Date().toISOString().split('T')[0]
        }));

        // Limpiar formulario
        inputRefName.current.value = "";
        inputRefDescription.current.value = "";
        inputRefDueDate.current.value = "";
    };

    const handleRemove = (goalName) => {
        if (window.confirm('¿Estás seguro de eliminar esta meta?')) {
            dispatch(removeGoal(goalName));
        }
    };

    return (
        <div className="goals-container">
            <h1>Goals List</h1>
            <div className="goal-form">
                <input 
                    type="text" 
                    placeholder="Goal name *" 
                    ref={inputRefName}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Description" 
                    ref={inputRefDescription}
                />
                <input 
                    type="date" 
                    ref={inputRefDueDate}
                    min={new Date().toISOString().split('T')[0]}
                />
                <button onClick={addItem}>Add Goal</button>
            </div>

            <List 
                items={goals} 
                remove={handleRemove}
            />
        </div>
    );
}