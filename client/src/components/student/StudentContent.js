import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCol, CContainer, CForm, CRow } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import StudentHeader from './StudentHeader'

const StudentContent = () => {
  return (

    <div>
      <CContainer>
            <CRow className="justify-content-center">
                <CCol md={4}>
        
                    <CForm>
                        <h2 className='text-center defaultcolor' > Timetable </h2>
                        
                    </CForm>

                </CCol>
            </CRow>
      </CContainer>
    </div>
  )
}

export default StudentContent
