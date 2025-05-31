import { createSlice } from '@reduxjs/toolkit';

export const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    value: [],
  },
  reducers: {
    addGoal: (state, action) => {
      // Enviar al backend con los campos title y description
      fetch('http://localhost:3001/goals/addGoal', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "123456"
        },
        body: JSON.stringify({
          title: action.payload.title,
          description: action.payload.description || ''
        }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.goal && data.goal.id) {
          state.value.push({
            id: data.goal.id,
            title: data.goal.title,
            description: data.goal.description,
            dueDate: action.payload.dueDate || '',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    initAddGoal: (state, action) => {
      state.value.push(action.payload);
    },
    removeGoal: (state, action) => {
      state.value = state.value.filter(goal => goal.id !== action.payload);
      
      fetch(`http://localhost:3001/goals/removeGoal/${action.payload}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "123"
        }
      }).catch(err => console.log(err));
    },
    updateGoal: (state, action) => {
      const index = state.value.findIndex(goal => goal.id === action.payload.id);
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...action.payload };
      }
    }
  }
});

export const { addGoal, initAddGoal, removeGoal, updateGoal } = goalsSlice.actions;
export const selectGoals = (state) => state.goals.value;

export default goalsSlice.reducer;
