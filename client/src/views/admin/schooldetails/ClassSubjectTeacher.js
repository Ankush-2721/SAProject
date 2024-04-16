// import { cilArrowThickLeft } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
// import { CAlert, CButton, CCard, CCardBody, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import AdminHeader from 'src/components/admin/AdminHeader'

// import Axios from 'axios';

// import 'src/scss/_custom.scss'

// import { fetchClassSubTeacher, fetchTeacher, updateClassSubTeacher, deleteClassSubTeacher } from 'src/api/APIAdmin'

// const ClassSubjectTeacher = () => {

 
//     const [clssubTea, setClsSubTea] = useState([]);
//     const [visible, setVisible] = useState(false);
//     const [editingClsSubTeaId, setEditingClsSubTeaId] = useState(null);
//     const [updatedClassName, setUpdatedClassName] = useState('');
//     const [updatedSectionName, setUpdatedSectionName] = useState('');
//     const [updatedTeacherName, setUpdatedTeacherName] = useState('');
//     const [updatedSubjects, setUpdatedSubjects] = useState('');
//     const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
//     const [clsSubTeaToDelete, setClsSubTeaToDelete] = useState(null);

//     const [teacherList, setTeacherList] = useState([]);
  
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
  

//     const isFormValid = () => {
//       return updatedClassName && updatedSectionName && updatedTeacherName ;
//     };
  

//     useEffect(() => {
//       const fetchdata = async () => {
//         try {
//           const fetched = await fetchClassSubTeacher(); 
//           setClsSubTea(fetched.data);
//         } catch (error) {
//           console.log('error fetching class subject teacher');
//         }
//       };
  
//       fetchdata();
//     }, []);


//     useEffect(() => {
//       const fetchdata = async () => {
//         try {
//           const fetched = await fetchTeacher(); 
//           setTeacherList(fetched.data);
//         } catch (error) {
//           console.log('error fetching teacher');
//         }
//       };
  
//       fetchdata();
//     }, []);

//   const handleEditClick = (ClsSubTeaId, ClassName, SectionName, teacherName, Subjects) => {
//     setEditingClsSubTeaId(ClsSubTeaId);
//     setVisible(true);
//     setUpdatedClassName(ClassName);
//     setUpdatedSectionName(SectionName);
//     setUpdatedTeacherName(teacherName);
//     setUpdatedSubjects(Subjects);

//   };

//   const handleClassNameChange = (e) => {
//     const regex = /^[A-Za-z\s]+$/;
//     if (regex.test(e.target.value) || e.target.value === '') {
//         setUpdatedClassName(e.target.value);
//     }
//   };

//   const handleSectionNameChange = (e) => {
//       const regex = /^[A-Za-z\s]+$/;
//       if (regex.test(e.target.value) || e.target.value === '') {
//           setUpdatedSectionName(e.target.value);
//       }
//   };

//   const handleTeacherNameChange = (e) => {
//       const regex = /^[A-Za-z\s]+$/;
//       if (regex.test(e.target.value) || e.target.value === '') {
//           setUpdatedTeacherName(e.target.value);
//       }
//   };


//   const handleSaveClick = () => {

//     if (!isFormValid()) {
//       setErrorMessage('Please fill in all the required fields.');
//       return;
//     }


//     updateClassSubTeacher( editingClsSubTeaId, {
//       Class_Name: updatedClassName,
//       Section_Name: updatedSectionName,
//       Teacher_Name: updatedTeacherName,
//       Subject_Name : updatedSubjects,
//     }).then((response) => {
//       console.log(response);
//       setSuccessMessage('Class Subject Teacher edited successfully!');
//       setTimeout(() => {
//           window.location.reload(); 
//         }, 1000);
//     })
//     .catch((error) => {
//       console.error('Error editing class subject teacher.', error); 
//       setErrorMessage('Error editing class subject teacher. Please try again later.');
//     });
//   };

//   const handleDeleteClick = (clsSubTeaId) => {
//     setDeleteConfirmationVisible(true);
//     setClsSubTeaToDelete(clsSubTeaId);
//   };

//   const handleConfirmDelete = () => {

//       deleteClassSubTeacher( clsSubTeaToDelete)
//       .then((response) => {
//         console.log(response);
//         setDeleteConfirmationVisible(false);
//         window.location.reload();
//       })
//       .catch((error) => {
//         console.error("Error deleting class section subject teacher.", error);
//         setDeleteConfirmationVisible(false);
//       });

//   };

//   const handleCancelDelete = () => {
//     setDeleteConfirmationVisible(false);
//   };
  
//     return (
//       <div>
//         <AdminHeader />
//         <div className='add-div'>
//           <Link to='/schooldetails'>
//             <CIcon icon={cilArrowThickLeft} /> Back
//           </Link>
//           <CRow >
//             <CCol className='d-flex flex-column justify-content-center align-items-center'>
//               <h2 className='text-center defaultcolor'>Class Subject Teacher</h2>
//                 <CCard className='w-75 shadow middle-card'>
//                   <CCardBody>
//                       {clssubTea.map((clssubTea) => (
//                         <div key={clssubTea.ClsSubTeachId} className="">
//                             <CCardBody>
//                             {editingClsSubTeaId === clssubTea.ClsSubTeachId && visible ? (
//                                 <>
//                                 <CAlert color='white' dismissible visible={visible} onClose={() => setVisible(false)}>
//                                     <strong>Class Name:</strong> 
//                                     <CInputGroup className="mb-4">
//                                     <CFormInput
//                                         type="name"
//                                         required
//                                         tooltipFeedback
//                                         value={updatedClassName}
//                                         onChange={handleClassNameChange}
//                                         disabled
//                                     />
//                                     </CInputGroup>
//                                     <strong>Section Name:</strong>
//                                     <CInputGroup className="mb-4">
//                                     <CFormInput
//                                         type="name"
//                                         required
//                                         tooltipFeedback
//                                         value={updatedSectionName}
//                                         onChange={handleSectionNameChange}
//                                         disabled
//                                     />
//                                     </CInputGroup>
//                                     <strong>Teacher Name:</strong>
//                                     <CInputGroup className="mb-4">
//                                     <CFormInput
//                                         type="name"
//                                         required
//                                         tooltipFeedback
//                                         value={updatedTeacherName}
//                                         onChange={handleTeacherNameChange}
//                                     />
//                                     </CInputGroup>
//                                     <strong>Subject Name:</strong>
//                                     <CInputGroup className="mb-4">
//                                     <CFormInput
//                                         type="name"
//                                         required
//                                         tooltipFeedback
//                                         value={updatedSubjects}
//                                         onChange={e=> setUpdatedSubjects}
//                                     />
//                                     </CInputGroup>
//                                 </CAlert>
//                                 <CRow>
//                                     <CCol xs={12} className="text-center">
//                                     <CButton 
//                                         className="px-4" 
//                                         type="button" 
//                                         shape="rounded-pill" 
//                                         onClick={() => handleSaveClick(editingClsSubTeaId)}
//                                         disabled={!isFormValid()}
//                                     >
//                                         Save
//                                     </CButton>
//                                     {errorMessage && <div className="text-danger">{errorMessage}</div>}
//                                     {successMessage && <div className="text-success">{successMessage}</div>}
//                                     {!isFormValid() && <div className="text-danger">Please fill in all the required fields.</div>}
//                                     </CCol>
//                                 </CRow>
//                                 </>
//                             ) : (
//                                 <div className="d-flex justify-content-between align-items-center">
//                                 <span>
//                                     <strong>Class Name:</strong> {clssubTea.info[0].Class_Name}<br/>
//                                     <strong>Section Name:</strong> {clssubTea.info[0].Section_Name}<br/>
//                                     <strong>Teacher Name:</strong> {clssubTea.info[0].Teacher_Name}<br/>
//                                     <strong>Subject Name:</strong> {clssubTea.info[0].Subject_Name}
//                                 </span>
//                                 <div>
//                                     <Link className="ls-grp" onClick={() => handleEditClick(clssubTea.ClsSubTeachId, clssubTea.info[0].Class_Name, clssubTea.info[0].Section_Name, clssubTea.info[0].Teacher_Name, clssubTea.info[0].Subject_Name)}>
//                                     Edit
//                                     </Link><br/>
//                                     <Link className="ls-grp" onClick={() => handleDeleteClick(clssubTea.ClsSubTeachId)}>
//                                     Delete
//                                     </Link>
//                                 </div>
//                                 </div>
//                             )}
//                             {deleteConfirmationVisible && clsSubTeaToDelete === clssubTea.ClsSubTeachId && (
//                                 <CAlert dismissible visible={deleteConfirmationVisible} onClose={handleCancelDelete}>
//                                 <strong>Confirm Delete</strong>
//                                 <p>Are you sure you want to delete Teacher ?</p>
//                                 <CButton color="danger" onClick={handleConfirmDelete}>
//                                     Yes, delete
//                                 </CButton>
//                                 <CButton color="secondary" onClick={handleCancelDelete}>
//                                     Cancel
//                                 </CButton>
//                                 </CAlert>
//                             )}
//                             </CCardBody>
//                         </div>
//                       ))}
//                   </CCardBody>
//                 </CCard>
//             </CCol>
//           </CRow>
//         </div>
//       </div>
//     );
//   };
  
//   export default ClassSubjectTeacher;
  





import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCard, CCardBody, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Axios from 'axios';

import 'src/scss/_custom.scss'

import { fetchClassSubTeacher, fetchTeacher, updateClassSubTeacher, deleteClassSubTeacher } from 'src/api/APIAdmin'

const ClassSubjectTeacher = () => {

 
    const [clssubTea, setClsSubTea] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editingClsSubTeaId, setEditingClsSubTeaId] = useState(null);
    const [updatedClassName, setUpdatedClassName] = useState('');
    const [updatedSectionName, setUpdatedSectionName] = useState('');
    const [updatedTeacherName, setUpdatedTeacherName] = useState('');
    const [updatedSubjects, setUpdatedSubjects] = useState('');
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [clsSubTeaToDelete, setClsSubTeaToDelete] = useState(null);

    const [teacherList, setTeacherList] = useState([]);
  
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  

    const isFormValid = () => {
      return updatedClassName && updatedSectionName && updatedTeacherName ;
    };
  

    useEffect(() => {
      const fetchdata = async () => {
        try {
          const fetched = await fetchClassSubTeacher(); 
          setClsSubTea(fetched.data);
        } catch (error) {
          console.log('error fetching class subject teacher');
        }
      };
  
      fetchdata();
    }, []);


    useEffect(() => {
      const fetchdata = async () => {
        try {
          const fetched = await fetchTeacher(); 
          setTeacherList(fetched.data);
        } catch (error) {
          console.log('error fetching teacher');
        }
      };
  
      fetchdata();
    }, []);

  const handleEditClick = (ClsSubTeaId, ClassName, SectionName, teacherName, Subjects) => {
    setEditingClsSubTeaId(ClsSubTeaId);
    setVisible(true);
    setUpdatedClassName(ClassName);
    setUpdatedSectionName(SectionName);
    setUpdatedTeacherName(teacherName);
    setUpdatedSubjects(Subjects);

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

  const handleTeacherNameChange = (e) => {
      const regex = /^[A-Za-z\s]+$/;
      if (regex.test(e.target.value) || e.target.value === '') {
          setUpdatedTeacherName(e.target.value);
      }
  };


  const handleSaveClick = () => {

    if (!isFormValid()) {
      setErrorMessage('Please fill in all the required fields.');
      return;
    }


    updateClassSubTeacher( editingClsSubTeaId, {
      Class_Name: updatedClassName,
      Section_Name: updatedSectionName,
      Teacher_Name: updatedTeacherName,
      Subject_Name : updatedSubjects,
    }).then((response) => {
      console.log(response);
      setSuccessMessage('Class Subject Teacher edited successfully!');
      setTimeout(() => {
          window.location.reload(); 
        }, 1000);
    })
    .catch((error) => {
      console.error('Error editing class subject teacher.', error); 
      setErrorMessage('Error editing class subject teacher. Please try again later.');
    });
  };

  const handleDeleteClick = (clsSubTeaId) => {
    setDeleteConfirmationVisible(true);
    setClsSubTeaToDelete(clsSubTeaId);
  };

  const handleConfirmDelete = () => {

      deleteClassSubTeacher( clsSubTeaToDelete)
      .then((response) => {
        console.log(response);
        setDeleteConfirmationVisible(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting class section subject teacher.", error);
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
          <CRow >
            <CCol className='d-flex flex-column justify-content-center align-items-center'>
              <h2 className='text-center defaultcolor'>Class Subject Teacher</h2>
                <CCard className='w-75 shadow middle-card'>
                  <CCardBody>
                      {clssubTea.map((clssubTea) => (
                        <div key={clssubTea.ClsSubTeachId} className="">
                            <CCardBody>
                            {editingClsSubTeaId === clssubTea.ClsSubTeachId && visible ? (
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
                                    <strong>Teacher Name:</strong>
                                      <CInputGroup className="mb-4">
                                          <select
                                              className="form-control borderRadius"
                                              value={updatedTeacherName}
                                              onChange={handleTeacherNameChange}
                                              disabled={!isFormValid()}
                                          >
                                              {teacherList.map((teacher) => (
                                                  <option key={teacher.teacher_id} value={teacher.teacher_name}>{teacher.teacher_name}</option>
                                              ))}
                                          </select>
                                      </CInputGroup>
                                    <strong>Subject Name:</strong>
                                    <CInputGroup className="mb-4">
                                    <CFormInput
                                        type="name"
                                        required
                                        tooltipFeedback
                                       
                                        value={updatedSubjects}
                                        onChange={(e)=> setUpdatedSubjects(e.target.value)}
                                    />
                                    </CInputGroup>
                                </CAlert>
                                <CRow>
                                    <CCol xs={12} className="text-center">
                                    <CButton 
                                        className="px-4" 
                                        type="button" 
                                        shape="rounded-pill" 
                                        onClick={() => handleSaveClick(editingClsSubTeaId)}
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
                                    <strong>Class Name:</strong> {clssubTea.info[0].Class_Name}<br/>
                                    <strong>Section Name:</strong> {clssubTea.info[0].Section_Name}<br/>
                                    <strong>Teacher Name:</strong> {clssubTea.info[0].Teacher_Name}<br/>
                                    <strong>Subject Name:</strong> {clssubTea.info[0].Subject_Name}
                                </span>
                                <div>
                                    <Link className="ls-grp" onClick={() => handleEditClick(clssubTea.ClsSubTeachId, clssubTea.info[0].Class_Name, clssubTea.info[0].Section_Name, clssubTea.info[0].Teacher_Name, clssubTea.info[0].Subject_Name)}>
                                    Edit
                                    </Link><br/>
                                    <Link className="ls-grp" onClick={() => handleDeleteClick(clssubTea.ClsSubTeachId)}>
                                    Delete
                                    </Link>
                                </div>
                                </div>
                            )}
                            {deleteConfirmationVisible && clsSubTeaToDelete === clssubTea.ClsSubTeachId && (
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
  
  export default ClassSubjectTeacher;

