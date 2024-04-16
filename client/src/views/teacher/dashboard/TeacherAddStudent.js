import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import TeacherHeader from 'src/components/teacher/TeacherHeader'

import 'src/scss/_custom.scss'

const TeacherAddStudent = () => {
  return (
    <div>
        <TeacherHeader />
        <div>
            <CContainer>
            <Link to='/teacher' >
                <CIcon icon={cilArrowThickLeft} /> Back
              </Link>
                <CRow className="justify-content-center">
                    <CCol md={4}>
            
                        <CForm>
                            <h2 className='text-center defaultcolor' >Add Student </h2>
                            Class Section
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                className='borderRadius'
                                type="text"
                            />
                            </CInputGroup>
                            Student Name
                            <CInputGroup className="mb-3">
                            <CFormInput 
                                className='borderRadius'
                                type="text"
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>
                            Contact Number
                            <CInputGroup className="mb-4">
                            <CFormInput
                                className='borderRadius'
                                type="number"
                                required
                                tooltipFeedback
                            />
                            </CInputGroup>               
                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton className="px-4" type='submit' shape="rounded-pill">
                                Register Student
                                </CButton>
                            </CCol>
                            </CRow><br/>
                        </CForm>

                    </CCol>
                </CRow>
            </CContainer>
        </div>
    </div>
  )
}

export default TeacherAddStudent
