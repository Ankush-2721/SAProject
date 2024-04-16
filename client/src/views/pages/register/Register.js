import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CNav,
  CNavLink,
  CRow,
} from '@coreui/react'

import 'src/scss/_custom.scss'

import Axios from 'axios';
 


import { REGISTER } from 'src/api/APIRegister';

const Register = () => {

  const [usernameReg, setUsernameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [contactNoReg, setcontactNoReg] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [numberError, setNumberError] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const validateName = () => {
    return usernameReg.trim() !== ''; 
  };

  const validateEmail = () => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(emailReg);
  };

  const validateNumber = () => {
      const regex = /^\d{10}$/;
      return regex.test(contactNoReg);
  };


  const register = () => {


    if (!validateName()) {
      setNameError('Please enter a institution name.');
      return;
    }

    if (!validateEmail()) {
      setEmailError('Please enter a valid email id.');
      return;
    }

    if (!validateNumber()) {
      setNumberError('Please enter a valid 10-digit phone number.');
      return;
    }

    // Axios.post("http://192.168.1.44:3005/users", {
    //   Name: usernameReg,
    //   userEmail: emailReg,
    //   contactNo: contactNoReg
    // }).then((response) => {
    //   console.log(response);
    //   setSuccessMessage('Institution registered successfully!');
    //   setTimeout(() => {
    //       window.location.reload();
    //   }, 1000);
    // }).catch ((error) => {
    //   console.error("Error registering institution:", error);
    //   setErrorMessage('Error registering institution. Please try again later.');
    // });



    REGISTER( {
      Name: usernameReg,
      userEmail: emailReg,
      contactNo: contactNoReg,
    }).then((response) => {
      console.log(response);
      setSuccessMessage('Institution registered successfully!');
      setTimeout(() => {
          window.location.reload();
      }, 1000);
    }).catch ((error) => {
      console.error("Error registering institution:", error);
      setErrorMessage('Error registering institution. Please try again later.');
    });

  };


    
    const handleNameChange = (e) => {
      // Allow alphabets and spaces
      const regex = /^[A-Za-z\s]+$/;
      if (regex.test(e.target.value) || e.target.value === '') {
        setUsernameReg(e.target.value);
        setNameError('');
      }
    };
  

    const handleNumberChange = (e) => {
      // Allow only 10 digits
      const regex = /^\d{0,10}$/;
      if (regex.test(e.target.value) || e.target.value === '') {
        setcontactNoReg(e.target.value);
        setNumberError('');
      }
    };
  

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className='p-4 maxcard' >
                <CCardBody>
                  <CForm>
                    <h1 className='text-center defaultcolor' >Register Now </h1>
                    Institution Name
                    <CInputGroup className="mb-2">
                      <CFormInput 
                        value={usernameReg} 
                        onChange={handleNameChange}
                        style={{borderRadius:'25px'}}
                        type="text"
                      />
                    </CInputGroup>
                    {nameError && <div className="text-danger mb-2">{nameError}</div>}
                    Email Id
                    <CInputGroup className="mb-2">
                      <CFormInput
                        value={emailReg} onChange={(e) => {
                          setEmailReg(e.target.value);
                          setEmailError('');
                        }}
                        style={{borderRadius:'25px'}}
                        type="email"

                      />
                    </CInputGroup>
                    {emailError && <div className="text-danger mb-2">{emailError}</div>}
                    Contact Number
                    <CInputGroup className="mb-2">
                      <CFormInput
                        value={contactNoReg} 
                        onChange={handleNumberChange}
                        style={{borderRadius:'25px'}}
                        type="tel"

                      />
                    </CInputGroup>
                    {numberError && <div className="text-danger mb-2">{numberError}</div>}                   
                    <CRow>
                      <CCol xs={12} className='text-center'>
                        <CButton onClick={register} className="px-4" type='button' shape="rounded-pill">
                          Register
                        </CButton>
                        {errorMessage && <div className="text-danger">{errorMessage}</div>}
                        {successMessage && <div className="text-success">{successMessage}</div>}
                      </CCol>
                    </CRow><br/> 
                    
                    <CNav className='justify-content-center'>
                      <CNavLink disabled className='padRight'>Already have an Account ? </CNavLink>
                      <CNavLink href='/login' className='padLeft'> &nbsp; Log In</CNavLink>
                  </CNav>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
