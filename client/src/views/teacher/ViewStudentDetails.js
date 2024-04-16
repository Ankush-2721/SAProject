import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import TeacherHeader from 'src/components/teacher/TeacherHeader'

import 'src/scss/_custom.scss'

const ViewStudentDetails = () => {
  return (
    <div>
        <TeacherHeader />
        <div className='add-div'>
                <CRow>
                    <CCol >
                        <h2 className='text-center defaultcolor'>Student Details</h2>
                        <CCard className='w-75 shadow middle-card'>
                            <CCardBody>
                                Student Name
                            </CCardBody>
                        </CCard>
                        <CCard className='w-75 shadow middle-card'>
                            <CCardBody>
                                Student Name
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
        </div>
    </div>
  )
}

export default ViewStudentDetails
