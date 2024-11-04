// Import necessary functions from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the slice
const initialState = {
  list: [],      // List of students
  groups: [],    // List of groups
};

// Utility function to assign students to random groups
const assignStudentsToGroups = (students, groupSize = 3) => {
  const shuffledStudents = [...students].sort(() => Math.random() - 0.5);
  const groups = [];

  for (let i = 0; i < shuffledStudents.length; i += groupSize) {
    groups.push(shuffledStudents.slice(i, i + groupSize));
  }

  return groups;
};

// Create the slice
const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    // Action to add a student to the list
    addStudent: (state, action) => {
      state.list.push(action.payload);
    },
    // Action to assign students to groups
    assignGroups: (state) => {
      state.groups = assignStudentsToGroups(state.list);
    },
    // Action to clear students and groups
    clearStudents: (state) => {
      state.list = [];
      state.groups = [];
    },
  },
});

// Export actions for use in components
export const { addStudent, assignGroups, clearStudents } = studentSlice.actions;

// Export the reducer to be used in the store
export default studentSlice.reducer;
