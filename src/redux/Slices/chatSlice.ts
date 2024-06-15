// chatSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  channel: string | null;
  thread: string | null;
}

const initialState: ChatState = {
  channel: null,
  thread: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChannel(state, action: PayloadAction<string | null>) {
      state.channel = action.payload;
    },
    setThread(state, action: PayloadAction<string | null>) {
      state.thread = action.payload;
    },
  },
});

export const { setChannel, setThread } = chatSlice.actions;
export default chatSlice.reducer;
