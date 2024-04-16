import { CAlert, CButton, CCard, CCardBody, CCardTitle, CCol, CContainer, CForm, CFormInput, CFormLabel, CInputGroup, CModal, CRow } from '@coreui/react'
import React, { useState } from 'react'
import TeacherHeader from 'src/components/teacher/TeacherHeader'

const TeacherProfile = () => {
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)


  return (
    <div>
        <TeacherHeader />
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
                                placeholder='Teacher Name'
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

                            
                        </CForm>

                    </CCol>
                </CRow>
            </CContainer>
        </div>
    </div>
  )
}

export default TeacherProfile
