import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
};

const languageSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (state, action) => {
      // console.log(action);
      state.language = action.payload;
      console.log(state.language);
    },
  },
});

export const { setLang } = languageSlice.actions;
export default languageSlice.reducer;
