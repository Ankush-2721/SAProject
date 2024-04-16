import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCard, CCardBody, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Axios from 'axios';

import 'src/scss/_custom.scss'

import { fetchStudentClass, fetchStudent, updateStudentClass, deleteStudentClass } from 'src/api/APIAdmin'

const StudentClass = () => {

 
    const [stdcls, setStdCls] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editingStdClsId, setEditingStdClsId] = useState(null);
    const [updatedStudentName, setUpdatedStudentName] = useState('');
    const [updatedClassName, setUpdatedClassName] = useState('');
    const [updatedSectionName, setUpdatedSectionName] = useState('');
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [stdClsToDelete, setStdClsToDelete] = useState(null);

    const [studentList, setStudentList] = useState([]);
  
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isFormValid = () => {
        return updatedStudentName && updatedClassName && updatedSectionName  ;
    };
    
  
    // useEffect(() => {
    //   const fetchStdCls = async () => {
    //     const result = await fetch(`http://192.168.1.42:3005/getStudents_Class_For_admin/${schoolId}`)
    //     const json = await result.json()
  
    //     setStdCls(json.data)
    //   }
    //   fetchStdCls()
    // }, [userId])


    useEffect(() => {
      const fetchdata = async () => {
        try {
          const fetched = await fetchStudentClass(); 
          setStdCls(fetched.data);
        } catch (error) {
          console.log('error fetching student class');
        }
      };
  
      fetchdata();
    }, []);

    useEffect(() => {
      const fetchdata = async () => {
        try {
          const fetched = await fetchStudent(); 
          setStudentList(fetched.data);
        } catch (error) {
          console.log('error fetching student');
        }
      };
  
      fetchdata();
    }, []);
  
    const handleEditClick = (StdClsId, studentName, ClassName, SectionName) => {
      setEditingStdClsId(StdClsId);
      setVisible(true);
      setUpdatedStudentName(studentName);
      setUpdatedClassName(ClassName);
      setUpdatedSectionName(SectionName);
  
    };

    const handleStudentNameChange = (e) => {
        const regex = /^[A-Za-z\s]+$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setUpdatedStudentName(e.target.value);
        }
    };
  
    const handleClassNameChange = (e) => {
      const regex = /^[A-Za-z\s]+$/;
      if (regex.test(e.target.value) || e.target.value === '') {
          setUpdatedClassName(e.target.value);
      }
    };
  
    const handleSectionNameChange = (e) => {
        const regex = /^[A-Za-z\s]+$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setUpdatedSectionName(e.target.value);
        }
    };
  

    const handleSaveClick = () => {
      if (!isFormValid()) {
          setErrorMessage('Please fill in all the required fields.');
          return;
      }
  
      const selectedStudent = studentList.find((std) => std.student_name === updatedStudentName);
  
      updateStudentClass(editingStdClsId, {
          studentId: selectedStudent.student_id,
      }).then((response) => {
          console.log(response);
          setSuccessMessage('Student Class edited successfully!');
          setTimeout(() => {
              window.location.reload();
          }, 1000);
      })
      .catch((error) => {
          console.error('Error editing student class.', error);
          setErrorMessage('Error editing student class. Please try again later.');
      });
  };
  
  
    const handleDeleteClick = (stdclsId) => {
      setDeleteConfirmationVisible(true);
      setStdClsToDelete(stdclsId);
    };
  
    const handleConfirmDelete = () => {
      deleteStudentClass(stdClsToDelete)
        .then((response) => {
          console.log(response);
          setDeleteConfirmationVisible(false);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting student class.", error);
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
                        <h2 className='text-center defaultcolor'>Student Class</h2>
                        <CCard className='w-75 shadow middle-card'>
                            <CCardBody>
                                {stdcls.map((stdcls) => (
                                    <div key={stdcls.std_cls_id} className="">
                                        <CCardBody>
                                        {editingStdClsId === stdcls.std_cls_id && visible ? (
                                            <>
                                            <CAlert color='white' dismissible visible={visible} onClose={() => setVisible(false)}>

                                                <strong>Class Name:</strong> 
                                                <CInputGroup className="mb-4">
                                                <CFormInput
                                                    type="name"
                                                    required
                                                    tooltipFeedback
                                                    value={updatedClassName}
                                                    onChange={handleClassNameChange}
                                                    disabled
                                                />
                                                </CInputGroup>
                                                <strong>Section Name:</strong>
                                                <CInputGroup className="mb-4">
                                                <CFormInput
                                                    type="name"
                                                    required
                                                    tooltipFeedback
                                                    value={updatedSectionName}
                                                    onChange={handleSectionNameChange}
                                                    disabled
                                                />
                                                </CInputGroup>
                                                {/* <strong>Student Name:</strong>
                                                <CInputGroup className="mb-4">
                                                <CFormInput
                                                    type="name"
                                                    required
                                                    tooltipFeedback
                                                    value={updatedStudentName}
                                                    onChange={handleStudentNameChange}
                                                />
                                                </CInputGroup> */}
                                                

                                                <strong>Select Student Name : </strong>
                                                <select
                                                    className="form-control borderRadius"
                                                    value={updatedStudentName}
                                                    onChange={handleStudentNameChange}
                                                >
                                                    <option value="">Choose Student</option>
                                                    {studentList.map(std => (
                                                        <option key={std.student_id} value={std.student_name}>{std.student_name}</option>
                                                    ))}
                                                </select>

                                            </CAlert>
                                            <CRow>
                                                <CCol xs={12} className="text-center">
                                                <CButton 
                                                    className="px-4" 
                                                    type="button" 
                                                    shape="rounded-pill" 
                                                    onClick={() => handleSaveClick(editingStdClsId)}
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
                                                <strong>Class Name:</strong> {stdcls.class_name}<br/>
                                                <strong>Section Name:</strong> {stdcls.section_name}<br/>
                                                <strong>Student Name:</strong> {stdcls.student_name}<br/>
                                            </span>
                                            <div>
                                                <Link className="ls-grp" onClick={() => handleEditClick(stdcls.std_cls_id, stdcls.student_name, stdcls.class_name, stdcls.section_name)}>
                                                Edit
                                                </Link><br/>
                                                <Link className="ls-grp" onClick={() => handleDeleteClick(stdcls.std_cls_id)}>
                                                Delete
                                                </Link>
                                            </div>
                                            </div>
                                        )}
                                        {deleteConfirmationVisible && stdClsToDelete === stdcls.std_cls_id && (
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
  )
}

export default StudentClass
