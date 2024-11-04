// studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const savedStudents = JSON.parse(localStorage.getItem('students')) || { list: [], groups: [] };

const studentSlice = createSlice({
  name: 'students',
  initialState: savedStudents,
  reducers: {
    addStudent: (state, action) => {
      state.list.push(action.payload);
    },
    assignGroups: (state) => {
      const groupSize = 3; // Adjust group size as needed
      state.groups = [];
      for (let i = 0; i < state.list.length; i += groupSize) {
        state.groups.push(state.list.slice(i, i + groupSize));
      }
    },
    clearStudents: (state) => {
      state.list = [];
      state.groups = [];
    },
  },
});

export const { addStudent, assignGroups, clearStudents } = studentSlice.actions;

export default studentSlice.reducer;
