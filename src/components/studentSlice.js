// studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to shuffle an array
function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

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
      const shuffledStudents = shuffleArray(state.list); // Shuffle students randomly
      state.groups = [];
      for (let i = 0; i < shuffledStudents.length; i += groupSize) {
        state.groups.push(shuffledStudents.slice(i, i + groupSize));
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
