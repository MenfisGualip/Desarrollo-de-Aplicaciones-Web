import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import "./Item.scss";
import { useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../../reducers/todoSlice';

function Item(props) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        id: props.id,
        name: props.name,
        description: props.description,
        dueDate: props.dueDate
    });

    const removeItem = (e) => {
        e.preventDefault();
        dispatch(removeTodo(props.id));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(updateTodo(editedData));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData({
            id: props.id,
            name: props.name,
            description: props.description,
            dueDate: props.dueDate
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="name"
                            value={editedData.name}
                            onChange={handleChange}
                            className="form-control mb-2"
                        />
                        <Card.Text className="fw-bold">Description</Card.Text>
                        <textarea
                            name="description"
                            value={editedData.description}
                            onChange={handleChange}
                            className="form-control mb-2"
                        />
                        <Card.Text className="fw-bold">Due Date</Card.Text>
                        <input
                            type="date"
                            name="dueDate"
                            value={editedData.dueDate}
                            onChange={handleChange}
                            className="form-control mb-2"
                        />
                    </>
                ) : (
                    <>
                        <Card.Title>{props.name}</Card.Title>
                        <Card.Text className="fw-bold">Description</Card.Text>
                        <Card.Text>{props.description}</Card.Text>
                        <Card.Text className="fw-bold">Due Date</Card.Text>
                        <Card.Text>
                            {props.dueDate ? new Date(props.dueDate).toLocaleDateString('es-GT') : "No date"}
                        </Card.Text>
                    </>
                )}
            </Card.Body>

            {/* Botones alineados a la derecha */}
            <Card.Body className="d-flex justify-content-end gap-2">
                {isEditing ? (
                    <>
                        <Button variant="success" onClick={handleSave}>Guardar</Button>
                        <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
                    </>
                ) : (
                    <>
                        <Button variant="info" onClick={handleEdit}>Editar</Button>
                        <Button variant="danger" onClick={removeItem}>Eliminar</Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

export default Item;
