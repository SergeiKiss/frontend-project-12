import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../redux/store";
import type { ChannelBody } from "../types";

export const channelsApi = createApi({
  reducerPath: "channels",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/channels",
    prepareHeaders: (headers, { getState }) => {
      const { user } = getState() as RootState;

      headers.set("Authorization", `Bearer ${user.token}`);

      return headers;
    },
  }),
  tagTypes: ["Channels", "Messages"],
  endpoints: (builder) => ({
    getChannels: builder.query<Array<ChannelBody>, void>({
      query: () => "",
      providesTags: ["Channels"],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: "",
        method: "POST",
        body: channel,
      }),
    }),
    updateChannel: builder.mutation({
      query: (channel) => ({
        url: channel.id,
        method: "PATCH",
        body: channel,
      }),
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: "DELETE",
        invalidatesTags: ["Messages", "Channels"],
      }),
    }),
  }),
});

const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
} = channelsApi;

export {
  useGetChannelsQuery as getChannels,
  useAddChannelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
};
