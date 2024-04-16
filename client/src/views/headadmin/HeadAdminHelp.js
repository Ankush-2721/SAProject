import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CCol, CContainer, CForm, CFormTextarea, CRow } from '@coreui/react'
import React from 'react'
import HeadAdminHeader from 'src/components/headadmin/HeadAdminHeader'

const HeadAdminHelp = () => {
  return (
    <div style={{overflow:'hidden'}}>
      <HeadAdminHeader />
      <div>
        <CContainer>
          <h2 className='text-center defaultcolor' >Help</h2>

          <CRow> 
            <CCol sm={6} >
              
              <CForm>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  label="Raise Ticket"
                  rows={4}
                  style={{width:'25%'}}
                ></CFormTextarea><br/>
                <CButton shape="rounded-pill">
                  Send
                </CButton>
              </CForm>
            </CCol>
            <CCol sm={5} >
              <CAccordion >
                Frequently Asked Question
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader>Question 1</CAccordionHeader>
                  <CAccordionBody>
                    Answer
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={2}>
                  <CAccordionHeader>Question 2</CAccordionHeader>
                  <CAccordionBody>
                    Answer
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={3}>
                  <CAccordionHeader>Question 3</CAccordionHeader>
                  <CAccordionBody>
                    Answer
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={4}>
                  <CAccordionHeader>Question 4</CAccordionHeader>
                  <CAccordionBody>
                    Answer
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={5}>
                  <CAccordionHeader>Question 5</CAccordionHeader>
                  <CAccordionBody>
                    Answer
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={6}>
                  <CAccordionHeader>Question 6</CAccordionHeader>
                  <CAccordionBody>
                    Answer
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={7}>
                  <CAccordionHeader>Question 7</CAccordionHeader>
                  <CAccordionBody>
                    Answer
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={8}>
                  <CAccordionHeader>Question 8</CAccordionHeader>
                  <CAccordionBody>
                    Answer
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={9}>
                  <CAccordionHeader>Question 9</CAccordionHeader>
                  <CAccordionBody>
                    Answer
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  )
}

export default HeadAdminHelp
