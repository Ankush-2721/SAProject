
import { cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CNav, CNavLink } from '@coreui/react'
import React from 'react'

const TeacherBreadcrumb = () => {



  return (
    
        <CNav >
          <CDropdown variant="nav-item">
            <CForm className="d-flex">              
              <CDropdownToggle className="py-0 show-on-mobile" caret={false}>
                <CIcon icon={cilMenu} size="lg"/>
              </CDropdownToggle>
              <CDropdownMenu className="pt-0 " placement="bottom-end">
                <CDropdownItem href='/teacher'>
                  Dashboard       
                </CDropdownItem>
                <CDropdownItem href="/ViewStudentDetails">
                  View Student Details
                </CDropdownItem>
                <CDropdownItem href="/TeacherNotification">
                  Notification
                </CDropdownItem>
                <CDropdownItem href="/TeacherProfile">
                  My Profile
                </CDropdownItem>
                <CDropdownItem href="/TeacherLogout">
                  Logout
                </CDropdownItem>
              </CDropdownMenu>
            </CForm>
          </CDropdown>
          <CNavLink href='/teacher' className='b-color show-on-desktop' >
            Dashboard &emsp; &emsp; &emsp; &emsp;
          </CNavLink>
          <CNavLink href='/ViewStudentDetails' className='b-color show-on-desktop'>
            View Student Details &emsp; &emsp; &emsp; &emsp;
          </CNavLink>
          <CNavLink href='/TeacherNotification' className='b-color show-on-desktop'>
            Notification &emsp; &emsp; &emsp; &emsp;
          </CNavLink> 
          <CNavLink href='/TeacherProfile' className='b-color show-on-desktop'>
            My Profile &emsp; &emsp; &emsp; &emsp;
          </CNavLink> 
          <CNavLink href='/TeacherLogout' className='b-color show-on-desktop'>
            Logout &emsp; &emsp; &emsp; &emsp;
          </CNavLink>
        </CNav>
 
  )
}

export default TeacherBreadcrumb