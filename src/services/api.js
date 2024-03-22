import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const backendApi = createApi({
  reducerPath: 'backendApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4600/' }),
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => `alltodos`,
    }),
    addNewTodo: builder.mutation({
      query: (newTodo) => {
        console.log("api::", newTodo);
        return {
          method: "POST",
          url: "addTodo",
          body: { newTodo }
        }
      }
    }),
    updateTodo: builder.mutation({
      query: (updatedTodo) => {
        return {
          method: "PUT",
          url:"/update",
          body:updatedTodo
        }
      }
    }),
    deleteTodo: builder.mutation({
      query: (ind) => {
        return {
          method: "DELETE",
          url:`/delete/${ind}`,
        }
      }
    }),
  }),
})

export const { useGetAllTodosQuery,useDeleteTodoMutation,useUpdateTodoMutation ,useLazyGetAllTodosQuery, useAddNewTodoMutation } = backendApi