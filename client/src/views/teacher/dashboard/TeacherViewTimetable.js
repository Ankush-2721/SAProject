import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCol, CContainer, CForm, CRow } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import TeacherHeader from 'src/components/teacher/TeacherHeader'

const TeacherViewTimetable = () => {
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
                            <h2 className='text-center defaultcolor' > View Timetable </h2>
                            
                        </CForm>

                    </CCol>
                </CRow>
            </CContainer>
      </div>
    </div>
  )
}

export default TeacherViewTimetable
