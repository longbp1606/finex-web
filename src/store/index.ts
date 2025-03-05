import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./slices/messages.slice";

export const store = configureStore({
    reducer: {
        messages: messagesReducer,
    },
    middleware: (getDefaultMiddleWare) => 
        getDefaultMiddleWare({
            serializableCheck: false
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;