import { createSlice } from "@reduxjs/toolkit";

type uiInitState = {
  currentChannelId: string;
  defaultChannelId: string;
  modal: {
    isOpened: boolean;
    type: string | null;
    extra: {
      channelId: string;
    } | null;
  };
};

const initialState: uiInitState = {
  currentChannelId: "1",
  defaultChannelId: "1",
  modal: {
    isOpened: false,
    type: null,
    extra: null,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentChannel(state, { payload }) {
      const { channelId } = payload;
      state.currentChannelId = channelId;
    },
    openModal: (state, { payload }) => {
      const { type, extra } = payload;
      state.modal.isOpened = true;
      state.modal.type = type;
      state.modal.extra = extra ?? null;
    },
    closeModal: (state) => {
      state.modal.isOpened = false;
      state.modal.type = null;
      state.modal.extra = null;
    },
  },
});

export const { setCurrentChannel, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
