import { CAlert, CButton, CCard, CCardBody, CCardTitle, CCol, CContainer, CForm, CFormInput, CFormLabel, CInputGroup, CModal, CRow } from '@coreui/react'
import React, { useState } from 'react'
import AdminHeader from 'src/components/admin/AdminHeader'

import { Auth } from 'src/auth/AuthUser';

import { useNavigate } from 'react-router-dom';


const AdminProfile = () => {
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)


    const navigate = useNavigate();

    const logout = () => {
      Auth.logout();
      navigate('/login');
    };



  return (
    <div>
        <AdminHeader />
        <div>
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
            
                        <CForm>
                            <h2 className='text-center defaultcolor' >My Profile </h2>

                            <CFormLabel >Username</CFormLabel>
                            <CInputGroup className="mb-3" >
                            <CFormInput 
                                className='borderRadius'
                                type="username"
                                placeholder='UserName'
                                disabled
                            />
                            </CInputGroup>
                    
                            Name
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                className='borderRadius'
                                placeholder='Admin Name'
                                disabled
                            />
                            </CInputGroup>

                            Email Id
                            <CInputGroup className="mb-4">
                            <CFormInput 
                                className='borderRadius'
                                placeholder='email@example.com'
                                disabled
                            />
                            </CInputGroup>

                            Contact Number
                            <CInputGroup className="mb-4">
                            <CFormInput 
                                className='borderRadius'
                                placeholder='1234567890'
                                disabled
                            />
                            </CInputGroup>

                            Password
                            <CInputGroup className="mb-4">
                            <CFormInput
                                className='borderRadius'
                                type="password"
                                placeholder='*****'
                                disabled
                            />
                            </CInputGroup>   

                            <CButton color="primary" shape="rounded-pill" onClick={() => setVisible1(true)} >
                            Change Password
                            </CButton>
                            <CAlert color="white" dismissible visible={visible1} onClose={() => setVisible1(false)}>
                                Enter New Password
                                <CInputGroup className="mb-4">
                      
                                <CFormInput
                                    className='borderRadius'
                                    type="password"
                                    aria-describedby="inputGroupPrependFeedback"
                                    feedbackInvalid="Please enter password"
                                    required
                                    tooltipFeedback
                                />
                                
                                </CInputGroup>
                                <CRow>
                                    <CCol xs={12} className='text-center'>
                                        <CButton className="px-4" type='submit' shape="rounded-pill">
                                        Save
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CAlert>   

                            <CButton className='btn-gap' shape="rounded-pill" onClick={() => setVisible(!visible)}> Log Out </CButton>
                            <CModal
                                alignment="center"
                                visible={visible}
                                onClose={() => setVisible(false)}                            
                            >

                                <CCard className='text-center logout-card'  >
                                    <CCardTitle className='defaultcolor logout-content'> <h2>Log Out</h2> </CCardTitle>
                                    <CCardBody >
                                        Are You Sure You Want To <br/> Log Out ?<br/> 
                                        <CButton onClick={logout} className='log-mar' shape="rounded-pill" >Log Out</CButton><br/>
                                        <CButton href='/adminprofile' className='log-mar' color='secondary' shape="rounded-pill" >Cancel</CButton>
                                    </CCardBody>   
                                </CCard>
                            
                            </CModal>
                            
                        </CForm>

                    </CCol>
                </CRow>
            </CContainer>
        </div>
    </div>
  )
}

export default AdminProfile
