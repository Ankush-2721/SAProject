import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Multiselect from 'multiselect-react-dropdown';

import Axios from 'axios';

import 'src/scss/_custom.scss'

import { fetchClass, fetchSection, fetchTeacher, fetchSubject, addSubjectTeacher } from 'src/api/APIAdmin';

const AddSubjectTeacher = () => {

    const userId = "45";
    const schoolId = "20";

    const [classname, setClassname] = useState();
    const [section, setSection] = useState();
    const [teacherName, setTeacherName] = useState();
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const [classList, setClassList] = useState([{'class_name': '' , 'class_id': ''}]);
    const [sectionList, setSectionList] = useState([{'section_name': '', 'section_id': ''}]);
    const [teacherList, setTeacherList] = useState([{'teacher_name':'','teacher_id':''}]);
    const [subjectList, setSubjectList] = useState([{'subject_name': '', 'subject_id': ''}]);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [classError, setClassError] = useState('');
    const [sectionError, setSectionError] = useState('');
    const [teacherError, setTeacherError] = useState('');
    const [subjectError, setSubjectError] = useState('');



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
        const fetchTeacherdata = async () => {
          try {
            const fetched = await fetchTeacher(); 
            setTeacherList(fetched.data);
          } catch (error) {
            console.log('error fetching teacher');
          }
        };
    
        fetchTeacherdata();
    }, []);


    useEffect(() => {
        const fetchSubjectdata = async () => {
          try {
            const fetched = await fetchSubject(); 
            setSubjectList(fetched.data);
          } catch (error) {
            console.log('error fetching subject');
          }
        };
    
        fetchSubjectdata();
    }, []);


    const handleSubjectChange = (selectedList, selectedSubject) => {
        setSelectedSubjects(selectedList);
        setSubjectError('');
      };
    
    const subTeacher = () => {

        if (!classname) {
            setClassError('Please select a class.');
            return; 
        } else {
            setClassError(''); 
        }

        if (!section) {
            setSectionError('Please select a section.');
            return; 
        } else {
            setSectionError('');
        }

        if (!teacherName) {
            setTeacherError('Please select a teacher.');
            return; 
        } else {
            setTeacherError('');
        }

        if (!selectedSubjects) {
            setSubjectError('Please select a subject.');
            return; 
        } else {
            setSubjectError('');
        }

        const selectedClass = classList.find((cls) => cls.class_name === classname);
        const selectedSection = sectionList.find((sec) => sec.section_name === section);
        const selectedTeacher = teacherList.find((teacher) => teacher.teacher_name === teacherName);

        if (selectedClass && selectedSection && selectedTeacher) {

    //     Axios.post("http://192.168.1.42:3005/Assigning_Sub_For_Teach", {

    //     classId: selectedClass.class_id,
    //     sectionId: selectedSection.section_id,
    //     teacherId: selectedTeacher.teacher_id,
    //     subjectIds: selectedSubjects.map((subject) => subject.subject_id),
    //   }).then((response) => {
    //     console.log(response);
    //     setSuccessMessage('Subject Teacher added successfully!');
    //     setTimeout(() => {
    //         window.location.reload(); 
    //     }, 1000);
    //   });


    addSubjectTeacher( {

    classId: selectedClass.class_id,
    sectionId: selectedSection.section_id,
    teacherId: selectedTeacher.teacher_id,
    subjectIds: selectedSubjects.map((subject) => subject.subject_id),
  }).then((response) => {
    console.log(response);
    setSuccessMessage('Subject Teacher added successfully!');
    setTimeout(() => {
        window.location.reload(); 
    }, 1000);
  });

    } else {
      console.error("Invalid selection or missing data");
      setErrorMessage('Error adding subject teacher. Please try again later.');
    }
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
                            <h2 className='text-center defaultcolor' >Add Subject Teacher </h2>
                            Class Name
                            <select 
                                className="form-control borderRadius" 
                                value={classname}
                                onChange={(e) => {
                                    setClassname(e.target.value);
                                    setClassError('');
                                }}
                            >
                                <option value="">Choose Class </option>

                                {classList.map(classname => (
                                    <option value={classname.class_name} key={classname.class_id} >{classname.class_name}</option>
                            
                                    ))
                                }

                            </select> 
                            {classError && <div className="text-danger">{classError}</div>}
                            <br/>  
                            Section Name
                            <select 
                                className="form-control borderRadius" 
                                value={section}
                                onChange={(e) => {
                                    setSection(e.target.value);
                                    setClassError('');
                                }}
                            >
                                <option value="">Choose Section </option>

                                {sectionList.map(section => (
                                    <option value={section.section_name} key={section.section_id} >{section.section_name}</option>
                            
                                    ))
                                }

                            </select> 
                            {sectionError && <div className="text-danger">{sectionError}</div>}
                            <br/> 
                            Teacher Name
                            <select 
                                className="form-control borderRadius" 
                                value={teacherName} 
                                onChange={(e) => {
                                    setTeacherName(e.target.value);
                                    setClassError('');
                                }}
                            >
                                <option value="">Choose Teacher</option>

                                {teacherList.map(teacher => (
                                    <option value={teacher.teacher_name} key={teacher.teacher_id} >{teacher.teacher_name}</option>
                            
                                    ))
                                }

                            </select> 
                            {teacherError && <div className="text-danger">{teacherError}</div>}
                            <br/>  
                            Subject Name
                            <Multiselect
                                className='multi-select'
                                selectedValues={selectedSubjects}
                                onSelect={handleSubjectChange}
                                onRemove={handleSubjectChange}
                                options={subjectList}
                                displayValue={"subject_name"}
                                isObject={true}
                                style={{
                                chips: {
                                    background: '#1D60AE'
                                },
                                searchBox: {
                                    'border-radius': '25px',
                                },
                                }}
                                placeholder=''
                            /> 
                            {subjectError && <div className="text-danger">{subjectError}</div>}
                            <br/>  
                                 
                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton 
                                    className="px-4" 
                                    type='button' 
                                    shape="rounded-pill" 
                                    onClick={subTeacher}
                                >
                                    Add Subject Teacher
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

export default AddSubjectTeacher
