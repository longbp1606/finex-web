import { AnalysisParamsRequest } from "@/services/analysisAPI";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AnalysisParamsRequest = {
    date: "",
    boardId: "",
};

const analysisSlice = createSlice({
    name: "analysis",
    initialState,
    reducers: {
        setBoard: (state, action: PayloadAction<string>) => {
            state.boardId = action.payload;
        }
    }
});

export const { setBoard } = analysisSlice.actions;
export default analysisSlice.reducer;