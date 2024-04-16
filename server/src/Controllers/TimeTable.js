const { query } = require('../utils/database');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');





//***************** Fetching Subjects And Teachers For TimeTable*********************//

const getSubject_Teacher_tt = async function(req,res){
    const userId = req.params.userId;

    try {
    
        const sql = 'CALL GetClssSubjectFromAdminUserId(?)';
        const values = [userId];

        const [rows] = await query(sql, values);


        let filteredResults = [];

        if (rows && rows.length > 0 && 'class_name' in rows[0]) {
            filteredResults = rows.map(row => ({
                Subject_Name: row.subject_name,
                Subject_Id: row.subject_id,
                Teacher_Name: row.teacher_name,
                Teacher_Id: row.teacher_id,
            }));

            return res.status(200).json({ data: filteredResults });
        } else {
            return res.status(404).json({ message: "No classes or sections found for the user" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: error.message });
    }
};

//***************** Fetching Classes And Sections For TimeTable*********************//

// const fetchAllClsSec_TT = async function(req, res) {
//     const userId = req.params.userId;

//     try {
//         const sql = 'CALL GetClssSubjectFromAdminUserId(?)';
//         const values = [userId];

//         const [rows] = await query(sql, values);

//         let filteredResults = [];

//         if (rows && rows.length > 0 && 'class_name' in rows[0]) {
//             filteredResults = rows.map(row => ({
//                 Class_Name: row.class_name,
//                 Class_Id: row.class_id,
//                 Section_Name: row.section_name,
//                 Section_Id: row.section_id
//             }));

//             return res.status(200).json({ data: filteredResults });
//         } else {
//             return res.status(404).json({ message: "No classes or sections found for the user" });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ status: false, message: error.message });
//     }
// };


const fetchAllClsSec_TT = async function(req, res) {
    const userId = req.params.userId;
  
    try {
      const sql = 'CALL GetClssSubjectFromAdminUserId(?)';
      const values = [userId];
  
      const [rows] = await query(sql, values);
  
      let filteredResults = [];
  
      if (rows && rows.length > 0 && 'class_name' in rows[0]) {
        // Create a map to store unique class and section combinations
        const classSectionMap = new Map();
  
        rows.forEach(row => {
          // Create a unique key combining class_id and section_id
          const key = `${row.class_id}_${row.section_id}`;
  
          // Check if the class and section combination is already in the map
          if (!classSectionMap.has(key)) {
            classSectionMap.set(key, {
              Class_Name: row.class_name,
              Class_Id: row.class_id,
              Section_Name: row.section_name,
              Section_Id: row.section_id
            });
          }
        });
  
        // Convert the map values to an array
        filteredResults = Array.from(classSectionMap.values());

        console.log(filteredResults)
  
        // Sort the results by class name and section name
        filteredResults.sort((a, b) => {
          if (a.Class_Name === b.Class_Name) {
            return a.Section_Name.localeCompare(b.Section_Name);
          }
          return a.Class_Name.localeCompare(b.Class_Name);
        });
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
  

module.exports={getSubject_Teacher_tt,fetchAllClsSec_TT}