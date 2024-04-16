import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCard, CCardBody, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Axios from 'axios';

import { fetchSection, updateSection, deleteSection } from 'src/api/APIAdmin'

import 'src/scss/_custom.scss'

const Section = () => {


    const [section, setSection] = useState([])
    const [visible, setVisible] = useState(false)
    const [editingSectionId, setEditingSectionId] = useState(null);
    const [updatedSectionName, setUpdatedSectionName] = useState('');
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [sectionToDelete, setSectionToDelete] = useState(null);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isFormValid = () => {
        return updatedSectionName.trim() !== '' ;
    };


    useEffect(() => {
        const fetchSectiondata = async () => {
          try {
            const fetched = await fetchSection(); 
            setSection(fetched.data);
          } catch (error) {
            console.log('error fetching section');
          }
        };
    
        fetchSectiondata();
    }, []);

    const handleEditClick = (sectionId, sectionName) => {
        setEditingSectionId(sectionId);
        setVisible(true);
        setUpdatedSectionName(sectionName);

    };

    const handleSaveClick = () => {


        if (!isFormValid()) {
            setErrorMessage('Please fill in the required field.');
            return;
        }



        updateSection( editingSectionId, {
            section_name: updatedSectionName,
        }).then((response) => {
            console.log(response);
                        setSuccessMessage('Section edited successfully!');
            setTimeout(() => {
                window.location.reload(); 
                }, 1000);
        })
        .catch((error) => {
            console.error('Error editing section.', error); 
            setErrorMessage('Error editing section. Please try again later.');
        });
    };


    const handleDeleteClick = (sectionId) => {
        setDeleteConfirmationVisible(true);
        setSectionToDelete(sectionId);
    };
    
    const handleConfirmDelete = () => {

        deleteSection( sectionToDelete)
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
                <Link to='/schooldetails' >
                    <CIcon icon={cilArrowThickLeft} /> Back
                </Link>
                <CRow>
                    <CCol className='d-flex flex-column justify-content-center align-items-center'>
                        <h2 className='text-center defaultcolor'>Section</h2>
                        <CCard className='w-75 shadow middle-card'>

                            <CCardBody>
                                {section.map((section) => (
                                    <div key={section.section_id} className="">
                                        <CCardBody>
                                            {editingSectionId === section.section_id && visible ? (
                                                <>
                                                  
                                                    <CAlert color="white" dismissible visible={visible} onClose={() => setVisible(false)}>
                                                        <strong>Enter Section Name :</strong>
                                                        <CInputGroup className="mb-4">
                                                            <CFormInput type="text" required tooltipFeedback 
                                                                value={updatedSectionName}
                                                                onChange={(e) => setUpdatedSectionName(e.target.value)}
                                                            />
                                                        </CInputGroup>
                                                        <CRow>
                                                            <CCol xs={12} className="text-center">
                                                                <CButton 
                                                                    className="px-4" 
                                                                    type="button" 
                                                                    shape="rounded-pill"
                                                                    onClick={() => handleSaveClick(editingSectionId)}
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
                                                            <strong>Section Name:</strong> {section.section_name}<br/>
                                                        </span>
                                                        <div>
                                                            <Link className="ls-grp" onClick={() => handleEditClick(section.section_id, section.section_name)}>
                                                                Edit
                                                            </Link><br/>
                                                            <Link className="ls-grp" onClick={() => handleDeleteClick(section.section_id)}>    
                                                                Delete
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    {deleteConfirmationVisible && sectionToDelete === section.section_id && (
                                                        <CAlert
                                                            color="warning"
                                                            dismissible
                                                            visible={deleteConfirmationVisible}
                                                            onClose={handleCancelDelete}
                                                        >
                                                            <strong>Confirm Delete</strong>
                                                            <p>Are you sure you want to delete Section?</p>
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

export default Section


