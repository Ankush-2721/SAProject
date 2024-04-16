import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import Axios from 'axios';

import { fetchClass, registerStudent } from 'src/api/APIAdmin'

import 'src/scss/_custom.scss'

const AddStudent = () => {


    const [studentName, setStudentName] = useState('');
    const [number, setNumber] = useState();
    const [classname, setClassname] = useState('');

    const [classList, setClassList] = useState([{'class_name': '' , 'class_id': ''}]);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [nameError, setNameError] = useState('');
    const [numberError, setNumberError] = useState('');
    const [classError, setClassError] = useState('');


    // useEffect(() => {
    //     const fetchData = async ()=>{
    //         const response = await fetch(`http://192.168.1.42:3005/classdata/${schoolId}`);
    //         const newData = await response.json();
    //         setClassList(newData.data);
    //     };
    //     fetchData();
    // }, [])


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

    
  const validateName = () => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(studentName);
  };


  const validateNumber = () => {
    const regex = /^\d{10}$/;
    return regex.test(number);
  };

  const validateClass = (classname) => {
    return classname.length > 0;
}



    const student = () => {


        if (!validateName()) {
            setNameError('Please enter a name.');
            return;
        }

        if (!validateNumber()) {
        setNumberError('Please enter a valid 10-digit phone number.');
        return;
        }

        if (!validateClass(classname)) {
            setClassError('Please select class name.')
            return;
        }


        const selectedClass = classList.find((cls) => cls.class_name === classname);


        // Axios.post(`http://192.168.1.42:3005/students/${userId}/${schoolId}`, {

        //     Name: studentName,
        //     contactNo: number,
        //     classId: selectedClass.class_id,
            
        // }).then((response) => {
        //   console.log(response);
        //   setSuccessMessage('Student added successfully!');
        //   setTimeout(() => {
        //     window.location.reload(); 
        // }, 1000);

        // }).catch((error) => {
        //     setErrorMessage('Error registering student. Please try again later.');
        // });


        registerStudent( {

            Name: studentName,
            contactNo: number,
            classId: selectedClass.class_id,
        
        }).then((response) => {
        console.log(response);
        setSuccessMessage('Student added successfully!');
        setTimeout(() => {
            window.location.reload(); 
        }, 1000);

        }).catch((error) => {
            setErrorMessage('Error registering student. Please try again later.');
        });
      };



    const handleNameChange = (e) => {
        // Allow alphabets and spaces
        const regex = /^[A-Za-z\s]+$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setStudentName(e.target.value);
            setNameError('');
        }
    };
    

    const handleNumberChange = (e) => {
        // Allow only 10 digits
        const regex = /^\d{0,10}$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setNumber(e.target.value);
            setNumber(e.target.value);
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
                            <h2 className='text-center defaultcolor' >Add Student </h2>
                            Name
                            <CInputGroup className="mb-2">
                            <CFormInput 
                                value={studentName} 
                                onChange={(handleNameChange)}
                                className='borderRadius'
                                type="text"
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>
                            {nameError && <div className="text-danger mb-2">{nameError}</div>}
                            Contact Number
                            <CInputGroup className="mb-2">
                            <CFormInput
                                value={number} 
                                onChange={handleNumberChange}
                                className='borderRadius'
                                type="tel"
                                pattern="[0-9]{10}"
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>  
                            {numberError && <div className="text-danger mb-2">{numberError}</div>}
                            Class 
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
                                {classname === '' && classError && <div className="text-danger">{classError}</div>}

                            </select> <br/>               
                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton 
                                    className="px-4" 
                                    type='button' 
                                    shape="rounded-pill" 
                                    onClick={student}
                                >
                                    Register Student
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

export default AddStudent
