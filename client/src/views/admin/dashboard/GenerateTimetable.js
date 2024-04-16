// import { cilArrowLeft, cilArrowThickLeft } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
// import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CNav, CNavLink, CRow } from '@coreui/react'
// import React from 'react'
// import { Link } from 'react-router-dom'
// import AdminHeader from 'src/components/admin/AdminHeader'

// const GenerateTimetable = () => {
//   return (
//     <div>
//         <AdminHeader />
//         <div>
//             <CContainer>
//               <Link to='/admin' >
//                 <CIcon icon={cilArrowThickLeft} /> Back
//               </Link>
//                 <CRow className="justify-content-center">
//                     <CCol md={4}>
            
//                         <CForm>
//                             <h2 className='text-center' style={{color:'#1D60AE'}}>Generate Timetable </h2>
//                             Days
//                             <CInputGroup className="mb-3">
//                             <CFormInput 
//                                 style={{borderRadius:'25px'}} 
//                                 type="number"
//                                 required
//                                 tooltipFeedback
//                             />
//                             </CInputGroup>
//                             Lecture
//                             <CInputGroup className="mb-4">
//                             <CFormInput
//                                 style={{borderRadius:'25px'}}
//                                 type="number"
//                                 required
//                                 tooltipFeedback
//                             />
//                             </CInputGroup>
//                             Classes
//                             <CInputGroup className="mb-4">
//                             <CFormInput
//                                 style={{borderRadius:'25px'}}
//                                 type="text"
//                                 required
//                                 tooltipFeedback
//                             />
//                             </CInputGroup>   
//                             Teachers
//                             <CInputGroup className="mb-3">
//                             <CFormInput 
//                                 style={{borderRadius:'25px'}} 
//                                 type="text"
//                                 required
//                                 tooltipFeedback
//                             />
//                             </CInputGroup>                
//                             <CRow>
//                             <CCol xs={12} className='text-center'>
//                                 <CButton className="px-4" type='submit' shape="rounded-pill">
//                                 Generate Timetable
//                                 </CButton>
//                             </CCol>
//                             </CRow><br/>
//                         </CForm>

//                     </CCol>
//                 </CRow>
//             </CContainer>
//         </div>
//     </div>
//   )
// }

// export default GenerateTimetable







// import { cilArrowThickLeft } from '@coreui/icons';
// import CIcon from '@coreui/icons-react';
// import { CContainer } from '@coreui/react';
// import React, { useEffect, useState } from 'react';
// import { MultiSelect } from 'react-multi-select-component';
// import { Link } from 'react-router-dom';
// import AdminHeader from 'src/components/admin/AdminHeader';



// const generateRandomTimetable = (
//   days,
//   lectures,
//   classes,
//   teachers,
//   globalAssignedTeachers,
//   includeSaturday,
//   extraLecturesTeachers,
//   weeklyOnceTeachers
// ) => {
//   const timetable = {};
//   const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//   // Function to check if a teacher is already assigned to a position in other timetables
//   const isTeacherAssigned = (teacher, subject, day, lecture, className) => {
//     const key = `${day}-${lecture}`;

//     // Check if the teacher is already assigned in the same position for the given class
//     if (timetable[className]?.[day]?.[`Lecture ${lecture}`]?.teacher === teacher) {
//       return true;
//     }

//     // Iterate over all the previous timetables
//     for (const existingTimetable of Object.values(timetable)) {
//       for (const existingDay of Object.keys(existingTimetable)) {
//         for (const existingLecture of Object.keys(existingTimetable[existingDay])) {
//           const existingKey = `${existingDay}-${existingLecture}`;
//           const existingTeacher = existingTimetable[existingDay][existingLecture].teacher;
//           const existingSubject = existingTimetable[existingDay][existingLecture].subject;

//           // Check if the same teacher name is assigned to a different subject in another timetable
//           if (
//             existingTeacher.split('-')[0] === teacher &&
//             existingSubject === subject &&
//             globalAssignedTeachers.has(`${existingTeacher}-${existingKey}`)
//           ) {
//             return true;
//           }
//         }
//       }
//     }

//     return globalAssignedTeachers.has(`${teacher}-${key}`);
//   };

//   // Function to get a random teacher-subject pair considering regular and extra teachers
//   const getRandomTeacherSubjectPair = (weeklyOnceTeachersSet) => {
//     const isExtraLecturesTeacher = Math.random() < 0.2; // 20% chance to choose an extra lectures teacher
//     const isWeeklyOnceTeacher = Math.random() < 0.1; // 10% chance to choose a weekly once teacher

//     if (isExtraLecturesTeacher && extraLecturesTeachers.size > 0) {
//       return Array.from(extraLecturesTeachers)[Math.floor(Math.random() * extraLecturesTeachers.size)].split('-');
//     } else if (isWeeklyOnceTeacher && weeklyOnceTeachersSet.size > 0) {
//       const selectedTeacherSubject = Array.from(weeklyOnceTeachersSet)[Math.floor(Math.random() * weeklyOnceTeachersSet.size)];
//       weeklyOnceTeachersSet.delete(selectedTeacherSubject); // Remove from the set
//       return selectedTeacherSubject.split('-');
//     } else {
//       const randomIndex = Math.floor(Math.random() * teachers.length);
//       return teachers[randomIndex].split('-');
//     }
//   };

//   classes.forEach((className) => {
//     timetable[className] = {};

//     // Create a set to track assigned Weekly Once Teachers for each timetable
//     const assignedWeeklyOnceTeachersSet = new Set(weeklyOnceTeachers);

//     for (let i = 0; i < days; i++) {
//       const day = weekDays[i];
//       timetable[className][day] = {};

//       for (let lecture = 1; lecture <= (includeSaturday && day === 'Saturday' ? lectures / 2 : lectures); lecture++) {
//         let randomTeacher;
//         let randomSubject;

//         do {
//           // Get a random teacher-subject pair considering all types of teachers
//           [randomTeacher, randomSubject] = getRandomTeacherSubjectPair(assignedWeeklyOnceTeachersSet);
//         } while (isTeacherAssigned(randomTeacher, randomSubject, day, lecture, className));

//         const key = `${day}-${lecture}`;
//         globalAssignedTeachers.add(`${randomTeacher}-${key}`);

//         timetable[className][day][`Lecture ${lecture}`] = {
//           teacher: randomTeacher,
//           subject: randomSubject,
//         };
//       }
//     }
//   });

//   return timetable;
// };



// const Timetable = ({ timetables }) => {
//   return (
//     <div>
//       {Object.keys(timetables).map((className) => (
//         <div key={className} className="timetable-container">
//           <h2>{className} Timetable</h2>
//           <table className="timetable">
//             <thead>
//               <tr>
//                 <th>Day</th>
//                 {Object.keys(timetables[className]['Monday']).map((lecture) => (
//                   <th key={lecture}>{lecture}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//                 {Object.keys(timetables[className]).map((day) => (
//                     <tr key={day}>
//                       <td>{day}</td>
//                       {Object.values(timetables[className][day]).map((info, index) => (
//                         <td key={index}>
//                           {`${info.teacher}-${info.subject}`}
//                           {info.isExtraLectureTeacher && <span> (Extra Lecture)</span>}
//                           {info.isWeeklyOnceTeacher && <span> (Weekly Once)</span>}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// };

// const TimeTable = () => {
//   const [days, setDays] = React.useState(5);
//   const [lectures, setLectures] = React.useState(6);
//   const [selectedClasses, setSelectedClasses] = useState([]);
//   const [selectedTeachers, setSelectedTeachers] = useState([]);
//   const [globalAssignedTeachers, setGlobalAssignedTeachers] = React.useState(new Set());
//   const [extraLecturesTeachers, setExtraLecturesTeachers] = React.useState(new Set());
//   const [weeklyOnceTeachers, setWeeklyOnceTeachers] = React.useState(new Set());
//   const [timetables, setTimetables] = React.useState({});
//   const [includeSaturday, setIncludeSaturday] = React.useState(true);
//   const [classList, setClassList] = useState([]); 
//   const [teacherList, setTeacherList] = useState([]); 
//   const [extraLecturesTeachersList, setExtraLecturesTeachersList] = React.useState([]);
//   const [weeklyOnceTeachersList, setWeeklyOnceTeachersList] = React.useState([]);


//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`http://localhost:3005/classdata`);
//       const newData = await response.json();
//       setClassList(newData);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`http://localhost:3005/teacherdata`);
//       const newData = await response.json();
//       setTeacherList(newData);
//       setExtraLecturesTeachersList(newData.map(teacher => ({ label: teacher.teacher_name, value: `${teacher.teacher_name}-${teacher.teacher_id}` })));
//       setWeeklyOnceTeachersList(newData.map(teacher => ({ label: teacher.teacher_name, value: `${teacher.teacher_name}-${teacher.teacher_id}` })));
//     };
//     fetchData();
//   }, []);


//   const handleGenerateTimetable = () => {
//     const generatedTimetables = generateRandomTimetable(
//       days,
//       lectures,
//       selectedClasses.map((item) => item.value),
//       selectedTeachers.map((item) => item.value),
//       globalAssignedTeachers,
//       includeSaturday,
//       extraLecturesTeachers,
//       weeklyOnceTeachers
//     );
//     setTimetables(generatedTimetables);
//   };

//   return (
//     <div>
//       <AdminHeader />
//       <div>

//         <CContainer>
//           <Link to='/admin'>
//             <CIcon icon={cilArrowThickLeft}/> Back
//           </Link>
//           </CContainer>
//           <div className="table">
//             <label>
//               Number of Days:
//               <input
//                 type="number"
//                 value={days}
//                 onChange={(e) => {
//                   setDays(Math.min(Number(e.target.value), 6));
//                   setIncludeSaturday(e.target.value === '6');
//                 }}
//               />
//             </label>
//             <br/><br/>
//             {days === 6 && (
//               <label>
//                 Half day on Saturday :
//                 <input
//                   type="checkbox"
//                   checked={includeSaturday}
//                   onChange={(e) => setIncludeSaturday(e.target.checked)}
//                 />
//               </label>
//             )}
//             <br/><br/>
//             <label>
//               Number of Lectures:
//               <input type="number" value={lectures} onChange={(e) => setLectures(e.target.value)} />
//             </label>
//             <br/><br/>
//             <label>
//               Classes:
//               <MultiSelect
//                 options={classList.map(c => ({ label: c.class_name, value: `${c.class_name}-${c.class_id}` }))} 
//                 value={selectedClasses}
//                 onChange={setSelectedClasses}
//                 labelledBy="Select Classes"
//               />
//             </label>
//             <br/> <br/>
//             <label>
//               Teachers:
//               <MultiSelect
//                 options={teacherList.map(t => ({ label: t.teacher_name, value: `${t.teacher_name}-${t.teacher_id}` }))} 
//                 value={selectedTeachers}
//                 onChange={setSelectedTeachers}
//                 labelledBy="Select Teachers"
//               />
//             </label>
//             <br/><br/>
//             <label>
//               Extra Lectures Teachers:
//               <MultiSelect
//                 options={extraLecturesTeachersList}
//                 value={Array.from(extraLecturesTeachersList).filter(teacher => extraLecturesTeachers.has(teacher.value))}
//                 onChange={(selectedTeachers) => setExtraLecturesTeachers(new Set(selectedTeachers.map(teacher => teacher.value)))}
//                 labelledBy="Select Extra Lectures Teachers"
//               />
//             </label>
//             <br/><br/>
//             <label>
//               Weekly Once Teachers:
//               <MultiSelect
//                 options={weeklyOnceTeachersList}
//                 value={Array.from(weeklyOnceTeachersList).filter(teacher => weeklyOnceTeachers.has(teacher.value))}
//                 onChange={(selectedTeachers) => setWeeklyOnceTeachers(new Set(selectedTeachers.map(teacher => teacher.value)))}
//                 labelledBy="Select Weekly Once Teachers"
//               />
//             </label>
//             <br/><br/>
//             <button onClick={handleGenerateTimetable}>Generate Timetable</button>
//             <br/>

//             <div id="download-container">
//               {Object.keys(timetables).length > 0 && <Timetable timetables={timetables} />}
//             </div>
//           </div>
        
//       </div>
//     </div>
//   );
// };

// export default TimeTable;


// // with my database without userId

// import { cilArrowThickLeft } from '@coreui/icons';
// import CIcon from '@coreui/icons-react';
// import { CContainer } from '@coreui/react';
// import React, { useEffect, useState } from 'react';
// import { MultiSelect } from 'react-multi-select-component';
// import { Link } from 'react-router-dom';
// import AdminHeader from 'src/components/admin/AdminHeader';



// const generateRandomTimetable = (
//   days,
//   lectures,
//   classes,
//   teachers,
//   globalAssignedTeachers,
//   includeSaturday,
//   extraLecturesTeachers,
//   weeklyOnceTeachers
// ) => {
//   const timetable = {};
//   const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//   // Function to check if a teacher is already assigned to a position in other timetables
//   const isTeacherAssigned = (teacher, subject, day, lecture, className) => {
//     const key = `${day}-${lecture}`;

//     // Check if the teacher is already assigned in the same position for the given class
//     if (timetable[className]?.[day]?.[`Lecture ${lecture}`]?.teacher === teacher) {
//       return true;
//     }

//     // Iterate over all the previous timetables
//     for (const existingTimetable of Object.values(timetable)) {
//       for (const existingDay of Object.keys(existingTimetable)) {
//         for (const existingLecture of Object.keys(existingTimetable[existingDay])) {
//           const existingKey = `${existingDay}-${existingLecture}`;
//           const existingTeacher = existingTimetable[existingDay][existingLecture].teacher;
//           const existingSubject = existingTimetable[existingDay][existingLecture].subject;

//           // Check if the same teacher name is assigned to a different subject in another timetable
//           if (
//             existingTeacher.split('-')[0] === teacher &&
//             existingSubject === subject &&
//             globalAssignedTeachers.has(`${existingTeacher}-${existingKey}`)
//           ) {
//             return true;
//           }
//         }
//       }
//     }

//     return globalAssignedTeachers.has(`${teacher}-${key}`);
//   };

//   // Function to get a random teacher-subject pair considering regular and extra teachers
//   const getRandomTeacherSubjectPair = (weeklyOnceTeachersSet) => {
//     const isExtraLecturesTeacher = Math.random() < 0.2; // 20% chance to choose an extra lectures teacher
//     const isWeeklyOnceTeacher = Math.random() < 0.1; // 10% chance to choose a weekly once teacher

//     if (isExtraLecturesTeacher && extraLecturesTeachers.size > 0) {
//       return Array.from(extraLecturesTeachers)[Math.floor(Math.random() * extraLecturesTeachers.size)].split('-');
//     } else if (isWeeklyOnceTeacher && weeklyOnceTeachersSet.size > 0) {
//       const selectedTeacherSubject = Array.from(weeklyOnceTeachersSet)[Math.floor(Math.random() * weeklyOnceTeachersSet.size)];
//       weeklyOnceTeachersSet.delete(selectedTeacherSubject); // Remove from the set
//       return selectedTeacherSubject.split('-');
//     } else {
//       const randomIndex = Math.floor(Math.random() * teachers.length);
//       return teachers[randomIndex].split('-');
//     }
//   };


//   const getLecturesCountForTeacher = (teacher, day, className) => {
//     const dayTimetable = timetable[className]?.[day];
//     if (!dayTimetable) return 0;

//     let count = 0;
//     for (const lectureInfo of Object.values(dayTimetable)) {
//       if (lectureInfo.teacher === teacher) {
//         count++;
//       }
//     }

//     return count;
//   };

//   const assignedExtraLecturesTeachersCount = {};

//   classes.forEach((className) => {
//     timetable[className] = {};
//     assignedExtraLecturesTeachersCount[className] = {};

//     // Create a set to track assigned Weekly Once Teachers for each timetable
//     const assignedWeeklyOnceTeachersSet = new Set(weeklyOnceTeachers);

//     for (let i = 0; i < days; i++) {
//       const day = weekDays[i];
//       timetable[className][day] = {};

//       for (let lecture = 1; lecture <= (includeSaturday && day === 'Saturday' ? lectures / 2 : lectures); lecture++) {
//         let randomTeacher;
//         let randomSubject;

//         do {
//           // Get a random teacher-subject pair considering all types of teachers
//           [randomTeacher, randomSubject] = getRandomTeacherSubjectPair(assignedWeeklyOnceTeachersSet);
//         } while (
//           isTeacherAssigned(randomTeacher, randomSubject, day, lecture, className) ||
//           getLecturesCountForTeacher(randomTeacher, day, className) >= 2 ||
//           // Ensure Extra Lectures Teachers are assigned exactly two times
//           extraLecturesTeachers.size > 0 &&
//           assignedExtraLecturesTeachersCount[className][randomTeacher] &&
//           assignedExtraLecturesTeachersCount[className][randomTeacher] >= 2
//         );

//         const key = `${day}-${lecture}`;
//         globalAssignedTeachers.add(`${randomTeacher}-${key}`);

//         timetable[className][day][`Lecture ${lecture}`] = {
//           teacher: randomTeacher,
//           subject: randomSubject,
//           isExtraLectureTeacher: extraLecturesTeachers.has(`${randomTeacher}-${randomSubject}`),
//         };

//         // Increment the count for Extra Lectures Teachers
//         if (timetable[className][day][`Lecture ${lecture}`].isExtraLectureTeacher) {
//           assignedExtraLecturesTeachersCount[className][randomTeacher] =
//             (assignedExtraLecturesTeachersCount[className][randomTeacher] || 0) + 1;
//         }
//       }
//     }
//   });

//   return timetable;
// };

// const Timetable = ({ timetables }) => {
//   return (
//     <div>
//       {Object.keys(timetables).map((className) => (
//         <div key={className}>
//           <h2>{className} Timetable</h2>
//           <table className="timetable">
//             <thead>
//               <tr>
//                 <th>Day</th>
//                 {Object.keys(timetables[className]['Monday']).map((lecture) => (
//                   <th key={lecture}>{lecture}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//                 {Object.keys(timetables[className]).map((day) => (
//                     <tr key={day}>
//                       <td>{day}</td>
//                       {Object.values(timetables[className][day]).map((info, index) => (
//                         <td key={index}>
//                           {`${info.teacher}-${info.subject}`}
//                           {info.isExtraLectureTeacher && <span> </span>}
//                           {info.isWeeklyOnceTeacher && <span> (Weekly Once)</span>}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// };


// const TimeTable = () => {
//   const [days, setDays] = React.useState(6);
//   const [lectures, setLectures] = React.useState(9);
//   const [selectedClasses, setSelectedClasses] = useState([]);
//   const [selectedTeachers, setSelectedTeachers] = useState([]);
//   const [globalAssignedTeachers, setGlobalAssignedTeachers] = React.useState(new Set());
//   const [extraLecturesTeachers, setExtraLecturesTeachers] = React.useState(new Set());
//   const [weeklyOnceTeachers, setWeeklyOnceTeachers] = React.useState(new Set());
//   const [timetables, setTimetables] = React.useState({});
//   const [includeSaturday, setIncludeSaturday] = React.useState(true);
//   const [classList, setClassList] = useState([]); 
//   const [teacherList, setTeacherList] = useState([]); 
//   const [extraLecturesTeachersList, setExtraLecturesTeachersList] = React.useState([]);
//   const [weeklyOnceTeachersList, setWeeklyOnceTeachersList] = React.useState([]);


//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`http://localhost:3005/classdata`);
//       const newData = await response.json();
//       setClassList(newData);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`http://localhost:3005/teacherdata`);
//       const newData = await response.json();
//       setTeacherList(newData);
//       setExtraLecturesTeachersList(newData.map(teacher => ({ label: teacher.teacher_name, value: `${teacher.teacher_name}-${teacher.teacher_id}` })));
//       setWeeklyOnceTeachersList(newData.map(teacher => ({ label: teacher.teacher_name, value: `${teacher.teacher_name}-${teacher.teacher_id}` })));
//     };
//     fetchData();
//   }, []);


//   const handleGenerateTimetable = () => {
//     const generatedTimetables = generateRandomTimetable(
//       days,
//       lectures,
//       selectedClasses.map((item) => item.value),
//       selectedTeachers.map((item) => item.value),
//       globalAssignedTeachers,
//       includeSaturday,
//       extraLecturesTeachers,
//       weeklyOnceTeachers
//     );
//     setTimetables(generatedTimetables);
//   };

//   return (
//     <div>
//       <AdminHeader />
//       <div>

//         <CContainer>
//           <Link to='/admin'>
//             <CIcon icon={cilArrowThickLeft}/> Back
//           </Link>
//           </CContainer>
//           <div className="table">
//             <label>
//               Number of Days:
//               <input
//                 type="number"
//                 value={days}
//                 onChange={(e) => {
//                   setDays(Math.min(Number(e.target.value), 6));
//                   setIncludeSaturday(e.target.value === '6');
//                 }}
//               />
//             </label>
//             <br/><br/>
//             {days === 6 && (
//               <label>
//                 Half day on Saturday :
//                 <input
//                   type="checkbox"
//                   checked={includeSaturday}
//                   onChange={(e) => setIncludeSaturday(e.target.checked)}
//                 />
//               </label>
//             )}
//             <br/><br/>
//             <label>
//               Number of Lectures:
//               <input type="number" value={lectures} onChange={(e) => setLectures(e.target.value)} />
//             </label>
//             <br/><br/>
//             <label>
//               Classes:
//               <MultiSelect
//                 options={classList.map(c => ({ label: c.class_name, value: `${c.class_name}-${c.class_id}` }))} 
//                 value={selectedClasses}
//                 onChange={setSelectedClasses}
//                 labelledBy="Select Classes"
//               />
//             </label>
//             <br/> <br/>
//             <label>
//               Teachers:
//               <MultiSelect
//                 options={teacherList.map(t => ({ label: t.teacher_name, value: `${t.teacher_name}-${t.teacher_id}` }))} 
//                 value={selectedTeachers}
//                 onChange={setSelectedTeachers}
//                 labelledBy="Select Teachers"
//               />
//             </label>
//             <br/><br/>
//             <label>
//               Extra Lectures Teachers:
//               <MultiSelect
//                 options={extraLecturesTeachersList}
//                 value={Array.from(extraLecturesTeachersList).filter(teacher => extraLecturesTeachers.has(teacher.value))}
//                 onChange={(selectedTeachers) => setExtraLecturesTeachers(new Set(selectedTeachers.map(teacher => teacher.value)))}
//                 labelledBy="Select Extra Lectures Teachers"
//               />
//             </label>
//             <br/><br/>
//             <label>
//               Weekly Once Teachers:
//               <MultiSelect
//                 options={weeklyOnceTeachersList}
//                 value={Array.from(weeklyOnceTeachersList).filter(teacher => weeklyOnceTeachers.has(teacher.value))}
//                 onChange={(selectedTeachers) => setWeeklyOnceTeachers(new Set(selectedTeachers.map(teacher => teacher.value)))}
//                 labelledBy="Select Weekly Once Teachers"
//               />
//             </label>
//             <br/><br/>
//             <button onClick={handleGenerateTimetable}>Generate Timetable</button>
//             <br/>

//             <div id="download-container">
//               {Object.keys(timetables).length > 0 && <Timetable timetables={timetables} />}
//             </div>
//           </div>
        
//       </div>
//     </div>
//   );
// };

// export default TimeTable;





// import { cilArrowThickLeft } from '@coreui/icons';
// import CIcon from '@coreui/icons-react';
// import { CContainer } from '@coreui/react';
// import React, { useEffect, useState } from 'react';
// import { MultiSelect } from 'react-multi-select-component';
// import { Link } from 'react-router-dom';
// import AdminHeader from 'src/components/admin/AdminHeader';



// const generateRandomTimetable = (
//   days,
//   lectures,
//   classes,
//   teachers,
//   globalAssignedTeachers,
//   includeSaturday,
//   extraLecturesTeachers,
//   weeklyOnceTeachers,
//   extraTeachersInput
// ) => {
//   const timetable = {};
//   const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//   // Function to check if a teacher is already assigned to a position in other timetables
//   const isTeacherAssigned = (teacher, subject, day, lecture, className) => {
//     const key = `${day}-${lecture}`;

//     // Check if the teacher is already assigned in the same position for the given class
//     if (timetable[className]?.[day]?.[`Lecture ${lecture}`]?.teacher === teacher) {
//       return true;
//     }

//     // Iterate over all the previous timetables
//     for (const existingTimetable of Object.values(timetable)) {
//       for (const existingDay of Object.keys(existingTimetable)) {
//         for (const existingLecture of Object.keys(existingTimetable[existingDay])) {
//           const existingKey = `${existingDay}-${existingLecture}`;
//           const existingTeacher = existingTimetable[existingDay][existingLecture].teacher;
//           const existingSubject = existingTimetable[existingDay][existingLecture].subject;

//           // Check if the same teacher name is assigned to a different subject in another timetable
//           if (
//             existingTeacher.split('-')[0] === teacher &&
//             existingSubject === subject &&
//             globalAssignedTeachers.has(`${existingTeacher}-${existingKey}`)
//           ) {
//             return true;
//           }
//         }
//       }
//     }

//     return globalAssignedTeachers.has(`${teacher}-${key}`);
//   };

//   // Function to get a random teacher-subject pair considering regular and extra teachers
//   const getRandomTeacherSubjectPair = (weeklyOnceTeachersSet) => {
//     const isExtraLecturesTeacher = Math.random() < 0.2; // 20% chance to choose an extra lectures teacher
//     const isWeeklyOnceTeacher = Math.random() < 0.1; // 10% chance to choose a weekly once teacher

//     if (isExtraLecturesTeacher && extraLecturesTeachers.size > 0) {
//       return Array.from(extraLecturesTeachers)[Math.floor(Math.random() * extraLecturesTeachers.size)].split('-');
//     } else if (isWeeklyOnceTeacher && weeklyOnceTeachersSet.size > 0) {
//       const selectedTeacherSubject = Array.from(weeklyOnceTeachersSet)[Math.floor(Math.random() * weeklyOnceTeachersSet.size)];
//       weeklyOnceTeachersSet.delete(selectedTeacherSubject); // Remove from the set
//       return selectedTeacherSubject.split('-');
//     } else {
//       const randomIndex = Math.floor(Math.random() * teachers.length);
//       return teachers[randomIndex].split('-');
//     }
//   };


//   const getLecturesCountForTeacher = (teacher, day, className) => {
//     const dayTimetable = timetable[className]?.[day];
//     if (!dayTimetable) return 0;

//     let count = 0;
//     for (const lectureInfo of Object.values(dayTimetable)) {
//       if (lectureInfo.teacher === teacher) {
//         count++;
//       }
//     }

//     return count;
//   };

//   const assignedExtraLecturesTeachersCount = {};

//   classes.forEach((className) => {
//     timetable[className] = {};
//     assignedExtraLecturesTeachersCount[className] = {};

//     // Create a set to track assigned Weekly Once Teachers for each timetable
//     const assignedWeeklyOnceTeachersSet = new Set(weeklyOnceTeachers);

//     for (let i = 0; i < days; i++) {
//       const day = weekDays[i];
//       timetable[className][day] = {};

//       for (let lecture = 1; lecture <= (includeSaturday && day === 'Saturday' ? lectures / 2 : lectures); lecture++) {
//         let randomTeacher;
//         let randomSubject;

//         do {
//           // Get a random teacher-subject pair considering all types of teachers
//           [randomTeacher, randomSubject] = getRandomTeacherSubjectPair(assignedWeeklyOnceTeachersSet);
//         } while (
//           isTeacherAssigned(randomTeacher, randomSubject, day, lecture, className) ||
//           getLecturesCountForTeacher(randomTeacher, day, className) >= 2 ||
//           // Ensure Extra Lectures Teachers are assigned exactly two times
//           extraLecturesTeachers.size > 0 &&
//           assignedExtraLecturesTeachersCount[className][randomTeacher] &&
//           assignedExtraLecturesTeachersCount[className][randomTeacher] >= 2
//         );

//         const key = `${day}-${lecture}`;
//         globalAssignedTeachers.add(`${randomTeacher}-${key}`);

//         timetable[className][day][`Lecture ${lecture}`] = {
//           teacher: randomTeacher,
//           subject: randomSubject,
//           isExtraLectureTeacher: extraLecturesTeachers.has(`${randomTeacher}-${randomSubject}`),
//           isWeeklyOnceTeacher: weeklyOnceTeachers.has(`${randomTeacher}-${randomSubject}`),
//         };

//         // Increment the count for Extra Lectures Teachers
//         if (timetable[className][day][`Lecture ${lecture}`].isExtraLectureTeacher) {
//           assignedExtraLecturesTeachersCount[className][randomTeacher] =
//             (assignedExtraLecturesTeachersCount[className][randomTeacher] || 0) + 1;
//         }
//       }
//     }
//   });

//   return timetable;
// };



// const Timetable = ({ timetables }) => {
//   return (
//     <div>
//       {Object.keys(timetables).map((className) => (
//         <div key={className}>
//           <h2>{className} Timetable</h2>
//           <table className="timetable">
//             <thead>
//               <tr>
//                 <th>Day</th>
//                 {Object.keys(timetables[className]['Monday']).map((lecture) => (
//                   <th key={lecture}>{lecture}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//                 {Object.keys(timetables[className]).map((day) => (
//                     <tr key={day}>
//                       <td>{day}</td>
//                       {Object.values(timetables[className][day]).map((info, index) => (
//                         <td key={index}>
//                           {`${info.teacher}-${info.subject}`}
//                           {info.isExtraLectureTeacher && <span> </span>}
//                           {info.isWeeklyOnceTeacher && <span> (Weekly Once)</span>}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// };








// const TimeTable = () => {
//   const [days, setDays] = React.useState(6);
//   const [lectures, setLectures] = React.useState(9);
//   const [selectedClasses, setSelectedClasses] = useState([]);
//   const [selectedTeachers, setSelectedTeachers] = useState([]);
//   const [globalAssignedTeachers, setGlobalAssignedTeachers] = React.useState(new Set());
//   const [extraLecturesTeachers, setExtraLecturesTeachers] = React.useState(new Set());
//   const [weeklyOnceTeachers, setWeeklyOnceTeachers] = React.useState(new Set());
//   const [timetables, setTimetables] = React.useState({});
//   const [includeSaturday, setIncludeSaturday] = React.useState(true);

//   const [classList, setClassList] = useState([]); 
//   const [teacherList, setTeacherList] = useState([]); 
//   const [extraLecturesTeachersList, setExtraLecturesTeachersList] = React.useState([]);
//   const [weeklyOnceTeachersList, setWeeklyOnceTeachersList] = React.useState([]);
  


//   const userId = "45"; 




//   useEffect(() => {
//     const fetchClass = async () => {
//       try {
//         const result = await fetch(`http://192.168.1.39:3005/getClassSecFot_tt/${userId}`);
//         const jsonClass = await result.json();

//         setClassList(jsonClass.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchClass();
//   }, [userId]);
  
  

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`http://192.168.1.39:3005/getSubject_Teacher_tt/${userId}`);
//       const newData = await response.json();
//       setTeacherList(newData.data);
//       setExtraLecturesTeachersList(newData.data.map(teacher => ({ label: teacher.Teacher_Name, value: `${teacher.Teacher_Name}-${teacher.Teacher_Id}` })));
//       setWeeklyOnceTeachersList(newData.data.map(teacher => ({ label: teacher.Teacher_Name, value: `${teacher.Teacher_Name}-${teacher.Teacher_Id}` })));
//     };
//     fetchData();
//   }, []);





//   const handleGenerateTimetable = () => {

//     const generatedTimetables = generateRandomTimetable(
//       days,
//       lectures,
//       selectedClasses.map((item) => item.value),
//       selectedTeachers.map((item) => item.value),
//       globalAssignedTeachers,
//       includeSaturday,
//       extraLecturesTeachers,
//       weeklyOnceTeachers,
//     );
//     setTimetables(generatedTimetables);
//   };





//   return (
//     <div>
//       <AdminHeader />
//       <div>

//         <CContainer>
//           <Link to='/admin'>
//             <CIcon icon={cilArrowThickLeft}/> Back
//           </Link>
//           </CContainer>
//           <div className="table">
//             <label>
//               Number of Days:
//               <input
//                 type="number"
//                 value={days}
//                 onChange={(e) => {
//                   setDays(Math.min(Number(e.target.value), 6));
//                   setIncludeSaturday(e.target.value === '6');
//                 }}
//               />
//             </label>
//             <br/><br/>
//             {days === 6 && (
//               <label>
//                 Half day on Saturday :
//                 <input
//                   type="checkbox"
//                   checked={includeSaturday}
//                   onChange={(e) => setIncludeSaturday(e.target.checked)}
//                 />
//               </label>
//             )}
//             <br/><br/>
//             <label>
//               Number of Lectures:
//               <input type="number" value={lectures} onChange={(e) => setLectures(e.target.value)} />
//             </label>
//             <br/><br/>

//             <label>
//               Classes:
//               <MultiSelect
//                 options={classList.map(c => ({ label: `${c.Class_Name} - ${c.Section_Name}`, value: `${c.Class_Name}-${c.Section_Name}-${c.Class_Id}` }))}
//                 value={selectedClasses}
//                 onChange={setSelectedClasses}
//                 labelledBy="Select Classes"
//               />
//             </label>


//             <br/> <br/>
//             <label>
//               Teachers:
//               <MultiSelect
//                 options={teacherList.map(t => ({ label: t.Teacher_Name, value: `${t.Teacher_Name}-${t.Teacher_Id}` }))} 
//                 value={selectedTeachers}
//                 onChange={setSelectedTeachers}
//                 labelledBy="Select Teachers"
//               />
//             </label>
//             <br/><br/>
//             <label>
//               Extra Lectures Teachers:
//               <MultiSelect
//                 options={extraLecturesTeachersList}
//                 value={Array.from(extraLecturesTeachersList).filter(teacher => extraLecturesTeachers.has(teacher.value))}
//                 onChange={(selectedTeachers) => setExtraLecturesTeachers(new Set(selectedTeachers.map(teacher => teacher.value)))}
//                 labelledBy="Select Extra Lectures Teachers"
//               />
//             </label>
//             <br/><br/>
//             <label>
//               Weekly Once Teachers:
//               <MultiSelect
//                 options={weeklyOnceTeachersList}
//                 value={Array.from(weeklyOnceTeachersList).filter(teacher => weeklyOnceTeachers.has(teacher.value))}
//                 onChange={(selectedTeachers) => setWeeklyOnceTeachers(new Set(selectedTeachers.map(teacher => teacher.value)))}
//                 labelledBy="Select Weekly Once Teachers"
//               />
//             </label>
//             <br/><br/>
            
//             <button onClick={handleGenerateTimetable}>Generate Timetable</button>
//             <br/>

//             <div id="download-container">
//               {Object.keys(timetables).length > 0 && <Timetable timetables={timetables} />}
//             </div>
//           </div>
        
//       </div>
//     </div>
//   );
// };

// export default TimeTable;




// // old fetching links

// import { cilArrowThickLeft } from '@coreui/icons';
// import CIcon from '@coreui/icons-react';
// import { CContainer } from '@coreui/react';
// import React, { useEffect, useState } from 'react';
// import { MultiSelect } from 'react-multi-select-component';
// import { Link } from 'react-router-dom';
// import AdminHeader from 'src/components/admin/AdminHeader';



// const generateRandomTimetable = (
//   days,
//   lectures,
//   classes,
//   teachers,
//   globalAssignedTeachers,
//   includeSaturday,
//   extraLecturesTeachers,
//   weeklyOnceTeachers,
//   weeklyForAllClass,  
//   newDay,  
//   newLectureNumber, 
//   extraTeachersForAllClasses,
//   newExtraTeachersDay,
//   newExtraTeachersLectureNumber,
//   extraTeachersForAllClassesRandom,
//   weeklyTeacherForSelectedClass,
//   weeklySelectedClasses,
//   combineRemainingClasses
// ) => {
//   const timetable = {};
//   const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//    // Function to check if the provided day and lecture match the weeklyForAllClass input
//    const isweeklyForAllClassDayAndLecture = (day, lecture) => {
//     return day === newDay && lecture === Number(newLectureNumber);
//   };


//   // Function to check if a teacher is already assigned to a position in other timetables
//   const isTeacherAssigned = (teacher, subject, day, lecture, className) => {
//     const key = `${day}-${lecture}`;

//     // Check if the teacher is already assigned in the same position for the given class
//     if (timetable[className]?.[day]?.[`Lecture ${lecture}`]?.teacher === teacher) {
//       return true;
//     }

//     // Iterate over all the previous timetables
//     for (const existingTimetable of Object.values(timetable)) {
//       for (const existingDay of Object.keys(existingTimetable)) {
//         for (const existingLecture of Object.keys(existingTimetable[existingDay])) {
//           const existingKey = `${existingDay}-${existingLecture}`;
//           const existingTeacher = existingTimetable[existingDay][existingLecture].teacher;
//           const existingSubject = existingTimetable[existingDay][existingLecture].subject;

//           // Check if the same teacher name is assigned to a different subject in another timetable
//           if (
//             existingTeacher.split('-')[0] === teacher &&
//             existingSubject === subject &&
//             globalAssignedTeachers.has(`${existingTeacher}-${existingKey}`)
//           ) {
//             return true;
//           }
//         }
//       }
//     }

//     return globalAssignedTeachers.has(`${teacher}-${key}`);
//   };


//   const getRandomTeacherSubjectPair = (assignedWeeklyOnceTeachersSet, weeklyForAllClass, newDay, newLectureNumber) => {
//     const isExtraLecturesTeacher = Math.random() < 0.2;
//     const isWeeklyOnceTeacher = Math.random() < 0.1;

//     let randomTeacher, randomSubject, day, lecture; 
    
//     // Check if new teacher-subject pair matches the current iteration
//     if (
//       weeklyForAllClass &&
//       `${randomTeacher}-${randomSubject}` === weeklyForAllClass &&
//       day === newDay &&
//       lecture === Number(newLectureNumber)
//     ) {
//       return [randomTeacher, randomSubject];
//     }

//     if (isExtraLecturesTeacher && extraLecturesTeachers.size > 0) {
//       [randomTeacher, randomSubject] = Array.from(extraLecturesTeachers)[Math.floor(Math.random() * extraLecturesTeachers.size)].split('-');
//     } else if (isWeeklyOnceTeacher && assignedWeeklyOnceTeachersSet.size > 0) {
//       const selectedTeacherSubject = Array.from(assignedWeeklyOnceTeachersSet)[Math.floor(Math.random() * assignedWeeklyOnceTeachersSet.size)];
//       assignedWeeklyOnceTeachersSet.delete(selectedTeacherSubject);
//       [randomTeacher, randomSubject] = selectedTeacherSubject.split('-');
//     } else {
//       const randomIndex = Math.floor(Math.random() * teachers.length);
//       [randomTeacher, randomSubject] = teachers[randomIndex].split('-');
//     }

//     return [randomTeacher, randomSubject];
//   };


//   const getLecturesCountForTeacher = (teacher, day, className) => {
//     const dayTimetable = timetable[className]?.[day];
//     if (!dayTimetable) return 0;

//     let count = 0;
//     for (const lectureInfo of Object.values(dayTimetable)) {
//       if (lectureInfo.teacher === teacher) {
//         count++;
//       }
//     }

//     return count;
//   };

//   const assignedExtraLecturesTeachersCount = {};

//   classes.forEach((className) => {
//     timetable[className] = {};
//     assignedExtraLecturesTeachersCount[className] = {};
    

//     // Create a set to track assigned Weekly Once Teachers for each timetable
//     const assignedWeeklyOnceTeachersSet = new Set(weeklyOnceTeachers);

//     for (let i = 0; i < days; i++) {
//       const day = weekDays[i];
//       timetable[className][day] = {};

//       for (let lecture = 1; lecture <= (includeSaturday && day === 'Saturday' ? lectures - 2 : lectures); lecture++) {
//         let randomTeacher;
//         let randomSubject;

//         if (isweeklyForAllClassDayAndLecture(day, lecture)) {
//           [randomTeacher, randomSubject] = weeklyForAllClass.split('-');
//         } else {

//         do {
//           // Get a random teacher-subject pair considering all types of teachers
//           [randomTeacher, randomSubject] = getRandomTeacherSubjectPair(assignedWeeklyOnceTeachersSet);
//         } while (
//           isTeacherAssigned(randomTeacher, randomSubject, day, lecture, className) ||
//           getLecturesCountForTeacher(randomTeacher, day, className) >= 2 ||
//           // Ensure Extra Lectures Teachers are assigned exactly two times
//           extraLecturesTeachers.size > 0 &&
//           assignedExtraLecturesTeachersCount[className][randomTeacher] &&
//           assignedExtraLecturesTeachersCount[className][randomTeacher] >= 2
//         );
//         }

//         const key = `${day}-${lecture}`;
//         globalAssignedTeachers.add(`${randomTeacher}-${key}`);

//         timetable[className][day][`Lecture ${lecture}`] = {
//           teacher: randomTeacher,
//           subject: randomSubject,
//           isExtraLectureTeacher: extraLecturesTeachers.has(`${randomTeacher}-${randomSubject}`),
//         };

//         // Increment the count for Extra Lectures Teachers
//         if (timetable[className][day][`Lecture ${lecture}`].isExtraLectureTeacher) {
//           assignedExtraLecturesTeachersCount[className][randomTeacher] =
//             (assignedExtraLecturesTeachersCount[className][randomTeacher] || 0) + 1;
//         }
//       }
//     }
//   });


  


// //  extra teachers for all class on specific day and lecture

//   const assignedExtraTeachersCount = {};

    
//   // Function to add the extra teachers for all classes to the timetable
//   const addExtraTeachersForAllClasses = () => {
//     if (extraTeachersForAllClasses.size > 0 && newExtraTeachersDay.length > 0 && newExtraTeachersLectureNumber.length > 0) {
//       Array.from(extraTeachersForAllClasses).forEach((selectedTeacher) => {
//         const [newTeacher, newSubject] = selectedTeacher.split('-');
//         const daysArray = newExtraTeachersDay.join(',').split(',').map((day) => Number(day.trim()));
//         const lecturesArray = newExtraTeachersLectureNumber.join(',').split(',').map((lecture) => Number(lecture.trim()));

//         daysArray.forEach((day) => {
//           lecturesArray.forEach((lectureNumber) => {
//             const key = `${weekDays[day - 1]}-${lectureNumber}`;
//             globalAssignedTeachers.add(`${newTeacher}-${key}`);

//             classes.forEach((className) => {
//               timetable[className][weekDays[day - 1]][`Lecture ${lectureNumber}`] = {
//                 teacher: newTeacher,
//                 subject: newSubject,
//                 isExtraLectureTeacher: true, // Mark as extra lecture teacher
//               };

//               // Increment the count for Extra Teachers
//               assignedExtraTeachersCount[className] = assignedExtraTeachersCount[className] || {};
//               assignedExtraTeachersCount[className][newTeacher] = (assignedExtraTeachersCount[className][newTeacher] || 0) + 1;
//             });
//           });
//         });
//       });
//     }
//   };

//   // Call the function to add the extra teachers for all classes to the timetable
//   addExtraTeachersForAllClasses();
  


// //  weekly teachers for all class on particular day and lecture 


//   const addWeeklyForAllClass = () => {
//     if (weeklyForAllClass && newDay && newLectureNumber) {
//       Array.from(weeklyForAllClass).forEach((pair, index) => {
//         const [teacher, subject] = pair.split('-');
//         const key = `${weekDays[newDay[index] - 1]}-${newLectureNumber[index]}`;
//         globalAssignedTeachers.add(`${teacher}-${key}`);
  
//         classes.forEach((className) => {
//           timetable[className][weekDays[newDay[index] - 1]][`Lecture ${newLectureNumber[index]}`] = {
//             teacher,
//             subject,
//             isExtraLectureTeacher: extraLecturesTeachers.has(`${teacher}-${subject}`),
//           };
//         });
//       });
//     }
//   };
  
//   // Call the function to add the new teacher-subject pairs to the timetable
//   addWeeklyForAllClass();



// // extra teacher on two consecutive times same for all class


//   // Function to check if a specific position is already assigned by addWeeklyForAllClass or addExtraTeachersForAllClassesRandom
//   const isPositionAssigned = (teacher, day, lectureNumber, className) => {
//     const key = `${day}-${lectureNumber}`;
//     const weeklyForAllClassAssigned = weeklyForAllClass && weeklyForAllClass.some(pair => pair.startsWith(`${teacher}-`) && pair.endsWith(`-${key}`));
//     const extraTeachersAssigned = extraTeachersForAllClassesRandom && extraTeachersForAllClassesRandom.some(pair => pair.startsWith(`${teacher}-`) && pair.endsWith(`-${key}`));

//     return weeklyForAllClassAssigned || extraTeachersAssigned || globalAssignedTeachers.has(`${teacher}-${key}`);
//   };

//   // Modify addExtraTeachersForAllClassesRandom to skip positions already assigned by addWeeklyForAllClass
//   const addExtraTeachersForAllClassesRandom = (selectedTeachers, weeklyForAllClass) => {
//     if (selectedTeachers.size > 0) {
//       const shuffledTeachersPairs = Array.from(selectedTeachers)
//         .sort(() => Math.random() - 0.5);

//       shuffledTeachersPairs.forEach((pair) => {
//         const [newTeacher, newSubject] = pair.split('-');

//         if (weeklyForAllClass && weeklyForAllClass.some(pair => pair.startsWith(`${newTeacher}-`))) {
//           return; // Skip this extra teacher
//         }

//         let consecutiveAssignedCount = 0;

//         while (consecutiveAssignedCount < 2) {
//           const randomDayIndex = Math.floor(Math.random() * days);
//           let randomLectureNumber;

//           if (includeSaturday && weekDays[randomDayIndex] === 'Saturday') {
//             randomLectureNumber = Math.floor(Math.random() * (lectures / 2)) + 1;
//           } else {
//             randomLectureNumber = Math.floor(Math.random() * lectures) + 1;

//             if (randomLectureNumber === lectures) {
//               continue;
//             }
//           }

//           const key = `${weekDays[randomDayIndex]}-${randomLectureNumber}`;
//           const isPositionAvailable = !isPositionAssigned(newTeacher, weekDays[randomDayIndex], randomLectureNumber);

//           if (isPositionAvailable) {
//             for (const className of classes) {
//               globalAssignedTeachers.add(`${newTeacher}-${key}`);
//               globalAssignedTeachers.add(`${newTeacher}-${weekDays[randomDayIndex]}-${randomLectureNumber + 1}`);

//               timetable[className][weekDays[randomDayIndex]][`Lecture ${randomLectureNumber}`] = {
//                 teacher: newTeacher,
//                 subject: newSubject,
//                 isExtraLectureTeacher: true,
//               };

//               timetable[className][weekDays[randomDayIndex]][`Lecture ${randomLectureNumber + 1}`] = {
//                 teacher: newTeacher,
//                 subject: newSubject,
//                 isExtraLectureTeacher: true,
//               };

//               assignedExtraTeachersCount[className] = assignedExtraTeachersCount[className] || {};
//               assignedExtraTeachersCount[className][newTeacher] = (assignedExtraTeachersCount[className][newTeacher] || 0) + 2;
//             }

//             consecutiveAssignedCount += 2;
//           }
//         }
//       });
//     }
//   };

  
//   // Assuming `weeklyForAllClass` is an array
//   addExtraTeachersForAllClassesRandom(extraTeachersForAllClassesRandom, weeklyForAllClass);

  

// // weekly selective classes  


//   const addWeeklyTeachersForSelectedClassesRandom = (
//     weeklyTeacherForSelectedClass,
//     weeklySelectedClasses,
//     combineRemainingClasses,
//     weeklyOnceTeachers,
//     extraTeachersForAllClasses
//   ) => {
//     if (weeklyTeacherForSelectedClass && weeklySelectedClasses.length > 0) {
//       const teachersPairs = Array.from(weeklyTeacherForSelectedClass);
  
//       // Ensure that weeklyOnceTeachers is an array
//       const weeklyOnceTeachersArray = Array.isArray(weeklyOnceTeachers)
//         ? weeklyOnceTeachers
//         : [];
  
//       // Ensure that extraTeachersForAllClasses is an array
//       const extraTeachersForAllClassesArray = Array.isArray(extraTeachersForAllClasses)
//         ? extraTeachersForAllClasses
//         : [];
  
//       // Filter out the weekly teachers that collide with same-for-all-classes extra teachers or weekly once teachers
//       const filteredWeeklyTeachersPairs = teachersPairs.filter(
//         (pair) =>
//           !extraTeachersForAllClassesArray.includes(pair.trim()) &&
//           !weeklyOnceTeachersArray.includes(pair.trim())
//       );
  
//       // Shuffle the array of teachers randomly
//       const shuffledTeachersPairs = filteredWeeklyTeachersPairs
//         .map((pair) => pair.trim())
//         .sort(() => Math.random() - 0.5);
  
//       shuffledTeachersPairs.forEach((pair) => {
//         const [newTeacher, newSubject, isWeeklyOnceTeacher] = pair.split('-');
  
//         // Randomly select a day and lecture number for the first selected class
//         const firstClassIndex = Math.floor(
//           Math.random() * weeklySelectedClasses.length
//         );
//         const firstClassName = weeklySelectedClasses[firstClassIndex];
//         let randomDayIndex = Math.floor(Math.random() * days);
//         let randomLectureNumber = Math.floor(
//           Math.random() *
//             (includeSaturday && weekDays[randomDayIndex] === 'Saturday'
//               ? lectures / 2
//               : lectures)
//         ) + 1;
  
//         // Check if the teacher is already assigned to the first selected class or if the position collides with other teachers
//         let isTeacherAssignedToClass = false;
  
//         while (
//           !isTeacherAssignedToClass &&
//           (globalAssignedTeachers.has(`${newTeacher}-${weekDays[randomDayIndex]}-${randomLectureNumber}`) ||
//             timetable[firstClassName]?.[weekDays[randomDayIndex]]?.[
//               `Lecture ${randomLectureNumber}`
//             ]?.teacher === newTeacher ||
//             // Check if the position collides with an extra teacher for all classes
//             extraTeachersForAllClassesArray.some(extraTeacher => {
//               const [extraTeacherName, extraTeacherSubject, extraTeacherDay, extraTeacherLecture] = extraTeacher.split('-');
//               return (
//                 extraTeacherName === newTeacher &&
//                 extraTeacherSubject === newSubject &&
//                 extraTeacherDay === weekDays[randomDayIndex] &&
//                 extraTeacherLecture === `Lecture ${randomLectureNumber}`
//               );
//             }) ||
//             // Check if the position collides with a weekly once teacher
//             weeklyOnceTeachersArray.includes(`${newTeacher}-${newSubject}-${weekDays[randomDayIndex]}-${randomLectureNumber}`))
//         ) {
//           // Try a different day and lecture number if the position is not available
//           randomDayIndex = Math.floor(Math.random() * days);
//           randomLectureNumber = Math.floor(
//             Math.random() *
//               (includeSaturday &&
//                 weekDays[randomDayIndex] === 'Saturday'
//                 ? lectures / 2
//                 : lectures)
//           ) + 1;
//         }
  
//         // Assign the same position for all selected classes
//         for (const className of weeklySelectedClasses) {
//           const key = `${weekDays[randomDayIndex]}-${randomLectureNumber}`;
//           globalAssignedTeachers.add(`${newTeacher}-${key}`);
  
//           timetable[className][weekDays[randomDayIndex]][
//             `Lecture ${randomLectureNumber}`
//           ] = {
//             teacher: newTeacher,
//             subject: newSubject,
//             isExtraLectureTeacher: false, // Not an extra lecture teacher
//             isWeeklyOnceTeacher,
//           };
//         }
  
//         // If the checkbox for combining remaining classes is checked, assign the teacher to other unselected classes
//         if (combineRemainingClasses) {
//           const unselectedClasses = classes.filter(
//             (className) => !weeklySelectedClasses.includes(className)
//           );
  
//           // Assign the teacher to a different day and lecture for the first unselected class
//           if (unselectedClasses.length > 0) {
//             const firstUnselectedClass = unselectedClasses[0];
//             const randomUnselectedDayIndex = Math.floor(
//               Math.random() * days
//             );
//             const randomUnselectedLectureNumber = Math.floor(
//               Math.random() *
//                 (includeSaturday &&
//                   weekDays[randomUnselectedDayIndex] === 'Saturday'
//                   ? lectures / 2
//                   : lectures)
//             ) + 1;
  
//             const key = `${weekDays[randomUnselectedDayIndex]}-${randomUnselectedLectureNumber}`;
  
//             // Check if the position is available for assignment in the first unselected class
//             while (
//               globalAssignedTeachers.has(`${newTeacher}-${key}`) ||
//               timetable[firstUnselectedClass]?.[weekDays[randomUnselectedDayIndex]]?.[
//                 `Lecture ${randomUnselectedLectureNumber}`
//               ]?.teacher === newTeacher ||
//               // Check if the position collides with an extra teacher for all classes
//               extraTeachersForAllClassesArray.some(extraTeacher => {
//                 const [extraTeacherName, extraTeacherSubject, extraTeacherDay, extraTeacherLecture] = extraTeacher.split('-');
//                 return (
//                   extraTeacherName === newTeacher &&
//                   extraTeacherSubject === newSubject &&
//                   extraTeacherDay === weekDays[randomUnselectedDayIndex] &&
//                   extraTeacherLecture === `Lecture ${randomUnselectedLectureNumber}`
//                 );
//               }) ||
//               // Check if the position collides with a weekly once teacher
//               weeklyOnceTeachersArray.includes(`${newTeacher}-${newSubject}-${weekDays[randomUnselectedDayIndex]}-${randomUnselectedLectureNumber}`)
//             ) {
//               // Try a different day and lecture number if the position is not available
//               randomUnselectedDayIndex = Math.floor(Math.random() * days);
//               randomUnselectedLectureNumber = Math.floor(
//                 Math.random() *
//                   (includeSaturday &&
//                     weekDays[randomUnselectedDayIndex] === 'Saturday'
//                     ? lectures / 2
//                     : lectures)
//               ) + 1;
//             }
  
//             globalAssignedTeachers.add(`${newTeacher}-${key}`);
  
//             timetable[firstUnselectedClass][weekDays[randomUnselectedDayIndex]][
//               `Lecture ${randomUnselectedLectureNumber}`
//             ] = {
//               teacher: newTeacher,
//               subject: newSubject,
//               isExtraLectureTeacher: false, // Not an extra lecture teacher
//               isWeeklyOnceTeacher,
//             };
  
//             // Assign the same position for the remaining unselected classes
//             for (let i = 1; i < unselectedClasses.length; i++) {
//               const className = unselectedClasses[i];
//               timetable[className][weekDays[randomUnselectedDayIndex]][
//                 `Lecture ${randomUnselectedLectureNumber}`
//               ] = {
//                 teacher: newTeacher,
//                 subject: newSubject,
//                 isExtraLectureTeacher: false, // Not an extra lecture teacher
//                 isWeeklyOnceTeacher,
//               };
//             }
//           }
//         }
//       });
//     }
//   };
  
  
//   // Call the function to add the weekly teachers for selected classes randomly
//   addWeeklyTeachersForSelectedClassesRandom(
//     weeklyTeacherForSelectedClass,
//     weeklySelectedClasses,
//     combineRemainingClasses,
//     weeklyOnceTeachers, 
//     extraTeachersForAllClasses
//   );
  

//   return timetable;
// };



// const Timetable = ({ timetables }) => {
//   return (
//     <div>
//       {Object.keys(timetables).map((className) => (
//         <div key={className}>
//           <h2>{className} Timetable</h2>
//           <table className="timetable">
//             <thead>
//               <tr>
//                 <th>Day</th>
//                 {Object.keys(timetables[className]['Monday']).map((lecture) => (
//                   <th key={lecture}>{lecture}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//                 {Object.keys(timetables[className]).map((day) => (
//                     <tr key={day}>
//                       <td>{day}</td>
//                       {Object.values(timetables[className][day]).map((info, index) => (
//                         <td key={index}>
//                           {`${info.teacher}-${info.subject}`}
//                           {info.isExtraLectureTeacher && <span> </span>}
//                           {info.isWeeklyOnceTeacher && <span> (Weekly Once)</span>}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// };








// const TimeTable = () => {
//   const [days, setDays] = React.useState(6);
//   const [lectures, setLectures] = React.useState(9);
//   const [classes, setClasses] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [globalAssignedTeachers, setGlobalAssignedTeachers] = React.useState(new Set());
//   const [extraLecturesTeachers, setExtraLecturesTeachers] = React.useState(new Set());
//   const [weeklyOnceTeachers, setWeeklyOnceTeachers] = React.useState(new Set());
//   const [timetables, setTimetables] = React.useState({});
//   const [includeSaturday, setIncludeSaturday] = React.useState(true);

//   const [classList, setClassList] = useState([]); 
//   const [teacherList, setTeacherList] = useState([]); 
//   const [extraLecturesTeachersList, setExtraLecturesTeachersList] = React.useState([]);
//   const [weeklyOnceTeachersList, setWeeklyOnceTeachersList] = React.useState([]);
//   const [extraSpecificList, setExtraSpecificList ] = React.useState([]);
//   const [weeklyParticularList, setWeeklyParticularList ] = React.useState([]);
//   const [extraConsecutiveList, setExtraConsecutiveList ] = React.useState([]);
//   const [weeklySelectiveList, setWeeklySelectiveList ] = React.useState([]);



//   const [applyExtra, setApplyExtra] = React.useState('No');
//   const [extraTeachersForAllClasses, setExtraTeachersForAllClasses] = React.useState(new Set());
//   const [newExtraTeachersDay, setNewExtraTeachersDay] = React.useState([]);
//   const [newExtraTeachersLectureNumber, setNewExtraTeachersLectureNumber] = React.useState([]);


//   const [applyWeeklyOnce, setApplyWeeklyOnce] = React.useState('No');
//   const [weeklyForAllClass, setweeklyForAllClass] = React.useState(new Set());
//   const [newDay, setNewDay] = React.useState([]);
//   const [newLectureNumber, setNewLectureNumber] = React.useState([]);


//   const [appearTwoExtra, setAppearTwoExtra] = React.useState('No');
//   const [extraTeachersForAllClassesRandom, setExtraTeachersForAllClassesRandom] = React.useState(new Set());


//   const [applySelected, setApplySelected] = React.useState('No');
//   const [weeklyTeacherForSelectedClass, setWeeklyTeacherForSelectedClass] = React.useState(new Set())
//   const [weeklySelectedClasses, setWeeklySelectedClasses] = React.useState('')
//   const [combineRemainingClasses, setCombineRemainingClasses] = React.useState(false);

//   const userId = "45"; 




//   useEffect(() => {
//     const fetchClass = async () => {
//       try {
//         const result = await fetch(`http://192.168.1.39:3005/getClassSecFot_tt/${userId}`);
//         const jsonClass = await result.json();

//         setClassList(jsonClass.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchClass();
//   }, [userId]);
  
  

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`http://192.168.1.39:3005/getSubject_Teacher_tt/${userId}`);
//       const newData = await response.json();
//       setTeacherList(newData.data);
//       setExtraLecturesTeachersList(newData.data.map(teacher => ({ label: `${teacher.Teacher_Name} - ${teacher.Subject_Name}`, value: `${teacher.Teacher_Name}-${teacher.Subject_Name}` })));
//       setWeeklyOnceTeachersList(newData.data.map(teacher => ({ label: `${teacher.Teacher_Name} - ${teacher.Subject_Name}`, value: `${teacher.Teacher_Name}-${teacher.Subject_Name}` })));
//       setExtraSpecificList(newData.data.map(teacher => ({ label: `${teacher.Teacher_Name} - ${teacher.Subject_Name}`, value: `${teacher.Teacher_Name}-${teacher.Subject_Name}` })));
//       setWeeklyParticularList(newData.data.map(teacher => ({ label: `${teacher.Teacher_Name} - ${teacher.Subject_Name}`, value: `${teacher.Teacher_Name}-${teacher.Subject_Name}` })));
//       setExtraConsecutiveList(newData.data.map(teacher => ({ label: `${teacher.Teacher_Name} - ${teacher.Subject_Name}`, value: `${teacher.Teacher_Name}-${teacher.Subject_Name}` })));
//       setWeeklySelectiveList(newData.data.map(teacher => ({ label: `${teacher.Teacher_Name} - ${teacher.Subject_Name}`, value: `${teacher.Teacher_Name}-${teacher.Subject_Name}` })));

//     };
//     fetchData();
//   }, []);





//   const handleGenerateTimetable = () => {

//     const generatedTimetables = generateRandomTimetable(
//       days,
//       lectures,
//       classes.map((item) => item.value),
//       teachers.map((item) => item.value),
//       globalAssignedTeachers,
//       includeSaturday,
//       extraLecturesTeachers,
//       weeklyOnceTeachers,
//       weeklyForAllClass,
//       newDay, 
//       newLectureNumber, 
//       extraTeachersForAllClasses,
//       newExtraTeachersDay,
//       newExtraTeachersLectureNumber,
//       extraTeachersForAllClassesRandom,
//       weeklyTeacherForSelectedClass,
//       weeklySelectedClasses,
//       combineRemainingClasses,

//     );
//     setTimetables(generatedTimetables);
//   };


// // extra teacher on particular day and lecture
//   const handleNewExtraTeachersDayChange = (e, index) => {
//     const updatedNewExtraTeachersDay = [...newExtraTeachersDay];
//     updatedNewExtraTeachersDay[index] = e.target.value;
//     setNewExtraTeachersDay(updatedNewExtraTeachersDay);
//   };
  
  
//   const handleNewExtraTeachersLectureNumberChange = (e, index) => {
//     const updatedNewExtraTeachersLectureNumber = [...newExtraTeachersLectureNumber];
//     updatedNewExtraTeachersLectureNumber[index] = e.target.value;
//     setNewExtraTeachersLectureNumber(updatedNewExtraTeachersLectureNumber);
//   };


// // weekly teacher on particular day and lecture
//   const handleNewDayChange = (e, index) => {
//     const updatedNewDay = [...newDay];
//     updatedNewDay[index] = e.target.value;
//     setNewDay(updatedNewDay);
//   };

//   const handleNewLectureNumberChange = (e, index) => {
//     const updatedNewLectureNumber = [...newLectureNumber];
//     updatedNewLectureNumber[index] = e.target.value;
//     setNewLectureNumber(updatedNewLectureNumber);
//   };

//   return (
//     <div>
//       <AdminHeader />
//       <div>

//         <CContainer>
//           <Link to='/admin'>
//             <CIcon icon={cilArrowThickLeft}/> Back
//           </Link>
//           </CContainer>
//           <div className="table">
//             <label>
//               Number of Days:
//               <input
//                 type="number"
//                 value={days}
//                 onChange={(e) => {
//                   setDays(Math.min(Number(e.target.value), 6));
//                   setIncludeSaturday(e.target.value === '6');
//                 }}
//               />
//             </label>
//             <br/><br/>
//             {days === 6 && (
//               <label>
//                 Half day on Saturday :
//                 <input
//                   type="checkbox"
//                   checked={includeSaturday}
//                   onChange={(e) => setIncludeSaturday(e.target.checked)}
//                 />
//               </label>
//             )}
//             <br/><br/>
//             <label>
//               Number of Lectures:
//               <input type="number" value={lectures} onChange={(e) => setLectures(e.target.value)} />
//             </label>
//             <br/><br/>

//             <label>
//               Classes:
//               <MultiSelect
//                 options={classList.map(c => ({ label: `${c.Class_Name} - ${c.Section_Name} `, value: `${c.Class_Name}-${c.Section_Name}` }))}
//                 value={classes}
//                 onChange={setClasses}
//                 labelledBy="Select Classes"
//               />
//             </label>


//             <br/> <br/>
//             <label>
//               Teachers:
//               <MultiSelect
//                 options={teacherList.map(t => ({ label: `${t.Teacher_Name} - ${t.Subject_Name}`, value: `${t.Teacher_Name}-${t.Subject_Name}` }))} 
//                 value={teachers}
//                 onChange={setTeachers}
//                 labelledBy="Select Teachers"
//               />
//             </label>
//             <br/><br/>
//             <label>
//               Extra Lectures Teachers:
//               <MultiSelect
//                 options={extraLecturesTeachersList}
//                 value={Array.from(extraLecturesTeachersList).filter(teacher => extraLecturesTeachers.has(teacher.value))}
//                 onChange={(teachers) => setExtraLecturesTeachers(new Set(teachers.map(teacher => teacher.value)))}
//                 labelledBy="Select Extra Lectures Teachers"
//               />
//             </label>
//             <br/><br/>
//             <label>
//               Weekly Once Teachers:
//               <MultiSelect
//                 options={weeklyOnceTeachersList}
//                 value={Array.from(weeklyOnceTeachersList).filter(teacher => weeklyOnceTeachers.has(teacher.value))}
//                 onChange={(teachers) => setWeeklyOnceTeachers(new Set(teachers.map(teacher => teacher.value)))}
//                 labelledBy="Select Weekly Once Teachers"
//               />
//             </label>
//             <br/><br/>

//             <label>
//               Do You Want To Apply Extra Teachers to all classes on specific day and lecture ?
//               <div>
//                 <input
//                   type="radio"
//                   id="applyYes"
//                   name="applyExtra"
//                   value="Yes"
//                   checked={applyExtra === 'Yes'}
//                   onChange={() => setApplyExtra('Yes')}
//                 />
//                 <label htmlFor="applyYes">Yes</label>
          
//                 <input
//                   type="radio"
//                   id="applyNo"
//                   name="applyExtra"
//                   value="No"
//                   checked={applyExtra === 'No'}
//                   onChange={() => setApplyExtra('No')}
//                 />
//                 <label htmlFor="applyNo">No</label>
//               </div>
//               <br/>
//             </label>

//             {applyExtra === 'Yes' && (
//               <div>
//                 <label>
//                   Extra Teachers for All Classes:
//                   <MultiSelect
//                     options={extraSpecificList}
//                     value={Array.from(extraSpecificList).filter(teacher => extraTeachersForAllClasses.has(teacher.value))}
//                     onChange={(teachers) => setExtraTeachersForAllClasses(new Set(teachers.map(teacher => teacher.value)))}
//                     labelledBy="Select Extra Teachers for All Classes"
//                   />
//                 </label>

//                 {extraTeachersForAllClasses && (
//                   <div>
//                     <label>
//                       Days (comma-separated):
//                       <input
//                         type="text"
//                         value={newExtraTeachersDay.join(',')}
//                         onChange={(e) => setNewExtraTeachersDay(e.target.value.split(','))}
//                       />
//                     </label>
//                     <br /><br />
//                     <label>
//                       Lecture Numbers (comma-separated):
//                       <input
//                         type="text"
//                         value={newExtraTeachersLectureNumber.join(',')}
//                         onChange={(e) => setNewExtraTeachersLectureNumber(e.target.value.split(','))}
//                       />
//                     </label>
//                   </div>
//                 )}
//               </div>
//             )}
//             <br/>



//             <label>
//               Do You Want To Apply Weekly Once Teachers to all classes for particular day and lecture ?
//               <div>
//                 <input
//                   type="radio"
//                   id="applyYes"
//                   name="applyWeeklyOnce"
//                   value="Yes"
//                   checked={applyWeeklyOnce === 'Yes'}
//                   onChange={() => setApplyWeeklyOnce('Yes')}
//                 />
//                 <label htmlFor="applyYes">Yes</label>

//                 <input
//                   type="radio"
//                   id="applyNo"
//                   name="applyWeeklyOnce"
//                   value="No"
//                   checked={applyWeeklyOnce === 'No'}
//                   onChange={() => setApplyWeeklyOnce('No')}
//                 />
//                 <label htmlFor="applyNo">No</label>
//               </div>
//             </label>
//             <br/>

//             {applyWeeklyOnce === 'Yes' && (
//               <div>
//                 <label>
//                   Same for all classes Weekly Once Teacher (comma-separated Teacher-Subject):
//                   <MultiSelect
//                     options={weeklyParticularList}
//                     value={Array.from(weeklyParticularList).filter(teacher => weeklyForAllClass.has(teacher.value))}
//                     onChange={(teachers) => setweeklyForAllClass(new Set(teachers.map(teacher => teacher.value)))}
//                     labelledBy="Select Extra Teachers for All Classes"
//                   />
//                 </label>
//                 <br />
//                 {weeklyForAllClass && (
//                   <div>
//                     {Array.from(weeklyForAllClass).map((pair, index) => {
//                       const [teacher, subject] = pair.split('-');

//                       return (
//                         <div key={index}>
//                           <label>
//                             Enter Day for {teacher}-{subject}:
//                             <input
//                               type="number"
//                               value={newDay[index] || ''}
//                               onChange={(e) => handleNewDayChange(e, index)}
//                             />
//                           </label>
//                           <br />

//                           <label>
//                             Enter Lecture Number for {teacher}-{subject}:
//                             <input
//                               type="number"
//                               value={newLectureNumber[index] || ''}
//                               onChange={(e) => handleNewLectureNumberChange(e, index)}
//                             />
//                           </label>
//                           <br />
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             )}
//             <br/>
      

//             <label>
//               Do You Want Extra Teachers to appear two consecutive times for all classes   ?
//               <div>
//                 <input
//                   type="radio"
//                   id="applyYes"
//                   name="appearTwoExtra"
//                   value="Yes"
//                   checked={appearTwoExtra === 'Yes'}
//                   onChange={() => setAppearTwoExtra('Yes')}
//                 />
//                 <label htmlFor="applyYes">Yes</label>
//               {/* </div>
//               <div> */}
//                 <input
//                   type="radio"
//                   id="applyNo"
//                   name="appearTwoExtra"
//                   value="No"
//                   checked={appearTwoExtra === 'No'}
//                   onChange={() => setAppearTwoExtra('No')}
//                 />
//                 <label htmlFor="applyNo">No</label>
//               </div>
//             </label>

//             {appearTwoExtra === 'Yes' && (
//               <div>

//                 <label>
//                   Extra Teachers randomly for all classes ( comma-separated Teacher-Subject):
//                   <MultiSelect
//                     options={extraConsecutiveList}
//                     value={Array.from(extraConsecutiveList).filter(teacher => extraTeachersForAllClassesRandom.has(teacher.value))}
//                     onChange={(teachers) => setExtraTeachersForAllClassesRandom(new Set(teachers.map(teacher => teacher.value)))}
//                     labelledBy="Select Extra Teachers for All Classes"
//                   />
//                 </label>

//               </div>
//             )}
//             <br/>



//             <label>
//               Do You Want to apply Weekly Teachers to selective classes ?
//               <div>
//                 <input
//                   type="radio"
//                   id="applyYes"
//                   name="applySelected"
//                   value="Yes"
//                   checked={applySelected === 'Yes'}
//                   onChange={() => setApplySelected('Yes')}
//                 />
//                 <label htmlFor="applyYes">Yes</label>
              
//                 <input
//                   type="radio"
//                   id="applyNo"
//                   name="applySelected"
//                   value="No"
//                   checked={applySelected === 'No'}
//                   onChange={() => setApplySelected('No')}
//                 />
//                 <label htmlFor="applyNo">No</label>
//               </div>
//             </label>

//             {applySelected === 'Yes' && (
//               <div>

//                 <label>
//                   weekly teacher for selected classes randomly ( comma-separated Teacher-Subject):
//                     <MultiSelect
//                       options={weeklySelectiveList}
//                       value={Array.from(weeklySelectiveList).filter(teacher => weeklyTeacherForSelectedClass.has(teacher.value))}
//                       onChange={(teachers) => setWeeklyTeacherForSelectedClass(new Set(teachers.map(teacher => teacher.value)))}
//                       labelledBy="Select Extra Teachers for All Classes"
//                     />
//                 </label>

//                 {weeklyTeacherForSelectedClass && (
//                   <div>
//                     <label>
//                       classes to combine
//                       <select
//                         multiple
//                         value={weeklySelectedClasses}
//                         onChange={(e) => {
//                           setWeeklySelectedClasses(Array.from(e.target.selectedOptions, (option) => option.value));
//                         }}
//                       >

//                         {classes.map((item) => (
//                           <option key={item.value} value={item.value}>
//                             {item.value}
//                           </option>
//                         ))}
//                       </select>
//                     </label>

//                     {weeklySelectedClasses && (
//                       <div>
//                         <label>
//                           combine remaining classes : 
//                           <input
//                             type='checkbox'
//                             checked={combineRemainingClasses}
//                             onChange={() => setCombineRemainingClasses(!combineRemainingClasses)}
//                           />
//                         </label>
//                       </div>
//                     )}
                  
//                   </div>
//                 )}
//               </div>
//             )}

//             <br/>
//             <button onClick={handleGenerateTimetable}>Generate Timetable</button>
//             <br/>

//             <div id="download-container">
//               {Object.keys(timetables).length > 0 && <Timetable timetables={timetables} />}
//             </div>
//           </div>
        
//       </div>
//     </div>
//   );
// };

// export default TimeTable;







// doing changes with temporary backend links




import { cilArrowThickLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { Link } from 'react-router-dom';
import AdminHeader from 'src/components/admin/AdminHeader';

import { fetchClassSection, fetchClassSubTeacher } from 'src/api/APIAdmin';



// const generateRandomTimetable = (
//   days,
//   lectures,
//   classes,
//   teachers,
//   globalAssignedTeachers,
//   includeSaturday,
//   extraLecturesTeachers,
//   weeklyOnceTeachers,
//   weeklyForAllClass,  
//   newDay,  
//   newLectureNumber, 
//   extraTeachersForAllClasses,
//   newExtraTeachersDay,
//   newExtraTeachersLectureNumber,
//   extraTeachersForAllClassesRandom,
//   weeklyTeacherForSelectedClass,
//   weeklySelectedClasses,
//   combineRemainingClasses
// ) => {
//   const timetable = {};
//   const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//    // Function to check if the provided day and lecture match the weeklyForAllClass input
//    const isweeklyForAllClassDayAndLecture = (day, lecture) => {
//     return day === newDay && lecture === Number(newLectureNumber);
//   };


//   // Function to check if a teacher is already assigned to a position in other timetables
//   const isTeacherAssigned = (teacher, subject, day, lecture, className) => {
//     const key = `${day}-${lecture}`;

//     // Check if the teacher is already assigned in the same position for the given class
//     if (timetable[className]?.[day]?.[`Lecture ${lecture}`]?.teacher === teacher) {
//       return true;
//     }

//     // Iterate over all the previous timetables
//     for (const existingTimetable of Object.values(timetable)) {
//       for (const existingDay of Object.keys(existingTimetable)) {
//         for (const existingLecture of Object.keys(existingTimetable[existingDay])) {
//           const existingKey = `${existingDay}-${existingLecture}`;
//           const existingTeacher = existingTimetable[existingDay][existingLecture].teacher;
//           const existingSubject = existingTimetable[existingDay][existingLecture].subject;

//           // Check if the same teacher name is assigned to a different subject in another timetable
//           if (
//             existingTeacher.split('-')[0] === teacher &&
//             existingSubject === subject &&
//             globalAssignedTeachers.has(`${existingTeacher}-${existingKey}`)
//           ) {
//             return true;
//           }
//         }
//       }
//     }

//     return globalAssignedTeachers.has(`${teacher}-${key}`);
//   };


//   const getRandomTeacherSubjectPair = (assignedWeeklyOnceTeachersSet, weeklyForAllClass, newDay, newLectureNumber) => {
//     const isExtraLecturesTeacher = Math.random() < 0.2;
//     const isWeeklyOnceTeacher = Math.random() < 0.1;

//     let randomTeacher, randomSubject, day, lecture; 
    
//     // Check if new teacher-subject pair matches the current iteration
//     if (
//       weeklyForAllClass &&
//       `${randomTeacher}-${randomSubject}` === weeklyForAllClass &&
//       day === newDay &&
//       lecture === Number(newLectureNumber)
//     ) {
//       return [randomTeacher, randomSubject];
//     }

//     if (isExtraLecturesTeacher && extraLecturesTeachers.size > 0) {
//       [randomTeacher, randomSubject] = Array.from(extraLecturesTeachers)[Math.floor(Math.random() * extraLecturesTeachers.size)].split('-');
//     } else if (isWeeklyOnceTeacher && assignedWeeklyOnceTeachersSet.size > 0) {
//       const selectedTeacherSubject = Array.from(assignedWeeklyOnceTeachersSet)[Math.floor(Math.random() * assignedWeeklyOnceTeachersSet.size)];
//       assignedWeeklyOnceTeachersSet.delete(selectedTeacherSubject);
//       [randomTeacher, randomSubject] = selectedTeacherSubject.split('-');
//     } else {
//       const randomIndex = Math.floor(Math.random() * teachers.length);
//       [randomTeacher, randomSubject] = teachers[randomIndex].split('-');
//     }

//     return [randomTeacher, randomSubject];
//   };


//   const getLecturesCountForTeacher = (teacher, day, className) => {
//     const dayTimetable = timetable[className]?.[day];
//     if (!dayTimetable) return 0;

//     let count = 0;
//     for (const lectureInfo of Object.values(dayTimetable)) {
//       if (lectureInfo.teacher === teacher) {
//         count++;
//       }
//     }

//     return count;
//   };

//   const assignedExtraLecturesTeachersCount = {};

//   classes.forEach((className) => {
//     timetable[className] = {};
//     assignedExtraLecturesTeachersCount[className] = {};
    

//     // Create a set to track assigned Weekly Once Teachers for each timetable
//     const assignedWeeklyOnceTeachersSet = new Set(weeklyOnceTeachers);

//     for (let i = 0; i < days; i++) {
//       const day = weekDays[i];
//       timetable[className][day] = {};

//       for (let lecture = 1; lecture <= (includeSaturday && day === 'Saturday' ? lectures - 2 : lectures); lecture++) {
//         let randomTeacher;
//         let randomSubject;

//         if (isweeklyForAllClassDayAndLecture(day, lecture)) {
//           [randomTeacher, randomSubject] = weeklyForAllClass.split('-');
//         } else {

//         do {
//           // Get a random teacher-subject pair considering all types of teachers
//           [randomTeacher, randomSubject] = getRandomTeacherSubjectPair(assignedWeeklyOnceTeachersSet);
//         } while (
//           isTeacherAssigned(randomTeacher, randomSubject, day, lecture, className) ||
//           getLecturesCountForTeacher(randomTeacher, day, className) >= 2 ||
//           // Ensure Extra Lectures Teachers are assigned exactly two times
//           extraLecturesTeachers.size > 0 &&
//           assignedExtraLecturesTeachersCount[className][randomTeacher] &&
//           assignedExtraLecturesTeachersCount[className][randomTeacher] >= 2
//         );
//         }

//         const key = `${day}-${lecture}`;
//         globalAssignedTeachers.add(`${randomTeacher}-${key}`);

//         timetable[className][day][`Lecture ${lecture}`] = {
//           teacher: randomTeacher,
//           subject: randomSubject,
//           isExtraLectureTeacher: extraLecturesTeachers.has(`${randomTeacher}-${randomSubject}`),
//         };

//         // Increment the count for Extra Lectures Teachers
//         if (timetable[className][day][`Lecture ${lecture}`].isExtraLectureTeacher) {
//           assignedExtraLecturesTeachersCount[className][randomTeacher] =
//             (assignedExtraLecturesTeachersCount[className][randomTeacher] || 0) + 1;
//         }
//       }
//     }
//   });


  


// //  extra teachers for all class on specific day and lecture

//   const assignedExtraTeachersCount = {};

    
//   // Function to add the extra teachers for all classes to the timetable
//   const addExtraTeachersForAllClasses = () => {
//     if (extraTeachersForAllClasses.size > 0 && newExtraTeachersDay.length > 0 && newExtraTeachersLectureNumber.length > 0) {
//       Array.from(extraTeachersForAllClasses).forEach((selectedTeacher) => {
//         const [newTeacher, newSubject] = selectedTeacher.split('-');
//         const daysArray = newExtraTeachersDay.join(',').split(',').map((day) => Number(day.trim()));
//         const lecturesArray = newExtraTeachersLectureNumber.join(',').split(',').map((lecture) => Number(lecture.trim()));

//         daysArray.forEach((day) => {
//           lecturesArray.forEach((lectureNumber) => {
//             const key = `${weekDays[day - 1]}-${lectureNumber}`;
//             globalAssignedTeachers.add(`${newTeacher}-${key}`);

//             classes.forEach((className) => {
//               timetable[className][weekDays[day - 1]][`Lecture ${lectureNumber}`] = {
//                 teacher: newTeacher,
//                 subject: newSubject,
//                 isExtraLectureTeacher: true, // Mark as extra lecture teacher
//               };

//               // Increment the count for Extra Teachers
//               assignedExtraTeachersCount[className] = assignedExtraTeachersCount[className] || {};
//               assignedExtraTeachersCount[className][newTeacher] = (assignedExtraTeachersCount[className][newTeacher] || 0) + 1;
//             });
//           });
//         });
//       });
//     }
//   };

//   // Call the function to add the extra teachers for all classes to the timetable
//   addExtraTeachersForAllClasses();
  


// //  weekly teachers for all class on particular day and lecture 


//   const addWeeklyForAllClass = () => {
//     if (weeklyForAllClass && newDay && newLectureNumber) {
//       Array.from(weeklyForAllClass).forEach((pair, index) => {
//         const [teacher, subject] = pair.split('-');
//         const key = `${weekDays[newDay[index] - 1]}-${newLectureNumber[index]}`;
//         globalAssignedTeachers.add(`${teacher}-${key}`);
  
//         classes.forEach((className) => {
//           timetable[className][weekDays[newDay[index] - 1]][`Lecture ${newLectureNumber[index]}`] = {
//             teacher,
//             subject,
//             isExtraLectureTeacher: extraLecturesTeachers.has(`${teacher}-${subject}`),
//           };
//         });
//       });
//     }
//   };
  
//   // Call the function to add the new teacher-subject pairs to the timetable
//   addWeeklyForAllClass();



// // extra teacher on two consecutive times same for all class


//   // Function to check if a specific position is already assigned by addWeeklyForAllClass or addExtraTeachersForAllClassesRandom
//   const isPositionAssigned = (teacher, day, lectureNumber, className) => {
//     const key = `${day}-${lectureNumber}`;
//     const weeklyForAllClassAssigned = weeklyForAllClass && weeklyForAllClass.some(pair => pair.startsWith(`${teacher}-`) && pair.endsWith(`-${key}`));
//     const extraTeachersAssigned = extraTeachersForAllClassesRandom && extraTeachersForAllClassesRandom.some(pair => pair.startsWith(`${teacher}-`) && pair.endsWith(`-${key}`));

//     return weeklyForAllClassAssigned || extraTeachersAssigned || globalAssignedTeachers.has(`${teacher}-${key}`);
//   };

//   // Modify addExtraTeachersForAllClassesRandom to skip positions already assigned by addWeeklyForAllClass
//   const addExtraTeachersForAllClassesRandom = (selectedTeachers, weeklyForAllClass) => {
//     if (selectedTeachers.size > 0) {
//       const shuffledTeachersPairs = Array.from(selectedTeachers)
//         .sort(() => Math.random() - 0.5);

//       shuffledTeachersPairs.forEach((pair) => {
//         const [newTeacher, newSubject] = pair.split('-');

//         if (weeklyForAllClass && weeklyForAllClass.some(pair => pair.startsWith(`${newTeacher}-`))) {
//           return; // Skip this extra teacher
//         }

//         let consecutiveAssignedCount = 0;

//         while (consecutiveAssignedCount < 2) {
//           const randomDayIndex = Math.floor(Math.random() * days);
//           let randomLectureNumber;

//           if (includeSaturday && weekDays[randomDayIndex] === 'Saturday') {
//             randomLectureNumber = Math.floor(Math.random() * (lectures / 2)) + 1;
//           } else {
//             randomLectureNumber = Math.floor(Math.random() * lectures) + 1;

//             if (randomLectureNumber === lectures) {
//               continue;
//             }
//           }

//           const key = `${weekDays[randomDayIndex]}-${randomLectureNumber}`;
//           const isPositionAvailable = !isPositionAssigned(newTeacher, weekDays[randomDayIndex], randomLectureNumber);

//           if (isPositionAvailable) {
//             for (const className of classes) {
//               globalAssignedTeachers.add(`${newTeacher}-${key}`);
//               globalAssignedTeachers.add(`${newTeacher}-${weekDays[randomDayIndex]}-${randomLectureNumber + 1}`);

//               timetable[className][weekDays[randomDayIndex]][`Lecture ${randomLectureNumber}`] = {
//                 teacher: newTeacher,
//                 subject: newSubject,
//                 isExtraLectureTeacher: true,
//               };

//               timetable[className][weekDays[randomDayIndex]][`Lecture ${randomLectureNumber + 1}`] = {
//                 teacher: newTeacher,
//                 subject: newSubject,
//                 isExtraLectureTeacher: true,
//               };

//               assignedExtraTeachersCount[className] = assignedExtraTeachersCount[className] || {};
//               assignedExtraTeachersCount[className][newTeacher] = (assignedExtraTeachersCount[className][newTeacher] || 0) + 2;
//             }

//             consecutiveAssignedCount += 2;
//           }
//         }
//       });
//     }
//   };

  
//   // Assuming `weeklyForAllClass` is an array
//   addExtraTeachersForAllClassesRandom(extraTeachersForAllClassesRandom, weeklyForAllClass);

  

// // weekly selective classes  


//   const addWeeklyTeachersForSelectedClassesRandom = (
//     weeklyTeacherForSelectedClass,
//     weeklySelectedClasses,
//     combineRemainingClasses,
//     weeklyOnceTeachers,
//     extraTeachersForAllClasses
//   ) => {
//     if (weeklyTeacherForSelectedClass && weeklySelectedClasses.length > 0) {
//       const teachersPairs = Array.from(weeklyTeacherForSelectedClass);
  
//       // Ensure that weeklyOnceTeachers is an array
//       const weeklyOnceTeachersArray = Array.isArray(weeklyOnceTeachers)
//         ? weeklyOnceTeachers
//         : [];
  
//       // Ensure that extraTeachersForAllClasses is an array
//       const extraTeachersForAllClassesArray = Array.isArray(extraTeachersForAllClasses)
//         ? extraTeachersForAllClasses
//         : [];
  
//       // Filter out the weekly teachers that collide with same-for-all-classes extra teachers or weekly once teachers
//       const filteredWeeklyTeachersPairs = teachersPairs.filter(
//         (pair) =>
//           !extraTeachersForAllClassesArray.includes(pair.trim()) &&
//           !weeklyOnceTeachersArray.includes(pair.trim())
//       );
  
//       // Shuffle the array of teachers randomly
//       const shuffledTeachersPairs = filteredWeeklyTeachersPairs
//         .map((pair) => pair.trim())
//         .sort(() => Math.random() - 0.5);
  
//       shuffledTeachersPairs.forEach((pair) => {
//         const [newTeacher, newSubject, isWeeklyOnceTeacher] = pair.split('-');
  
//         // Randomly select a day and lecture number for the first selected class
//         const firstClassIndex = Math.floor(
//           Math.random() * weeklySelectedClasses.length
//         );
//         const firstClassName = weeklySelectedClasses[firstClassIndex];
//         let randomDayIndex = Math.floor(Math.random() * days);
//         let randomLectureNumber = Math.floor(
//           Math.random() *
//             (includeSaturday && weekDays[randomDayIndex] === 'Saturday'
//               ? lectures / 2
//               : lectures)
//         ) + 1;
  
//         // Check if the teacher is already assigned to the first selected class or if the position collides with other teachers
//         let isTeacherAssignedToClass = false;
  
//         while (
//           !isTeacherAssignedToClass &&
//           (globalAssignedTeachers.has(`${newTeacher}-${weekDays[randomDayIndex]}-${randomLectureNumber}`) ||
//             timetable[firstClassName]?.[weekDays[randomDayIndex]]?.[
//               `Lecture ${randomLectureNumber}`
//             ]?.teacher === newTeacher ||
//             // Check if the position collides with an extra teacher for all classes
//             extraTeachersForAllClassesArray.some(extraTeacher => {
//               const [extraTeacherName, extraTeacherSubject, extraTeacherDay, extraTeacherLecture] = extraTeacher.split('-');
//               return (
//                 extraTeacherName === newTeacher &&
//                 extraTeacherSubject === newSubject &&
//                 extraTeacherDay === weekDays[randomDayIndex] &&
//                 extraTeacherLecture === `Lecture ${randomLectureNumber}`
//               );
//             }) ||
//             // Check if the position collides with a weekly once teacher
//             weeklyOnceTeachersArray.includes(`${newTeacher}-${newSubject}-${weekDays[randomDayIndex]}-${randomLectureNumber}`))
//         ) {
//           // Try a different day and lecture number if the position is not available
//           randomDayIndex = Math.floor(Math.random() * days);
//           randomLectureNumber = Math.floor(
//             Math.random() *
//               (includeSaturday &&
//                 weekDays[randomDayIndex] === 'Saturday'
//                 ? lectures / 2
//                 : lectures)
//           ) + 1;
//         }
  
//         // Assign the same position for all selected classes
//         for (const className of weeklySelectedClasses) {
//           const key = `${weekDays[randomDayIndex]}-${randomLectureNumber}`;
//           globalAssignedTeachers.add(`${newTeacher}-${key}`);
  
//           timetable[className][weekDays[randomDayIndex]][
//             `Lecture ${randomLectureNumber}`
//           ] = {
//             teacher: newTeacher,
//             subject: newSubject,
//             isExtraLectureTeacher: false, // Not an extra lecture teacher
//             isWeeklyOnceTeacher,
//           };
//         }
  
//         // If the checkbox for combining remaining classes is checked, assign the teacher to other unselected classes
//         if (combineRemainingClasses) {
//           const unselectedClasses = classes.filter(
//             (className) => !weeklySelectedClasses.includes(className)
//           );
  
//           // Assign the teacher to a different day and lecture for the first unselected class
//           if (unselectedClasses.length > 0) {
//             const firstUnselectedClass = unselectedClasses[0];
//             const randomUnselectedDayIndex = Math.floor(
//               Math.random() * days
//             );
//             const randomUnselectedLectureNumber = Math.floor(
//               Math.random() *
//                 (includeSaturday &&
//                   weekDays[randomUnselectedDayIndex] === 'Saturday'
//                   ? lectures / 2
//                   : lectures)
//             ) + 1;
  
//             const key = `${weekDays[randomUnselectedDayIndex]}-${randomUnselectedLectureNumber}`;
  
//             // Check if the position is available for assignment in the first unselected class
//             while (
//               globalAssignedTeachers.has(`${newTeacher}-${key}`) ||
//               timetable[firstUnselectedClass]?.[weekDays[randomUnselectedDayIndex]]?.[
//                 `Lecture ${randomUnselectedLectureNumber}`
//               ]?.teacher === newTeacher ||
//               // Check if the position collides with an extra teacher for all classes
//               extraTeachersForAllClassesArray.some(extraTeacher => {
//                 const [extraTeacherName, extraTeacherSubject, extraTeacherDay, extraTeacherLecture] = extraTeacher.split('-');
//                 return (
//                   extraTeacherName === newTeacher &&
//                   extraTeacherSubject === newSubject &&
//                   extraTeacherDay === weekDays[randomUnselectedDayIndex] &&
//                   extraTeacherLecture === `Lecture ${randomUnselectedLectureNumber}`
//                 );
//               }) ||
//               // Check if the position collides with a weekly once teacher
//               weeklyOnceTeachersArray.includes(`${newTeacher}-${newSubject}-${weekDays[randomUnselectedDayIndex]}-${randomUnselectedLectureNumber}`)
//             ) {
//               // Try a different day and lecture number if the position is not available
//               randomUnselectedDayIndex = Math.floor(Math.random() * days);
//               randomUnselectedLectureNumber = Math.floor(
//                 Math.random() *
//                   (includeSaturday &&
//                     weekDays[randomUnselectedDayIndex] === 'Saturday'
//                     ? lectures / 2
//                     : lectures)
//               ) + 1;
//             }
  
//             globalAssignedTeachers.add(`${newTeacher}-${key}`);
  
//             timetable[firstUnselectedClass][weekDays[randomUnselectedDayIndex]][
//               `Lecture ${randomUnselectedLectureNumber}`
//             ] = {
//               teacher: newTeacher,
//               subject: newSubject,
//               isExtraLectureTeacher: false, // Not an extra lecture teacher
//               isWeeklyOnceTeacher,
//             };
  
//             // Assign the same position for the remaining unselected classes
//             for (let i = 1; i < unselectedClasses.length; i++) {
//               const className = unselectedClasses[i];
//               timetable[className][weekDays[randomUnselectedDayIndex]][
//                 `Lecture ${randomUnselectedLectureNumber}`
//               ] = {
//                 teacher: newTeacher,
//                 subject: newSubject,
//                 isExtraLectureTeacher: false, // Not an extra lecture teacher
//                 isWeeklyOnceTeacher,
//               };
//             }
//           }
//         }
//       });
//     }
//   };
  
  
//   // Call the function to add the weekly teachers for selected classes randomly
//   addWeeklyTeachersForSelectedClassesRandom(
//     weeklyTeacherForSelectedClass,
//     weeklySelectedClasses,
//     combineRemainingClasses,
//     weeklyOnceTeachers, 
//     extraTeachersForAllClasses
//   );
  

//   return timetable;
// };





const generateRandomTimetable = (
  days,
  lectures,
  classes,
  teachers,
  globalAssignedTeachers,
  includeSaturday,
  extraLecturesTeachers,
  weeklyOnceTeachers,
  weeklyForAllClass,  
  newDay,  
  newLectureNumber, 
  extraTeachersForAllClasses,
  newExtraTeachersDay,
  newExtraTeachersLectureNumber,
  extraTeachersForAllClassesRandom,
  weeklyTeacherForSelectedClass,
  weeklySelectedClasses,
  combineRemainingClasses
) => {
  const timetable = {};
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const isWeeklyForAllClassDayAndLecture = (day, lecture) => day === newDay && lecture === Number(newLectureNumber);

  const isTeacherAssigned = (teacher, subject, day, lecture, className) => {
    const key = `${day}-${lecture}`;

    if (timetable[className]?.[day]?.[`Lecture ${lecture}`]?.teacher === teacher) return true;

    for (const existingTimetable of Object.values(timetable)) {
      for (const existingDay of Object.keys(existingTimetable)) {
        for (const existingLecture of Object.keys(existingTimetable[existingDay])) {
          const existingKey = `${existingDay}-${existingLecture}`;
          const existingTeacher = existingTimetable[existingDay][existingLecture].teacher;
          const existingSubject = existingTimetable[existingDay][existingLecture].subject;

          if (existingTeacher.split('-')[0] === teacher && existingSubject === subject && globalAssignedTeachers.has(`${existingTeacher}-${existingKey}`)) {
            return true;
          }
        }
      }
    }

    return globalAssignedTeachers.has(`${teacher}-${key}`);
  };

  const getRandomTeacherSubjectPair = (assignedWeeklyOnceTeachersSet) => {
    const isExtraLecturesTeacher = Math.random() < 0.2;
    const isWeeklyOnceTeacher = Math.random() < 0.1;

    let randomTeacher, randomSubject;

    if (isExtraLecturesTeacher && extraLecturesTeachers.size > 0) {
      [randomTeacher, randomSubject] = Array.from(extraLecturesTeachers)[Math.floor(Math.random() * extraLecturesTeachers.size)].split('-');
    } else if (isWeeklyOnceTeacher && assignedWeeklyOnceTeachersSet.size > 0) {
      const selectedTeacherSubject = Array.from(assignedWeeklyOnceTeachersSet)[Math.floor(Math.random() * assignedWeeklyOnceTeachersSet.size)];
      assignedWeeklyOnceTeachersSet.delete(selectedTeacherSubject);
      [randomTeacher, randomSubject] = selectedTeacherSubject.split('-');
    } else {
      const randomIndex = Math.floor(Math.random() * teachers.length);
      [randomTeacher, randomSubject] = teachers[randomIndex].split('-');
    }

    return [randomTeacher, randomSubject];
  };

  const getLecturesCountForTeacher = (teacher, day, className) => {
    const dayTimetable = timetable[className]?.[day];
    if (!dayTimetable) return 0;

    return Object.values(dayTimetable).reduce((count, lectureInfo) => {
      return lectureInfo.teacher === teacher ? count + 1 : count;
    }, 0);
  };

  const assignedExtraLecturesTeachersCount = {};

  classes.forEach((className) => {
    timetable[className] = {};
    assignedExtraLecturesTeachersCount[className] = {};

    const assignedWeeklyOnceTeachersSet = new Set(weeklyOnceTeachers);

    for (let i = 0; i < days; i++) {
      const day = weekDays[i];
      timetable[className][day] = {};

      for (let lecture = 1; lecture <= (includeSaturday && day === 'Saturday' ? lectures - 2 : lectures); lecture++) {
        let randomTeacher, randomSubject;

        if (isWeeklyForAllClassDayAndLecture(day, lecture)) {
          [randomTeacher, randomSubject] = weeklyForAllClass.split('-');
        } else {
          do {
            [randomTeacher, randomSubject] = getRandomTeacherSubjectPair(assignedWeeklyOnceTeachersSet);
          } while (
            isTeacherAssigned(randomTeacher, randomSubject, day, lecture, className) ||
            getLecturesCountForTeacher(randomTeacher, day, className) >= 2 ||
            (extraLecturesTeachers.size > 0 &&
              assignedExtraLecturesTeachersCount[className][randomTeacher] &&
              assignedExtraLecturesTeachersCount[className][randomTeacher] >= 2)
          );
        }

        const key = `${day}-${lecture}`;
        globalAssignedTeachers.add(`${randomTeacher}-${key}`);

        timetable[className][day][`Lecture ${lecture}`] = {
          teacher: randomTeacher,
          subject: randomSubject,
          isExtraLectureTeacher: extraLecturesTeachers.has(`${randomTeacher}-${randomSubject}`),
        };

        if (timetable[className][day][`Lecture ${lecture}`].isExtraLectureTeacher) {
          assignedExtraLecturesTeachersCount[className][randomTeacher] =
            (assignedExtraLecturesTeachersCount[className][randomTeacher] || 0) + 1;
        }
      }
    }
  });

  const assignedExtraTeachersCount = {};

  const addExtraTeachersForAllClasses = () => {
    if (extraTeachersForAllClasses.size > 0 && newExtraTeachersDay.length > 0 && newExtraTeachersLectureNumber.length > 0) {
      Array.from(extraTeachersForAllClasses).forEach((selectedTeacher) => {
        const [newTeacher, newSubject] = selectedTeacher.split('-');
        const daysArray = newExtraTeachersDay.join(',').split(',').map((day) => Number(day.trim()));
        const lecturesArray = newExtraTeachersLectureNumber.join(',').split(',').map((lecture) => Number(lecture.trim()));

        daysArray.forEach((day) => {
          lecturesArray.forEach((lectureNumber) => {
            const key = `${weekDays[day - 1]}-${lectureNumber}`;
            globalAssignedTeachers.add(`${newTeacher}-${key}`);

            classes.forEach((className) => {
              timetable[className][weekDays[day - 1]][`Lecture ${lectureNumber}`] = {
                teacher: newTeacher,
                subject: newSubject,
                isExtraLectureTeacher: true,
              };

              assignedExtraTeachersCount[className] = assignedExtraTeachersCount[className] || {};
              assignedExtraTeachersCount[className][newTeacher] = (assignedExtraTeachersCount[className][newTeacher] || 0) + 1;
            });
          });
        });
      });
    }
  };

  addExtraTeachersForAllClasses();

  const addWeeklyForAllClass = () => {
    if (weeklyForAllClass && newDay && newLectureNumber) {
      Array.from(weeklyForAllClass).forEach((pair, index) => {
        const [teacher, subject] = pair.split('-');
        const key = `${weekDays[newDay[index] - 1]}-${newLectureNumber[index]}`;
        globalAssignedTeachers.add(`${teacher}-${key}`);

        classes.forEach((className) => {
          timetable[className][weekDays[newDay[index] - 1]][`Lecture ${newLectureNumber[index]}`] = {
            teacher,
            subject,
            isExtraLectureTeacher: extraLecturesTeachers.has(`${teacher}-${subject}`),
          };
        });
      });
    }
  };

  addWeeklyForAllClass();

  const isPositionAssigned = (teacher, day, lectureNumber, className) => {
    const key = `${day}-${lectureNumber}`;
    const weeklyForAllClassAssigned = weeklyForAllClass && weeklyForAllClass.some(pair => pair.startsWith(`${teacher}-`) && pair.endsWith(`-${key}`));
    const extraTeachersAssigned = extraTeachersForAllClassesRandom && extraTeachersForAllClassesRandom.some(pair => pair.startsWith(`${teacher}-`) && pair.endsWith(`-${key}`));

    return weeklyForAllClassAssigned || extraTeachersAssigned || globalAssignedTeachers.has(`${teacher}-${key}`);
  };

  const addExtraTeachersForAllClassesRandom = (selectedTeachers) => {
    if (selectedTeachers.size > 0) {
      const shuffledTeachersPairs = Array.from(selectedTeachers)
        .sort(() => Math.random() - 0.5);

      shuffledTeachersPairs.forEach((pair) => {
        const [newTeacher, newSubject] = pair.split('-');

        if (weeklyForAllClass && weeklyForAllClass.some(pair => pair.startsWith(`${newTeacher}-`))) {
          return;
        }

        let consecutiveAssignedCount = 0;

        while (consecutiveAssignedCount < 2) {
          const randomDayIndex = Math.floor(Math.random() * days);
          let randomLectureNumber;

          if (includeSaturday && weekDays[randomDayIndex] === 'Saturday') {
            randomLectureNumber = Math.floor(Math.random() * (lectures / 2)) + 1;
          } else {
            randomLectureNumber = Math.floor(Math.random() * lectures) + 1;

            if (randomLectureNumber === lectures) {
              continue;
            }
          }

          const key = `${weekDays[randomDayIndex]}-${randomLectureNumber}`;
          const isPositionAvailable = !isPositionAssigned(newTeacher, weekDays[randomDayIndex], randomLectureNumber);

          if (isPositionAvailable) {
            for (const className of classes) {
              globalAssignedTeachers.add(`${newTeacher}-${key}`);
              globalAssignedTeachers.add(`${newTeacher}-${weekDays[randomDayIndex]}-${randomLectureNumber + 1}`);

              timetable[className][weekDays[randomDayIndex]][`Lecture ${randomLectureNumber}`] = {
                teacher: newTeacher,
                subject: newSubject,
                isExtraLectureTeacher: true,
              };

              timetable[className][weekDays[randomDayIndex]][`Lecture ${randomLectureNumber + 1}`] = {
                teacher: newTeacher,
                subject: newSubject,
                isExtraLectureTeacher: true,
              };

              assignedExtraTeachersCount[className] = assignedExtraTeachersCount[className] || {};
              assignedExtraTeachersCount[className][newTeacher] = (assignedExtraTeachersCount[className][newTeacher] || 0) + 2;
            }

            consecutiveAssignedCount += 2;
          }
        }
      });
    }
  };

  addExtraTeachersForAllClassesRandom(extraTeachersForAllClassesRandom);

  const addWeeklyTeachersForSelectedClassesRandom = (
    weeklyTeacherForSelectedClass,
    weeklySelectedClasses,
    combineRemainingClasses,
    weeklyOnceTeachers,
    extraTeachersForAllClasses
  ) => {
    if (weeklyTeacherForSelectedClass && weeklySelectedClasses.length > 0) {
      const teachersPairs = Array.from(weeklyTeacherForSelectedClass);
      const weeklyOnceTeachersArray = Array.isArray(weeklyOnceTeachers) ? weeklyOnceTeachers : [];
      const extraTeachersForAllClassesArray = Array.isArray(extraTeachersForAllClasses) ? extraTeachersForAllClasses : [];
      const filteredWeeklyTeachersPairs = teachersPairs.filter(
        (pair) =>
          !extraTeachersForAllClassesArray.includes(pair.trim()) &&
          !weeklyOnceTeachersArray.includes(pair.trim())
      );

      const shuffledTeachersPairs = filteredWeeklyTeachersPairs
        .map((pair) => pair.trim())
        .sort(() => Math.random() - 0.5);

      shuffledTeachersPairs.forEach((pair) => {
        const [newTeacher, newSubject, isWeeklyOnceTeacher] = pair.split('-');
        const firstClassIndex = Math.floor(Math.random() * weeklySelectedClasses.length);
        const firstClassName = weeklySelectedClasses[firstClassIndex];
        let randomDayIndex = Math.floor(Math.random() * days);
        let randomLectureNumber = Math.floor(
          Math.random() *
            (includeSaturday && weekDays[randomDayIndex] === 'Saturday'
              ? lectures / 2
              : lectures)
        ) + 1;

        let isTeacherAssignedToClass = false;

        while (
          !isTeacherAssignedToClass &&
          (globalAssignedTeachers.has(`${newTeacher}-${weekDays[randomDayIndex]}-${randomLectureNumber}`) ||
            timetable[firstClassName]?.[weekDays[randomDayIndex]]?.[
              `Lecture ${randomLectureNumber}`
            ]?.teacher === newTeacher ||
            extraTeachersForAllClassesArray.some(extraTeacher => {
              const [extraTeacherName, extraTeacherSubject, extraTeacherDay, extraTeacherLecture] = extraTeacher.split('-');
              return (
                extraTeacherName === newTeacher &&
                extraTeacherSubject === newSubject &&
                extraTeacherDay === weekDays[randomDayIndex] &&
                extraTeacherLecture === `Lecture ${randomLectureNumber}`
              );
            }) ||
            weeklyOnceTeachersArray.includes(`${newTeacher}-${newSubject}-${weekDays[randomDayIndex]}-${randomLectureNumber}`))
        ) {
          randomDayIndex = Math.floor(Math.random() * days);
          randomLectureNumber = Math.floor(
            Math.random() *
              (includeSaturday &&
                weekDays[randomDayIndex] === 'Saturday'
                ? lectures / 2
                : lectures)
          ) + 1;
        }

        for (const className of weeklySelectedClasses) {
          const key = `${weekDays[randomDayIndex]}-${randomLectureNumber}`;
          globalAssignedTeachers.add(`${newTeacher}-${key}`);

          timetable[className][weekDays[randomDayIndex]][
            `Lecture ${randomLectureNumber}`
          ] = {
            teacher: newTeacher,
            subject: newSubject,
            isExtraLectureTeacher: false,
            isWeeklyOnceTeacher,
          };
        }

        if (combineRemainingClasses) {
          const unselectedClasses = classes.filter(
            (className) => !weeklySelectedClasses.includes(className)
          );

          if (unselectedClasses.length > 0) {
            const firstUnselectedClass = unselectedClasses[0];
            const randomUnselectedDayIndex = Math.floor(Math.random() * days);
            let randomUnselectedLectureNumber = Math.floor(
              Math.random() *
                (includeSaturday &&
                  weekDays[randomUnselectedDayIndex] === 'Saturday'
                  ? lectures / 2
                  : lectures)
            ) + 1;

            let key = `${weekDays[randomUnselectedDayIndex]}-${randomUnselectedLectureNumber}`;

            while (
              globalAssignedTeachers.has(`${newTeacher}-${key}`) ||
              timetable[firstUnselectedClass]?.[weekDays[randomUnselectedDayIndex]]?.[
                `Lecture ${randomUnselectedLectureNumber}`
              ]?.teacher === newTeacher ||
              extraTeachersForAllClassesArray.some(extraTeacher => {
                const [extraTeacherName, extraTeacherSubject, extraTeacherDay, extraTeacherLecture] = extraTeacher.split('-');
                return (
                  extraTeacherName === newTeacher &&
                  extraTeacherSubject === newSubject &&
                  extraTeacherDay === weekDays[randomUnselectedDayIndex] &&
                  extraTeacherLecture === `Lecture ${randomUnselectedLectureNumber}`
                );
              }) ||
              weeklyOnceTeachersArray.includes(`${newTeacher}-${newSubject}-${weekDays[randomUnselectedDayIndex]}-${randomUnselectedLectureNumber}`)
            ) {
              randomUnselectedLectureNumber = Math.floor(
                Math.random() *
                  (includeSaturday &&
                    weekDays[randomUnselectedDayIndex] === 'Saturday'
                    ? lectures / 2
                    : lectures)
              ) + 1;

              key = `${weekDays[randomUnselectedDayIndex]}-${randomUnselectedLectureNumber}`;
            }

            globalAssignedTeachers.add(`${newTeacher}-${key}`);

            timetable[firstUnselectedClass][weekDays[randomUnselectedDayIndex]][
              `Lecture ${randomUnselectedLectureNumber}`
            ] = {
              teacher: newTeacher,
              subject: newSubject,
              isExtraLectureTeacher: false,
              isWeeklyOnceTeacher,
            };

            for (let i = 1; i < unselectedClasses.length; i++) {
              const className = unselectedClasses[i];
              timetable[className][weekDays[randomUnselectedDayIndex]][
                `Lecture ${randomUnselectedLectureNumber}`
              ] = {
                teacher: newTeacher,
                subject: newSubject,
                isExtraLectureTeacher: false,
                isWeeklyOnceTeacher,
              };
            }
          }
        }
      });
    }
  };

  addWeeklyTeachersForSelectedClassesRandom(
    weeklyTeacherForSelectedClass,
    weeklySelectedClasses,
    combineRemainingClasses,
    weeklyOnceTeachers, 
    extraTeachersForAllClasses
  );

  return timetable;
};







const Timetable = ({ timetables, timingAllLectures, showAssembly, lunchAfterPeriod, timeAssemble, timeLunch }) => {
  return (
    <div>
      {Object.keys(timetables).map((className) => (
        <div key={className}>
          <h2>{className} Timetable</h2>
          <table className="timetable">
            <thead>
              <tr>
                <th>Day</th>
                {showAssembly && 
                  <th>
                    <div>Assembly</div>
                    {timeAssemble && <div>({timeAssemble} minutes)</div>}
                  </th>
                }
                {Object.keys(timetables[className]['Monday']).map((lecture) => (
                  <React.Fragment key={lecture}>
                    <th>
                      <div key={lecture}>{lecture}</div>
                      {timingAllLectures && <div>({timingAllLectures} minutes)</div>}

                    </th>
                    {parseInt(lecture.split(' ')[1]) === parseInt(lunchAfterPeriod) && (
                      <th>
                        <div key={`lunch-${lecture}`}>Lunch</div>
                        {timeLunch && <div>({timeLunch} minutes)</div>}
                      </th>
                    )}
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(timetables[className]).map((day) => (
                <tr key={day}>
                  <td>{day}</td>
                  {showAssembly && (
                    <td>
                      {timetables[className][day].assembly
                        ? timetables[className][day].assembly.teacher
                        : 'Assembly'}
                    </td>
                  )}
                  {Object.keys(timetables[className][day]).map((lecture) => (
                    <React.Fragment key={lecture}>
                      <td>
                        {`${timetables[className][day][lecture].teacher}-${timetables[className][day][lecture].subject}`}
                        {timetables[className][day][lecture].isExtraLectureTeacher && <span> </span>}
                        {timetables[className][day][lecture].isWeeklyOnceTeacher && <span> (Weekly Once)</span>}
                      </td>
                      {parseInt(lecture.split(' ')[1]) === parseInt(lunchAfterPeriod) && (
                        <td key={`lunch-${lecture}`}>Lunch</td>
                      )}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};










const TimeTable = () => {
  const [days, setDays] = React.useState(6);
  const [lectures, setLectures] = React.useState(9);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [globalAssignedTeachers, setGlobalAssignedTeachers] = React.useState(new Set());
  const [extraLecturesTeachers, setExtraLecturesTeachers] = React.useState(new Set());
  const [weeklyOnceTeachers, setWeeklyOnceTeachers] = React.useState(new Set());
  const [timetables, setTimetables] = React.useState({});
  const [includeSaturday, setIncludeSaturday] = React.useState(true);

  const [classList, setClassList] = useState([]); 
  const [teacherList, setTeacherList] = useState([]); 
  const [extraLecturesTeachersList, setExtraLecturesTeachersList] = React.useState([]);
  const [weeklyOnceTeachersList, setWeeklyOnceTeachersList] = React.useState([]);
  const [extraSpecificList, setExtraSpecificList ] = React.useState([]);
  const [weeklyParticularList, setWeeklyParticularList ] = React.useState([]);
  const [extraConsecutiveList, setExtraConsecutiveList ] = React.useState([]);
  const [weeklySelectiveList, setWeeklySelectiveList ] = React.useState([]);



  const [applyExtra, setApplyExtra] = React.useState('No');
  const [extraTeachersForAllClasses, setExtraTeachersForAllClasses] = React.useState(new Set());
  const [newExtraTeachersDay, setNewExtraTeachersDay] = React.useState([]);
  const [newExtraTeachersLectureNumber, setNewExtraTeachersLectureNumber] = React.useState([]);


  const [applyWeeklyOnce, setApplyWeeklyOnce] = React.useState('No');
  const [weeklyForAllClass, setweeklyForAllClass] = React.useState(new Set());
  const [newDay, setNewDay] = React.useState([]);
  const [newLectureNumber, setNewLectureNumber] = React.useState([]);


  const [appearTwoExtra, setAppearTwoExtra] = React.useState('No');
  const [extraTeachersForAllClassesRandom, setExtraTeachersForAllClassesRandom] = React.useState(new Set());


  const [applySelected, setApplySelected] = React.useState('No');
  const [weeklyTeacherForSelectedClass, setWeeklyTeacherForSelectedClass] = React.useState(new Set())
  const [weeklySelectedClasses, setWeeklySelectedClasses] = React.useState('')
  const [combineRemainingClasses, setCombineRemainingClasses] = React.useState(false);

  const [timingAllLectures, setTimingAllLectures] = useState(); 

  const [lunchAfterPeriod, setLunchAfterPeriod] = useState();
  const [timeLunch, setTimeLunch] = useState();

  const [assembly, setAssembly] = React.useState();
  const [timeAssemble, setTimeAssemble] = React.useState();


  const userId = "45"; 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedClassSection = await fetchClassSection(); 
        setClassList(fetchedClassSection.data);
      } catch (error) {
        console.log('Error fetching class section');
      }
    };

    fetchData();
  }, []);
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await fetchClassSubTeacher(); 
        setTeacherList(newData.data);
        setExtraLecturesTeachersList(newData.data.map(teacher => ({ label: `${teacher.info[0].Teacher_Name} - ${teacher.info[0].Subject_Name}`, value: `${teacher.info[0].Teacher_Name}-${teacher.info[0].Subject_Name}` })));
        setWeeklyOnceTeachersList(newData.data.map(teacher => ({ label: `${teacher.info[0].Teacher_Name} - ${teacher.info[0].Subject_Name}`, value: `${teacher.info[0].Teacher_Name}-${teacher.info[0].Subject_Name}` })));
        setExtraSpecificList(newData.data.map(teacher => ({ label: `${teacher.info[0].Teacher_Name} - ${teacher.info[0].Subject_Name}`, value: `${teacher.info[0].Teacher_Name}-${teacher.info[0].Subject_Name}` })));
        setWeeklyParticularList(newData.data.map(teacher => ({ label: `${teacher.info[0].Teacher_Name} - ${teacher.info[0].Subject_Name}`, value: `${teacher.info[0].Teacher_Name}-${teacher.info[0].Subject_Name}` })));
        setExtraConsecutiveList(newData.data.map(teacher => ({ label: `${teacher.info[0].Teacher_Name} - ${teacher.info[0].Subject_Name}`, value: `${teacher.info[0].Teacher_Name}-${teacher.info[0].Subject_Name}` })));
        setWeeklySelectiveList(newData.data.map(teacher => ({ label: `${teacher.info[0].Teacher_Name} - ${teacher.info[0].Subject_Name}`, value: `${teacher.info[0].Teacher_Name}-${teacher.info[0].Subject_Name}` })));
      } catch (error) {
        console.log('Error fetching Subject Teacher data');
      }
    };

    fetchData();
  }, []);
  



  const handleGenerateTimetable = () => {

    const generatedTimetables = generateRandomTimetable(
      days,
      lectures,
      classes.map((item) => item.value),
      teachers.map((item) => item.value),
      globalAssignedTeachers,
      includeSaturday,
      extraLecturesTeachers,
      weeklyOnceTeachers,
      weeklyForAllClass,
      newDay, 
      newLectureNumber, 
      extraTeachersForAllClasses,
      newExtraTeachersDay,
      newExtraTeachersLectureNumber,
      extraTeachersForAllClassesRandom,
      weeklyTeacherForSelectedClass,
      weeklySelectedClasses,
      combineRemainingClasses,
    );
    setTimetables(generatedTimetables);
  };


// extra teacher on particular day and lecture
  const handleNewExtraTeachersDayChange = (e, index) => {
    const updatedNewExtraTeachersDay = [...newExtraTeachersDay];
    updatedNewExtraTeachersDay[index] = e.target.value;
    setNewExtraTeachersDay(updatedNewExtraTeachersDay);
  };
  
  
  const handleNewExtraTeachersLectureNumberChange = (e, index) => {
    const updatedNewExtraTeachersLectureNumber = [...newExtraTeachersLectureNumber];
    updatedNewExtraTeachersLectureNumber[index] = e.target.value;
    setNewExtraTeachersLectureNumber(updatedNewExtraTeachersLectureNumber);
  };


// weekly teacher on particular day and lecture
  const handleNewDayChange = (e, index) => {
    const updatedNewDay = [...newDay];
    updatedNewDay[index] = e.target.value;
    setNewDay(updatedNewDay);
  };

  const handleNewLectureNumberChange = (e, index) => {
    const updatedNewLectureNumber = [...newLectureNumber];
    updatedNewLectureNumber[index] = e.target.value;
    setNewLectureNumber(updatedNewLectureNumber);
  };

  return (
    <div>
      <AdminHeader />
      <div>

        <CContainer>
          <Link to='/admin'>
            <CIcon icon={cilArrowThickLeft}/> Back
          </Link>
          </CContainer>
          <div className="table">
            <label>
              Number of Days:
              <input
                type="number"
                value={days}
                onChange={(e) => {
                  setDays(Math.min(Number(e.target.value), 6));
                  setIncludeSaturday(e.target.value === '6');
                }}
              />
            </label>
            <br/><br/>
            {days === 6 && (
              <label>
                Half day on Saturday :
                <input
                  type="checkbox"
                  checked={includeSaturday}
                  onChange={(e) => setIncludeSaturday(e.target.checked)}
                />
              </label>
            )}
            <br/><br/>
            <label>
              Number of Lectures:
              <input 
                type="number" 
                value={lectures} 
                onChange={(e) => {
                  setLectures(e.target.value);
                  setTimingAllLectures(0); 
                }} 
              />
            </label>
            <br/><br/>

            {lectures > 1 && (
              <label>
                Timing for all Lectures (in minutes):
                <input
                  type="number"
                  value={timingAllLectures}
                  onChange={(e) => setTimingAllLectures(e.target.value)}
                />
              </label>
            )}
            <br /><br/>

            <label>
              Do you want Assembly ?
              <div>
                <input
                  type="radio"
                  value="Yes"
                  checked={assembly === 'Yes'}
                  onChange={() => setAssembly('Yes')}
                />
                <label htmlFor="applyYes">Yes</label>
          
                <input
                  type="radio"
                  value="No"
                  checked={assembly === 'No'}
                  onChange={() => setAssembly('No')}
                />
                <label htmlFor="applyNo">No</label>
              </div>
            </label>
            <br/>


            {assembly === 'Yes' && (
              <label>
                Timing for assembly (in minutes):
                <input
                  type="number"
                  value={timeAssemble}
                  onChange={(e) => setTimeAssemble(e.target.value)}
                />
              </label>
            )}
            <br /><br/>

            <label>
              Lunch After Which Period:
              <input
                type="number"
                value={lunchAfterPeriod}
                onChange={(e) => {
                  setLunchAfterPeriod(e.target.value); 
                }}
              />
            </label>
            <br/><br/>

            {lunchAfterPeriod && (
              <label>
                Timing for lunch (in minutes):
                <input
                  type="number"
                  value={timeLunch}
                  onChange={(e) => setTimeLunch(e.target.value)}
                />
              </label>
            )}
            <br /><br/>


            <label>
              Classes:
              <MultiSelect
                options={classList.map(c => ({ label: `${c.info[0].class_name} - ${c.info[0].section_name} `, value: `${c.info[0].class_name}-${c.info[0].section_name}` }))}
                value={classes}
                onChange={setClasses}
                labelledBy="Select Classes"
              />
            </label>


            <br/> <br/>
            <label>
              Teachers:
              <MultiSelect
                options={teacherList.map(t => ({ label: `${t.info[0].Teacher_Name} - ${t.info[0].Subject_Name}`, value: `${t.info[0].Teacher_Name}-${t.info[0].Subject_Name}` }))} 
                value={teachers}
                onChange={setTeachers}
                labelledBy="Select Teachers"
              />
            </label>
            <br/><br/>
            <label>
              Extra Lectures Teachers:
              <MultiSelect
                options={extraLecturesTeachersList}
                value={Array.from(extraLecturesTeachersList).filter(teacher => extraLecturesTeachers.has(teacher.value))}
                onChange={(teachers) => setExtraLecturesTeachers(new Set(teachers.map(teacher => teacher.value)))}
                labelledBy="Select Extra Lectures Teachers"
              />
            </label>
            <br/><br/>
            <label>
              Weekly Once Teachers:
              <MultiSelect
                options={weeklyOnceTeachersList}
                value={Array.from(weeklyOnceTeachersList).filter(teacher => weeklyOnceTeachers.has(teacher.value))}
                onChange={(teachers) => setWeeklyOnceTeachers(new Set(teachers.map(teacher => teacher.value)))}
                labelledBy="Select Weekly Once Teachers"
              />
            </label>
            <br/><br/>

            <label>
              Do You Want To Apply Extra Teachers to all classes on specific day and lecture ?
              <div>
                <input
                  type="radio"
                  id="applyYes"
                  name="applyExtra"
                  value="Yes"
                  checked={applyExtra === 'Yes'}
                  onChange={() => setApplyExtra('Yes')}
                />
                <label htmlFor="applyYes">Yes</label>
          
                <input
                  type="radio"
                  id="applyNo"
                  name="applyExtra"
                  value="No"
                  checked={applyExtra === 'No'}
                  onChange={() => setApplyExtra('No')}
                />
                <label htmlFor="applyNo">No</label>
              </div>
              <br/>
            </label>

            {applyExtra === 'Yes' && (
              <div>
                <label>
                  Extra Teachers for All Classes:
                  <MultiSelect
                    options={extraSpecificList}
                    value={Array.from(extraSpecificList).filter(teacher => extraTeachersForAllClasses.has(teacher.value))}
                    onChange={(teachers) => setExtraTeachersForAllClasses(new Set(teachers.map(teacher => teacher.value)))}
                    labelledBy="Select Extra Teachers for All Classes"
                  />
                </label>

                {extraTeachersForAllClasses && (
                  <div>
                    <label>
                      Days (comma-separated):
                      <input
                        type="text"
                        value={newExtraTeachersDay.join(',')}
                        onChange={(e) => setNewExtraTeachersDay(e.target.value.split(','))}
                      />
                    </label>
                    <br /><br />
                    <label>
                      Lecture Numbers (comma-separated):
                      <input
                        type="text"
                        value={newExtraTeachersLectureNumber.join(',')}
                        onChange={(e) => setNewExtraTeachersLectureNumber(e.target.value.split(','))}
                      />
                    </label>
                  </div>
                )}
              </div>
            )}
            <br/>
      

            <label>
              Do You Want Extra Teachers to appear two consecutive times for all classes   ?
              <div>
                <input
                  type="radio"
                  id="applyYes"
                  name="appearTwoExtra"
                  value="Yes"
                  checked={appearTwoExtra === 'Yes'}
                  onChange={() => setAppearTwoExtra('Yes')}
                />
                <label htmlFor="applyYes">Yes</label>
              {/* </div>
              <div> */}
                <input
                  type="radio"
                  id="applyNo"
                  name="appearTwoExtra"
                  value="No"
                  checked={appearTwoExtra === 'No'}
                  onChange={() => setAppearTwoExtra('No')}
                />
                <label htmlFor="applyNo">No</label>
              </div>
            </label>

            {appearTwoExtra === 'Yes' && (
              <div>

                <label>
                  Extra Teachers randomly for all classes ( comma-separated Teacher-Subject):
                  <MultiSelect
                    options={extraConsecutiveList}
                    value={Array.from(extraConsecutiveList).filter(teacher => extraTeachersForAllClassesRandom.has(teacher.value))}
                    onChange={(teachers) => setExtraTeachersForAllClassesRandom(new Set(teachers.map(teacher => teacher.value)))}
                    labelledBy="Select Extra Teachers for All Classes"
                  />
                </label>

              </div>
            )}
            <br/>



            <label>
              Do You Want To Apply Weekly Once Teachers to all classes for particular day and lecture ?
              <div>
                <input
                  type="radio"
                  id="applyYes"
                  name="applyWeeklyOnce"
                  value="Yes"
                  checked={applyWeeklyOnce === 'Yes'}
                  onChange={() => setApplyWeeklyOnce('Yes')}
                />
                <label htmlFor="applyYes">Yes</label>

                <input
                  type="radio"
                  id="applyNo"
                  name="applyWeeklyOnce"
                  value="No"
                  checked={applyWeeklyOnce === 'No'}
                  onChange={() => setApplyWeeklyOnce('No')}
                />
                <label htmlFor="applyNo">No</label>
              </div>
            </label>
            <br/>

            {applyWeeklyOnce === 'Yes' && (
              <div>
                <label>
                  Same for all classes Weekly Once Teacher (comma-separated Teacher-Subject):
                  <MultiSelect
                    options={weeklyParticularList}
                    value={Array.from(weeklyParticularList).filter(teacher => weeklyForAllClass.has(teacher.value))}
                    onChange={(teachers) => setweeklyForAllClass(new Set(teachers.map(teacher => teacher.value)))}
                    labelledBy="Select Extra Teachers for All Classes"
                  />
                </label>
                <br />
                {weeklyForAllClass && (
                  <div>
                    {Array.from(weeklyForAllClass).map((pair, index) => {
                      const [teacher, subject] = pair.split('-');

                      return (
                        <div key={index}>
                          <label>
                            Enter Day for {teacher}-{subject}:
                            <input
                              type="number"
                              value={newDay[index] || ''}
                              onChange={(e) => handleNewDayChange(e, index)}
                            />
                          </label>
                          <br />

                          <label>
                            Enter Lecture Number for {teacher}-{subject}:
                            <input
                              type="number"
                              value={newLectureNumber[index] || ''}
                              onChange={(e) => handleNewLectureNumberChange(e, index)}
                            />
                          </label>
                          <br />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            <br/>


            <label>
              Do You Want to apply Weekly Teachers to selective classes ?
              <div>
                <input
                  type="radio"
                  id="applyYes"
                  name="applySelected"
                  value="Yes"
                  checked={applySelected === 'Yes'}
                  onChange={() => setApplySelected('Yes')}
                />
                <label htmlFor="applyYes">Yes</label>
              
                <input
                  type="radio"
                  id="applyNo"
                  name="applySelected"
                  value="No"
                  checked={applySelected === 'No'}
                  onChange={() => setApplySelected('No')}
                />
                <label htmlFor="applyNo">No</label>
              </div>
            </label>

            {applySelected === 'Yes' && (
              <div>

                <label>
                  weekly teacher for selected classes randomly ( comma-separated Teacher-Subject):
                    <MultiSelect
                      options={weeklySelectiveList}
                      value={Array.from(weeklySelectiveList).filter(teacher => weeklyTeacherForSelectedClass.has(teacher.value))}
                      onChange={(teachers) => setWeeklyTeacherForSelectedClass(new Set(teachers.map(teacher => teacher.value)))}
                      labelledBy="Select Extra Teachers for All Classes"
                    />
                </label>

                {weeklyTeacherForSelectedClass && (
                  <div>
                    <label>
                      classes to combine
                      <select
                        multiple
                        value={weeklySelectedClasses}
                        onChange={(e) => {
                          setWeeklySelectedClasses(Array.from(e.target.selectedOptions, (option) => option.value));
                        }}
                      >

                        {classes.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.value}
                          </option>
                        ))}
                      </select>
                    </label>

                    {weeklySelectedClasses && (
                      <div>
                        <label>
                          combine remaining classes : 
                          <input
                            type='checkbox'
                            checked={combineRemainingClasses}
                            onChange={() => setCombineRemainingClasses(!combineRemainingClasses)}
                          />
                        </label>
                      </div>
                    )}
                  
                  </div>
                )}
              </div>
            )}

            <br/>
            <button onClick={handleGenerateTimetable}>Generate Timetable</button>
            <br/>

            <div id="download-container">
              {Object.keys(timetables).length > 0 && (
                // <Timetable timetables={timetables} timingAllLectures={timingAllLectures} lunchAfterPeriod={lunchAfterPeriod} />

                <Timetable 
                  timetables={timetables} 
                  timingAllLectures={timingAllLectures} 
                  showAssembly={assembly === 'Yes'}
                  lunchAfterPeriod={lunchAfterPeriod} 
                  timeAssemble={timeAssemble}
                  timeLunch={timeLunch}
                />


              )}
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default TimeTable;








