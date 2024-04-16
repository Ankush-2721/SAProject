import React, { useState } from 'react';
import { cilArrowThickLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react';
import { Link } from 'react-router-dom';
import AdminHeader from 'src/components/admin/AdminHeader';
import Axios from 'axios';
import 'src/scss/_custom.scss';

import { registerTeacher } from 'src/api/APIAdmin';

const RegisterTeacher = () => {

  
  const [teacherName, setTeacherName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [employid, setEmployId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [empidError, setEmpIdError] = useState('');


  const validateName = () => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(teacherName);
  };

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateNumber = () => {
    const regex = /^\d{10}$/;
    return regex.test(number);
  };

  const validateEmpId = (empId) => {
    return empId.trim() !== '';
  };
  

  const teacher = () => {

    if (!validateName()) {
      setNameError('Please enter a name.');
      return;
    }

    if (!validateEmail()) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!validateNumber()) {
      setNumberError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (!validateEmpId(employid)) {
      setEmpIdError('Please enter employ id.');
      return;
    }

    registerTeacher( {
      Name: teacherName,
      email: email,
      contactNo: number,
      employId: employid,
    }).then((response) => {
      console.log(response);
      setSuccessMessage('Teacher added successfully!');
      setTimeout(() => {
        window.location.reload(); 
      }, 1000);
    }).catch((error) => {
      console.error('Error registering teacher:', error);
      setErrorMessage('Error registering teacher. Please try again later.');
    });
  };



  const handleNameChange = (e) => {
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setTeacherName(e.target.value);
      setNameError('');
    }
  };

  const handleNumberChange = (e) => {
    // Allow only 10 digits
    const regex = /^\d{0,10}$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      // setNumber(e.target.value);
      setNumberError('');
      setNumber(e.target.value);
    }
  };

  return (
    <div>
      <AdminHeader />
      <div>
        <CContainer>
          <Link to="/add">
            <CIcon icon={cilArrowThickLeft} /> Back
          </Link>
          <CRow className="justify-content-center">
            <CCol md={4}>
              <CForm>
                <h2 className="text-center defaultcolor">Add Teacher </h2>
                Name
                <CInputGroup className="mb-2">
                  <CFormInput
                    value={teacherName}
                    onChange={handleNameChange}
                    className="borderRadius"
                    type="text"
                    required
                    tooltipFeedback
                  />
                </CInputGroup>
                {nameError && <div className="text-danger mb-2">{nameError}</div>}
                Email Id
                <CInputGroup className="mb-2">
                  <CFormInput
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    className="borderRadius"
                    type="email"
                    required
                    tooltipFeedback
                  />
                </CInputGroup>
                {emailError && <div className="text-danger mb-2">{emailError}</div>}
                Contact Number
                <CInputGroup className="mb-2">
                  <CFormInput
                    value={number}
                    onChange={handleNumberChange}
                    className="borderRadius"
                    type="tel"
                    pattern="[0-9]{10}"
                    required
                    tooltipFeedback
                  />
                </CInputGroup>
                {numberError && <div className="text-danger mb-2">{numberError}</div>}
                Employee ID
                <CInputGroup className="mb-2">
                  <CFormInput
                    value={employid}
                    onChange={(e) => {
                      setEmployId(e.target.value);
                      setEmpIdError('');
                    }}
                    className="borderRadius"
                    type="text"
                    required
                    tooltipFeedback
                  />
                </CInputGroup>
                {empidError && <div className="text-danger mb-2">{empidError}</div>}

                <CRow>
                  <CCol xs={12} className="text-center">
                    <CButton
                      className="px-4"
                      type="button"
                      shape="rounded-pill"
                      onClick={teacher}
                    >
                      Register Teacher
                    </CButton>
                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
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
};

export default RegisterTeacher;
