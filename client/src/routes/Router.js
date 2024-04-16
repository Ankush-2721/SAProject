// import React, { Component, Suspense } from 'react'
// import { BrowserRouter, Route,  Routes } from 'react-router-dom'

// import AuthUser from 'src/auth/AuthUser'


// export default function Router() {

//     const loading = (
//         <div className="pt-3 text-center">
//           <div className="sk-spinner sk-spinner-pulse"></div>
//         </div>
//       )
      
      
//       // Containers
//       const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
      
      
//       // Pages
//       const Login = React.lazy(() => import('./views/pages/login/Login'))
//       const ForgotPassword = React.lazy(() => import('./views/pages/login/ForgotPassword'))
//       const Register = React.lazy(() => import('./views/pages/register/Register'))
//       const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
//       const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

      
//       // Head Admin
//       const HeadAdmin = React.lazy(() => import('./layout/HeadAdmin'))
//       const AddSchool = React.lazy(() => import('./views/headadmin/dashboard/AddSchool'))
//       const AddAdmin = React.lazy(() => import('./views/headadmin/dashboard/AddAdmin'))
//       const HeadAdminProfile = React.lazy(() => import('./views/headadmin/MyProfile'))
//       const HeadAdminHelp = React.lazy(() => import('./views/headadmin/HeadAdminHelp'))
//       const DeactivateAccount = React.lazy(() => import('./views/headadmin/DeactivateAccount'))
//       const HeadAdminLogout = React.lazy(() => import('./views/headadmin/HeadAdminLogout'))
      
//       // Admin
//       const Admin = React.lazy(() => import('./layout/Admin'))
//       const Add = React.lazy(() => import('./views/admin/dashboard/add/Add'))
//       const AddTeacher = React.lazy(() => import('./views/admin/dashboard/add/AddTeacher'))
//       const AddClass = React.lazy(() => import('./views/admin/dashboard/add/AddClass'))
//       const AddSection = React.lazy(() => import('./views/admin/dashboard/add/AddSection'))
//       const AddSubject = React.lazy(() => import('./views/admin/dashboard/add/AddSubject'))
//       const AddClassSubject = React.lazy(() => import('./views/admin/dashboard/add/AddClassSubject'))
//       const AddClassSection = React.lazy(() => import('./views/admin/dashboard/add/AddClassSection'))
//       const AddSubjectTeacher = React.lazy(() => import('./views/admin/dashboard/add/AddSubjectTeacher'))
//       const AddStudent = React.lazy(() => import('./views/admin/dashboard/add/AddStudent'))
//       const AddStudentClass = React.lazy(() => import('./views/admin/dashboard/add/AddStudentClass'))

//       const GenerateTimetable = React.lazy(() => import('./views/admin/dashboard/GenerateTimetable'))
//       const LeaveSection = React.lazy(() => import('./views/admin/dashboard/LeaveSection'))
//       const Reassign = React.lazy(() => import('./views/admin/dashboard/Reassign'))
//       const Availability = React.lazy(() => import('./views/admin/dashboard/Availability'))

//       const ViewTimtable = React.lazy(() => import('./views/admin/ViewTimtable'))
//       const Attendance = React.lazy(() => import('./views/admin/Attendance'))

//       const SchoolDetails = React.lazy(() => import('./views/admin/schooldetails/SchoolDetails'))
//       const Teachers = React.lazy(() => import('./views/admin/schooldetails/Teachers'))
//       const Class = React.lazy(() => import('./views/admin/schooldetails/Class'))
//       const Section = React.lazy(() => import('./views/admin/schooldetails/Section'))
//       const Subject = React.lazy(() => import('./views/admin/schooldetails/Subject'))
//       const ClassSubject = React.lazy(() => import('./views/admin/schooldetails/ClassSubject'))
//       const ClassSection = React.lazy(() => import('./views/admin/schooldetails/ClassSection'))
//       const ClassSubjectTeacher = React.lazy(() => import('./views/admin/schooldetails/ClassSubjectTeacher'))
//       const Students = React.lazy(() => import('./views/admin/schooldetails/Students'))
//       const StudentClass = React.lazy(() => import('./views/admin/schooldetails/StudentClass'))

//       const Notification = React.lazy(() => import('./views/admin/Notification'))
//       const AdminProfile = React.lazy(() => import('./views/admin/AdminProfile'))


//       // Teacher
//       const Teacher = React.lazy(() => import('./layout/Teacher'))
//       const TeacherAddStudent = React.lazy(() => import('./views/teacher/dashboard/TeacherAddStudent'))
//       const TeacherAttendance = React.lazy(() => import('./views/teacher/dashboard/TeacherAttendance'))
//       const TeacherViewTimetable = React.lazy(() => import('./views/teacher/dashboard/TeacherViewTimetable'))
//       const TeacherLeaveSection = React.lazy(() => import('./views/teacher/dashboard/TeacherLeaveSection'))

//       const TeacherViewStudentDetails = React.lazy(() => import('./views/teacher/ViewStudentDetails'))
//       const TeacherNotification = React.lazy(() => import('./views/teacher/TeacherNotification'))
//       const TeacherProfile = React.lazy(() => import('./views/teacher/TeacherProfile'))
//       const TeacherLogout = React.lazy(() => import('./views/teacher/TeacherLogout'))


//       // Student
//       const StudentLayout = React.lazy(() => import('./layout/StudentLayout'))
//       const StudentNotification = React.lazy(() => import('./views/student/StudentNotification'))
//       const StudentProfile = React.lazy(() => import('./views/student/StudentProfile'))
//       const StudentLogout = React.lazy(() => import('./views/student/StudentLogout'))


//     return (

//         <BrowserRouter>
//         <Suspense fallback={loading}>
//           <Routes>

//             {/* Home  */}
//             <Route exact path="/404" name="Page 404" element={<Page404 />} />
//             <Route exact path="/500" name="Page 500" element={<Page500 />} />
//             <Route path="*" name="Home" element={<DefaultLayout />}  />

//             {/* Login */}
//             <Route exact path="/login" name="Login Page" element={<Login />} />
//             <Route path="forgotpassword" name="Forgot Password" element={<ForgotPassword />} />

//             {/* Register */}
//             <Route exact path="/register" name="Register Page" element={<Register />} />


//             {/* Head Admin  */}
//             <Route path='/headadmin' name='Head Admin' element={< HeadAdmin />} />
//             <Route path='addschool' name='Add School' element={< AddSchool />} />
//             <Route path='addadmin' name='Add Admin' element={< AddAdmin />} />
//             <Route path='myprofile' name='My Profile' element={< HeadAdminProfile />} />
//             <Route path='help' name='Help' element={< HeadAdminHelp />} />
//             <Route path='deactivateaccount' name='Deactivate Account' element={< DeactivateAccount />} />
//             <Route path='headadminlogout' name='Head Admin Logout' element={< HeadAdminLogout />} />
            
            


//             {/* Admin */}
//             <Route path='/admin' name='Admin' element={< Admin />} />

//             <Route path='/add' name='Add' element={< Add />} />
//             <Route path='/AddTeacher' name='Add Teacher' element={< AddTeacher />} />
//             <Route path='/AddClass' name='Add Teacher' element={< AddClass />} />
//             <Route path='/AddSection' name='Add Teacher' element={< AddSection />} />
//             <Route path='/AddSubject' name='Add Teacher' element={< AddSubject />} />
//             <Route path='/AddClassSubject' name='Add Teacher' element={< AddClassSubject />} />
//             <Route path='/AddClassSection' name='Add Teacher' element={< AddClassSection />} />
//             <Route path='/AddSubjectTeacher' name='Add Teacher' element={< AddSubjectTeacher />} />
//             <Route path='/AddStudent' name='Add Teacher' element={< AddStudent />} />
//             <Route path='/AddStudentClass' name='Add Teacher' element={< AddStudentClass />} />


//             <Route path='/generatetimetable' name='Generate Timetable' element={< GenerateTimetable />} />
//             <Route path='/leavesection' name='Leave Section' element={< LeaveSection />} />
//             <Route path='/reassign' name='Reassign' element={< Reassign />} />
//             <Route path='/availability' name='Availability' element={< Availability />} />


//             <Route path='/viewtimetable' name='View Timetable' element={< ViewTimtable />} />
//             <Route path='/attendance' name='Attendance' element={< Attendance />} />
//             <Route path='/schooldetails' name='School Details' element={< SchoolDetails />} />
//             <Route path='/teachers' name='Teachers' element={< Teachers />} />
//             <Route path='/class' name='Class' element={< Class />} />
//             <Route path='/section' name='Section' element={< Section />} />
//             <Route path='/subject' name='Subject' element={< Subject />} />
//             <Route path='/ClassSubject' name='Class Subject' element={< ClassSubject />} />
//             <Route path='/ClassSection' name='Class Section' element={< ClassSection />} />
//             <Route path='/ClassSubjectTeacher' name='Class Subject Teacher' element={< ClassSubjectTeacher />} />
//             <Route path='/students' name='Students' element={< Students />} />
//             <Route path='/StudentClass' name='Student Class' element={< StudentClass />} />

//             <Route path='/notification' name='Notification' element={< Notification />} />
//             <Route path='/adminprofile' name='Admin Profile' element={< AdminProfile />} />


//             {/* Teacher */}
//             <Route path='/teacher' name='Teacher' element={< Teacher />} />
//             <Route path='/teacheraddstudent' name='Teacher Add Student' element={< TeacherAddStudent />} />
//             <Route path='/teacherattendance' name='Teacher Attendance' element={< TeacherAttendance />} />
//             <Route path='/teacherviewtimetable' name='Teacher View Timetable' element={< TeacherViewTimetable />} />
//             <Route path='/teacherleavesection' name='Teacher Leave Section' element={< TeacherLeaveSection />} />

//             <Route path='/ViewStudentDetails' name='Teacher View Student Details' element={< TeacherViewStudentDetails />} />
//             <Route path='/TeacherNotification' name='Teacher Notification' element={< TeacherNotification />} />
//             <Route path='/TeacherProfile' name='Teacher Profile' element={< TeacherProfile />} />
//             <Route path='/TeacherLogout' name='Teacher Logout' element={< TeacherLogout />} />


//             {/* Student */}
//             <Route path='/student' name='Student' element={< StudentLayout />} />
//             <Route path='/StudentNotification' name='Student Notification' element={< StudentNotification />} />
//             <Route path='/StudentProfile' name='Student Profile' element={< StudentProfile />} />
//             <Route path='/StudentLogout' name='Student Logout' element={< StudentLogout />} />



//           </Routes>
//         </Suspense>
//       </BrowserRouter>
        

//     )
// }




// Router.js
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AdminPrivateRoute } from 'src/routes/AdminRoute';
import { HeadAdminPrivateRoute } from 'src/routes/HeadAdminRoute';


const Router = () => {
  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );
  


  // Containers
  const DefaultLayout = React.lazy(() => import('../layout/DefaultLayout'));

  // Pages
  const Login = React.lazy(() => import('../views/pages/login/Login'));
  const ForgotPassword = React.lazy(() => import('../views/pages/login/ForgotPassword'));

  const Register = React.lazy(() => import('../views/pages/register/Register'));
  const Page404 = React.lazy(() => import('../views/pages/page404/Page404'));
  const Page500 = React.lazy(() => import('../views/pages/page500/Page500'));

  // Head Admin
  const HeadAdmin = React.lazy(() => import('../layout/HeadAdmin'))
  const AddSchool = React.lazy(() => import('../views/headadmin/dashboard/AddSchool'))
  const AddAdmin = React.lazy(() => import('../views/headadmin/dashboard/AddAdmin'))
  const HeadAdminProfile = React.lazy(() => import('../views/headadmin/MyProfile'))
  const HeadAdminHelp = React.lazy(() => import('../views/headadmin/HeadAdminHelp'))
  const DeactivateAccount = React.lazy(() => import('../views/headadmin/DeactivateAccount'))
  const HeadAdminLogout = React.lazy(() => import('../views/headadmin/HeadAdminLogout'))
  
  // Admin
  const Admin = React.lazy(() => import('../layout/Admin'))
  const Add = React.lazy(() => import('../views/admin/dashboard/add/Add'))
  const AddTeacher = React.lazy(() => import('../views/admin/dashboard/add/AddTeacher'))
  const AddClass = React.lazy(() => import('../views/admin/dashboard/add/AddClass'))
  const AddSection = React.lazy(() => import('../views/admin/dashboard/add/AddSection'))
  const AddSubject = React.lazy(() => import('../views/admin/dashboard/add/AddSubject'))
  const AddClassSubject = React.lazy(() => import('../views/admin/dashboard/add/AddClassSubject'))
  const AddClassSection = React.lazy(() => import('../views/admin/dashboard/add/AddClassSection'))
  const AddSubjectTeacher = React.lazy(() => import('../views/admin/dashboard/add/AddSubjectTeacher'))
  const AddStudent = React.lazy(() => import('../views/admin/dashboard/add/AddStudent'))
  const AddStudentClass = React.lazy(() => import('../views/admin/dashboard/add/AddStudentClass'))

  const GenerateTimetable = React.lazy(() => import('../views/admin/dashboard/GenerateTimetable'))
  const LeaveSection = React.lazy(() => import('../views/admin/dashboard/LeaveSection'))
  const Reassign = React.lazy(() => import('../views/admin/dashboard/Reassign'))
  const Availability = React.lazy(() => import('../views/admin/dashboard/Availability'))

  const ViewTimtable = React.lazy(() => import('../views/admin/ViewTimtable'))
  const Attendance = React.lazy(() => import('../views/admin/Attendance'))

  const SchoolDetails = React.lazy(() => import('../views/admin/schooldetails/SchoolDetails'))
  const Teachers = React.lazy(() => import('../views/admin/schooldetails/Teachers'))
  const Class = React.lazy(() => import('../views/admin/schooldetails/Class'))
  const Section = React.lazy(() => import('../views/admin/schooldetails/Section'))
  const Subject = React.lazy(() => import('../views/admin/schooldetails/Subject'))
  const ClassSubject = React.lazy(() => import('../views/admin/schooldetails/ClassSubject'))
  const ClassSection = React.lazy(() => import('../views/admin/schooldetails/ClassSection'))
  const ClassSubjectTeacher = React.lazy(() => import('../views/admin/schooldetails/ClassSubjectTeacher'))
  const Students = React.lazy(() => import('../views/admin/schooldetails/Students'))
  const StudentClass = React.lazy(() => import('../views/admin/schooldetails/StudentClass'))

  const Notification = React.lazy(() => import('../views/admin/Notification'))
  const AdminProfile = React.lazy(() => import('../views/admin/AdminProfile'))


  // Teacher
  const Teacher = React.lazy(() => import('../layout/Teacher'))
  const TeacherAddStudent = React.lazy(() => import('../views/teacher/dashboard/TeacherAddStudent'))
  const TeacherAttendance = React.lazy(() => import('../views/teacher/dashboard/TeacherAttendance'))
  const TeacherViewTimetable = React.lazy(() => import('../views/teacher/dashboard/TeacherViewTimetable'))
  const TeacherLeaveSection = React.lazy(() => import('../views/teacher/dashboard/TeacherLeaveSection'))

  const TeacherViewStudentDetails = React.lazy(() => import('../views/teacher/ViewStudentDetails'))
  const TeacherNotification = React.lazy(() => import('../views/teacher/TeacherNotification'))
  const TeacherProfile = React.lazy(() => import('../views/teacher/TeacherProfile'))
  const TeacherLogout = React.lazy(() => import('../views/teacher/TeacherLogout'))


  // Student
  const StudentLayout = React.lazy(() => import('../layout/StudentLayout'))
  const StudentNotification = React.lazy(() => import('../views/student/StudentNotification'))
  const StudentProfile = React.lazy(() => import('../views/student/StudentProfile'))
  const StudentLogout = React.lazy(() => import('../views/student/StudentLogout'))

  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          

          {/* Home  */}
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />

          {/* Login */}
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route path="forgotpassword" name="Forgot Password" element={<ForgotPassword />} />

          {/* Register */}
          <Route exact path="/register" name="Register Page" element={<Register />} />

          {/* Head Admin  */}
          <Route path='/headadmin' element={<HeadAdminPrivateRoute><HeadAdmin /></HeadAdminPrivateRoute>} />
          <Route path='/addschool' element={<HeadAdminPrivateRoute><AddSchool /></HeadAdminPrivateRoute>} />
          <Route path='/addadmin' element={<HeadAdminPrivateRoute><AddAdmin /></HeadAdminPrivateRoute>} />
          <Route path='/myprofile' element={<HeadAdminPrivateRoute><HeadAdminProfile /></HeadAdminPrivateRoute>} />
          <Route path='/help' element={<HeadAdminPrivateRoute><HeadAdminHelp /></HeadAdminPrivateRoute>} />
          <Route path='/deactivateaccount' element={<HeadAdminPrivateRoute><DeactivateAccount /></HeadAdminPrivateRoute>} />
          <Route path='/headadminlogout' element={<HeadAdminPrivateRoute><HeadAdminLogout /></HeadAdminPrivateRoute>} />

          
          {/* Admin */}
          <Route path='/admin' element={<AdminPrivateRoute><Admin /></AdminPrivateRoute>} />

          <Route path='/add' element={<AdminPrivateRoute><Add /></AdminPrivateRoute>} />
          <Route path='/AddTeacher' element={<AdminPrivateRoute><AddTeacher /></AdminPrivateRoute>} />
          <Route path='/AddClass' element={<AdminPrivateRoute><AddClass /></AdminPrivateRoute>} />
          <Route path='/AddSection' element={<AdminPrivateRoute><AddSection /></AdminPrivateRoute>} />
          <Route path='/AddSubject' element={<AdminPrivateRoute><AddSubject /></AdminPrivateRoute>} />
          <Route path='/AddClassSubject' element={<AdminPrivateRoute><AddClassSubject /></AdminPrivateRoute>} />
          <Route path='/AddClassSection' element={<AdminPrivateRoute><AddClassSection /></AdminPrivateRoute>} />
          <Route path='/AddSubjectTeacher' element={<AdminPrivateRoute><AddSubjectTeacher /></AdminPrivateRoute>} />
          <Route path='/AddStudent' element={<AdminPrivateRoute><AddStudent /></AdminPrivateRoute>} />
          <Route path='/AddStudentClass' element={<AdminPrivateRoute><AddStudentClass /></AdminPrivateRoute>} />

          <Route path='/generatetimetable' element={<AdminPrivateRoute><GenerateTimetable /></AdminPrivateRoute>} />
          <Route path='/leavesection' element={<AdminPrivateRoute><LeaveSection /></AdminPrivateRoute>} />
          <Route path='/reassign' element={<AdminPrivateRoute><Reassign /></AdminPrivateRoute>} />
          <Route path='/availability' element={<AdminPrivateRoute><Availability /></AdminPrivateRoute>} />

          <Route path='/viewtimetable' element={<AdminPrivateRoute><ViewTimtable /></AdminPrivateRoute>} />
          <Route path='/attendance' element={<AdminPrivateRoute><Attendance /></AdminPrivateRoute>} />
          <Route path='/schooldetails' element={<AdminPrivateRoute><SchoolDetails /></AdminPrivateRoute>} />
          <Route path='/teachers' element={<AdminPrivateRoute><Teachers /></AdminPrivateRoute>} />
          <Route path='/class' element={<AdminPrivateRoute><Class /></AdminPrivateRoute>} />
          <Route path='/section' element={<AdminPrivateRoute><Section /></AdminPrivateRoute>} />
          <Route path='/subject' element={<AdminPrivateRoute><Subject /></AdminPrivateRoute>} />
          <Route path='/ClassSubject' element={<AdminPrivateRoute><ClassSubject /></AdminPrivateRoute>} />
          <Route path='/ClassSection' element={<AdminPrivateRoute><ClassSection /></AdminPrivateRoute>} />
          <Route path='/ClassSubjectTeacher' element={<AdminPrivateRoute><ClassSubjectTeacher /></AdminPrivateRoute>} />
          <Route path='/students' element={<AdminPrivateRoute><Students /></AdminPrivateRoute>} />
          <Route path='/StudentClass' element={<AdminPrivateRoute><StudentClass /></AdminPrivateRoute>} />

          <Route path='/notification' element={<AdminPrivateRoute><Notification /></AdminPrivateRoute>} />
          <Route path='/adminprofile' element={<AdminPrivateRoute><AdminProfile /></AdminPrivateRoute>} />


          {/* Teacher */}
          <Route path='/teacher' name='Teacher' element={< Teacher />} />
          <Route path='/teacheraddstudent' name='Teacher Add Student' element={< TeacherAddStudent />} />
          <Route path='/teacherattendance' name='Teacher Attendance' element={< TeacherAttendance />} />
          <Route path='/teacherviewtimetable' name='Teacher View Timetable' element={< TeacherViewTimetable />} />
          <Route path='/teacherleavesection' name='Teacher Leave Section' element={< TeacherLeaveSection />} />

          <Route path='/ViewStudentDetails' name='Teacher View Student Details' element={< TeacherViewStudentDetails />} />
          <Route path='/TeacherNotification' name='Teacher Notification' element={< TeacherNotification />} />
          <Route path='/TeacherProfile' name='Teacher Profile' element={< TeacherProfile />} />
          <Route path='/TeacherLogout' name='Teacher Logout' element={< TeacherLogout />} />


          {/* Student */}
          <Route path='/student' name='Student' element={< StudentLayout />} />
          <Route path='/StudentNotification' name='Student Notification' element={< StudentNotification />} />
          <Route path='/StudentProfile' name='Student Profile' element={< StudentProfile />} />
          <Route path='/StudentLogout' name='Student Logout' element={< StudentLogout />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;


