import { CCol, CContainer, CRow } from '@coreui/react'
import React from 'react'
import AdminHeader from 'src/components/admin/AdminHeader'

const ViewTimtable = () => {
  return (
    <div>
      <div><AdminHeader />
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={6}>
              <h2 className='text-center defaultcolor' > Timetable </h2>
            </CCol>
          </CRow>
          
        </CContainer>
      </div>
    </div>
  )
}

export default ViewTimtable
