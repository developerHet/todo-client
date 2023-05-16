import { configureStore } from "@reduxjs/toolkit";
import todoReducer, {
  updateFilterStatus,
} from "./slices/todoSlice";
import { userReducer } from "./slices/userSlice";
import { userApi } from "./apis/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { todoApi } from "./apis/todoApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userApi.middleware).concat(todoApi.middleware);
  },
});

setupListeners(store.dispatch);

export {  updateFilterStatus };
export { useLoginMutation, useRegisterMutation } from "./apis/userApi";
export {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "./apis/todoApi";
