import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
  CNavLink,
  CNavItem,
  CImage,
  CDropdown,
  CForm,
  CFormInput,
  CDropdownToggle,
  CAvatar,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAccountLogout, cilUser } from '@coreui/icons'
import avatar from '../../assets/images/avatars/10.png'

import StudentBreadcrumb from './StudentBreadcrumb'
import salogo from '../../assets/brand/SAlogo.png'

const StudentHeader = () => {

  return (
    <CHeader position="sticky" className="mb-4 header"  >
        <CContainer fluid  >
          <CHeaderNav className="d-none d-md-flex me-auto"  >
            <CNavItem>
              <CNavLink to="/student" component={NavLink} className='d-flex'>
                <CImage src={salogo} height={48} />
                <CNavItem className="header-brand">Student Dashboard</CNavItem>
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav className="ms-3">
            <CDropdown variant="nav-item">
                <CForm className="d-flex">
                    <CFormInput type="search" className="me-4" placeholder="Search.." style={{borderRadius:'25px'}} />

                    <CDropdown variant="nav-item">
                      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                        <CAvatar src={avatar} size="lg" />
                      </CDropdownToggle>
                      <CDropdownMenu className="pt-2" placement="bottom-end">
                        <CDropdownItem href="/studentprofile">
                          <CIcon icon={cilUser} className="me-2" />
                            My Profile
                        </CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem href="/login">
                          <CIcon icon={cilAccountLogout} className="me-2" />
                            Logout
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                    
                </CForm>
            </CDropdown>

          </CHeaderNav>
        </CContainer>
      <CHeaderDivider />
      <CContainer className='justify-content-center' >
        <StudentBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default StudentHeader
