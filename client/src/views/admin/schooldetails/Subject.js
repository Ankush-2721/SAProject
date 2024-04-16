import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCard, CCardBody, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Axios from 'axios';

import 'src/scss/_custom.scss'

import { fetchSubject, updateSubject, deleteSubject } from 'src/api/APIAdmin'

const Subject = () => {


    const [subject, setSubject] = useState([])
    const [visible, setVisible] = useState(false)
    const [editingSubjectId, setEditingSubjectId] = useState(null);
    const [updatedSubjectName, setUpdatedSubjectName] = useState('');
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState(null);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isFormValid = () => { 
        return updatedSubjectName.trim() !== '' ;
    };


    useEffect(() => {
        const fetchSubjectdata = async () => {
          try {
            const fetched = await fetchSubject(); 
            setSubject(fetched.data);
          } catch (error) {
            console.log('error fetching subject');
          }
        };
    
        fetchSubjectdata();
    }, []);


    const handleEditClick = (subjectId, subjectName) => {
        setEditingSubjectId(subjectId);
        setVisible(true);
        setUpdatedSubjectName(subjectName);

    };



    const handleSaveClick = () => {

        if (!isFormValid()) {
            setErrorMessage('Please fill in the required field.');
            return;
        }


        updateSubject( editingSubjectId, {
            subject_name: updatedSubjectName,
        }).then((response) => {
            console.log(response);
            setSuccessMessage('Subject edited successfully!');
            setTimeout(() => {
                window.location.reload(); 
                }, 1000);
        })
        .catch((error) => {
            console.error('Error editing subject.', error); 
            setErrorMessage('Error editing subject. Please try again later.');
        });
    };


    const handleDeleteClick = (subjectId) => {
        setDeleteConfirmationVisible(true);
        setSubjectToDelete(subjectId);
    };
    
    const handleConfirmDelete = () => {

        deleteSubject( subjectToDelete)
        .then((response) => {
        console.log(response);
        setDeleteConfirmationVisible(false);
        window.location.reload();

        })
        .catch((error) => {
        console.error("Error deleting subject:", error);
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
                <Link to='/schooldetails' >
                    <CIcon icon={cilArrowThickLeft} /> Back
                </Link>
                <CRow>
                    <CCol className='d-flex flex-column justify-content-center align-items-center'>
                        <h2 className='text-center defaultcolor'>Subject</h2>
                        <CCard className='w-75 shadow middle-card'>

                            <CCardBody>
                                {subject.map((subject) => (
                                    <div key={subject.subject_id} className="">
                                        <CCardBody>
                                            {editingSubjectId === subject.subject_id && visible ? (
                                                <>
                                                    <CAlert color="white" dismissible visible={visible} onClose={() => setVisible(false)}>
                                                        <strong>Enter Subject Name :</strong>
                                                        <CInputGroup className="mb-4">
                                                            <CFormInput type="text" required tooltipFeedback 
                                                                value={updatedSubjectName}
                                                                onChange={(e) => setUpdatedSubjectName(e.target.value)}
                                                            />
                                                        </CInputGroup>
                                                        <CRow>
                                                            <CCol xs={12} className="text-center">
                                                                <CButton 
                                                                    className="px-4" 
                                                                    type="button" 
                                                                    shape="rounded-pill"
                                                                    onClick={() => handleSaveClick(editingSubjectId)}
                                                                    disabled={!isFormValid()}
                                                                >
                                                                    Save
                                                                </CButton>
                                                                {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                                                {successMessage && <div className="text-success">{successMessage}</div>}
                                                                {!isFormValid() && <div className="text-danger">Please fill in the required field.</div>}
                                                            </CCol>
                                                        </CRow>
                                                    </CAlert>
                                                </>
                                            ) : (
                                                <>
                                                    

                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>
                                                        <strong>Subject Name:</strong> {subject.subject_name}<br/>
                                                    </span>
                                                    <div>
                                                        <Link className="ls-grp" onClick={() => handleEditClick(subject.subject_id, subject.subject_name)}>
                                                            Edit
                                                        </Link><br/>
                                                        <Link className="ls-grp" onClick={() => handleDeleteClick(subject.subject_id)}>
                                                            Delete
                                                        </Link>
                                                    </div>
                                                </div>

                                                    {deleteConfirmationVisible && subjectToDelete === subject.subject_id && (
                                                        <CAlert
                                                            color="warning"
                                                            dismissible
                                                            visible={deleteConfirmationVisible}
                                                            onClose={handleCancelDelete}
                                                        >
                                                            <strong>Confirm Delete</strong>
                                                            <p>Are you sure you want to delete Subject ?</p>
                                                            <CButton color="danger" onClick={handleConfirmDelete}>
                                                                Yes, delete
                                                            </CButton>
                                                            <CButton color="secondary" onClick={handleCancelDelete}>
                                                                Cancel
                                                            </CButton>
                                                        </CAlert>
                                                    )}
                                                </>
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
  )
}

export default Subject
