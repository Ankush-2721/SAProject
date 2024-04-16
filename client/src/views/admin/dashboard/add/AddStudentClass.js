import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'
import Multiselect from 'multiselect-react-dropdown';

import Axios from 'axios';

import { fetchClass, fetchSection, fetchStudentsFromClass, addStudentClass } from 'src/api/APIAdmin'

import 'src/scss/_custom.scss'

const AddStudentClass = () => {

    const userId = "45";
    const schoolId = "20";

    const [classname, setClassname] = useState('');
    const [section, setSection] = useState('');
    const [selectedstudents, setSelectedStudents] = useState([]);

    const [classList, setClassList] = useState([{'class_name': '' , 'class_id': ''}]);
    const [sectionList, setSectionList] = useState([{'section_name': '', 'section_id': ''}]);
    const [studentList, setstudentList] = useState([{'student_name':'','student_id':''}]);

    const [selectedClassId, setSelectedClassId] = useState('');


    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [classError, setClassError] = useState('');
    const [sectionError, setSectionError] = useState('');
    const [studentError, setStudentError] = useState('');


    const validateClass = (classid) => {
        return classid.trim() !== '';
    }

    const validateSection = (sectionid) => {
        return sectionid.trim() !== '';
    }


    const validateStudent = (selectedstudents) => {
        return selectedstudents.length > 0;
    }


    useEffect(() => {
        const fetchClassdata = async () => {
          try {
            const fetched = await fetchClass(); 
            setClassList(fetched.data);
          } catch (error) {
            console.log('error fetching class');
          }
        };
    
        fetchClassdata();
    }, []);


    useEffect(() => {
        const fetchSectiondata = async () => {
          try {
            const fetched = await fetchSection(); 
            setSectionList(fetched.data);
          } catch (error) {
            console.log('error fetching section');
          }
        };
    
        fetchSectiondata();
    }, []);

    

    useEffect(() => {
        const fetchData = async () => {
            if (selectedClassId !== '') { 
                try {
                    const studentData = await fetchStudentsFromClass(selectedClassId);
                    setstudentList(studentData.data);
                } catch (error) {
                    console.error('Error fetching student list:', error);
                    setstudentList([]); 
                }
            } else {
                setstudentList([]); 
            }
        };
        fetchData();
    }, [selectedClassId]); 


    const stdcls = () => {


        if (!validateClass(classname)) {
            setClassError('Please select class name.')
            return;
        }


        if (!validateSection(section)) {
            setSectionError('Please select section name.')
            return;
        }

        if (!validateStudent(selectedstudents)) {
            setStudentError('Please select student name.')
            return;
        }

        const selectedClass = classList.find((cls) => cls.class_name === classname);
        const selectedSection = sectionList.find((sec) => sec.section_name === section);

        addStudentClass( {

        classId: selectedClass.class_id,
        sectionId: selectedSection.section_id,
        studentIds : selectedstudents.map((student) => student.student_id) ,

        }).then((response) => {
          console.log(response);
          setSuccessMessage('Student Class added successfully!');
          setTimeout(() => {
            window.location.reload(); 
          }, 1000);
        }).catch((error) => {
            setErrorMessage('Error adding student class. Please try again later.');
        });
      };


  return (
    <div>
        <AdminHeader />
        <div>
            <CContainer>
            <Link to='/add' >
                <CIcon icon={cilArrowThickLeft} /> Back
              </Link>
                <CRow className="justify-content-center">
                    <CCol md={4}>
            
                        <CForm>
                            <h2 className='text-center defaultcolor' >Add Student Class</h2>

                            Class 
                            <select 
                                className="form-control borderRadius" 
                                value={classname}
                                onChange={(e) => {
                                    setClassname(e.target.value);
                                    const selectedClass = classList.find(cls => cls.class_name === e.target.value);
                                    setSelectedClassId(selectedClass ? selectedClass.class_id : '');
                                }}
                            >

                                <option value="">Choose Class </option>

                                {classList.map(classname => (
                                    <option value={classname.class_name} key={classname.class_id} >{classname.class_name}</option>
                            
                                    ))
                                }

                            </select> 
                            {classname === '' && classError && <div className="text-danger">{classError}</div>}
                            <br/>   
                            Section Name
                            <select 
                                className="form-control borderRadius" 
                                value={section}
                                onChange={(e) => {
                                    setSection(e.target.value);
                                }}
                            >
                                <option value="">Choose Section </option>

                                {sectionList.map(section => (
                                    <option value={section.section_name} key={section.section_id} >{section.section_name}</option>
                            
                                    ))
                                }

                            </select> 
                            {section === '' && sectionError && <div className="text-danger">{sectionError}</div>}
                            <br/>        
                            
                            Student Name
                                <Multiselect
                                    id="subjects"
                                    className='multi-select'
                                    selectedValues={selectedstudents}
                                    onSelect={setSelectedStudents}
                                    onRemove={setSelectedStudents}
                                    options={studentList}
                                    displayValue={"student_name"}
                                    isObject={true}
                                    style={{
                                        chips: {
                                            background: '#1D60AE'
                                        },
                                        searchBox: {
                                            borderRadius: '25px',
                                        },
                                    }}
                                    placeholder=''
                                />
                            {selectedstudents.length === 0 && studentError && <div className="text-danger">{studentError}</div>}
                            <br/> 
                                
                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton 
                                    className="px-4" 
                                    type='button' 
                                    shape="rounded-pill" 
                                    onClick={stdcls}
                                >
                                    Add Student Class
                                </CButton>
                                {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                {successMessage && <div className="text-success">{successMessage}</div>}
                            </CCol>
                            </CRow><br/>
                        </CForm>

                    </CCol>
                </CRow>
            </CContainer>
        </div>
    </div>
  )
}

export default AddStudentClass
