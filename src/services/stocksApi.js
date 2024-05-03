import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const stocksApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4600', credentials:"include" }),
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: () => `/allCompanies`,
    }),
    getStockDetails:builder.query({
      query:(cname)=>`/${cname}`
    }),
    checkuser:builder.mutation({
      query:(values)=>{
        return {
          method:"POST",
          url:"/authenticate",
          body:values
        }
      }
    }),
    checkLogin:builder.query({
      query:()=>`/`
    }),
    logout:builder.mutation({
      query:()=>{
        return ({
          method:"POST",
          url:"/logout"
        })
      }
    }),
    purchase:builder.mutation({
      query:(values)=>{
        return ({
          method:"POST",
          url:"/purchase",
          body:values
        })
      }
    }),
    updateStock:builder.mutation({
      query:(values)=>{
        return ({
          method:'PUT',
          url:"/updateStock",
          body:values
        })
      }
    }),
    deleteStock:builder.mutation({
      query:(id)=>{
        return ({
          method:'DELETE',
          url:`/deleteStock/${id}`,
        })
      }
    })
  }),
})

export const {
  useDeleteStockMutation,
  useUpdateStockMutation, 
  useGetAllCompaniesQuery,
  usePurchaseMutation,
  useLogoutMutation,
  useCheckuserMutation,
  useLazyCheckLoginQuery,
  useGetStockDetailsQuery
} = stocksApi