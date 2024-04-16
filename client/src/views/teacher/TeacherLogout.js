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
import TeacherHeader from 'src/components/teacher/TeacherHeader'


const TeacherLogout = () => {

  return (
    <div>
        <TeacherHeader />
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
                                    <CButton href='/login' className="px-4" type='submit' shape="rounded-pill">
                                        Log Out
                                    </CButton>
                                </CCol>
                                </CRow><br/><br/>
                                <CRow>
                                <CCol xs={12}>
                                    <CButton href='/teacher' className="px-4" color='secondary' type='submit' shape="rounded-pill">
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

export default TeacherLogout
