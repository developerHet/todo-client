import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://todoapi.cyclic.app/api/users',
        prepareHeaders: (headers,{getState}) => {
            const token = getState().user.currentUser?.token;
            if(token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder)=> ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                body: credentials,
            }),
        })
    }),
});

export const {useLoginMutation,useRegisterMutation} = userApi
export {userApi};