import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from '../Services/userApi'
import { ticketApi } from '../Services/ticketApi'
import loginReducer from '../features/user/loginSlice'
export const store = configureStore({
  reducer: {
    loginReducer:loginReducer,
    [userApi.reducerPath]: userApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(userApi.middleware,ticketApi.middleware)
})
setupListeners(store.dispatch)    