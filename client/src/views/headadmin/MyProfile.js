import { CAlert, CButton, CCol, CContainer, CForm, CFormInput, CFormLabel, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import HeadAdminHeader from 'src/components/headadmin/HeadAdminHeader'

import { fetchInstitute } from 'src/api/APIHeadAdmin'

const MyProfile = () => {
    
    const userId = "90";

    const [visible, setVisible] = useState(false)
    const [institute, setInstitute] = useState('')



    useEffect(() => {
        const fetchAdmindata = async () => {
          try {
            const fetchedInstitute = await fetchInstitute(); 
            setInstitute(fetchedInstitute.data[0].name);
          } catch (error) {
            console.log('error fetching institute for headadmin');
          }
        };
    
        fetchAdmindata();
    }, []);


  return (
    <div>
        <HeadAdminHeader />
        <div>
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
            
                        <CForm>
                            <h2 className='text-center defaultcolor' >My Profile </h2>
                            <CFormLabel >Username</CFormLabel>
                            <CInputGroup className="mb-3" >
                            <CFormInput 
                                style={{borderRadius:'25px'}} 
                                type="username"
                                placeholder='UserName'
                                disabled
                            />
                            </CInputGroup>
                    
                            Institution Name
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                style={{borderRadius:'25px'}} 
                                value={institute}
                                disabled
                            />
                            </CInputGroup>
                            Email Id
                            <CInputGroup className="mb-4">
                            <CFormInput 
                                style={{borderRadius:'25px'}} 
                                placeholder='email@example.com'
                                disabled
                            />
                            </CInputGroup>
                            Contact Number
                            <CInputGroup className="mb-4">
                            <CFormInput 
                                style={{borderRadius:'25px'}} 
                                placeholder='1234567890'
                                disabled
                            />
                            </CInputGroup>
                            Password
                            <CInputGroup className="mb-4">
                            
                            <CFormInput
                                style={{borderRadius:'25px'}}
                                type="password"
                                placeholder='*****'
                                disabled
                            />
                            
                            </CInputGroup>     
                            <CButton color="primary" shape="rounded-pill" onClick={() => setVisible(true)} >
                            Change Password
                            </CButton>
                            <CAlert color="white" dismissible visible={visible} onClose={() => setVisible(false)}>
                                Enter New Password
                                <CInputGroup className="mb-4">
                      
                                <CFormInput
                                    style={{borderRadius:'25px'}}
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

export default MyProfile
