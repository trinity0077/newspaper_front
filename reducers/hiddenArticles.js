import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const hiddenArticlesSlice = createSlice({
	name: 'hiddenArticles',
	initialState,
	reducers: {
		hiddenArticle: (state, action) => {
			state.value.push(action.payload)
		},
        cleanhiddenArticle:( state, action) => {
            state.value = action.payload
        }
	},
});

export const { hiddenArticle, cleanhiddenArticle } = hiddenArticlesSlice.actions;
export default hiddenArticlesSlice.reducer;
