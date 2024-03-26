// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const jsonApi = createApi({
  reducerPath: 'jsonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4600/' }),
  endpoints: (builder) => ({
    checkUser: builder.query({
      query: (values) => `users/?username=${values.username}&password=${values.password}`,
    }),
    getAllCampaings:builder.query({
      query:()=>`campaigns`
    }),
    addLoan:builder.mutation({
      query:(loanValues)=>{
        return {
          method:"POST",
          url:`/createNewLoan`,
          body:loanValues
        }
      }
    }),
    adRegistration:builder.mutation({
      query:(newregistration)=>{
        return {
          method:"POST",
          url:`/registrations`,
          body:newregistration
        }
      }
    }),
    allLoans:builder.query({
      query:()=>`allLoans`
    }),
    LoanDetails:builder.query({
      query:(id)=>`loan/${id}`
    }),
    sendOTP:builder.query({
      query:(mail)=>`otp/${mail}`
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAdRegistrationMutation,useLazySendOTPQuery,useLoanDetailsQuery,useAllLoansQuery,useLazyCheckUserQuery,useAddLoanMutation,useGetAllCampaingsQuery } = jsonApi