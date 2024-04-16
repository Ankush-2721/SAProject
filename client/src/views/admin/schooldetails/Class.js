import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCard, CCardBody, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import { fetchClass, updateClass, deleteClass } from 'src/api/APIAdmin'

import Axios from 'axios';

import 'src/scss/_custom.scss'

const Class = () => {


    const [classes, setClasses] = useState([])
    const [visible, setVisible] = useState(false)
    const [editingClassId, setEditingClassId] = useState(null);
    const [updatedClassName, setUpdatedClassName] = useState('');
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [classToDelete, setClassToDelete] = useState(null);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  

    const isFormValid = () => {
        return updatedClassName.trim() !== '' ;
    };


    useEffect(() => {
        const fetchClassdata = async () => {
          try {
            const fetched = await fetchClass(); 
            setClasses(fetched.data);
          } catch (error) {
            console.log('error fetching class');
          }
        };
    
        fetchClassdata();
    }, []);


    const handleEditClick = (classId, className) => {
        setEditingClassId(classId);
        setVisible(true);
        setUpdatedClassName(className);
    };



    const handleSaveClick = () => {

        if (!isFormValid()) {
            setErrorMessage('Please fill in the required field.');
            return;
        }


        updateClass( editingClassId, {
            className: updatedClassName.trim(),
        }).then((response) => {
            console.log(response);
            setSuccessMessage('Class edited successfully!');
            setTimeout(() => {
                window.location.reload(); 
                }, 1000);
        })
        .catch((error) => {
            console.error('Error editing class.', error); 
            setErrorMessage('Error editing class. Please try again later.');
        });
    };

    const handleDeleteClick = (classId) => {
        setDeleteConfirmationVisible(true);
        setClassToDelete(classId);
    };


    
    const handleConfirmDelete = () => {


        deleteClass( classToDelete)
        .then((response) => {
        console.log(response);
        setDeleteConfirmationVisible(false);
        window.location.reload();

        })
        .catch((error) => {
        console.error("Error deleting class:", error);
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
                        <h2 className='text-center defaultcolor'>Class</h2>
                        <CCard className='w-75 shadow middle-card'>
                            <CCardBody>
                                {classes.map((classItem) => (
                                    <div key={classItem.class_id} className="">
                                        <CCardBody>
                                            {editingClassId === classItem.class_id && visible ? (
                                                <>
                                                    
                                                    <CAlert color="white" dismissible visible={visible} onClose={() => setVisible(false)}>
                                                        <strong>Enter Class Name :</strong>
                                                        <CInputGroup className="mb-4">
                                                            <CFormInput type="text" required tooltipFeedback 
                                                                value={updatedClassName}
                                                                onChange={(e) => setUpdatedClassName(e.target.value)}
                                                            />
                                                        </CInputGroup>
                                                        <CRow>
                                                            <CCol xs={12} className="text-center">
                                                                <CButton 
                                                                    className="px-4" 
                                                                    type="button" 
                                                                    shape="rounded-pill"
                                                                    onClick={() => handleSaveClick(editingClassId)}
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
                                                        <strong>Class Name:</strong> {classItem.class_name}<br/>
                                                    </span>
                                                    <div>
                                                        <Link className="ls-grp" onClick={() => handleEditClick(classItem.class_id, classItem.class_name)}>
                                                            Edit
                                                        </Link><br/>
                                                        <Link className="ls-grp" onClick={() => handleDeleteClick(classItem.class_id)}>
                                                            Delete
                                                        </Link>
                                                    </div>
                                                </div>
                                                        
                                                {deleteConfirmationVisible && classToDelete === classItem.class_id && (
                                                    <CAlert
                                                        color="warning"
                                                        dismissible
                                                        visible={deleteConfirmationVisible}
                                                        onClose={handleCancelDelete}
                                                    >
                                                        <strong>Confirm Delete</strong>
                                                        <p>Are you sure you want to delete Class?</p>
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


export default Class


