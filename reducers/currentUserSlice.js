import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: '',
  id: '',
  name: '',
  role: '',
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    addUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.email = action.payload.email;
      state.id = action.payload.uid;
      state.name = action.payload.displayName;
      state.role = action.payload.role;
    },
    clearUser: state => {
      state.email = '';
      state.id = '';
      state.name = '';
      state.role = '';
    },
    changeRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addUser, changeRole, clearUser} = currentUserSlice.actions;

export default currentUserSlice.reducer;
