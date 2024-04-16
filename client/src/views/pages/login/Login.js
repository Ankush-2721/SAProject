// import React, { useState } from 'react'

// import AuthUser from 'src/auth/AuthUser';

// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardGroup,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CFormLabel,
//   CImage,
//   CInputGroup,
//   CNav,
//   CNavLink,
//   CRow,
// } from '@coreui/react'
// import google from '../../../assets/icons/google.png'
// import facebook from '../../../assets/icons/facebook.png'
// import mail from '../../../assets/icons/mail.png'

// import '../../../scss/_custom.scss'

// const Login = () => {


//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
  
//   const {http,setToken} = AuthUser();


//   const login = () => {
//     http.post("http://192.168.1.42:3005/login", {
//       userNameOrEmail: username,
//       userPassword: password,
//     }).then((response) => {
//       console.log(response);
//       setToken(response.data.user,response.data.access_token);

//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   };




//   return (
//     <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={6}>
//             <CCardGroup>
//               <CCard className='p-4 maxcard'>
//                 <CCardBody>
//                   <CForm 
//                     className="row g-3 needs-validation"
//                     noValidate
//                   >
//                     <h1 className='text-center defaultcolor' >Log In Here!</h1>
//                     <CFormLabel >Username</CFormLabel>
//                     <CInputGroup className="mb-3" >
//                       <CFormInput 
//                         onChange={(e) => {
//                           setUsername(e.target.value);
//                         }}
//                         style={{borderRadius:'25px'}}
//                         type="username"
//                         aria-describedby="inputGroupPrependFeedback"
//                         feedbackInvalid="Please enter userName."
//                         required
//                         tooltipFeedback
//                       />
//                     </CInputGroup>
//                     Password
//                     <CInputGroup className="mb-1">
                      
//                       <CFormInput
//                         onChange={(e) => {
//                           setPassword(e.target.value);
//                         }}
//                         style={{borderRadius:'25px'}}
//                         type="password"
//                         aria-describedby="inputGroupPrependFeedback"
//                         feedbackInvalid="Please enter password"
//                         required
//                         tooltipFeedback
//                       />
                      
//                     </CInputGroup>
//                     <CCol className="col-md-6 offset-md-7"  md={{ offset: 5 }} >
//                       <CNav>
//                         <CNavLink href="/forgotpassword" style={{color:'rgba(44, 56, 74, 0.95)'}}>
//                           Forgot password ?
//                         </CNavLink>
//                       </CNav>
                        
//                     </CCol>
                    
//                     <CRow>
//                       <CCol xs={12} className='text-center'>
//                         <CButton className="px-4" type='button' shape="rounded-pill" onClick={login}>
//                           Log in
//                         </CButton>
//                       </CCol>
//                     </CRow><br/><br/>
//                     <CRow className='justify-content-center'>
//                       Or Log In with 
//                     </CRow>
                    
//                     <CNav className="flex-column flex-sm-row justify-content-center">
//                       <CNavLink href="#">
//                         <CImage src={mail} />
//                       </CNavLink>
//                       <CNavLink href="#">
//                         <CImage src={facebook} />
//                       </CNavLink>
//                       <CNavLink href="#">
//                         <CImage src={google} />
//                       </CNavLink>
//                     </CNav>
                    
//                     <CNav className='justify-content-center'>
//                       <CNavLink disabled className='padRight'>Don’t have an Account ?</CNavLink>
//                       <CNavLink href='/register' className='padLeft'> &nbsp; Register Now</CNavLink>
//                     </CNav>
                    
//                   </CForm>
//                 </CCardBody>
//               </CCard>
//             </CCardGroup>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   )
// }

// export default Login



// login.js

import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CImage,
  CInputGroup,
  CNav,
  CNavLink,
  CRow,
} from '@coreui/react'
import google from '../../../assets/icons/google.png'
import facebook from '../../../assets/icons/facebook.png'
import mail from '../../../assets/icons/mail.png'
import { useNavigate } from 'react-router-dom';
import { Auth, http } from 'src/auth/AuthUser'; 

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateName = () => {
    return username.trim() !== ''; 
  };

  const validatePassword = () => {
    return password.trim() !== ''; 
  };


  const login = () => {

    if (!validateName()) {
      setNameError('Please enter a username.');
      return;
    }

    if (!validatePassword()) {
      setPasswordError('Please enter a password.');
      return;
    }



    http.post("/login", {
      userNameOrEmail: username,
      userPassword: password,
    })
    .then((response) => {
      // Assuming response contains token and userRole
      const { token, userRole, userId } = response.data.data;

      console.log(token, userRole, userId);
      console.log(response.data);
      setSuccessMessage('login successfully!');
      setTimeout(() => {
          window.location.reload();
      }, 1000);
      Auth.login(token, userRole, userId); // Passing userId here
      if (userRole === 'HeadAdmin') {
        navigate('/headadmin');
      } else if (userRole === 'SchoolAdmin') {
        navigate('/admin');
      } else if (userRole === 'teacher') {
        navigate('/teacher');
      } else if (userRole === 'student') {
        navigate('/student');
      } else {
        navigate('/login');
      }
      
    })
    .catch((error) => {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setErrorMessage('User not found. Please register.');
      } else {
        setErrorMessage('Error logging in. Please try again later.');
      }     });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className='p-4 maxcard'>
                <CCardBody>
                  <CForm 
                    className="row g-3 needs-validation"
                    noValidate
                  >
                    <h1 className='text-center defaultcolor' >Log In Here!</h1>
                    <CFormLabel >Username</CFormLabel>
                    <CInputGroup className="mb-1" >
                      <CFormInput 
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setNameError('');
                        }}
                        style={{borderRadius:'25px'}}
                        type="username"
                      />
                    </CInputGroup>
                    {nameError && <div className="text-danger mb-2">{nameError}</div>}
                    Password
                    <CInputGroup className="mb-1">
                      
                      <CFormInput
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordError('');
                        }}
                        style={{borderRadius:'25px'}}
                        type="password"
                      />
                      
                    </CInputGroup>
                    {passwordError && <div className="text-danger mb-2">{passwordError}</div>}
                    <CCol className="col-md-6 offset-md-7"  md={{ offset: 5 }} >
                      <CNav>
                        <CNavLink href="/forgotpassword" style={{color:'rgba(44, 56, 74, 0.95)'}}>
                          Forgot password ?
                        </CNavLink>
                      </CNav>
                        
                    </CCol>
                    
                    <CRow>
                      <CCol xs={12} className='text-center'>
                        <CButton className="px-4" type='button' shape="rounded-pill" onClick={login}>
                          Log in
                        </CButton>
                        {errorMessage && <div className="text-danger">{errorMessage}</div>}
                        {successMessage && <div className="text-success">{successMessage}</div>}
                      </CCol>
                    </CRow><br/><br/>
                    {/* <CRow className='justify-content-center'>
                      Or Log In with 
                    </CRow>
                    
                    <CNav className="flex-column flex-sm-row justify-content-center">
                      <CNavLink href="#">
                        <CImage src={mail} />
                      </CNavLink>
                      <CNavLink href="#">
                        <CImage src={facebook} />
                      </CNavLink>
                      <CNavLink href="#">
                        <CImage src={google} />
                      </CNavLink>
                    </CNav> */}
                    
                    <CNav className='justify-content-center'>
                      <CNavLink disabled className='padRight'>Don’t have an Account ?</CNavLink>
                      <CNavLink href='/register' className='padLeft'> &nbsp; Register Now</CNavLink>
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

export default Login


