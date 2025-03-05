import { ChatProps } from "@/services/gptAPI"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MessageState = {
    messages: ChatProps[];
}

const initialState: MessageState = {
    messages: [],
}

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<ChatProps[]>) => {
            state.messages = action.payload;
        }
    }
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;