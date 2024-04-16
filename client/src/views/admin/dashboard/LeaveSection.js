import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import 'src/scss/_custom.scss'


const LeaveSection = () => {
  return (
    <div>
        <AdminHeader />
        <div>
            <CContainer>
                <Link to='/admin'>
                    <CIcon icon={cilArrowThickLeft} /> Back
                </Link>
                <CRow>
                    <CCol  >
                        <h2 className='defaultcolor text-center'> Leave Section </h2>
                        <CCard className='w-75 shadow ls-card middle-card'>

                            <CCardBody>
                                Teacher Name <Link>Details</Link>
                                <CButtonGroup role='group' aria-label="Basic outlined example" className='ls-grp mar-right' >
                                    <Link to='#' className='ls-approval' >Approval</Link>
                                    <Link to='#' className='ls-reject' >Reject</Link>
                                </CButtonGroup>
                            </CCardBody>
                            
                        </CCard>
                        <CCard className='w-75 shadow ls-card middle-card' >

                            <CCardBody>
                                Teacher Name <Link>Details</Link>
                                <CButtonGroup role='group' aria-label="Basic outlined example" className='ls-grp mar-right' >
                                    <Link to='#' className='ls-approval' >Approval</Link>
                                    <Link to='#' className='ls-reject' >Reject</Link>
                                </CButtonGroup>
                            </CCardBody>
                            
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    </div>
  )
}

export default LeaveSection
