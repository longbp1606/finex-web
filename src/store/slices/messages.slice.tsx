import { ChatResponse } from "@/services/chatAPI";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MessageState = {
    messages: ChatResponse[];
}

const initialState: MessageState = {
    messages: [],
}

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<ChatResponse[]>) => {
            state.messages = action.payload;
        }
    }
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;