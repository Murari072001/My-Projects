import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "../features/todoSlice"
import { backendApi } from '../services/api'
import { setupListeners } from '@reduxjs/toolkit/query'
export const store = configureStore({
  reducer: {
    todo:todoReducer,
    [backendApi.reducerPath]: backendApi.reducer,
},
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendApi.middleware),

})
setupListeners(store.dispatch)