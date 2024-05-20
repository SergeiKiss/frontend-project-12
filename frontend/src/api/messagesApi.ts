import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";
import type { MessageBody } from "../types";

export const messagesApi = createApi({
  reducerPath: "messages",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/messages",
    prepareHeaders: (headers, { getState }) => {
      const { user } = getState() as RootState;

      headers.set("Authorization", `Bearer ${user.token}`);

      return headers;
    },
  }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getMessages: builder.query<Array<MessageBody>, void>({
      query: () => "",
      providesTags: ["Messages"],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: "",
        method: "POST",
        body: message,
      }),
    }),
    updateMessage: builder.mutation({
      query: (message) => ({
        url: "",
        method: "PATCH",
        body: message,
      }),
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: "DELETE",
      }),
    }),
  }),
});

const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;

export {
  useGetMessagesQuery as getMessages,
  useAddMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
};
