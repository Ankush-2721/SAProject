const express = require('express');
const router = express.Router();

const HeadAdminController = require("../Controllers/HeadAdminController");
const AdminController = require("../Controllers/AdminController");
const TimetableController = require("../Controllers/TimeTable");


//const MW = require("../middlewere/auth");


router.post('/HeadAdminRegister',HeadAdminController.registerHeadAdmin);
router.post("/login", HeadAdminController.loginUser);

router.post('/schools',HeadAdminController.registerSchool);

router.post('/admins/:hAdmin_Id',HeadAdminController.addAdmin);

router.get('/fetchingInstituteForHD/:userId',HeadAdminController.fetchinginstituteForHeadAdmin)

router.get('/fetchingAdminsForHD/:userId',HeadAdminController.fetchingAdminsForHeadAdmin)


router.get('/fetchingSchoolsForHD/:userId',HeadAdminController.fetchingSchoolsForHeadAdmin)


router.put('/editAdminByHD/:userId/:adminId',HeadAdminController.editAdmin)

router.delete('/deleteAdmin/:userId/:adminId',HeadAdminController.deactivateAdmin)


router.put('/editSchoolByHD/:userId/:schoolId',HeadAdminController.editSchool)

router.delete('/deleteSchool/:userId/:schoolId',HeadAdminController.deactivateSchool)

router.post('/teachers/:userId/:schoolId',AdminController.addTeacher);

// class, section, subject
// router.post('/classecsub',UserController.addClassSubjectSection);

router.post('/addingClass/:userId/:schoolId',AdminController.addClass);
router.post('/addingSection/:userId/:schoolId',AdminController.addSection);
router.post('/addingSubject/:userId/:schoolId',AdminController.addSubject);



// Add Class Subject
// router.post('/addclssub',AdminController.addCls_Sub);




 router.post('/Adding_Class_Sec_For_Stud',AdminController.addClassSecForStud);

 router.get('/Fetching_Sub_From_Class_sec',AdminController.subjects_For_Class_Section);

//  Add subject teacher
router.post('/Assigning_Sub_For_Class_Sec',AdminController.Assigning_Sub_For_Class_Sec);


router.post('/Assigning_Sub_For_Teach',AdminController.Assigning_Sub_For_Teacher);


router.post('/students/:userId/:schoolId',AdminController.addStudents);

// router.post('/addstdcls',UserController.addstudentclass);

// add student class
//router.post('/addClassSecForStud/:studentId/:classId/:sectionId',UserController.addClassSecForStud);



//router.put('/users/:userId', UserController.updateUser)


//  HeadAdminController
// router.get('/schooldata',HeadAdminController.schooldata);
// router.get('/admindata',HeadAdminController.admindata);

// AdminController
router.get('/classdata/:schoolId',AdminController.classdata);
router.get('/sectiondata/:schoolId',AdminController.sectiondata);
router.get('/subjectdata/:schoolId',AdminController.subjectdata);
router.get('/teacherdata/:schoolId',AdminController.teacherdata);
router.get('/studentdata/:schoolId',AdminController.studentdata);

router.get('/getClass_Subject_admin/:userId/:schoolId',AdminController.getClass_Subject);

router.get('/getClass_Section_admin/:schoolId',AdminController.getClass_Section);

router.get('/getClsSecTeachSub_For_admin/:schoolId',AdminController.getClass_Sec_Teach_sub);

router.get('/getStudents_Class_For_admin/:schoolId',AdminController.getStudents_Class_Admin);

router.get('/getSchoolId_For_Admin/:userId',AdminController.Fetching_SchoolId_Admin);

router.get('/getStudentFrom_Class/:student_class_id',AdminController.getStudentsByClassId)

router.get('/getSubject_Teacher_tt/:userId',TimetableController.getSubject_Teacher_tt);

router.get('/getClassSecFot_tt/:userId',TimetableController.fetchAllClsSec_TT)

/********************Delete and Update Apis For Admin*******************/

router.put('/updateClass/:userId/:classId',AdminController.updateClass)
router.put('/updateSection/:userId/:sectionId',AdminController.updateSection)
router.put('/updateSubject/:userId/:subjectId',AdminController.updateSubject)
router.put('/updateTeacher/:userId/:teacherId',AdminController.updateTeacher)
router.put('/updateStudent/:userId/:studentId',AdminController.updateStudent)



router.delete('/deleteClass/:userId/:classId',AdminController.deleteClass)
router.delete('/deleteSection/:userId/:sectionId',AdminController.deleteSection)
router.delete('/deleteSubject/:userId/:subjectId',AdminController.deleteSubject)
 router.delete('/deleteTeacher/:userId/:teacherId',AdminController.deleteTeacher)

// *******************CRUD FOR CLASS SECTION********************************
  router.post('/editClsTeach/:classId/:sectionId/:classteachId',AdminController.editClsTeach_FromClsSec)
  router.post('/addSubsInClsSec/:classId/:sectionId/:teacherId',AdminController.addSubsInClsSec)
  router.delete('/deleteClsSec/:sub_teacher_id',AdminController.deactivateClassSec)

// ********************CRUD FOR CLASS SUBJECT AND TEACHER***********************
  router.post('/editSubTeach/:classSubteachId',AdminController.edit_TeachForClsSecSub)
  router.delete('/deleteClsSecTeach/:clssec_sub_teach_id',AdminController.deactivateClsSubTeach)

  // ********************CRUD FOR CLASS AND STUDENT***********************
  router.put('/addStudentsInStudCls/:userId/:studClassId',AdminController.editClassStudent)
  router.delete('/deleteClsStudent/:std_cls_id',AdminController.deactivateClsStud) 

//  router.delete('/deleteClassSub/:class_sub_id',AdminController.deactivateClassSub)
//  router.post('/addSecInClassSec/',AdminController.addSectionInClassSec)
//  router.delete('/deleteClassSec/:class_section_id',AdminController.deactivateClassSec)

module.exports = router;