// import { cilArrowThickLeft } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
// import { CAlert, CButton, CCard, CCardBody, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import AdminHeader from 'src/components/admin/AdminHeader'

// import Axios from 'axios';

// import 'src/scss/_custom.scss'

// import { fetchClassSection, fetchTeacher, fetchSubject, updateClassSection, deleteClassSection } from 'src/api/APIAdmin'

// const ClassSection = () => {


//     const [clsSec, setClsSec] = useState([]);
//     const [visible, setVisible] = useState(false);
//     const [editingClsSecId, setEditingClsSecId] = useState(null);
//     const [updatedClassName, setUpdatedClassName] = useState('');
//     const [updatedSectionName, setUpdatedSectionName] = useState('');
//     const [updatedTeacherName, setUpdatedTeacherName] = useState('');
//     const [updatedSubjects, setUpdatedSubjects] = useState('');
//     const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
//     const [clsSecToDelete, setClsSecToDelete] = useState(null);

//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const [teacherList, setTeacherList] = useState([]);
//     const [subjectList, setsubjectList] = useState([]);




//     useEffect(() => {
//         const fetchdata = async () => {
//           try {
//             const fetched = await fetchClassSection(); 
//             setClsSec(fetched.data);
//           } catch (error) {
//             console.log('error fetching class section');
//           }
//         };
    
//         fetchdata();
//     }, []);

//     useEffect(() => {
//         const fetchdata = async () => {
//           try {
//             const fetched = await fetchTeacher(); 
//             setTeacherList(fetched.data);
//           } catch (error) {
//             console.log('error fetching teacher');
//           }
//         };
    
//         fetchdata();
//     }, []);

//     useEffect(() => {
//         const fetchdata = async () => {
//           try {
//             const fetched = await fetchSubject(); 
//             setsubjectList(fetched.data);
//           } catch (error) {
//             console.log('error fetching subject');
//           }
//         };
    
//         fetchdata();
//     }, []);


//     const handleEditClick = (ClsSecId, ClassName, SectionName, teacherName, Subjects) => {
//         setEditingClsSecId(ClsSecId);
//         setVisible(true);
//         setUpdatedClassName(ClassName);
//         setUpdatedSectionName(SectionName);
//         setUpdatedTeacherName(teacherName);
//         setUpdatedSubjects(Subjects);

//     };

//     const handleClassNameChange = (e) => {
//         const regex = /^[A-Za-z\s]+$/;
//         if (regex.test(e.target.value) || e.target.value === '') {
//             setUpdatedClassName(e.target.value);
//         }
//     };

//     const handleSectionNameChange = (e) => {
//         const regex = /^[A-Za-z\s]+$/;
//         if (regex.test(e.target.value) || e.target.value === '') {
//             setUpdatedSectionName(e.target.value);
//         }
//     };
    
//     const handleTeacherNameChange = (e) => {
//         const regex = /^[A-Za-z\s]+$/;
//         if (regex.test(e.target.value) || e.target.value === '') {
//             setUpdatedTeacherName(e.target.value);
//         }
//     };

    
//     const isFormValid = () => {
//         return updatedClassName && updatedSectionName && updatedTeacherName.trim() !== '' ;
//     };


//     const handleSaveClick = () => {

//         if (!isFormValid()) {
//           setErrorMessage('Please fill in all the required fields.');
//           return;
//         }


//         const selectedTeacher = teacherList.find((teacher) => teacher.teacher_name === updatedTeacherName);
//         const selectedSubject = subjectList.find((subject) => subject.subject_name === updatedSubjects);

    
//         updateClassSection( editingClsSecId, {
//             class_name: updatedClassName,
//             section_name: updatedSectionName,
//             teacher_name: selectedTeacher.teacher_id,
//             subject_name : selectedSubject.subject_id,


//             // teacher_name: updatedTeacherName,
//             // subject_name : updatedSubjects,
//         }).then((response) => {
//           console.log(response);
//           setSuccessMessage('Class Section edited successfully!');
//           setTimeout(() => {
//               window.location.reload(); 
//             }, 1000);
//         })
//         .catch((error) => {
//           console.error('Error editing class section.', error); 
//           setErrorMessage('Error editing class section. Please try again later.');
//         });
//     };

//     const handleDeleteClick = (clssecId) => {
//         setDeleteConfirmationVisible(true);
//         setClsSecToDelete(clssecId);
//     };

//     const handleConfirmDelete = () => {

//         deleteClassSection( clsSecToDelete)
//         .then((response) => {
//         console.log(response);
//         setDeleteConfirmationVisible(false);
//         window.location.reload();
//         })
//         .catch((error) => {
//         console.error("Error deleting class section.", error);
//         setDeleteConfirmationVisible(false);
//         });

//     };
    
//     const handleCancelDelete = () => {
//     setDeleteConfirmationVisible(false);
//     };

//   return (
//     <div>
//       <AdminHeader />
//       <div className='add-div'>
//         <Link to='/schooldetails'>
//           <CIcon icon={cilArrowThickLeft} /> Back
//         </Link>
//         <CRow>
//           <CCol className='d-flex flex-column justify-content-center align-items-center'>
//             <h2 className='text-center defaultcolor'>Class Section</h2>
//             <CCard className='w-75 shadow middle-card'>
//                 <CCardBody>
//                     {clsSec.map((clsSec) => (
//                         <div key={clsSec.sub_teacher_id} className="">
//                             <CCardBody>
//                             {editingClsSecId === clsSec.sub_teacher_id && visible ? (
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

//                                     {/* <strong>Class Teacher Name:</strong>
//                                     <CInputGroup className="mb-4">
//                                     <CFormInput
//                                         type="name"
//                                         required
//                                         tooltipFeedback
//                                         value={updatedTeacherName}
//                                         onChange={handleTeacherNameChange}
//                                     />
//                                     </CInputGroup> */}

//                                     <strong>Select Teacher Name:</strong>
//                                     <select
//                                         className="form-control borderRadius"
//                                         value={updatedTeacherName}
//                                         onChange={handleTeacherNameChange}
//                                     >
//                                         <option value="">Choose Teacher</option>
//                                         {teacherList.map(teacher => (
//                                             <option key={teacher.teacher_id} value={teacher.teacher_name}>{teacher.teacher_name}</option>
//                                         ))}
//                                     </select><br/>

//                                     {/* <strong>Subject:</strong>
//                                     <CInputGroup className="mb-4">
//                                     <CFormInput
//                                         type="name"
//                                         required
//                                         tooltipFeedback
//                                         value={updatedSubjects}
//                                         onChange={e => setUpdatedSubjects(e)}
//                                     />
//                                     </CInputGroup> */}


//                                     <strong>Select Subject Name:</strong>
//                                     <select
//                                         className="form-control borderRadius"
//                                         value={updatedSubjects}
//                                         onChange={e => setUpdatedSubjects(e)}
//                                     >
//                                         <option value="">Choose Subject</option>
//                                         {subjectList.map(subject => (
//                                             <option key={subject.subject_id} value={subject.subject_name}>{subject.subject_name}</option>
//                                         ))}
//                                     </select><br/>
//                                 </CAlert>
//                                 <CRow>
//                                     <CCol xs={12} className="text-center">
//                                     <CButton 
//                                         className="px-4" 
//                                         type="button" 
//                                         shape="rounded-pill" 
//                                         onClick={() => handleSaveClick(editingClsSecId)}
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
//                                     <strong>Class Name:</strong> {clsSec.info[0].class_name}<br/>
//                                     <strong>Section Name:</strong> {clsSec.info[0].section_name}<br/>
//                                     <strong>Class Teacher Name:</strong> {clsSec.info[0].teacher_name}<br/>
//                                     <strong>Subject:</strong> {clsSec.info[0].subject_name}
//                                 </span>
//                                 <div>
//                                     <Link className="ls-grp" onClick={() => handleEditClick(clsSec.sub_teacher_id, clsSec.info[0].class_name, clsSec.info[0].section_name, clsSec.info[0].teacher_name, clsSec.info[0].subject_name)}>
//                                     Edit
//                                     </Link><br/>
//                                     <Link className="ls-grp" onClick={() => handleDeleteClick(clsSec.sub_teacher_id)}>
//                                     Delete
//                                     </Link>
//                                 </div>
//                                 </div>
//                             )}
//                             {deleteConfirmationVisible && clsSecToDelete === clsSec.sub_teacher_id && (
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
//                     ))}
//                 </CCardBody>
//             </CCard>
//           </CCol>
//         </CRow>
//       </div>
//     </div>
//   );
// };

// export default ClassSection


import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCard, CCardBody, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Axios from 'axios';

import 'src/scss/_custom.scss'

import { fetchClassSection, fetchTeacher, fetchSubject, updateClassSection, deleteClassSection } from 'src/api/APIAdmin'

const ClassSection = () => {

    const [clsSec, setClsSec] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editingClsSecId, setEditingClsSecId] = useState(null);
    const [updatedClassName, setUpdatedClassName] = useState('');
    const [updatedSectionName, setUpdatedSectionName] = useState('');
    const [updatedTeacherName, setUpdatedTeacherName] = useState('');
    const [updatedSubjects, setUpdatedSubjects] = useState([]);
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [clsSecToDelete, setClsSecToDelete] = useState(null);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [teacherList, setTeacherList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const fetchedClassSection = await fetchClassSection(); 
            setClsSec(fetchedClassSection.data);
          } catch (error) {
            console.log('Error fetching class section');
          }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const fetchedTeacherList = await fetchTeacher(); 
            setTeacherList(fetchedTeacherList.data);
          } catch (error) {
            console.log('Error fetching teacher list');
          }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const fetchedSubjectList = await fetchSubject(); 
            setSubjectList(fetchedSubjectList.data);
          } catch (error) {
            console.log('Error fetching subject list');
          }
        };
    
        fetchData();
    }, []);

    const handleEditClick = (ClsSecId, ClassName, SectionName, teacherName, Subjects) => {
        setEditingClsSecId(ClsSecId);
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

    const handleSubjectChange = (e) => {
        const selectedSubjects = Array.from(e.target.selectedOptions, option => option.value);
        setUpdatedSubjects(selectedSubjects);
    };
    
    const isFormValid = () => {
        return updatedClassName && updatedSectionName && updatedTeacherName.trim() !== '' && updatedSubjects.length > 0;
    };

    const handleSaveClick = () => {
        if (!isFormValid()) {
            setErrorMessage('Please fill in all the required fields.');
            return;
        }

        const selectedTeacher = teacherList.find((teacher) => teacher.teacher_name === updatedTeacherName);
    
        updateClassSection(editingClsSecId, {
            class_name: updatedClassName,
            section_name: updatedSectionName,
            teacher_name: selectedTeacher.teacher_id,
            subject_names: updatedSubjects,
        }).then((response) => {
            console.log(response);
            setSuccessMessage('Class Section edited successfully!');
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
        })
        .catch((error) => {
            console.error('Error editing class section.', error); 
            setErrorMessage('Error editing class section. Please try again later.');
        });
    };

    const handleDeleteClick = (clssecId) => {
        setDeleteConfirmationVisible(true);
        setClsSecToDelete(clssecId);
    };

    const handleConfirmDelete = () => {
        deleteClassSection(clsSecToDelete)
        .then((response) => {
            console.log(response);
            setDeleteConfirmationVisible(false);
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error deleting class section.", error);
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
                        <h2 className='text-center defaultcolor'>Class Section</h2>
                        <CCard className='w-75 shadow middle-card'>
                            <CCardBody>
                                {clsSec.map((clsSecItem) => (
                                    <div key={clsSecItem.sub_teacher_id} className="">
                                        <CCardBody>
                                            {editingClsSecId === clsSecItem.sub_teacher_id && visible ? (
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
                                                        <strong>Select Teacher Name:</strong>
                                                        <select
                                                            className="form-control borderRadius"
                                                            value={updatedTeacherName}
                                                            onChange={handleTeacherNameChange}
                                                        >
                                                            <option value="">Choose Teacher</option>
                                                            {teacherList.map(teacher => (
                                                                <option key={teacher.teacher_id} value={teacher.teacher_name}>{teacher.teacher_name}</option>
                                                                ))}
                                                            </select><br/>
                                                            <strong>Select Subject Name:</strong>
                                                            <select
                                                                className="form-control borderRadius"
                                                                value={updatedSubjects}
                                                                onChange={handleSubjectChange}
                                                            >
                                                                <option value="">Choose Subject</option>
                                                                {subjectList.map(subject => (
                                                                    <option key={subject.subject_id} value={subject.subject_name}>{subject.subject_name}</option>
                                                                ))}
                                                            </select><br/>
                                                        </CAlert>
                                                        <CRow>
                                                            <CCol xs={12} className="text-center">
                                                                <CButton 
                                                                    className="px-4" 
                                                                    type="button" 
                                                                    shape="rounded-pill" 
                                                                    onClick={() => handleSaveClick(editingClsSecId)}
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
                                                            <strong>Class Name:</strong> {clsSecItem.info[0].class_name}<br/>
                                                            <strong>Section Name:</strong> {clsSecItem.info[0].section_name}<br/>
                                                            <strong>Class Teacher Name:</strong> {clsSecItem.info[0].teacher_name}<br/>
                                                            <strong>Subject:</strong> {clsSecItem.info[0].subject_name}
                                                        </span>
                                                        <div>
                                                            <Link className="ls-grp" onClick={() => handleEditClick(clsSecItem.sub_teacher_id, clsSecItem.info[0].class_name, clsSecItem.info[0].section_name, clsSecItem.info[0].teacher_name, clsSecItem.info[0].subject_name)}>
                                                                Edit
                                                            </Link><br/>
                                                            <Link className="ls-grp" onClick={() => handleDeleteClick(clsSecItem.sub_teacher_id)}>
                                                                Delete
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )}
                                                {deleteConfirmationVisible && clsSecToDelete === clsSecItem.sub_teacher_id && (
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
    
    export default ClassSection;
    
