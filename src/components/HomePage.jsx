// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import { addStudent, assignGroups, clearStudents } from '../components/studentSlice';

// const App = () => {
//   const [fullname, setFullname] = useState('');
//   const [regNumber, setRegNumber] = useState('');
//   const dispatch = useDispatch();
//   const students = useSelector((state) => state.students.list);
//   const groups = useSelector((state) => state.students.groups);

//   // Function to handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!fullname || !regNumber) {
//       alert('Please fill in both fields');
//       return;
//     }

//     // Create a new student object
//     const newStudent = { fullname, regNumber };

//     // Add the student to the list
//     dispatch(addStudent(newStudent));

//     // Clear form inputs
//     setFullname('');
//     setRegNumber('');
//   };

//   // Use effect to assign groups whenever students list is updated
//   useEffect(() => {
//     if (students.length > 0) {
//       dispatch(assignGroups());
//     }
//   }, [students, dispatch]);

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 p-6 text-white">
//       <h1 className="text-4xl font-bold mb-6 text-yellow-200">Random Group Generator</h1>

//       {/* Registration Form */}
//       <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white shadow-2xl rounded-lg space-y-4">
//         <div className="mb-4">
//           <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
//           <input
//             type="text"
//             value={fullname}
//             onChange={(e) => setFullname(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="Enter your full name"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-bold text-gray-700 mb-1">Registration Number</label>
//           <input
//             type="text"
//             value={regNumber}
//             onChange={(e) => setRegNumber(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="Enter your registration number"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200 font-semibold"
//         >
//           Submit
//         </button>
//       </form>

//       {/* Group Display */}
//       <div className="w-full max-w-4xl mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {groups.map((group, index) => (
//           <div key={index} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
//             <h2 className="text-xl font-semibold text-indigo-600 mb-4">Group {index + 1}</h2>
//             <ul className="space-y-2">
//               {group.length > 0 ? (
//                 group.map((student, idx) => (
//                   <li key={idx} className="text-gray-800">
//                     {student.fullname} - {student.regNumber}
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-500">No members yet</li>
//               )}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;

