
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


const registerHeadAdmin = async (req, res) => {
    try {

        const { Name,userEmail, contactNo } = req.body;
        
        if ( !Name||!userEmail || !contactNo) {
            return res.status(400).send({ status: false, message: "Please provide username, email, and contact number (they are mandatory)" });
        }

        const encryptedEmail = encryptString(userEmail);

        const sql = 'SELECT * FROM tbl_user WHERE userEmail = ?';
        const [existingUser] = await query(sql, [encryptedEmail]);
        
        if (existingUser) {
            return res.status(400).send({ status: false, message: "User already exists" });
        }

        const admin="HeadAdmin"
        // Generate a username from email
        const username = generateUsername(userEmail);

        // Generate a random password
        const password = generateRandomPassword();

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserQuery = 'INSERT INTO tbl_user (name,userName, userEmail, userPassword, userNumber,userType) VALUES (?, ?, ?, ?, ?, ?)';
        await query(insertUserQuery, [Name,username, encryptedEmail, hashedPassword, contactNo,admin]);

        return res.status(200).send({ status: true, message: "User registered successfully", username, password });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { userNameOrEmail, userPassword } = req.body;

        if (!userNameOrEmail || !userPassword) {
            return res.status(400).send({ status: false, message: "Please provide username or email and password (they are mandatory)" });
        }

        const usernameQuery = 'SELECT * FROM tbl_user WHERE userName = ?';
        let userData = await query(usernameQuery, [userNameOrEmail]);

        if (!userData || userData.length === 0) {
            const encryptedEmail = encryptString(userNameOrEmail);
        
            const emailQuery = 'SELECT * FROM tbl_user WHERE userEmail = ?';
            userData = await query(emailQuery, [encryptedEmail]);

            if (!userData || userData.length === 0) {
                return res.status(404).send({ status: false, message: "Please provide valid username or email" });
            }
        }

        const validPassword = await bcrypt.compare(userPassword, userData[0].userPassword);

        if (!validPassword) return res.status(400).send({ status: false, message: "Invalid Password" });

        const token = jwt.sign({ userId: userData[0].user_id }, "Tekhnologiya", { expiresIn: '12hr' });
      

        const tokenData = {
            userId: userData[0].user_id,
            userRole:  userData[0].userType,
            token: token
        };

        return res.status(200).send({ status: true, message: "User login successful", data: tokenData });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};
        


// const loginUser = async (req, res) => {
//     try {
//         const { userNameOrEmail, userPassword } = req.body;

//         if (!userNameOrEmail || !userPassword) {
//             return res.status(400).send({ status: false, message: "Please provide username or email and password (they are mandatory)" });
//         }

//         let userData = null;

//         // Check if the input is an email
//         if (userNameOrEmail.includes('@')) {
//             // If it's an email, decrypt it (assuming encryptString is a reversible function)
//             const decryptedEmail = decryptString(userNameOrEmail);
//             const emailQuery = 'SELECT * FROM tbl_user WHERE userEmail = ?';
//             userData = await query(emailQuery, [decryptedEmail]);
//         } else {
//             // If it's a username, query with the username directly
//             const usernameQuery = 'SELECT * FROM tbl_user WHERE userName = ?';
//             userData = await query(usernameQuery, [userNameOrEmail]);
//         }

//         if (!userData || userData.length === 0) {
//             return res.status(404).send({ status: false, message: "Please provide valid username or email" });
//         }

//         const validPassword = await bcrypt.compare(userPassword, userData[0].userPassword);

//         if (!validPassword) return res.status(400).send({ status: false, message: "Invalid Password" });

//         const token = jwt.sign({ userId: userData[0].user_id }, "Tekhnologiya", { expiresIn: '12hr' });

//         const tokenData = {
//             userId: userData[0].user_id,
//             userRole:  userData[0].userType,
//             token: token
//         };

//         return res.status(200).send({ status: true, message: "User login successful", data: tokenData });
//     } catch (err) {
//         return res.status(500).send({ status: false, message: err.message });
//     }
// };
     







const registerSchool = async (req, res) => {
    try {
        const {institutionId, schoolName, registrationNo, boardType, location, schoolEmail, contactNo } = req.body;
        
        if ( !institutionId || !schoolName || !registrationNo || !boardType || !location || !schoolEmail || !contactNo) {
            return res.status(400).send({ status: false, message: "Please provide school name, registration number, board type, location, Email Id, and Contact Number (they are mandatory)" });
        }

        // Destructure location object
        const { address, pincode, city, state, country } = location;

        // Check if the school already exists
        const checkSchoolQuery = 'SELECT * FROM tbl_school WHERE school_reg_no = ? AND school_status=1';
        const [existingSchool] = await query(checkSchoolQuery, [registrationNo]);
        
        if (existingSchool) {
            return res.status(400).send({ status: false, message: "School with this registration number already exists" });
        }

        // Insert school information into the database
        const insertSchoolQuery = 'INSERT INTO tbl_school (institute_id, school_name, school_reg_no, board_type, school_address, school_pincode, school_city, school_state, school_country, school_email_id, school_contact_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await query(insertSchoolQuery, [institutionId, schoolName, registrationNo, boardType, address, pincode, city, state, country, schoolEmail, contactNo]);

        return res.status(200).send({ status: true, message: "School information added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
}


const fetchingSchoolsForHeadAdmin = async (req, res) => {
    try {
        const userId = req.params.userId;
        const sql = 'SELECT school_id, school_name, school_reg_no, board_type, school_address, school_pincode, school_city, school_state, school_country, school_email_id, school_contact_no FROM tbl_school WHERE institute_id = ? AND school_status = 1';
        const schools = await query(sql, [userId]);

        if (!schools || schools.length === 0) {
            return res.status(400).send({ status: false, message: "Schools not found in DB" });
        }

        return res.status(200).send({ status: true, data: schools });

    } catch (error) {
        console.error("Error fetching schools for admin:", error);
        return res.status(500).send({ status: false, message: "Internal Server Error" });
    }
};
  

const addAdmin = async (req, res) => {
    try {
        const { hAdmin_Id } = req.params;
        const { Name, email, contactNo, schoolIds } = req.body;

        if (!Name || !email || !contactNo || !schoolIds || schoolIds.length === 0) {
            return res.status(400).send({ status: false, message: "Please provide name, email, contact, and at least one schoolId (they are mandatory)" });
        }

        // Check if the user already exists
        const encryptedEmail = encryptString(email);

        const checkUserQuery = 'SELECT * FROM tbl_admin WHERE admin_email_id = ? AND admin_status=1';

        const [existingUser] = await query(checkUserQuery, [email]);

        if (existingUser) {
            return res.status(400).send({ status: false, message: "User already exists" });
        }

        const admin = "SchoolAdmin";

        // Generate a username from email
        const username = generateUsername(email);

        // Generate a random password
        const password = generateRandomPassword();

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into tbl_user
        const insertUserQuery = 'INSERT INTO tbl_user (name, userName, userEmail, userPassword, userNumber, userType) VALUES (?, ?, ?, ?, ?, ?)';
        const userInsertResult = await query(insertUserQuery, [Name, username, encryptedEmail, hashedPassword, contactNo, admin]);

        if (userInsertResult.affectedRows === 0) {
            return res.status(500).send({ status: false, message: 'Failed to create user' });
        }    
        const userId = userInsertResult.insertId;

        // Insert admin into tbl_admin
        const insertAdminQuery = 'INSERT INTO tbl_admin (admin_name, admin_contact_no, admin_email_id, admin_user_id, admin_school_id, created_by) VALUES (?, ?, ?, ?, ?, ?)';
        for (const schoolId of schoolIds) {
            const adminInsertResult = await query(insertAdminQuery, [Name, contactNo, email, userId, schoolId, hAdmin_Id]);
            if (adminInsertResult.affectedRows === 0) {
                console.error(`Failed to create admin for schoolId ${schoolId}`);
            }
        }
        return res.status(200).json({ status: true, message: 'Admin registered successfully.', data: { AdminUserName: username, AdminPass: password, UserRoll: admin } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: err.message });
    }
};



    const fetchingAdminsForHeadAdmin = async (req, res) => {
    try {
        const userId = req.params.userId;

        const sql = 'CALL GetAdminsByInstituteID(?)';
        const values = [userId];
    
          const [rows] = await query(sql, values)
          console.log(rows)
        
          return res.status(200).send({ status: true, data: rows });
        } catch (error) {
          console.error(error);
          return res.status(500).send({ status: false, message: error.message });
        }
      }
    


      const fetchinginstituteForHeadAdmin = async (req, res) => {
        try {
            const userId = req.params.userId;
            const sql = 'SELECT user_id,name FROM tbl_user WHERE user_id = ?';
            const institutes = await query(sql, [userId]);
    
            if (!institutes || institutes.length === 0) {
                return res.status(400).send({ status: false, message: "Institutes not found in DB" });
            }
    
            return res.status(200).send({ status: true, data: institutes });
    
        } catch (error) {
            console.error("Error fetching institutes for headadmin:", error);
            return res.status(500).send({ status: false, message: "Internal Server Error" });
        }
    };
    
    const editAdmin = async (req, res) => {
        try {
            const { adminId, userId } = req.params;
            const { admin_name, admin_email_id, admin_contact, admin_school_id } = req.body;

            console.log(admin_name, admin_email_id, admin_contact,admin_school_id)
            console.log(adminId, userId)
    
            // Check if required fields are missing or empty
            if (!adminId || !userId ||!admin_name || !admin_email_id || !admin_contact || !admin_school_id) {
                return res.status(400).json({ status: false, message: "Please provide adminId, userId, admin_name, admin_email_id, admin_contact, and admin_school_id" });
            }
    
            const updateQuery = 'UPDATE tbl_admin SET admin_name = ?, admin_contact_no = ?, admin_email_id = ?, admin_school_id = ?, admin_status = 1, updated_by = ? WHERE admin_id = ?';
    
            const result = await query(updateQuery, [admin_name, admin_contact, admin_email_id, admin_school_id, userId, adminId]);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ status: false, message: "Admin not found" });
            }
    
            return res.status(200).json({ status: true, message: "Admin information updated successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    };
    
    
    const deactivateAdmin = async (req, res) => {
        try {
            const {  userId, adminId,} = req.params;
    
            if (!adminId || !userId) {
                return res.status(400).json({ status: false, message: 'Please provide valid admin_id and hdUserId' });
            }
    
            // Update the admin_status to 0 and set updated_by to hdUserId
            const updateAdminQuery = `
                UPDATE tbl_admin SET admin_status = 0, updated_by = ? WHERE admin_id = ?
            `;
    
            const result = await query(updateAdminQuery, [userId, adminId]);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ status: false, message: 'Admin not found or no changes made' });
            }
    
            return res.status(200).json({ status: true, message: 'Admin deactivated successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: 'Internal server error' });
        }
    };
    
    const editSchool = async (req, res) => {
        const { schoolId, userId } = req.params;
        const {
            schoolName,
            registrationNo,
            boardType,
            location,
            schoolEmail,
            contactNo
        } = req.body;
    
        // Check if required fields are missing
        if (!schoolId || !userId || !schoolName || !registrationNo || !boardType || !location || !schoolEmail || !contactNo) {
            return res.status(400).json({ status: false, message: 'Please provide all required fields.' });
        }
    
        // Destructure location object
        const { address, pincode, city, state, country } = location;
    
        try {
            // Assuming you have a table called tbl_school to store school information
            // Update the school information where schoolId matches
            const updateSchoolQuery = `
                UPDATE tbl_school 
                SET 
                school_name = ?,
                    school_reg_no = ?,
                    board_type = ?,
                    school_address = ?,
                    school_pincode = ?,
                    school_city = ?,
                    school_state = ?,
                    school_country = ?,
                    school_email_id = ?,
                    school_contact_no = ?,
                    updated_by = ?
                WHERE school_id = ?
            `;
    
            const updateValues = [
                schoolName,
                registrationNo,
                boardType,
                address,
                pincode,
                city,
                state,
                country,
                schoolEmail,
                contactNo,
                userId,
                schoolId
            ];
    
            const result = await query(updateSchoolQuery, updateValues);
    
            if (result.affectedRows > 0) {
                return res.status(200).json({ status: true, message: 'School information updated successfully.' });
            } else {
                return res.status(404).json({ status: false, message: 'School not found or no changes made.' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: 'Internal server error.' });
        }
    };
    
    
    const deactivateSchool = async (req, res) => {
        try {
            const { userId, schoolId } = req.params;
    
            if (!schoolId || !userId) {
                return res.status(400).json({ status: false, message: 'Please provide valid schoolId and userId' });
            }
    
            // Update the school_status to 0 and set updated_by to userId
            const updateSchoolQuery = `
                UPDATE tbl_school SET school_status = 0,  updated_by = ? WHERE school_id = ? `;
    
            const result = await query(updateSchoolQuery, [userId, schoolId]);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ status: false, message: 'School not found or no changes made' });
            }
    
            return res.status(200).json({ status: true, message: 'School deactivated successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: 'Internal server error' });
        }
    };





module.exports = { registerHeadAdmin, loginUser, registerSchool,addAdmin,fetchingSchoolsForHeadAdmin,fetchingAdminsForHeadAdmin,fetchinginstituteForHeadAdmin,editAdmin,deactivateAdmin,editSchool,deactivateSchool}























