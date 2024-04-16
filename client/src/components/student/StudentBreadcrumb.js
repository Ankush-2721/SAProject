
import { cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CNav, CNavLink } from '@coreui/react'
import React from 'react'

const StudentBreadcrumb = () => {



  return (
    
        <CNav >
          <CDropdown variant="nav-item">
            <CForm className="d-flex">              
              <CDropdownToggle className="py-0 show-on-mobile" caret={false}>
                <CIcon icon={cilMenu} size="lg"/>
              </CDropdownToggle>
              <CDropdownMenu className="pt-0 " placement="bottom-end">
                <CDropdownItem href='/student'>
                  Dashboard       
                </CDropdownItem>
                <CDropdownItem href="/StudentNotification">
                  Notification
                </CDropdownItem>
                <CDropdownItem href="/StudentProfile">
                  My Profile
                </CDropdownItem>
                <CDropdownItem href="/StudentLogout">
                  Logout
                </CDropdownItem>
              </CDropdownMenu>
            </CForm>
          </CDropdown>
          <CNavLink href='/student' className='b-color show-on-desktop' >
            Dashboard &emsp; &emsp; &emsp; &emsp;
          </CNavLink>
          <CNavLink href='/StudentNotification' className='b-color show-on-desktop'>
            Notification &emsp; &emsp; &emsp; &emsp;
          </CNavLink> 
          <CNavLink href='/StudentProfile' className='b-color show-on-desktop'>
            My Profile &emsp; &emsp; &emsp; &emsp;
          </CNavLink> 
          <CNavLink href='/StudentLogout' className='b-color show-on-desktop'>
            Logout &emsp; &emsp; &emsp; &emsp;
          </CNavLink>
        </CNav>
 
  )
}

export default StudentBreadcrumb