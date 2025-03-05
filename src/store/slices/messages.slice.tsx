import { ChatType } from "@/utils/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MessageState = {
    messages: ChatType[];
}

const initialState: MessageState = {
    messages: [],
}

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<ChatType[]>) => {
            state.messages = action.payload;
        }
    }
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;