import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/todoSlice'
import goalReducer from './reducers/goalsSlice'
import optionReducer from './reducers/optionSlice' 
import logger from './middleware/logger'
import checker from './middleware/checker'

export default configureStore({
  reducer: {
    todos: todoReducer,
    goals: goalReducer,
    option: optionReducer,      
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, checker),
});
