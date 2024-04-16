// import React, { Suspense } from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import { CContainer, CSpinner } from '@coreui/react'

// // routes config
// import routes from '../routes'

// const AppContent = () => {
//   return (
//     <CContainer lg>
//       <Suspense fallback={<CSpinner color="primary" />}>
//         <Routes>
//           {routes.map((route, idx) => {
//             return (
//               route.element && (
//                 <Route
//                   key={idx}
//                   path={route.path}
//                   exact={route.exact}
//                   name={route.name}
//                   element={<route.element />}
//                 />
//               )
//             )
//           })}
//           <Route path="/" element={<Navigate to="dashboard" replace />} />
//         </Routes>
//       </Suspense>
//     </CContainer>
//   )
// }

// export default React.memo(AppContent)


import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CImage } from '@coreui/react'
import React from 'react'
import image3 from "src/assets/images/Home/image3.png"
import image5 from "src/assets/images/Home/image5.png"
import image6 from "src/assets/images/Home/image6.png"
import image7 from "src/assets/images/Home/image7.png"
import image8 from "src/assets/images/Home/image8.png"



const AppContent = () => {
  return (
      <div>
        <div className="box-main">
          <div className="firstHalf">
            <h1 className="text-big">
              Time Table Management System
            </h1>
            <p className="text-small">
              Manage complex timetables with Schedule Application
            </p>
          </div>
        </div>
        
        <div >
          <div className='first'>

            <h2>
              Scheduler Application  stands out as the top choice
              for your institute's online timetable <br /> needs,
              offering the finest online schedule-building software.
            </h2>
          </div>
          <div className='second'>
            <p>
              Scheduler Application is the best software which utlise your time.
            </p>
          </div>
        </div>

        <div className="flex ">
          <div className='left-component'>
            <img src={image3} />
          </div>
          <div className='right-component heading'>
            <h3>
              Get your schedules done easily
            </h3>

            <ul className='content'>
              <li>Import data using copy / paste.</li>
              <li>Schedule multiple weeks at flexible times.</li>
              <li>Just drag and drop your subject in your desired time slot.</li>
              <li>Avoid conflicts using extra views.</li>
            </ul>
            <CButton>
              Request A Demo
            </CButton>
          </div>
        </div>
        <div className="image4 ">
          <div className="heading left-component">
            <h3>
              State-of-the-art automatic timetable generator
            </h3>
            <ul className='content'>
              <li>Save weeks of hard mind bending work.</li>
              <li>Mark forbidden slots e.g. for part-time teachers</li>
              <li>Distribute subjects evenly across the week/class.</li>
              <li>Optimize teacher/student load, gaps, room usage, building moves...</li>
              <li>Create complex timetables with ease.</li>
            </ul>
            <CButton>
              Request A Demo
            </CButton>
          </div>
          <div className='right-component'>
            <img src={image5} className='image5' />
          </div>
          <div className='middle heading'>
            <h3 className=''>
              AI-based automatic conflict detection with Schedular Application <br />   &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; timetable management system
            </h3>
            <p className='content'>
              <ul>
                <li>Automatic Conflict detetcion, allow or Deny conflicts.</li>
                <li>Teacher conflicts detection.</li>
                <li>Student conflicts detection.</li>
                <li>Resource and infrastructure conflicts detection.</li>
              </ul>
            </p>
            <CButton>
              Request A Demo
            </CButton>
          </div>
          <div >
            <h3 className="mid">
              Scientific study Administration modules
            </h3>
            <p className='mid-para'>
              bring improvement in school administration , teaching and learning <br /> &emsp; academics environment and communication with parents.
            </p>
          </div>
        </div>

        <div className='flex'>
          <div className='image6'>
            <img src={image6} />
          </div>
          <div className='image7'>
            <img src={image7} />
          </div>
        </div>
        <div >
          <img src={image8} className='image8' />
          <div >
            <h3 className='m'>Simple, honest & transparent Pricing</h3>
            <p className='md'>
              Digitize your day-to-day operations with our simple and affordable pricing for institutes of all sizes.
            </p>
          </div>
        </div>
        <div className='flex'>
          <div className='small-box'>
            <h3>
              Free
            </h3>
            <ul>
              <li>Web app for all device.</li>
              <li>Premiun support.</li>
              <li>30-days trial period.</li>
            </ul>
            <p>$$$</p>
          </div>
          <div className='small-box'>
            <h3>
              Basic
            </h3>
            <ul>
              <li>Web app for all device.</li>
              <li>Premiun support.</li>
              <li>Up to 40 teachers.</li>
            </ul>
            <p>$$$</p>
          </div>
          <div className='small-box'>
            <h3>
              Premium
            </h3>
            <ul>
              <li>Web app for all device.</li>
              <li>Premiun support.</li>
              <li>Up to 100 teachers.</li>
            </ul>
            <p>$$$</p>
          </div>
        </div>

        <div>
          
          <CAccordion className='accordion'>
            <h3>Frequently Asked Questions?</h3>
            <CAccordionItem>
              <CAccordionHeader>Question</CAccordionHeader>
              <CAccordionBody>
                Answer
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem>
            <CAccordionHeader>Question</CAccordionHeader>
              <CAccordionBody>
                Answer
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem>
              <CAccordionHeader>Question</CAccordionHeader>
              <CAccordionBody>
                Answer
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem >
              <CAccordionHeader>Question</CAccordionHeader>
              <CAccordionBody>
                Answer
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem >
              <CAccordionHeader>Question</CAccordionHeader>
              <CAccordionBody>
                Answer
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem >
              <CAccordionHeader>Question</CAccordionHeader>
              <CAccordionBody>
                Answer
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem >
              <CAccordionHeader>Question</CAccordionHeader>
              <CAccordionBody>
                Answer
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem >
              <CAccordionHeader>Question</CAccordionHeader>
              <CAccordionBody>
                Answer
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem >
              <CAccordionHeader>Question</CAccordionHeader>
              <CAccordionBody>
                Answer
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem >
              <CAccordionHeader>Question</CAccordionHeader>
              <CAccordionBody>
                Answer
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </div>

        <div>

        </div>
        
      </div>
  )
}

export default AppContent

