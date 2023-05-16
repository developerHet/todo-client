import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const todoApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todoapi.cyclic.app/api/todos",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.currentUser?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      providesTags: (result, error) => {
        const tags = result.todos.map((todo) => {
          return { type: "Todo", id: todo._id };
        });
        tags.push({ type: "NewTodo" });
        return tags;
      },
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    createTodo: builder.mutation({
      invalidatesTags: (result, error, todo) => {
        return [{ type: "NewTodo" }];
      },
      query: (todo) => ({
        url: "/",
        method: "POST",
        body: todo,
      }),
    }),
    updateTodo: builder.mutation({
      invalidatesTags: (result, error, todo) => {
        return [{ type: "Todo", id: todo._id }];
      },
      query: (body) => ({
        url: `/${body._id}`,
        method: "PUT",
        body: body,
      }),
    }),
    deleteTodo: builder.mutation({
      invalidatesTags: (result, error, todo) => {
        return [{ type: "Todo", id: todo._id }];
      },
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
export { todoApi };
