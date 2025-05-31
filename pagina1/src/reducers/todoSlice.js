import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    value: [],
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        ...action.payload,
        complete: action.payload.complete ?? false,
      };

      fetch('http://localhost:3001/tasks/addTask', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "123"
        },
        body: JSON.stringify({
          name: newTodo.name,
          description: newTodo.description || ""
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.task && data.task.id){
      
          state.value.push({
            id: data.task.id,
            name: data.task.name,
            description: data.task.description,
            complete: false,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    initAddTodo: (state, action) => {
      state.value.push(action.payload);
    },
    removeTodo: (state, action) => {
      
      state.value = state.value.filter((task) => task.id !== action.payload);

      fetch(`http://localhost:3001/tasks/deleteTask/${action.payload}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "123"
        }
      }).catch(err => console.log(err));
    },
    updateTodo: (state, action) => {
      const index = state.value.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...action.payload };
      }
    },
    toggleComplete: (state, action) => {
      const index = state.value.findIndex(todo => todo.id === action.payload);
      if (index !== -1) {
        state.value[index].complete = !state.value[index].complete;
      }
    }
  }
});

export const { addTodo, initAddTodo, removeTodo, updateTodo, toggleComplete } = todoSlice.actions;
export const selectTodos = (state) => state.todos.value;

export default todoSlice.reducer;
