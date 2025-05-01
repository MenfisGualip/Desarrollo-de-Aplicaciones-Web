import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/todoSlice'
import goalReducer from './reducers/goalsSlice'
import logger from './middleware/logger'
import checker from './middleware/checker'

export default configureStore({
    reducer:{
        todos:todoReducer,
        goals:goalReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger,checker)
})