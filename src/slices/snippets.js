import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { invoke } from '@tauri-apps/api';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'snippets',
  initialState,
  reducers: {
    _get: (state) => {
      state.loading = true;
    },
    _getSuccess: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    _getFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    _updateSuccess: (state, { payload }) => {
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === payload.id) {
            return payload;
          }
          return item;
        })
      };
    },
    _updateFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    _deleteSuccess: (state, { payload }) => {
      return {
        ...state,
        data: state.data.filter((item) => item.id !== payload)
      };
    }
  }
});

const {
  _get,
  _getSuccess,
  _getFailure,
  _updateSuccess,
  _updateFailure,
  _deleteSuccess
} = slice.actions;

export default slice.reducer;

export const fetch = createAsyncThunk(
  'snippets/fetch',
  async (_, { dispatch }) => {
    dispatch(_get());
    try {
      invoke('get_snippets')
        .then(data => dispatch(_getSuccess(data)));
    } catch (error) {
      dispatch(_getFailure());
    }
  }
);

// TODO: fix this
export const create = createAsyncThunk(
  'snippets/create',
  async (data, { dispatch }) => {
    dispatch(_get());
    try {
      invoke('update_snippet', {
        id: data.id,
        updatedTitle: data.title,
        updatedBody: data.body
      })
        .then(() => dispatch(_updateSuccess(data)));
        
    } catch (error) {
      dispatch(_updateFailure());
    }
  }
);

export const update = createAsyncThunk(
  'snippets/update',
  async (data, { dispatch }) => {
    dispatch(_get());
    try {
      invoke('update_snippet', {
        id: data.id,
        updatedTitle: data.title,
        updatedBody: data.body
      })
        .then(() => dispatch(_updateSuccess(data)));
    } catch (error) {
      dispatch(_updateFailure());
    }
  }
);

export const remove = createAsyncThunk(
  'snippets/remove',
  async (id, { dispatch }) => {
    dispatch(_get());
    try {
      invoke('delete_snippet', {
        id
      })
        .then(() => dispatch(_deleteSuccess(id)));
    } catch (error) {
      dispatch(_updateFailure());
    }
  }
);

