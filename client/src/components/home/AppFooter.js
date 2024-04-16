// import React from 'react'
// import { CFooter } from '@coreui/react'

// const AppFooter = () => {
//   return (
//     <CFooter>
//       <div>
//         <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
//           CoreUI
//         </a>
//         <span className="ms-1">&copy; 2023 creativeLabs.</span>
//       </div>
//       <div className="ms-auto">
//         <span className="me-1">Powered by</span>
//         <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
//           CoreUI React Admin &amp; Dashboard Template
//         </a>
//       </div>
//     </CFooter>
//   )
// }

// export default React.memo(AppFooter)


import React from 'react'
import mail from 'src/assets/icons/mail1.png'
import call from 'src/assets/icons/call.png'
import whatsapp from 'src/assets/icons/whatsapp.png'
import { CButton, CCol, CFormInput, CFormLabel, CImage, CInputGroup, CRow } from '@coreui/react'
import location from 'src/assets/icons/location.png'


const AppFooter = () => {
  return (
    <div className='appfooter'>
        <div className='d-flex'>
          <div className='footer-box shadow'>
            <CImage src={location}/>
            <p>Bandal Complex, Paud Road, Kothrud Depot, Pune, IN 411038</p>
          </div>
          <div className='footer-box shadow'>
            <CImage src={mail} />
            <p>info@tekhnologiaindia.com</p>
          </div>
          <div className='footer-box shadow'>
            <CImage src={call} />
            <p>+91 20 79638392</p>
          </div>
          <div className='footer-box shadow'>
            <CImage src={whatsapp} />
            <p>+91 77095 41818</p>
          </div>
        </div>
        <div className='footer-form'>
            <h1>Contact Us</h1> <br/>
            <div>
                <CRow className="g-3">
                    <CCol sm={7} >
                        Name
                        <CFormInput />
                    </CCol><br/>
                    <CCol sm={7}>
                        Email Id
                        <CFormInput />
                    </CCol>
                    <CCol sm={7}>
                        Your Message
                        <CFormInput />
                    </CCol>
                    <CCol sm={7}>
                    <CButton>Submit</CButton>
                    </CCol>
                </CRow>
            </div>
        </div>
    </div>
  )
}

export default AppFooter
