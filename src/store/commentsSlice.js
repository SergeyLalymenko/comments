import api from '@/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async function(_, { rejectWithValue }) {
        try {
            const res = await api.get('comments/');

            if (res.statusText !== 'OK') {
                throw new Error('Can not fetch comments!');
            }

            return res.data.comments;
        } catch(err) {
            return rejectWithValue(err.message);
        }
    }
);

export const createComment = createAsyncThunk(
    'comments/createComment',
    async function(newComment, { rejectWithValue }) {
        try {
            const res = await api.post('comments/', newComment);

            if (res.statusText !== 'OK') {
                throw new Error('Can not create comment!');
            }

            return res.data;
        } catch(err) {
            return rejectWithValue(err.message);
        }
    }
);

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async function(id, { rejectWithValue }) {
        try {
            const res = await api.delete(`comments/${id}`);

            if (res.statusText !== 'OK') {
                throw new Error('Can not delete comment!');
            }

            return res.data;
        } catch(err) {
            return rejectWithValue(err.message);
        }
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        data: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, { payload }) => {
            state.data = payload;
        }),
        builder.addCase(createComment.fulfilled, (state, { payload }) => {
            state.data = payload.comments;
        }),
        builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
            state.data = state.data.filter((comment) => comment.id !== payload.id);
        })
    }
});

export default commentsSlice.reducer;
