import { createSlice } from '@reduxjs/toolkit';

export const goalsSlice = createSlice({
    name: 'goals',
    initialState: {
        value: [
            {
                name: 'Graduarme de la Universidad',
                description: '', // Campo añadido
                dueDate: ''      // Campo añadido
            }
        ],
    },
    reducers: {
        addGoal: (state, action) => {
            state.value.push({
                name: action.payload.name,
                description: action.payload.description || '', // Valor por defecto
                dueDate: action.payload.dueDate || ''         // Valor por defecto
            });
        },
        removeGoal: (state, action) => {
            state.value = state.value.filter((goal) => goal.name !== action.payload); // Elimina por nombre
        }
    }
});

export const { addGoal, removeGoal } = goalsSlice.actions;
export const selectGoals = (state) => state.goals.value;

export default goalsSlice.reducer;