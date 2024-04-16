
import { cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CNav, CNavLink } from '@coreui/react'
import React from 'react'

const AdminBreadcrumb = () => {



  return (
    
        <CNav >
          <CDropdown variant="nav-item">
            <CForm className="d-flex">              
              <CDropdownToggle className="py-0 show-on-mobile" caret={false}>
                <CIcon icon={cilMenu} size="lg"/>
              </CDropdownToggle>
              <CDropdownMenu className="pt-0 " placement="bottom-end">
                <CDropdownItem href='/admin'>
                  Dashboard       
                </CDropdownItem>
                <CDropdownItem href="/viewtimetable">
                  View Timetable
                </CDropdownItem>
                <CDropdownItem href="/attendance">
                  Attendance
                </CDropdownItem>
                <CDropdownItem href="/schooldetails">
                  School Details
                </CDropdownItem>
                <CDropdownItem href="/notification">
                  Notification
                </CDropdownItem>
                <CDropdownItem href="/adminprofile">
                  My Profile
                </CDropdownItem>
              </CDropdownMenu>
            </CForm>
          </CDropdown>
          <CNavLink href='/admin' className='b-color show-on-desktop' >
            Dashboard &emsp; &emsp; &emsp; &emsp;
          </CNavLink>
          <CNavLink href='/viewtimetable' className='b-color show-on-desktop'>
            View Timetable &emsp; &emsp; &emsp; &emsp;
          </CNavLink>
          <CNavLink href='/attendance' className='b-color show-on-desktop'>
            Attendance &emsp; &emsp; &emsp; &emsp;
          </CNavLink>
          <CNavLink href='/schooldetails' className='b-color show-on-desktop'>
            School Details &emsp; &emsp; &emsp; &emsp;
          </CNavLink>
          <CNavLink href='/notification' className='b-color show-on-desktop'>
            Notification &emsp; &emsp; &emsp; &emsp;
          </CNavLink> 
          <CNavLink href='/adminprofile' className='b-color show-on-desktop'>
            My Profile &emsp; &emsp; &emsp; &emsp;
          </CNavLink> 
        </CNav>
 
  )
}

export default AdminBreadcrumb