import { configureStore } from '@reduxjs/toolkit'
import { stocksApi } from '../services/stocksApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import userReducer from '../features/userSlice'
export const store = configureStore({
  reducer: {
    userDetails:userReducer,
    [stocksApi.reducerPath]: stocksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stocksApi.middleware),
})

setupListeners(store.dispatch)