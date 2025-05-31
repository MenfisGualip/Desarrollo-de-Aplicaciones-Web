import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const addGoalAsync = createAsyncThunk(
  'goals/addGoalAsync',  
  async (goalData) => {
    const response = await fetch('http://localhost:3001/goals/addGoal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '123',  
      },
      body: JSON.stringify(goalData),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al agregar la meta');
    }
    return data.goal;  
  }
);

const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    value: [],
    status: 'idle',  
    error: null,  
  },
  reducers: {
    initAddGoal: (state, action) => {
      state.value.push(action.payload);
    },
    removeGoal: (state, action) => {
      state.value = state.value.filter(goal => goal.id !== action.payload);

     
      fetch(`http://localhost:3001/goals/removeGoal/${action.payload}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '123',
        },
      }).catch(err => console.log(err));
    },
    updateGoal: (state, action) => {
      const index = state.value.findIndex(goal => goal.id === action.payload.id);
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGoalAsync.pending, (state) => {
        state.status = 'loading';  
      })
      .addCase(addGoalAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.value.push(action.payload);  
      })
      .addCase(addGoalAsync.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message; 
      });
  },
});

export const { initAddGoal, removeGoal, updateGoal } = goalsSlice.actions;
export const selectGoals = (state) => state.goals.value;
export const selectGoalStatus = (state) => state.goals.status;
export const selectGoalError = (state) => state.goals.error;

export default goalsSlice.reducer;
