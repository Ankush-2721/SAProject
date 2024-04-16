import axios from 'axios';

const userId = "45";
const schoolId = "20"

const apiUrl = 'http://103.239.171.133:5005';


// Fetch 

export const fetchClass = async () => {
    try {
      const response = await axios.get(`${apiUrl}/classdata/${schoolId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching class:', error);
      throw error;
    }
};


export const fetchSection = async () => {
    try {
      const response = await axios.get(`${apiUrl}/sectiondata/${schoolId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching section:', error);
      throw error;
    }
};


export const fetchTeacher = async () => {
    try {
      const response = await axios.get(`${apiUrl}/teacherdata/${schoolId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching teacher:', error);
      throw error;
    }
};


export const fetchSubject = async () => {
    try {
      const response = await axios.get(`${apiUrl}/subjectdata/${schoolId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subject:', error);
      throw error;
    }
};


export const fetchStudentsFromClass = async (classId) => {
  try {
      const response = await axios.get(`${apiUrl}/getStudentFrom_Class/${classId}`);
      return response.data;
  } catch (error) {
      throw new Error('Error fetching student data from class');
  }
}


export const fetchClassSection = async () => {
  try {
      const response = await axios.get(`${apiUrl}/getClass_Section_admin/${schoolId}`);
      return response.data;
  } catch (error) {
      throw new Error('Error fetching student data from class');
  }
}


export const fetchClassSubTeacher = async () => {
  try {
      const response = await axios.get(`${apiUrl}/getClsSecTeachSub_For_admin/${schoolId}`);
      return response.data;
  } catch (error) {
      throw new Error('Error fetching class subject teacher');
  }
}


export const fetchStudent = async () => {
  try {
      const response = await axios.get(`${apiUrl}/studentdata/${schoolId}`);
      return response.data;
  } catch (error) {
      throw new Error('Error fetching student');
  }
}


export const fetchStudentClass = async () => {
  try {
      const response = await axios.get(`${apiUrl}/getStudents_Class_For_admin/${schoolId}`);
      return response.data;
  } catch (error) {
      throw new Error('Error fetching student class');
  }
}


// Add or Register

export const registerTeacher = async (teacherData) => {
    try {
      const response = await axios.post(`${apiUrl}/teachers/${userId}/${schoolId}`, teacherData);
      return response.data;
    } catch (error) {
      console.log('Error registering teacher:', error);
      throw error;
    }
};


export const addClass = async (classData) => {
    try {
    const response = await axios.post(`${apiUrl}/addingClass/${userId}/${schoolId}`, classData);
    return response.data;
    } catch (error) {
    console.log('Error adding class:', error);
    throw error;
    }
};

export const addSection = async (sectionData) => {
    try {
    const response = await axios.post(`${apiUrl}/addingSection/${userId}/${schoolId}`, sectionData);
    return response.data;
    } catch (error) {
    console.log('Error adding section:', error);
    throw error;
    }
};

export const addSubject = async (subjectData) => {
    try {
    const response = await axios.post(`${apiUrl}/addingSubject/${userId}/${schoolId}`, subjectData);
    return response.data;
    } catch (error) {
    console.log('Error adding subject:', error);
    throw error;
    }
};


export const addClassSection = async (classSectionData) => {
    try {
    const response = await axios.post(`${apiUrl}/Assigning_Sub_For_Class_Sec`, classSectionData);
    return response.data;
    } catch (error) {
    console.log('Error adding class section:', error);
    throw error;
    }
};


export const addSubjectTeacher = async (data) => {
    try {
    const response = await axios.post(`${apiUrl}/Assigning_Sub_For_Teach`, data);
    return response.data;
    } catch (error) {
    console.log('Error adding subject teacher:', error);
    throw error;
    }
};


export const registerStudent = async (studentData) => {
  try {
    const response = await axios.post(`${apiUrl}/students/${userId}/${schoolId}`, studentData);
    return response.data;
  } catch (error) {
    console.log('Error registering student:', error);
    throw error;
  }
};


export const addStudentClass = async (data) => {
  try {
  const response = await axios.post(`${apiUrl}/Adding_Class_Sec_For_Stud`, data);
  return response.data;
  } catch (error) {
  console.log('Error adding subject teacher:', error);
  throw error;
  }
};



//  update or Edit 


export const updateTeacher = async ( editingTeacherId, data) => {
  try {
    const response = await axios.put(`${apiUrl}/updateTeacher/${userId}/${editingTeacherId}`, data);
    return response.data;
  } catch (error) {
    console.log('Error updating teacher:', error);
    throw error;
  }
};


export const updateClass = async (editingClassId, data) => {
  try {
    const response = await axios.put(`${apiUrl}/updateClass/${userId}/${editingClassId}`, data);
    return response.data;
  } catch (error) {
    console.log('Error updating class:', error);
    throw error;
  }
};


export const updateSection = async ( editingSectionId, data) => {
  try {
    const response = await axios.put(`${apiUrl}/updateSection/${userId}/${editingSectionId}`, data);
    return response.data;
  } catch (error) {
    console.log('Error updating section:', error);
    throw error;
  }
};


export const updateSubject = async ( editingSubjectId, data) => {
  try {
    const response = await axios.put(`${apiUrl}/updateSubject/${userId}/${editingSubjectId}`, data);
    return response.data;
  } catch (error) {
    console.log('Error updating subject:', error);
    throw error;
  }
};


export const updateClassSection = async ( editingClsSecId, data) => {
  try {
    const response = await axios.put(`${apiUrl}/updateClassSection/${userId}/${editingClsSecId}`, data);
    return response.data;
  } catch (error) {
    console.log('Error updating class section:', error);
    throw error;
  }
};


export const updateClassSubTeacher = async ( editingClsSubTeaId, data) => {
  try {
    const response = await axios.put(`${apiUrl}/updateClsSecSubTea/${userId}/${editingClsSubTeaId}`, data);
    return response.data;
  } catch (error) {
    console.log('Error updating class section:', error);
    throw error;
  }
};


export const updateStudent = async ( editingStudentId, data) => {
  try {
    const response = await axios.put(`${apiUrl}/updateStudent/${userId}/${editingStudentId}`, data);
    return response.data;
  } catch (error) {
    console.log('Error updating student:', error);
    throw error;
  }
};


export const updateStudentClass = async ( editingStdClsId, data) => {
  try {
    const response = await axios.put(`${apiUrl}/addStudentsInStudCls/${userId}/${editingStdClsId}`, data);
    return response.data;
  } catch (error) {
    console.log('Error updating student class:', error);
    throw error;
  }
};

//  Delete

export const deleteTeacher = async ( teacherToDelete) => {
  try {
    const response = await axios.delete(`${apiUrl}/deleteTeacher/${userId}/${teacherToDelete}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting teacher:', error);
    throw error;
  }
};


export const deleteClass = async ( classToDelete) => {
  try {
    const response = await axios.delete(`${apiUrl}/deleteClass/${userId}/${classToDelete}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting class:', error);
    throw error;
  }
};


export const deleteSection = async ( sectionToDelete) => {
  try {
    const response = await axios.delete(`${apiUrl}/deleteSection/${userId}/${sectionToDelete}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting section:', error);
    throw error;
  }
};

export const deleteSubject = async (subjectToDelete) => {
  try {
    const response = await axios.delete(`${apiUrl}/deleteSubject/${userId}/${subjectToDelete}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting subject:', error);
    throw error;
  }
};


export const deleteClassSection = async ( clsSecToDelete) => {
  try {
    const response = await axios.delete(`${apiUrl}/deleteClassSection/${userId}/${clsSecToDelete}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting class section:', error);
    throw error;
  }
};


export const deleteClassSubTeacher = async ( clsSecToDelete) => {
  try {
    const response = await axios.delete(`${apiUrl}/deleteClassSection/${userId}/${clsSecToDelete}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting class section:', error);
    throw error;
  }
};


export const deleteStudent = async ( studentToDelete) => {
  try {
    const response = await axios.delete(`${apiUrl}/deleteStudent/${userId}/${studentToDelete}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting class section:', error);
    throw error;
  }
};


export const deleteStudentClass = async ( stdClsToDelete) => {
  try {
    const response = await axios.delete(`${apiUrl}/deleteClsStudent/${stdClsToDelete}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting class section:', error);
    throw error;
  }
};