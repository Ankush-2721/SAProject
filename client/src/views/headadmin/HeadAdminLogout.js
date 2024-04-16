import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardText,
  CCol,
  CContainer,
  CForm,
  CRow,
} from '@coreui/react'

import HeadAdminHeader from 'src/components/headadmin/HeadAdminHeader'

import { Auth } from 'src/auth/AuthUser';

import { useNavigate } from 'react-router-dom';


const HeadAdminLogout = () => {


    const navigate = useNavigate();

    const logout = () => {
      Auth.logout();
      navigate('/login');
    };

  return (
    <div>
        <HeadAdminHeader />
        <div style={{marginTop:'10%'}} >
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
                        <CCardGroup>
                        <CCard className='p-5 cardwidth shadow'  >
                            <CCardBody className='text-center'>
                            <CForm 
                                className="row g-3"
                            >
                                <h2  className='defaultcolor'> Log Out </h2>
                                <CCardText>Are You Sure You Want To <br/> Log Out ?</CCardText>
                                
                                <CRow>
                                    <CCol xs={12}>
                                        <CButton onClick={logout} className="px-4" type='button' shape="rounded-pill">
                                            Log Out
                                        </CButton>
                                    </CCol>
                                    </CRow><br/><br/>
                                    <CRow>
                                    <CCol xs={12}>
                                        <CButton href='/headadmin' className="px-4" color='secondary' type='button' shape="rounded-pill">
                                        Cancel
                                        </CButton>
                                    </CCol>
                                </CRow>

                            </CForm>
                            </CCardBody>
                        </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    </div>
  )
}

export default HeadAdminLogout


