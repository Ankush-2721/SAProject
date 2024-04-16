import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'
import Multiselect from 'multiselect-react-dropdown';



import Axios from 'axios';

import 'src/scss/_custom.scss'

const AddClassSubject = () => {
    const [classname, setClassname] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
  
    const [classList, setClassList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:3005/classdata`);
        const newData = await response.json();
        setClassList(newData);
      };
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:3005/subjectdata`);
        const newData = await response.json();
        setSubjectList(newData);
      };
      fetchData();
    }, []);
  
    // const handleClassChange = (e) => {
    //   setClassname(e.target.value);
    // };
  
    const handleSubjectChange = (selectedList, selectedSubject) => {
      setSelectedSubjects(selectedList);
    };
  
    const clssubject = () => {
      Axios.post("http://localhost:3005/addclssub", {
        classId: classname,
        subjectIds: selectedSubjects.map(subject => subject.subject_id),
      }).then((response) => {
        console.log(response);
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
                            <h2 className='text-center defaultcolor' >Add Class Subject </h2>
                            Class Name
                            <select
                                className="form-control borderRadius"
                                value={classname}
                                onChange={(e) => {
                                    setClassname(e.target.value);
                                }}
                            >
                                <option value=''>Choose Class Name</option>
                                {classList.map(classes => (
                                <option value={classes.class_id} key={classes.class_id}>
                                    {classes.class_name}
                                </option>
                                ))}
                            </select>
                            <br />
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
                            <br/>
                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton className="px-4" type='submit' shape="rounded-pill" onClick={clssubject}>
                                Add Class Subject
                                </CButton>
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

export default AddClassSubject
