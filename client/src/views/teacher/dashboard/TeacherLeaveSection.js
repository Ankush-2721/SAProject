import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormCheck, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TeacherHeader from 'src/components/teacher/TeacherHeader'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const TeacherLeaveSection = () => {

    // const [date, setDate] = useState(new Date());
    // const [dateto, setDateto] = useState();

    const [dateF, setDateF] = useState();
    const [dateT, setDateT] = useState();

    // const [select, setSelect] = useState();


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
                            <h2 className='text-center defaultcolor' > Leave Section </h2>
                            Leave Type <br/>
                            <CFormCheck inline type="radio" name="inlineRadioOptions" value="option1" label="Full Day"/>
                            <CFormCheck inline type="radio" name="inlineRadioOptions" value="option2" label="First Half"/>
                            <CFormCheck inline type="radio" name="inlineRadioOptions" value="option3" label="Second Half"/>
                            <br/><br/>

                            Leave Reason
                            <CFormCheck type="radio" name="exampleRadios" value="option1" label="Sick Leave"/>
                            <CFormCheck type="radio" name="exampleRadios" value="option2" label="Medical Leave"/>
                            <CFormCheck type="radio" name="exampleRadios" value="option3" label="Casual Leave"/>
                            <CFormCheck type="radio" name="exampleRadios" value="option4" label="Maternity Leave"/>
                            <CFormCheck type="radio" name="exampleRadios" value="option5" label="Paternity Leave"/>
                            <CFormCheck type="radio" name="exampleRadios" value="option6" label="Other" />


                            From
                            <CInputGroup className="mb-3">
                            {/* <CFormInput 
                                className='borderRadius'
                                type="text"
                                required
                                tooltipFeedback
                            /> */}
                                <DatePicker 
                                    className='borderRadius border' 
                                    onChange={(dateF) => setDateF(dateF)} 
                                    selected={dateF}
                                    required
                                />

                            </CInputGroup>

                            To
                            <CInputGroup className="mb-4">
                                <DatePicker 
                                    className='borderRadius border' 
                                    onChange={(dateT) => setDateT(dateT)}
                                    selected={dateT}
                                />
                            </CInputGroup>               
                            <CRow>
                            <CCol xs={12} className='text-center'>
                                <CButton className="px-4" type='submit' shape="rounded-pill">
                                    Apply
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

export default TeacherLeaveSection
