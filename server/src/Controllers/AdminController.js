
  const express = require('express');

  const app = express();
  const { query } = require('../utils/database');
  const bcrypt = require('bcrypt');
  const logger = require('../utils/logger');
  const bodyParser = require('body-parser');
  const jwt = require("jsonwebtoken");
  const crypto = require('crypto');
  const { handleDuplicateEntryError } = require('../ErrorHandlers/ErrorHandler.js');
  const util = require('util');
  const { pool } = require('../utils/database')
  
  
  
  // Helper function to generate a username from email    
  function generateUsername(email) {
      const firstFourLetters = email.substring(0, 4);
      const randomString = Math.random().toString(36).substring(2, 6);
      return `${firstFourLetters}_${randomString}`;
  }
  
  function generateUsername1(Name) {
      // Get the first three letters of the Name (assuming it's at least 3 characters long)
      const firstThreeLetters = Name.substring(0, 3).toLowerCase();
  
      // Generate a random string of 4 characters
      const randomString = Math.random().toString(36).substring(2, 6);
  
      // Concatenate the first three letters with the random string
      return `${firstThreeLetters}_${randomString}`;
  }
  
  // Helper function to generate a random password
  function generateRandomPassword() {
      return Math.random().toString(36).substring(2, 10); // Adjust the length of the password
  }
  
  // Helper function to encrypt a string using base64 encoding
  function encryptString(str) {
      return Buffer.from(str).toString('base64');
  }
  
  const addTeacher = async (req, res, next) => {
    try {
        const { userId, schoolId } = req.params;
        const { Name, email, contactNo, employId } = req.body;

        if (!Name || !contactNo || !email ||!employId) {
            return res.status(400).send({ status: false, message: "Please provide name, contactNo,email, employId (they are mandatory)" });
        }

        const selectTeacherQuery = 'SELECT * FROM tbl_teacher WHERE teacher_email = ?';

        const [existingTeacher] = await query(selectTeacherQuery, [email]);

        if (existingTeacher) {
            const teacherId = existingTeacher.teacher_id;
            const teacherStatus = existingTeacher.teacher_status;

            if (teacherStatus === 0 || teacherStatus === 2) {
                // If teacher exists but is inactive (status 0 or 2), update it to active (status 1)
                const updateTeacherQuery = 'UPDATE tbl_teacher SET teacher_status = 1, updated_by = ? WHERE teacher_id = ?';
                await query(updateTeacherQuery, [userId, teacherId]);
                return res.status(200).json({ status: true, message: "Teacher already exists. Updated status to active." });
            } else {
                return res.status(400).json({ error: "Teacher with the same email already exists" });
            }
        }        
        // If teacher does not exist, proceed with adding a new teacher
        const userType = "teacher";

        // Generate a random username
        const username = generateUsername1(Name);

        // Generate a random password
        const password = generateRandomPassword();

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user details into the database
        const insertUserQuery = 'INSERT INTO tbl_user (name, userName, userEmail, userPassword, userNumber, userType) VALUES (?, ?, ?, ?, ?, ?)';
        const { insertId: user_id } = await query(insertUserQuery, [Name, username, email, hashedPassword, contactNo, userType]);

        const insertTeacherQuery = 'INSERT INTO tbl_teacher (teacher_user_id, teacher_name, teacher_email, teacher_contact, teacher_emp_id, teacher_school_id, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)';
        await query(insertTeacherQuery, [user_id, Name, email, contactNo, employId, schoolId, userId]);

        return res.status(200).send({ status: true, message: "Teacher registered successfully",data: { TeacherUserName: username, TeacherPass: password, UserRoll: userType } });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
};


const addClass = async (req, res) => {
  try {
      const { userId, schoolId } = req.params;
      const { className } = req.body;

      if (!className) {
          return res.status(400).json({ error: 'Class name is required' });
      }
      const selectClassQuery = 'SELECT * FROM tbl_class WHERE class_name = ? AND class_school_id = ?';
      const [existingClass] = await query(selectClassQuery, [className, schoolId]);

      if (existingClass) {
          const classId = existingClass.class_id;
          const classStatus = existingClass.class_status;

          if (classStatus === 0 || classStatus === 2) {
              // If class exists but is inactive (status 0 or 2), update it to active (status 1)
              const updateClassQuery = 'UPDATE tbl_class SET class_status = 1 WHERE class_id = ?';
              await query(updateClassQuery, [classId]);
              return res.status(200).json({ message: `Class '${className}' already exists. Updated status to active.` });
          } else {
              return res.status(409).json({ error: `Class '${className}' already exists` });
          }
      }
      // If class does not exist or is inactive, proceed to add the new class
      const insertClassQuery = 'INSERT INTO tbl_class (class_name, class_school_id, created_by) VALUES (?, ?, ?)';
      await query(insertClassQuery, [className, schoolId, userId]);

      return res.status(201).json({ message: 'Class added successfully' });
  } catch (error) {
      console.error('Error adding class:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};



const addSection = async (req, res) => {
  try {
      const { userId, schoolId } = req.params;
      const { sectionName } = req.body;

      if (!sectionName) {
          return res.status(400).json({ error: 'Section name is required' });
      }

      const selectSectionQuery = 'SELECT * FROM tbl_section WHERE section_name = ? AND section_school_id = ?';
      const [existingSection] = await query(selectSectionQuery, [sectionName, schoolId]);

      if (existingSection) {
          const sectionId = existingSection.section_id;
          const sectionStatus = existingSection.section_status;

          if (sectionStatus === 0 || sectionStatus === 2) {
              // If section exists but is inactive (status 0 or 2), update it to active (status 1)
              const updateSectionQuery = 'UPDATE tbl_section SET section_status = 1 WHERE section_id = ?';
              await query(updateSectionQuery, [sectionId]);
              return res.status(200).json({ message: `Section '${sectionName}' already exists. Updated status to active.` });
          } else {
              return res.status(409).json({ error: `Section '${sectionName}' already exists` });
          }
      }

      // If section does not exist or is inactive, proceed to add the new section
      const insertSectionQuery = 'INSERT INTO tbl_section (section_name, section_school_id, created_by) VALUES (?, ?, ?)';
      await query(insertSectionQuery, [sectionName, schoolId, userId]);

      return res.status(201).json({ message: 'Section added successfully' });
  } catch (error) {
      console.error('Error adding section:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};


const addSubject = async (req, res) => {
  try {
      const { userId, schoolId } = req.params;
      const { subjectName } = req.body;

      if (!subjectName) {
          return res.status(400).json({ error: 'Subject name is required' });
      }

      const selectSubjectQuery = 'SELECT * FROM tbl_subject WHERE subject_name = ? AND subject_school_id = ?';
      const [existingSubject] = await query(selectSubjectQuery, [subjectName, schoolId]);

      if (existingSubject) {
          const subjectId = existingSubject.subject_id;
          const subjectStatus = existingSubject.subject_status;

          if (subjectStatus === 0 || subjectStatus === 2) {
              // If subject exists but is inactive (status 0 or 2), update it to active (status 1)
              const updateSubjectQuery = 'UPDATE tbl_subject SET subject_status = 1 WHERE subject_id = ?';
              await query(updateSubjectQuery, [subjectId]);
              return res.status(200).json({ message: `Subject '${subjectName}' already exists. Updated status to active.` });
          } else {
              return res.status(409).json({ error: `Subject '${subjectName}' already exists` });
          }
      }

      // If subject does not exist or is inactive, proceed to add the new subject
      const insertSubjectQuery = 'INSERT INTO tbl_subject (subject_name, subject_school_id, created_by) VALUES (?, ?, ?)';
      await query(insertSubjectQuery, [subjectName, schoolId, userId]);

      return res.status(201).json({ message: 'Subject added successfully' });
  } catch (error) {
      console.error('Error adding subject:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};

const addStudents = async (req, res, next) => {
  try {
      const { userId, schoolId } = req.params;
      const { Name, contactNo, classId } = req.body;


      if (!Name || !contactNo) {
          return res.status(400).send({ status: false, message: "Please provide name, contactNo (they are mandatory)" });
      }

      const selectStdName = 'SELECT * FROM tbl_student WHERE student_name = ? AND student_contact = ?';

      const [existingStudent] = await query(selectStdName, [Name, contactNo]);

      if (existingStudent) {
          const studentId = existingStudent.student_id;
          const studentStatus = existingStudent.student_status;

          if (studentStatus === 0 || studentStatus === 2) {
              // If student exists but is inactive (status 0 or 2), update it to active (status 1)
              const updateStudentQuery = 'UPDATE tbl_student SET student_status = 1 WHERE student_id = ?';
              await query(updateStudentQuery, [ studentId]);
              return res.status(200).json({ status: true, message: "Student already exists. Updated status to active." });
          } else {
              return res.status(400).json({ error: "Student with the same name and contact already exists" });
          }
      }
      const userType = "student";
      // Generate a random username
      const username = generateUsername1(Name);
      // Generate a random password
      const password = generateRandomPassword();

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user details into the database
      const insertUserQuery = 'INSERT INTO tbl_user (name, userName, userPassword, userNumber, userType) VALUES (?, ?, ?, ?, ?)';
      const studResult = await query(insertUserQuery, [Name, username, hashedPassword, contactNo, userType]);
      const student_userId = studResult.insertId;
      console.log(student_userId)

      // Insert the teacher details into the database
      const insertTeacherQuery = 'INSERT INTO tbl_student ( student_user_id, student_name,student_contact,student_class_id,stu_school_id,created_by) VALUES (?, ?, ?,?,?,?)';
      await query(insertTeacherQuery, [student_userId, Name, contactNo, classId, schoolId, userId]);

      return res.status(200).send({ status: true, message: "student registered successfully",data: { StudentUserName: username, StudentPass: password, UserRoll: userType }});
  } catch (err) {
      console.error(err);
      return res.status(500).send({ status: false, message: err.message });
  }
};


// Add Class Subject
// const addCls_Sub = async (req, res) => {
//   try {
//       const { classId, subjectIds } = req.body;
      
//       if (!classId || !subjectIds || subjectIds.length === 0) {
//           return res.status(400).send({ status: false, message: "Please provide class ID and at least one subject ID" });
//       }

//       // Check if subjects are active (assuming tbl_sub_status is a field in tbl_subject)
//       const checkSubjectsQuery = 'SELECT sub_id FROM tbl_subject WHERE sub_id IN (?) AND tbl_sub_status = 1';
//       const [activeSubjects] = await query(checkSubjectsQuery, [subjectIds]);

//       // Extract the subjectIds that are active
//       const activeSubjectIds = activeSubjects.map(subject => subject.sub_id);

//       // If there are subjects that are not active, return error
//       const inactiveSubjects = subjectIds.filter(subId => !activeSubjectIds.includes(subId));
//       if (inactiveSubjects.length > 0) {
//           return res.status(400).send({ status: false, message: "Some provided subjects are inactive", inactiveSubjects });
//       }

//       // Iterate over each active subjectId and insert into tbl_class_sub
//       for (const activeSubId of activeSubjectIds) {
//           const queryForCls_Sub = "INSERT INTO tbl_class_sub (classub_class_id, clasub_sub_id) VALUES (?, ?)";
//           await query(queryForCls_Sub, [classId, activeSubId]);
//       }

//       res.status(200).send({ status: true, message: "Subjects added to class successfully" });
//   } catch (error) {
//       console.error("Error adding subjects to class:", error);
//       res.status(500).send({ status: false, message: "Internal server error" });
//   }
// };


const addClassSecForStud = async (req, res) => {
  try {
    const { studentIds, classId, sectionId } = req.body;

    console.log(studentIds)

    // Validation
    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0 || !classId || !sectionId) {
      throw new Error("Please provide an array of studentIds, classId, sectionId");
    }
    // Check if students are already assigned to the provided class and section
    const checkStudentQuery = 'SELECT * FROM tbl_std_class WHERE stdcls_student_id = ? AND stdcls_class_id = ? AND stdcls_section_id = ? AND tbl_std_status=1';
    
    // Array to store errors for students already assigned
    const errors = [];

    // Array to store values for batch insert
    const insertValues = [];

    for (const studentId of studentIds) {
      const [existingStudent] = await query(checkStudentQuery, [studentId, classId, sectionId]);

      if (existingStudent) {
        errors.push({ studentId, message: "Student already assigned to this class and section" });
      } else {
        insertValues.push([studentId, classId, sectionId]);
      }
    }
    // Insert the students into tbl_std_class
    if (insertValues.length > 0) {
      const insertAssociationsQuery = 'INSERT INTO tbl_std_class(stdcls_student_id, stdcls_class_id, stdcls_section_id) VALUES ?';
      await query(insertAssociationsQuery, [insertValues]);

      return res.status(200).send({ status: true, message: "Students assigned to class and section successfully", errors });
    } else {
      return res.status(400).send({ status: false, message: "All provided students are already assigned to this class and section", errors });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

const Assigning_Sub_For_Class_Sec = async (req, res) => {
  try {
    const { classId, sectionId, classTeacherId, subjectIds } = req.body;

    // Validation
    if (!classId || !sectionId || !classTeacherId) {
      throw new Error("Please provide classId, sectionId, and classTeacherId");
    }
    if (!Array.isArray(subjectIds)){{
      throw new Error("subjectIds must be an array");
    }
    // Check if classId and sectionId exist
    const checkClassSectionQuery = 'SELECT * FROM tbl_class_sec_clsteach_subs WHERE sub_teach_cls_id= ? AND sub_teach_sec_id = ?';
    const [existingClassSection] = await query(checkClassSectionQuery, [classId, sectionId]);

    if (existingClassSection) {
      return res.status(400).send({ status: false, message: "Subjects are assigned already for this class and section" });
    }
    // Insert each subject into a separate row
    const insertAssociationsQuery = 'INSERT INTO tbl_class_sec_clsteach_subs(sub_teach_cls_id, sub_teach_sec_id, sub_teach_teacher_id, sub_teach_sub_id) VALUES (?, ?, ?, ?)';

    for (const subjectId of subjectIds) {
      const values = [classId, sectionId, classTeacherId, subjectId];
      await query(insertAssociationsQuery, values);
    }
    return res.status(200).send({ status: true, message: "Subjects Assigned Successfully For Given Class & Section" });
  }} catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
}


const Assigning_Sub_For_Teacher = async (req, res) => {
    try {
        const { classId, sectionId, teacherId, subjectIds } = req.body;

        // Validation
        if (!classId || !sectionId || !teacherId) {
            throw new Error("Please provide classId, sectionId, and classTeacherId");
        }
        if (!Array.isArray(subjectIds)) {
            throw new Error("subjectIds must be an array");
        }

        // Insert each subject into a separate row
        const insertAssociationsQuery = 'INSERT INTO tbl_clssec_sub_teacher(clssec_sub_class_id, clssec_sub_section_id, clssec_sub_classtecher_id, clssec_sub_subject_id) VALUES (?, ?, ?, ?)';
        
        for (const subjectId of subjectIds) {
            const values = [classId, sectionId, teacherId, subjectId];
            await query(insertAssociationsQuery, values);
        }

        return res.status(200).send({ status: true, message: "Subjects Assign Successfully For Given Teacher For That Claas & Section" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
};

const subjects_For_Class_Section = async (req, res) => {
  try {
    const { classId,sectionId } = req.body

    const sql = 'CALL GetSubFromClass(?,?)';
    const values = [classId,sectionId];

    const [rows] = await query(sql, values);

    if (!rows) {
      return res.status(404).json({ status: false, message: 'No subjects assign for thid class and section.' });
    }
    return res.status(200).json({ status: true, data: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}


  const classdata = async (req, res) => {
    try {
      const { schoolId } = req.params;
      console.log(schoolId)
      const classesQuery = 'SELECT class_id, class_name FROM tbl_class WHERE class_school_id = ? AND class_status = 1';
      const classes = await query(classesQuery, [schoolId]);
  
      if (!classes || classes.length === 0) {
        return res.status(404).json({ status: false, message: 'No active classes found for this schoolid.' });
      }
  
      return res.status(200).json({ status: true, data: classes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Internal server error.' });
    }
  };
      
  const sectiondata = async (req, res) => {
    try {
      const { schoolId } = req.params;
  
      const sectionQuery = 'SELECT section_id, section_name FROM tbl_section WHERE section_school_id = ? AND section_status = 1';
      const sections = await query(sectionQuery, [schoolId]);
  
      if (!sections || sections.length === 0) {
        return res.status(404).json({ status: false, message: 'No active sections found for this admin.' });
      }
  
      return res.status(200).json({ status: true, data: sections });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Internal server error.' });
    }
  };
    
  const subjectdata = async (req, res) => {
    try {
      const { schoolId } = req.params;
  
    
      const subjectQuery = 'SELECT subject_id, subject_name FROM tbl_subject WHERE subject_school_id = ? AND subject_status = 1';
      const subjects = await query(subjectQuery, [schoolId]);
  
      if (!subjects || subjects.length === 0) {
        return res.status(404).json({ status: false, message: 'No active subjects found for this admin.' });
      }
  
      return res.status(200).json({ status: true, data: subjects });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Internal server error.' });
    }
  };
  

  


  const teacherdata = async (req, res) => {
    try {
      const { schoolId } = req.params;
  
      const teacherQuery = 'SELECT teacher_id, teacher_name,teacher_email,teacher_contact,teacher_emp_id FROM tbl_teacher WHERE teacher_school_id = ? AND teacher_status = 1';
      const teachers = await query(teacherQuery, [schoolId]);
  
      if (!teachers || teachers.length === 0) {
        return res.status(404).json({ status: false, message: 'No active teachers found for this admin.' });
      }
  
      return res.status(200).json({ status: true, data: teachers });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Internal server error.' });
    }
  };
  

  // const studentdata = async (req, res) => {
  //   try {
  //     const { schoolId } = req.params;  
  // const studentQuery = 'SELECT student_id, student_name,student_contact,student_class_id FROM tbl_student WHERE stu_school_id = ?';
  //     const students = await query(studentQuery, [schoolId]);
  
  //     if (!students || students.length === 0) {
  //       return res.status(404).json({ status: false, message: 'No students found for this admin.' });
  //     }
  
  //     return res.status(200).json({ status: true, data: students });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ status: false, message: 'Internal server error.' });
  //   }
  // };


  const studentdata = async function (req, res) {
    const {schoolId} = req.params;
    console.log(schoolId)
    try {
      const sql = 'CALL GetStudentsForStudentData(?)';
      const values = [schoolId];
  
      const [rows] = await query(sql, values)
      console.log(rows)
    
      return res.status(200).json({ data: rows });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: false, message: error.message });
    }
  };

  const getClass_Subject = async function (req, res) {
    const {userId,schoolId} = req.params
  
    try {
      const sql = 'CALL GetClssSubjectFromAdminUserIdAndSchoolId(?,?)';
      const values = [userId,schoolId];
  
      const [rows] = await query(sql, values);
  
      let filteredResults = [];
  
      if (rows && rows.length > 0 && 'class_name' in rows[0]) {
        // Create a map to store unique class and subject combinations
        const classSubjectMap = new Map();
  
        rows.forEach(row => {
          const key = `${row.class_id}_${row.subject_id}`;
  
          // Check if the class and subject combination is already in the map
          if (!classSubjectMap.has(key)) {
            classSubjectMap.set(key, {
              class_sub_id:row.class_sub_id,
              Class_Name: row.class_name,
              Class_Id: row.class_id,
              Subject_Name: row.subject_name,
              Subject_Id: row.subject_idn

            });
          }
        });
  
        // Convert the map values to an array
        filteredResults = Array.from(classSubjectMap.values());
      } else {
        // The result structure is different than expected, handle accordingly
        console.error('Unexpected result structure:', rows);
        return res.status(500).send({ status: false, message: 'Unexpected result structure' });
      }
  
      return res.status(200).json({ data: filteredResults });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: false, message: error.message });
    }
  };

  const getClass_Section = async function (req, res) {
    const { schoolId } = req.params;

    try {
        const sql = 'CALL GetClssSecClsTechSubFromSchoolId(?)';
        const values = [schoolId];

        const [rows] = await query(sql, values);

        let teacherResults = {};

        if (rows && rows.length > 0 && 'class_name' in rows[0]) {
            rows.forEach(row => {
                const key = row.sub_teacher_id;

                // Check if the sub_teacher_id already exists in teacherResults
                if (!(key in teacherResults)) {
                    teacherResults[key] = {
                        sub_teacher_id: row.sub_teacher_id,
                        info: []
                    };
                }

                // Add class-section details to the corresponding sub_teacher_id object
                teacherResults[key].info.push({
                    class_name: row.class_name,
                    class_id: row.class_id,
                    section_name: row.section_name,
                    section_id: row.section_id,
                    subject_name: row.subject_name,
                    subject_id: row.subject_id,
                    teacher_id: row.teacher_id,
                    teacher_name: row.teacher_name
                });
            });

            // Convert teacherResults object to an array of objects
            const formattedResults = Object.values(teacherResults);

            return res.status(200).json({ data: formattedResults });
        } else {
            console.error('Unexpected result structure:', rows);
            return res.status(500).send({ status: false, message: 'Unexpected result structure' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: error.message });
    }
}


  const getStudents_Class_Admin = async function (req, res) {
    const {schoolId} = req.params;
    console.log(schoolId)
    try {
      const sql = 'CALL GetStudentsForAdmin(?)';
      const values = [schoolId];
  
      const [rows] = await query(sql, values)
      console.log(rows)
    
      return res.status(200).json({ data: rows });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: false, message: error.message });
    }
  };


const Fetching_SchoolId_Admin= async (req,res)=>{
    const userId = req.params.userId;
  try {
    const sql = 'CALL GetSchool_id(?)';
      const values = [userId];

      const [rows]=await query(sql,values)
 
      return res.status(200).json({ data: rows });

  } catch (error) {
    console.log(error) 
    return res.status(500).send({ status: false, message: error.message })  }

}

  //**************Giving Classes,Sections,Subjects And Teachers to admin Screen************************//

  const getClass_Sec_Teach_sub = async function (req, res) {
    const {  schoolId } = req.params;
    try {
        const sql = 'CALL GetClssSubjectFromAdminUserIdscID(?)';
        const values = [schoolId];

        const [rows] = await query(sql, values);

        let teacherResults = {};

        if (rows && rows.length > 0 && 'class_name' in rows[0]) {
            rows.forEach(row => {
                const key = row.clssec_sub_teach_id;

                if (!(key in teacherResults)) {
                    teacherResults[key] = {
                        ClsSubTeachId: row.clssec_sub_teach_id,
                        info: []
                    };
                }
                teacherResults[key].info.push({
                    Class_Name: row.class_name,
                    Class_Id: row.class_id,
                    Section_Name: row.section_name,
                    Section_Id: row.section_id,
                    Teacher_Name: row.teacher_name,
                    Teacher_Id: row.teacher_id,
                    Subject_Name: row.subject_name,
                    Subject_Id: row.subject_id,
                });
            });
            const formattedResults = Object.values(teacherResults);

            formattedResults.sort((a, b) => a.ClsSubTeachId - b.ClsSubTeachId);

            return res.status(200).json({ data: formattedResults });
        } else {
            return res.status(404).json({ message: "No classes or sections found for the user" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: error.message });
    }
};



  const updateClass = async (req, res) => {
    const { classId, userId } = req.params;
    const { className } = req.body;

    if (!userId || !classId || !className) {
        return res.status(400).json({ status: false, message: 'Invalid input. Please provide valid userId, classId, and className.' });
    }
   
    try {
        // Update the class's name and set updated_by field with userId where class_id matches
        const updateClassQuery = 'UPDATE tbl_class SET class_name = ?, updated_by = ? WHERE class_id = ?';

        const updateValues = [className, userId, classId];

        const result = await query(updateClassQuery, updateValues);

        if (result.affectedRows > 0) {
            return res.status(200).json({ status: true, message: 'Class name updated successfully.' });
        } else {
            return res.status(404).json({ status: false, message: 'Class not found or no changes made.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error.' });
    }
};



  const updateSection = async (req, res) => {
    const { sectionId, userId } = req.params;
    const { section_name } = req.body;

    if (!userId || !sectionId || !section_name) {
        return res.status(400).json({ status: false, message: 'Invalid input. Please provide valid userId, sectionId, and section_name.' });
    }
   
    try {
        // Update the section's name and set updated_by field with userId where section_id matches
        const updateSectionQuery = 'UPDATE tbl_section SET section_name = ?, updated_by = ? WHERE section_id = ?';

        const updateValues = [section_name, userId, sectionId];

        const result = await query(updateSectionQuery, updateValues);

        if (result.affectedRows > 0) {
            return res.status(200).json({ status: true, message: 'Section name updated successfully.' });
        } else {
            return res.status(404).json({ status: false, message: 'Section not found or no changes made.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error.' });
    }
};



  const updateSubject = async (req, res) => {
    const { subjectId, userId } = req.params;
    const { subject_name } = req.body;

    if (!userId || !subjectId || !subject_name) {
        return res.status(400).json({ status: false, message: 'Invalid input. Please provide valid userId, subjectId, and subject_name.' });
    }
   
    try {
        // Update the subject's name and set updated_by field with userId where subject_id matches
        const updateSubjectQuery = 'UPDATE tbl_subject SET subject_name = ?, updated_by = ? WHERE subject_id = ?';

        const updateValues = [subject_name, userId, subjectId];

        const result = await query(updateSubjectQuery, updateValues);

        if (result.affectedRows > 0) {
            return res.status(200).json({ status: true, message: 'Subject name updated successfully.' });
        } else {
            return res.status(404).json({ status: false, message: 'Subject not found or no changes made.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error.' });
    }
};

    
  const updateTeacher = async (req, res) => {
    const { teacherId, userId } = req.params;
    const { teacher_name, teacher_email, teacher_contact } = req.body;

    if (!teacherId || !userId || !teacher_name) {
        return res.status(400).json({ status: false, message: 'Invalid input. Please provide valid teacherId, userId, and teacher_name.' });
    }
   
    try {
        // Update the teacher's information and set updated_by field with userId where teacher_id matches
        const updateTeacherQuery = 'UPDATE tbl_teacher SET teacher_name = ?, teacher_email = ?, teacher_contact = ?, updated_by = ? WHERE teacher_id = ?';

        const updateValues = [teacher_name, teacher_email, teacher_contact, userId, teacherId];

        const result = await query(updateTeacherQuery, updateValues);

        if (result.affectedRows > 0) {
            return res.status(200).json({ status: true, message: 'Teacher data updated successfully.' });
        } else {
            return res.status(404).json({ status: false, message: 'Teacher not found or no changes made.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error.' });
    }
};


const updateStudent = async (req, res) => {
  const { studentName, classId, studContact } = req.body;
  const { userId, studentId } = req.params;

  try {
    // Update the student details in the tbl_student table
    const updateQuery = `
      UPDATE tbl_student
      SET student_name = ?,
      student_class_id = ?,
          student_contact = ?,
          updated_by = ?
      WHERE student_id = ?
    `;

    // Execute the update query
    await query(updateQuery, [studentName, classId, studContact, userId, studentId]);

    return res.status(200).json({ status: true, message: 'Student updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

const deleteClass = async (req, res) => {
  const { classId, userId } = req.params;

  if (!classId || !userId) {
      return res.status(400).json({ status: false, message: 'Invalid input. Please provide valid classId and userId.' });
  }

  try {
      // Update the status field to 0 (deleted) and set updated_by field with userId where class_id matches
      const deleteClassQuery = 'UPDATE tbl_class SET class_status = 0, updated_by = ? WHERE class_id = ?';

      const result = await query(deleteClassQuery, [userId, classId]);

      if (result.affectedRows > 0) {
          return res.status(200).json({ status: true, message: 'Class deleted successfully.' });
      } else {
          return res.status(404).json({ status: false, message: 'Class not found or no changes made.' });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};


const deleteSection = async (req, res) => {
  const { sectionId, userId } = req.params;

  if (!sectionId || !userId) {
      return res.status(400).json({ status: false, message: 'Invalid input. Please provide valid sectionId and userId.' });
  }

  try {
      // Update the status field to 0 (deleted) and set updated_by field with userId where section_id matches
      const deleteSectionQuery = 'UPDATE tbl_section SET section_status = 0, updated_by = ? WHERE section_id = ?';

      const result = await query(deleteSectionQuery, [userId, sectionId]);

      if (result.affectedRows > 0) {
          return res.status(200).json({ status: true, message: 'Section deleted successfully.' });
      } else {
          return res.status(404).json({ status: false, message: 'Section not found or no changes made.' });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

const deleteSubject = async (req, res) => {
  const { subjectId, userId } = req.params;

  if (!subjectId || !userId) {
      return res.status(400).json({ status: false, message: 'Invalid input. Please provide valid subjectId and userId.' });
  }

  try {
      // Update the status field to 0 (deleted) and set updated_by field with userId where subject_id matches
      const deleteSubjectQuery = 'UPDATE tbl_subject SET subject_status = 0, updated_by = ? WHERE subject_id = ?';

      const result = await query(deleteSubjectQuery, [userId, subjectId]);

      if (result.affectedRows > 0) {
          return res.status(200).json({ status: true, message: 'Subject deleted successfully.' });
      } else {
          return res.status(404).json({ status: false, message: 'Subject not found or no changes made.' });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

const deleteTeacher = async (req, res) => {
  const { teacherId, userId } = req.params;

  if (!teacherId || !userId) {
      return res.status(400).json({ status: false, message: 'Invalid input. Please provide valid teacherId and userId.' });
  }

  try {
      // Update the status field to 0 (deleted) and set updated_by field with userId where teacher_id matches
      const deleteTeacherQuery = 'UPDATE tbl_teacher SET teacher_status = 0, updated_by = ? WHERE teacher_id = ?';

      const result = await query(deleteTeacherQuery, [userId, teacherId]);

      if (result.affectedRows > 0) {
          return res.status(200).json({ status: true, message: 'Teacher deleted successfully.' });
      } else {
          return res.status(404).json({ status: false, message: 'Teacher not found or no changes made.' });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};


const editClsTeach_FromClsSec = async (req, res) => {
  try {
      const { sub_teacher_id} = req.params;
      
      // Check if required fields are missing or empty
      if (!sub_teacher_id ) {
          return res.status(400).json({ status: false, message: "Please provide sub_teacher_id" });
      }

      const updateQuery = 'UPDATE tbl_class_sec_clsteach_subs SET sub_teach_teacher_id = ? WHERE sub_teach_cls_id = ? AND sub_teach_sec_id = ?';
      const values = [classteachId, classId, sectionId]; // Replace newTeacherId with the new teacher's ID

      // Execute the update query
      await query(updateQuery, values);

      return res.status(200).json({ status: true, message: "teacherId updated successfully for class and section" });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};


const addSubsInClsSec= async (req, res) => {
  try {
      const { classId, sectionId,teacherId} = req.params;
      const { subjectIds } = req.body;
      
      // Check if required fields are missing or empty
      if (!classId || !sectionId || !subjectIds  || !teacherId || subjectIds.length === 0) {
          return res.status(400).json({ status: false, message: "Please provide classId, sectionId,teacherId and at least one subjectId" });
      }

      // Iterate through each subjectId and insert into tbl_class_sec_clsteach_subs
      for (const subjectId of subjectIds) {
          const insertQuery = 'INSERT INTO tbl_class_sec_clsteach_subs (sub_teach_cls_id, sub_teach_sec_id,sub_teach_teacher_id, sub_teach_sub_id) VALUES (?, ?, ?,?)';
          const values = [classId, sectionId, teacherId,subjectId];

          // Execute the insert query for each subjectId
          await query(insertQuery, values);
      }

      return res.status(200).json({ status: true, message: "Subjects added to class and section successfully" });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};


const deactivateClassSec = async (req, res) => {
  try {
      const sub_teacher_id = req.params.sub_teacher_id;

      // Check if class_sub_id is provided
      if (!sub_teacher_id) {
          return res.status(400).send({ status: false, message: "Please provide sub_teacher_id" });
      }

      console.log(sub_teacher_id)

      const updateQuery = 'UPDATE tbl_class_sec_clsteach_subs SET cls_sec_clsteach_status = 0 WHERE sub_teacher_id = ?';

      // Execute the update query with the provided class_sub_id
      await query(updateQuery, [sub_teacher_id]);

      return res.status(200).send({ status: true, message: "Class section deactivated successfully" });
  } catch (error) {
      console.error(error);
      return res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};


const edit_TeachForClsSecSub = async (req, res) => {
  try {
      const { classSubteachId } = req.params;
      const teacherId=req.body.teacherId


      // Check if required fields are missing or empty
      if (!classSubteachId || !teacherId) {
          return res.status(400).send({ status: false, message: "Please provide classSubteachId and teacherId" });
      }

      const updateQuery = 'UPDATE tbl_clssec_sub_teacher SET clssec_sub_classtecher_id = ? WHERE clssec_sub_teach_id = ?';
      const values = [teacherId, classSubteachId];

      // Execute the update query with the provided classSubteachId
      await query(updateQuery, values);

      return res.status(200).json({ status: true, message: "TeacherId updated successfully for classSubteachId" });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}


const deactivateClsSubTeach = async (req, res) => {
  try {
      const clssec_sub_teach_id = req.params.clssec_sub_teach_id;

      // Check if class_sub_id is provided
      if (!clssec_sub_teach_id) {
          return res.status(400).send({ status: false, message: "Please provide clssec_sub_teach_id" });
      }

      const updateQuery = 'UPDATE tbl_clssec_sub_teacher SET clssec_sub_teach_status = 0 WHERE clssec_sub_teach_id = ?';

      // Execute the update query with the provided class_sub_id

      await query(updateQuery, [clssec_sub_teach_id]);

      return res.status(200).send({ status: true, message: "Class section deactivated successfully"});
  } catch (error) {
      console.error(error);
      return res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};


const editClassStudent= async (req, res) => {
  try {
      const { userId, studClassId} = req.params;
      const { studentId } = req.body;
      
      // Check if required fields are missing or empty
      if (!userId || !studClassId || !studentId ) {
          return res.status(400).json({ status: false, message: "Please provide userId, studClassId and at least one studentId" });
      }

          const updateQuery = 'UPDATE  tbl_std_class SET stdcls_student_id = ?,updated_by=? WHERE std_cls_id = ?';
          const values = [studentId, userId,studClassId]
          
          await query(updateQuery, values);
      
      return res.status(200).json({ status: true, message: "Students added to class and section successfully" });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}


const getStudentsByClassId = async (req, res) => {
  try {
      const { student_class_id } = req.params;

      if (!student_class_id) {
          return res.status(400).json({ status: false, message: 'Please provide a valid student_class_id' });
      }

      // Query to fetch students by their name and ID with stu_status = 1
      const getStudentsQuery = `
          SELECT student_id, student_name
          FROM tbl_student
          WHERE student_class_id = ? AND stu_status = 1
      `;

      const students = await query(getStudentsQuery, [student_class_id]);

      if (students.length === 0) {
          return res.status(404).json({ status: false, message: 'No students found for the provided class_id' });
      }

      return res.status(200).json({ status: true, data: students });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Internal server error' });
  }
};


const deactivateClsStud= async (req, res) => {
  try {
      const std_cls_id = req.params.std_cls_id;

      // Check if class_sub_id is provided
      if (!std_cls_id) {
          return res.status(400).send({ status: false, message: "Please provide std_cls_id" });
      }

      const updateQuery = 'UPDATE tbl_std_class SET tbl_std_status = 0 WHERE std_cls_id = ?';

      // Execute the update query with the provided class_sub_id

      await query(updateQuery, [std_cls_id]);

      return res.status(200).send({ status: true, message: "Student For Given Class deactivated successfully"});
  } catch (error) {
      console.error(error);
      return res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

  module.exports = {  addTeacher,addClass,addSubject,addSection,addStudents,
    addClassSecForStud,Assigning_Sub_For_Class_Sec,Assigning_Sub_For_Teacher, classdata, sectiondata, subjectdata, teacherdata, studentdata,getClass_Subject,getClass_Sec_Teach_sub,updateClass,updateSection,
    updateSubject,updateStudent,updateTeacher,deleteClass,deleteSection,deleteSubject,deleteTeacher,getClass_Section,getStudents_Class_Admin,Fetching_SchoolId_Admin,subjects_For_Class_Section,editClsTeach_FromClsSec,addSubsInClsSec,
    deactivateClassSec,edit_TeachForClsSecSub,deactivateClsSubTeach,editClassStudent,getStudentsByClassId,deactivateClsStud };

  //  editClsTeach_FromClsSec,deactivateClassSub,addSectionInClassSec,deactivateClassSec ,  addCls_Sub,