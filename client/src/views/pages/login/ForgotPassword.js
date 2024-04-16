import React from 'react'
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
  CRow,
} from '@coreui/react'
import '../../../scss/_custom.scss'


const ForgotPassword = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className='p-4 maxcard' >
                <CCardBody>
                  <CForm shape="rounded-pill">
                    <h1 className='text-center defaultcolor'>Forget Password ?</h1><br/>
                    Email Id / Contact number<br/><br/>
                    <CInputGroup className="mb-3" >
                      <CFormInput className='borderRadius' />
                    </CInputGroup>
                    <br/>
                    <CRow>
                      <CCol xs={12} className='text-center'>
                        <CButton className="px-4" shape="rounded-pill">
                          Send Link
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
  )
}

export default ForgotPassword
