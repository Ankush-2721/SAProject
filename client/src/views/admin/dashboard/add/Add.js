import { CButton, CCard, CCardBody, CCardImage, CCardImageOverlay, CCardTitle, CCol, CRow } from '@coreui/react'
import React from 'react'
import AdminHeader from 'src/components/admin/AdminHeader'
// import addteacher from 'src/assets/images/admin/addteacher.png'
// import addclass from 'src/assets/images/admin/addclass.png'
// import addsection from 'src/assets/images/admin/addsection.png'
// import addsubject from 'src/assets/images/admin/addsubject.png'
// import addclasssubject from 'src/assets/images/admin/addclasssubject.png'
// import addclasssection from 'src/assets/images/admin/addclasssection.png'
// import addsubjectteacher from 'src/assets/images/admin/addsubjecteacher.png'
// import addstudent from 'src/assets/images/admin/addstudent.png'
// import addstudentclass from 'src/assets/images/admin/addstudentclass.png'

import addteacher from 'src/assets/images/admin/addteacher1.png'
import addclass from 'src/assets/images/admin/addclass1.png'
import addsection from 'src/assets/images/admin/addsection1.png'
import addsubject from 'src/assets/images/admin/addsubject1.png'
import addclasssubject from 'src/assets/images/admin/addclasssubject1.png'
import addclasssection from 'src/assets/images/admin/addclasssection1.png'
import addsubjectteacher from 'src/assets/images/admin/addsubjecteacher1.png'
import addstudent from 'src/assets/images/admin/addstudent1.png'
import addstudentclass from 'src/assets/images/admin/addstudentclass1.png'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilArrowThickLeft } from '@coreui/icons'

import 'src/scss/_custom.scss'



const Add = () => {
  return (
    <div className="overflow-hidden" >
        <AdminHeader />
        <div className="row gy-1 add-div " >
            <Link to='/admin' >
                <CIcon icon={cilArrowThickLeft} /> Back
            </Link>

            <CRow xs={{ cols: 1, gutterX: 1, gutterY:5}} md={{ cols: 5 }}  >
                 <CCol className="text-center" >
                    <CButton color='white' href='/AddTeacher'>
                        <CCard className='a-content' >
                            <CCardImage src={addteacher} />
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center" >
                    <CButton color='white' href='/AddClass'>
                        <CCard className='a-content' >
                            <CCardImage src={addclass} />
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center" >
                    <CButton color='white' href='/AddSection'>
                        <CCard className='a-content' >
                            <CCardImage src={addsection} />
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center" >
                    <CButton color='white' href='/AddSubject'>
                        <CCard className='a-content' >
                            <CCardImage src={addsubject} />
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center" >
                    <CButton color='white' href='/AddClassSubject'>
                        <CCard className='a-content' >
                            <CCardImage src={addclasssubject} />
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center add-mar-left" >
                    <CButton color='white' href='/AddClassSection'>
                        <CCard className='a-content' >
                            <CCardImage src={addclasssection} />
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center"  >
                    <CButton color='white' href='/AddSubjectTeacher' >
                        <CCard className='a-content' >
                            <CCardImage src={addsubjectteacher} />
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center" >
                    <CButton color='white' href='/AddStudent'>
                        <CCard className='a-content' >
                            <CCardImage src={addstudent} />
                        </CCard>
                    </CButton>
                </CCol>
                <CCol className="text-center" >
                    <CButton color='white' href='/AddStudentClass'>
                        <CCard className='a-content' >
                            <CCardImage src={addstudentclass} />
                        </CCard>
                    </CButton>
                </CCol>
            </CRow>
        </div>
    </div>
  )
}

export default Add
