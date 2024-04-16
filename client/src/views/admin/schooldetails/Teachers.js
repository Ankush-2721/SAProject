import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCard, CCardBody, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Axios from 'axios';

import { fetchTeacher, updateTeacher, deleteTeacher } from 'src/api/APIAdmin'

import 'src/scss/_custom.scss'

const Teachers = () => {


  const [teacher, setTeacher] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [updatedTeacherName, setUpdatedTeacherName] = useState('');
  const [updatedTeacherEmail, setUpdatedTeacherEmail] = useState('');
  const [updatedTeacherContact, setUpdatedTeacherContact] = useState('');
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const fetchTeacherdata = async () => {
      try {
        const fetched = await fetchTeacher(); 
        setTeacher(fetched.data);
      } catch (error) {
        console.log('error fetching teacher');
      }
    };

    fetchTeacherdata();
  }, []);


  const handleEditClick = (teacherId, teacherName, teacherEmail, teacherContact) => {
    setEditingTeacherId(teacherId);
    setVisible(true);
    setUpdatedTeacherName(teacherName);
    setUpdatedTeacherEmail(teacherEmail);
    setUpdatedTeacherContact(teacherContact);
  };


  const handleNameChange = (e) => {
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setUpdatedTeacherName(e.target.value);
    }
  };

  const handleNumberChange = (e) => {
    // Allow only 10 digits
    const regex = /^\d{0,10}$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setUpdatedTeacherContact(e.target.value);
    }
  };


  const isFormValid = () => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedTeacherEmail);
    const validNumber = /^\d{10}$/.test(updatedTeacherContact);
    return updatedTeacherName.trim() !== '' && validEmail && validNumber ;
  };


  const handleSaveClick = () => {

    if (!isFormValid()) {
      setErrorMessage('Please fill in all the required fields.');
      return;
    }


    updateTeacher( editingTeacherId, {
      teacher_name: updatedTeacherName,
      teacher_email: updatedTeacherEmail,
      teacher_contact: updatedTeacherContact,
    }).then((response) => {
      console.log(response);
      setSuccessMessage('Teacher edited successfully!');
      setTimeout(() => {
          window.location.reload(); 
        }, 1000);
    })
    .catch((error) => {
      console.error('Error editing teacher.', error); 
      setErrorMessage('Error editing teacher. Please try again later.');
    });
  };

  const handleDeleteClick = (teacherId) => {
    setDeleteConfirmationVisible(true);
    setTeacherToDelete(teacherId);
  };

  const handleConfirmDelete = () => {

    deleteTeacher( teacherToDelete)
    .then((response) => {
      console.log(response);
      setDeleteConfirmationVisible(false);
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error deleting section:", error);
      setDeleteConfirmationVisible(false);
    });

  };

  const handleCancelDelete = () => {
    setDeleteConfirmationVisible(false);
  };

  return (
    <div>
      <AdminHeader />
      <div className='add-div'>
        <Link to='/schooldetails'>
          <CIcon icon={cilArrowThickLeft} /> Back
        </Link>
        <CRow>
          <CCol className='d-flex flex-column justify-content-center align-items-center'>
            <h2 className='text-center defaultcolor'>Teachers</h2>
            <CCard className='w-75 shadow middle-card'>
              <CCardBody>
                {teacher.map((teachers) => (
                  <div key={teachers.teacher_id} className="">
                    <CCardBody>
                      {editingTeacherId === teachers.teacher_id && visible ? (
                        <>
                          <CAlert color='white' dismissible visible={visible} onClose={() => setVisible(false)}>
                            <strong>Name:</strong> 
                            <CInputGroup className="mb-4">
                              <CFormInput
                                type="name"
                                required
                                tooltipFeedback
                                value={updatedTeacherName}
                                onChange={handleNameChange}
                              />
                            </CInputGroup>
                            <strong>Email:</strong>
                            <CInputGroup className="mb-4">
                              <CFormInput
                                type="email"
                                required
                                tooltipFeedback
                                value={updatedTeacherEmail}
                                onChange={(e) => setUpdatedTeacherEmail(e.target.value)}
                              />
                            </CInputGroup>
                            <strong>Contact:</strong>
                            <CInputGroup className="mb-4">
                              <CFormInput
                                type="tel"
                                required
                                tooltipFeedback
                                value={updatedTeacherContact}
                                onChange={handleNumberChange}
                              />
                            </CInputGroup>
                          </CAlert>
                          <CRow>
                            <CCol xs={12} className="text-center">
                              <CButton 
                                className="px-4" 
                                type="submit" 
                                shape="rounded-pill" 
                                onClick={() => handleSaveClick(editingTeacherId)}
                                disabled={!isFormValid()}
                              >
                                Save
                              </CButton>
                              {errorMessage && <div className="text-danger">{errorMessage}</div>}
                              {successMessage && <div className="text-success">{successMessage}</div>}
                              {!isFormValid() && <div className="text-danger">Please fill in all the required fields.</div>}
                            </CCol>
                          </CRow>
                        </>
                      ) : (
                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            <strong>Name:</strong> {teachers.teacher_name}<br/>
                            <strong>Email:</strong> {teachers.teacher_email}<br/>
                            <strong>Contact:</strong> {teachers.teacher_contact}
                          </span>
                          <div>
                            <Link className="ls-grp" onClick={() => handleEditClick(teachers.teacher_id, teachers.teacher_name, teachers.teacher_email, teachers.teacher_contact)}>
                              Edit
                            </Link><br/>
                            <Link className="ls-grp" onClick={() => handleDeleteClick(teachers.teacher_id)}>
                              Delete
                            </Link>
                          </div>
                        </div>
                      )}
                      {deleteConfirmationVisible && teacherToDelete === teachers.teacher_id && (
                        <CAlert dismissible visible={deleteConfirmationVisible} onClose={handleCancelDelete}>
                          <strong>Confirm Delete</strong>
                          <p>Are you sure you want to delete Teacher ?</p>
                          <CButton color="danger" onClick={handleConfirmDelete}>
                            Yes, delete
                          </CButton>
                          <CButton color="secondary" onClick={handleCancelDelete}>
                            Cancel
                          </CButton>
                        </CAlert>
                      )}
                    </CCardBody>
                  </div>
                ))}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </div>
  );
};

export default Teachers;


