import axios from 'axios';
import { Auth } from 'src/auth/AuthUser';

const userId = '90';

const apiUrl = 'http://103.239.171.133:5005';



// fetch for headadmin

export const fetchAdmin = async () => {
  try {
    const response = await axios.get(`${apiUrl}/fetchingAdminsForHD/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching admins:', error);
    throw error;
  }
};


export const fetchSchool = async () => {
  try {
    const response = await axios.get(`${apiUrl}/fetchingSchoolsForHD/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching schools:', error);
    throw error;
  }
};

export const fetchInstitute = async () => {
  try {
    const response = await axios.get(`${apiUrl}/fetchingInstituteForHD/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching institute:', error);
    throw error;
  }
};



//  Add or Register 

export const addSchool = async (userId, schoolName, schoolRegName, boardtype, address, pincode, city, state, country, email, number) => {
  try {
    const response = await axios.post(`${apiUrl}/schools`, {
      institutionId: userId,
      schoolName: schoolName,
      registrationNo: schoolRegName,
      boardType: boardtype,
      location: { address: address, pincode: pincode, city: city, state: state, country: country },
      schoolEmail: email,
      contactNo: number
    });
    return response.data;
  } catch (error) {
    console.error("Error adding school:", error);
    throw error;
  }
};


export const registerAdmin = async (adminName, email, number, selectedSchools) => {
  try {
    const response = await axios.post(`${apiUrl}/admins/${userId}`, { 
      Name: adminName,
      email: email,
      contactNo: number,
      schoolIds: selectedSchools.map((school) => school.school_id),
    });
    return response.data;
  } catch (error) {
    console.error("Error registering admin:", error);
    throw error;
  }
};


//  Edit 

export const editAdminByHD = async ( editingAdminId, updatedAdminData) => {
  try {
    const response = await axios.put(`${apiUrl}/editAdminByHD/${userId}/${editingAdminId}`, updatedAdminData);
    return response.data;
  } catch (error) {
    console.log('Error editing admin:', error);
    throw error;
  }
};


export const editSchoolByHD = async ( editingSchoolId, updatedSchoolData) => {
  try {
    const response = await axios.put(`${apiUrl}/editSchoolByHD/${userId}/${editingSchoolId}`, updatedSchoolData);
    return response.data;
  } catch (error) {
    console.log('Error editing school:', error);
    throw error;
  }
};



//  Delete

export const deleteAdmin = async ( adminToDelete) => {
  try {
    const response = await axios.delete(`${apiUrl}/deleteAdmin/${userId}/${adminToDelete}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting admin:', error);
    throw error;
  }
};


export const deleteSchool = async ( schoolToDelete) => {
  try {
    const response = await axios.delete(`${apiUrl}/deleteSchool/${userId}/${schoolToDelete}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting school:', error);
    throw error;
  }
};