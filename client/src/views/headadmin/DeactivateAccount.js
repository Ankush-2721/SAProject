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


const DeactivateAccount = () => {


  return (
    <div>
        <HeadAdminHeader />
        <div style={{marginTop:'10%'}} >
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
                        <CCardGroup>
                        <CCard className='p-5 cardwidth shadow' >
                            <CCardBody className='text-center'>
                            <CForm 
                                className="row g-3"
                            >
                                <h2  style={{color:'#1D60AE'}}>Deactivate Account </h2>
                                <CCardText>Are You Sure You Want To <br/> Deactivate Account ?</CCardText>
                                
                                <CRow>
                                <CCol xs={12}>
                                    <CButton href='/' className="px-4" type='submit' shape="rounded-pill">
                                        Deactivate
                                    </CButton>
                                </CCol>
                                </CRow><br/><br/>
                                <CRow>
                                <CCol xs={12}>
                                    <CButton href='/headadmin' className="px-4" color='secondary' type='submit' shape="rounded-pill">
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

export default DeactivateAccount
