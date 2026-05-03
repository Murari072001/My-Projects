import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4500/' }),
  endpoints: (builder) => ({
    getLogin:builder.mutation({
        query:(values)=>({
          url:'/auth/login',
          method:"POST",
          body:values
        })
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLoginMutation } = pokemonApi