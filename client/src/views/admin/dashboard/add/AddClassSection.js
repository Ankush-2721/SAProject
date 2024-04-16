import React, { useEffect, useState } from 'react';
import { cilArrowThickLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCol, CContainer, CForm, CRow } from '@coreui/react';
import { Link } from 'react-router-dom';
import AdminHeader from 'src/components/admin/AdminHeader';
import Multiselect from 'multiselect-react-dropdown';
import Axios from 'axios';
import 'src/scss/_custom.scss';

import { fetchClass, fetchSection, fetchTeacher, fetchSubject, addClassSection } from 'src/api/APIAdmin';

const AddClassSection = () => {
    const userId = "45";
    const schoolId = "20";

    const [classname, setClassname] = useState('');
    const [section, setSection] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const [classList, setClassList] = useState([]);
    const [sectionList, setSectionList] = useState([]);
    const [teacherList, setTeacherList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);

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


    const validateClass = (classid) => {
        return classid.trim() !== '';
    }

    const validateSection = (sectionid) => {
        return sectionid.trim() !== '';
    }


    const validateTeacher = (teacherid) => {
        return teacherid.trim() !== '';
    }

    const validateSubject = (selectedSubjects) => {
        return selectedSubjects.length > 0;
    }

    const classSection = () => {

        if (!validateClass(classname)) {
            setClassError('Please select class name.')
            return;
        }


        if (!validateSection(section)) {
            setSectionError('Please select section name.')
            return;
        }

        if (!validateTeacher(teacherName)) {
            setTeacherError('Please select teacher name.')
            return;
        }

        if (!validateSubject(selectedSubjects)) {
            setSubjectError('Please select subject name.')
            return;
        }

        const selectedClass = classList.find((cls) => cls.class_name === classname);
        const selectedSection = sectionList.find((sec) => sec.section_name === section);
        const selectedTeacher = teacherList.find((teacher) => teacher.teacher_name === teacherName);


        addClassSection( {
            classId: selectedClass.class_id,
            sectionId: selectedSection.section_id,
            classTeacherId: selectedTeacher.teacher_id,
            subjectIds: selectedSubjects.map((subject) => subject.subject_id),
        }).then((response) => {
            console.log(response);
            setSuccessMessage('Class Section added successfully!');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }).catch((error) => {
            console.error('Error adding class section.', error);
            setErrorMessage('Error adding class section. Please try again later.');
        });
        
    };

    return (
        <div>
            <AdminHeader />
            <div>
                <CContainer>
                    <Link to='/add'>
                        <CIcon icon={cilArrowThickLeft} /> Back
                    </Link>
                    <CRow className="justify-content-center">
                        <CCol md={4}>
                            <CForm>
                                <h2 className='text-center defaultcolor'>Add Class Section</h2>
                                <div className="mb-3">
                                    <label htmlFor="classname" className="form-label">Class Name</label>
                                    <select
                                        id="classname"
                                        className="form-control borderRadius"
                                        value={classname}
                                        onChange={(e) => {
                                            setClassname(e.target.value);
                                            setClassError('');
                                        }}
                                    >
                                        <option value="">Choose Class</option>
                                        {classList.map(cls => (
                                            <option key={cls.class_id} value={cls.class_name}>{cls.class_name}</option>
                                        ))}
                                    </select>
                                    {classname === '' && classError && <div className="text-danger">{classError}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="section" className="form-label">Section Name</label>
                                    <select
                                        id="section"
                                        className="form-control borderRadius"
                                        value={section}
                                        onChange={(e) => {
                                            setSection(e.target.value);
                                            setSectionError('');
                                        }}
                                    >
                                        <option value="">Choose Section</option>
                                        {sectionList.map(sec => (
                                            <option key={sec.section_id} value={sec.section_name}>{sec.section_name}</option>
                                        ))}
                                    </select>
                                    {section === '' && sectionError && <div className="text-danger">{sectionError}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="teacherName" className="form-label">Class Teacher</label>
                                    <select
                                        id="teacherName"
                                        className="form-control borderRadius"
                                        value={teacherName}
                                        onChange={(e) => {
                                            setTeacherName(e.target.value);
                                            setTeacherError('');
                                        }}
                                    >
                                        <option value="">Choose Class Teacher</option>
                                        {teacherList.map(teacher => (
                                            <option key={teacher.teacher_id} value={teacher.teacher_name}>{teacher.teacher_name}</option>
                                        ))}
                                    </select>
                                    {teacherName === '' && teacherError && <div className="text-danger">{teacherError}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="subjects" className="form-label">Subject Name</label>
                                    <Multiselect
                                        id="subjects"
                                        className='multi-select'
                                        selectedValues={selectedSubjects}
                                        onSelect={setSelectedSubjects}
                                        onRemove={setSelectedSubjects}
                                        options={subjectList}
                                        displayValue={"subject_name"}
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
                                    {selectedSubjects.length === 0 && subjectError && <div className="text-danger">{subjectError}</div>}
                                </div>
                                <CRow>
                                    <CCol xs={12} className='text-center'>
                                        <CButton
                                            className="px-4"
                                            type='button'
                                            shape="rounded-pill"
                                            onClick={classSection}
                                        >
                                            Add Class Section
                                        </CButton>
                                        {successMessage && <div className="text-success">{successMessage}</div>}
                                    </CCol>
                                </CRow>
                                <br />
                            </CForm>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </div>
    );
}

export default AddClassSection;

