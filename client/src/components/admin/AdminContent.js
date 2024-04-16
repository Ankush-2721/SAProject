import { CButton, CCard, CCardImage, CCardImageOverlay, CCardTitle, CCol, CRow } from '@coreui/react'
import React from 'react'

import image from '../../assets/images/image.png'
import 'src/scss/_custom.scss'

const AdminContent = () => {
  return (
    <div className="container overflow-hidden text-center" >
        <div className="row gy-5">
        <CRow xs={{ cols: 1, gutterX: 1, gutterY:5}} md={{ cols: 3 }}  >
            <CCol className="text-center" >
                <CButton color='white' href='/add'>
                    <CCard className='a-content' >
                        <CCardImage src={image} />
                        <CCardImageOverlay>
                            <CCardTitle className='a-content-title'>Add</CCardTitle>
                        </CCardImageOverlay>
                    </CCard>
                </CButton>
            </CCol>
            <CCol className="text-center">
                <CButton color='white' href='/generatetimetable'>
                    <CCard className='a-content'>
                        <CCardImage src={image} />
                        <CCardImageOverlay >
                            <CCardTitle className='a-content-title' >Generate Timetable</CCardTitle>
                        </CCardImageOverlay>
                    </CCard>
                </CButton>
            </CCol>
            <CCol className="text-center">
                <CButton color='white' href='/leavesection'>
                    <CCard className='a-content'>
                        <CCardImage src={image} />
                        <CCardImageOverlay >
                            <CCardTitle className='a-content-title'>Leave Section</CCardTitle>
                        </CCardImageOverlay>
                    </CCard>
                </CButton>
            </CCol>
            <CCol className="text-center a-content-half"  >
                <CButton color='white' href='/reassign'>
                    <CCard  className='a-content' >
                        <CCardImage src={image} />
                        <CCardImageOverlay>
                            <CCardTitle className='a-content-title'>Reassign</CCardTitle>
                        </CCardImageOverlay>
                    </CCard>
                </CButton>
            </CCol>
            <CCol className="text-center">
                <CButton color='white' href='/availability'>
                    <CCard className='a-content'>
                        <CCardImage src={image} />
                        <CCardImageOverlay >
                            <CCardTitle className='a-content-title' >Availability of Teacher </CCardTitle>
                        </CCardImageOverlay>
                    </CCard>
                </CButton>
            </CCol>
        </CRow>
        </div>
    </div>
  )
}

export default AdminContent
