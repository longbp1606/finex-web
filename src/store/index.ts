import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./slices/messages.slice";
import analysisReducer from "./slices/analysis.slice";

export const store = configureStore({
    reducer: {
        messages: messagesReducer,
        analysis: analysisReducer,
    },
    middleware: (getDefaultMiddleWare) => 
        getDefaultMiddleWare({
            serializableCheck: false
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;