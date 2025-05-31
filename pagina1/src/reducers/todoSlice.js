import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',  
  async (newTodo, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/tasks/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '123',
        },
        body: JSON.stringify({
          name: newTodo.name,
          description: newTodo.description || '',
        }),
      });

      const data = await response.json();

      if (response.ok && data.task && data.task.id) {

        return {
          id: data.task.id,
          name: data.task.name,
          description: data.task.description,
          complete: false,
        };
      } else {
        return rejectWithValue(data.message || 'Error al agregar tarea');
      }
    } catch (err) {
      return rejectWithValue('Error al conectar con el servidor');
    }
  }
);


const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    value: [],
    status: 'idle',  
  },
  reducers: {
    initAddTodo: (state, action) => {
      state.value.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.value = state.value.filter((task) => task.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.value.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...action.payload };
      }
    },
    toggleComplete: (state, action) => {
      const index = state.value.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.value[index].complete = !state.value[index].complete;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value.push(action.payload); 
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { initAddTodo, removeTodo, updateTodo, toggleComplete } = todoSlice.actions;

export const selectTodos = (state) => state.todos.value;
export const selectTodoStatus = (state) => state.todos.status;
export const selectTodoError = (state) => state.todos.error;

export default todoSlice.reducer;
