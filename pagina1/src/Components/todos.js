import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./Item.scss";
import { useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../../reducers/todoSlice';

function Item({ id, name, description, dueDate }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    id,
    name,
    description,
    dueDate
  });

  // Función para eliminar
  const handleDelete = () => {
    console.log("Eliminando tarea con ID:", id); // Para depuración
    dispatch(removeTodo(id));
  };

  // Función para editar
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Función para guardar cambios
  const handleSave = () => {
    dispatch(updateTodo(editedData));
    setIsEditing(false);
  };

  // Función para cancelar edición
  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ id, name, description, dueDate });
  };

  // Manejar cambios en los inputs
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
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                name="description"
                value={editedData.description}
                onChange={handleChange}
                className="form-control"
                rows="3"
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Fecha límite</label>
              <input
                type="date"
                name="dueDate"
                value={editedData.dueDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </>
        ) : (
          <>
            <Card.Title>{name}</Card.Title>
            <Card.Text className="fw-bold">Descripción</Card.Text>
            <Card.Text>{description}</Card.Text>
            <Card.Text className="fw-bold">Fecha límite</Card.Text>
            <Card.Text>
              {dueDate ? new Date(dueDate).toLocaleDateString('es-GT') : "Sin fecha"}
            </Card.Text>
          </>
        )}
      </Card.Body>
      
      <Card.Body className="d-flex justify-content-between">
        {isEditing ? (
          <>
            <Button variant="success" onClick={handleSave}>
              Guardar
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <Button variant="info" onClick={handleEdit}>
              Editar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default Item;