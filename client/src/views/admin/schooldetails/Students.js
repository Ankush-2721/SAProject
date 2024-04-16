import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCard, CCardBody, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Axios from 'axios';

import 'src/scss/_custom.scss'

import { fetchStudent, fetchClass, updateStudent, deleteStudent } from 'src/api/APIAdmin'

const Students = () => {


    const [student, setStudent] = useState([])
    const [visible, setVisible] = useState(false)
    const [editingStudentId, setEditingStudentId] = useState(null);
    const [updatedStudentName, setUpdatedStudentName] = useState('');
    const [updatedNumber, setUpdatedNumber] = useState('');
    const [updatedClass, setUpdatedClass] = useState('');
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const [classList, setClassList] = useState([]);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const fetchdata = async () => {
          try {
            const fetched = await fetchStudent(); 
            setStudent(fetched.data);
          } catch (error) {
            console.log('error fetching student');
          }
        };
    
        fetchdata();
    }, []);


    useEffect(() => {
        const fetchdata = async () => {
          try {
            const fetched = await fetchClass(); 
            setClassList(fetched.data);
          } catch (error) {
            console.log('error fetching class');
          }
        };
    
        fetchdata();
    }, []);

    const handleEditClick = (studentId, studentName, studentNumber, studentClass) => {
        setEditingStudentId(studentId);
        setVisible(true);
        setUpdatedStudentName(studentName);
        setUpdatedNumber(studentNumber);
        setUpdatedClass(studentClass);
    };


    const isFormValid = () => {
        const validNumber = /^\d{10}$/.test(updatedNumber);
        return updatedStudentName.trim() !== '' && validNumber && updatedClass ;
    };



    const handleNameChange = (e) => {
        const regex = /^[A-Za-z\s]+$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setUpdatedStudentName(e.target.value);
        }
      };
    
      const handleNumberChange = (e) => {
        const regex = /^\d{0,10}$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setUpdatedNumber(e.target.value);
        }
      };

    const handleSaveClick = () => {


        if (!isFormValid()) {
            setErrorMessage('Please fill in the required field.');
            return;
        }


        const selectedClass = classList.find((cls) => cls.class_name === updatedClass);


        updateStudent( editingStudentId , {
            studentName: updatedStudentName,
            studContact: updatedNumber,
            classId: selectedClass.class_id,
        }).then((response) => {
            console.log(response);
            setSuccessMessage('Student edited successfully!');
            setTimeout(() => {
                window.location.reload(); 
                }, 1000);
        })
        .catch((error) => {
            console.error('Error editing student.', error); 
            setErrorMessage('Error editing student. Please try again later.');
        });
    };



    const handleDeleteClick = (studentId) => {
        setDeleteConfirmationVisible(true);
        setStudentToDelete(studentId);
    };

  const handleConfirmDelete = () => {

    deleteStudent( studentToDelete)
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
                        <h2 className='text-center defaultcolor'>Students</h2>
                        <CCard className='w-75 shadow middle-card'>

                            <CCardBody>
                                {student.map((student) => (
                                    <div key={student.student_id} className="">
                                        <CCardBody>
                                            {editingStudentId === student.student_id && visible ? (
                                                <>
                                                    <CAlert color="white" dismissible visible={visible} onClose={() => setVisible(false)}>
                                                        <strong>Enter Student Name : </strong>
                                                        <CInputGroup className="mb-4">
                                                            <CFormInput type="text" required tooltipFeedback 
                                                                value={updatedStudentName}
                                                                onChange={handleNameChange}
                                                            />
                                                        </CInputGroup>
                                                        <strong>Enter Contact Number : </strong>
                                                        <CInputGroup className="mb-4">
                                                            <CFormInput type="text" required tooltipFeedback 
                                                                value={updatedNumber}
                                                                onChange={handleNumberChange}
                                                            />
                                                        </CInputGroup>
                                                        {/* <strong>Enter Class Name : </strong>
                                                        <CInputGroup className="mb-4">
                                                            <CFormInput type="text" required tooltipFeedback 
                                                                value={updatedClass}
                                                                onChange={(e) => setUpdatedClass(e.target.value)}
                                                            />
                                                        </CInputGroup> */}


                                                        <strong>Select Class Name : </strong>
                                                        <select
                                                            className="form-control borderRadius"
                                                            value={updatedClass}
                                                            onChange={(e) => {
                                                                setUpdatedClass(e.target.value);
                                                            }}
                                                        >
                                                            <option value="">Choose Class Teacher</option>
                                                            {classList.map(cls => (
                                                                <option key={cls.class_id} value={cls.class_name}>{cls.class_name}</option>
                                                            ))}
                                                        </select><br/>

                                                        <CRow>
                                                            <CCol xs={12} className="text-center">
                                                                <CButton 
                                                                    className="px-4" 
                                                                    type="button" 
                                                                    shape="rounded-pill"
                                                                    onClick={() => handleSaveClick(editingStudentId)}
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
                                                        <strong>Student Name:</strong> {student.student_name}<br/>
                                                        <strong>Contact Number:</strong> {student.student_contact}<br/>
                                                        <strong>Class Name:</strong> {student.class_name}<br/>
                                                    </span>
                                                    <div>
                                                        <Link className="ls-grp" onClick={() => handleEditClick(student.student_id, student.student_name, student.student_contact, student.class_name)}>
                                                            Edit
                                                        </Link><br/>
                                                        <Link className="ls-grp" onClick={() => handleDeleteClick(student.student_id)}>
                                                            Delete
                                                        </Link>
                                                    </div>
                                                </div>

                                                {deleteConfirmationVisible && studentToDelete === student.student_id && (
                                                    <CAlert
                                                        color="warning"
                                                        dismissible
                                                        visible={deleteConfirmationVisible}
                                                        onClose={handleCancelDelete}
                                                    >
                                                        <strong>Confirm Delete</strong>
                                                        <p>Are you sure you want to delete Student?</p>
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

export default Students
