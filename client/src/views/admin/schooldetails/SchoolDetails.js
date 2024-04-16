import { CButton, CCard, CCardImage, CCardImageOverlay, CCardTitle, CCol, CRow } from '@coreui/react'
import React from 'react'

import image from 'src/assets/images/image.png'
import 'src/scss/_custom.scss'
import AdminHeader from 'src/components/admin/AdminHeader'

const SchoolDetails = () => {
  return (
    <div>
        <AdminHeader />
        <div className=" add-div overflow-hidden text-center" >
            <h2 className='defaultcolor' >School Details</h2>
            <div className="row gy-5">
            <CRow xs={{ cols: 1, gutterX: 1, gutterY:5}} md={{ cols: 5 }}  >
                <CCol className="text-center" >
                    <CButton color='white' href='/teachers'>
                        <CCard className='a-content' >
                            <CCardImage src={image} />
                            <CCardImageOverlay>
                                <CCardTitle className='a-content-title'>Teachers</CCardTitle>
                            </CCardImageOverlay>
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center">
                    <CButton color='white' href='/class'>
                        <CCard className='a-content'>
                            <CCardImage src={image} />
                            <CCardImageOverlay >
                                <CCardTitle className='a-content-title' >Class</CCardTitle>
                            </CCardImageOverlay>
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center">
                    <CButton color='white' href='/section'>
                        <CCard className='a-content'>
                            <CCardImage src={image} />
                            <CCardImageOverlay >
                                <CCardTitle className='a-content-title'>Section</CCardTitle>
                            </CCardImageOverlay>
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center "  >
                    <CButton color='white' href='/subject'>
                        <CCard  className='a-content' >
                            <CCardImage src={image} />
                            <CCardImageOverlay>
                                <CCardTitle className='a-content-title'>Subject</CCardTitle>
                            </CCardImageOverlay>
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center "  >
                    <CButton color='white' href='/ClassSubject'>
                        <CCard  className='a-content' >
                            <CCardImage src={image} />
                            <CCardImageOverlay>
                                <CCardTitle className='a-content-title'>Class Subject</CCardTitle>
                            </CCardImageOverlay>
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center a-content-half1 "  >
                    <CButton color='white' href='/ClassSection'>
                        <CCard  className='a-content' >
                            <CCardImage src={image} />
                            <CCardImageOverlay>
                                <CCardTitle className='a-content-title'>Class Section</CCardTitle>
                            </CCardImageOverlay>
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center ">
                    <CButton color='white' href='/ClassSubjectTeacher'>
                        <CCard className='a-content'>
                            <CCardImage src={image} />
                            <CCardImageOverlay >
                                <CCardTitle className='a-content-title ' > Class Subject Teacher </CCardTitle>
                            </CCardImageOverlay>
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center "  >
                    <CButton color='white' href='/students'>
                        <CCard  className='a-content' >
                            <CCardImage src={image} />
                            <CCardImageOverlay>
                                <CCardTitle className='a-content-title'> Students </CCardTitle>
                            </CCardImageOverlay>
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center "  >
                    <CButton color='white' href='/StudentClass'>
                        <CCard  className='a-content' >
                            <CCardImage src={image} />
                            <CCardImageOverlay>
                                <CCardTitle className='a-content-title'> Student Class </CCardTitle>
                            </CCardImageOverlay>
                        </CCard>
                    </CButton>
                </CCol>
            </CRow>
            </div>
        </div>
    </div>
  )
}

export default SchoolDetails
