import { cibChef, cilAccountLogout, cilMenu, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAvatar, CButton, CDropdown, CDropdownDivider, CDropdownHeader, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CNav, CNavLink, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const HeadAdminBreadcrumb = () => {


  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    
        <CNav >
          <CDropdown variant="nav-item">
            <CForm className="d-flex">              
              <CDropdownToggle className="py-0 show-on-mobile" caret={false}>
                <CIcon icon={cilMenu} size="lg"/>
              </CDropdownToggle>
              <CDropdownMenu className="pt-0 " placement="bottom-end">
                <CDropdownItem href='/headadmin'>
                  Dashboard       
                </CDropdownItem>
                <CDropdownItem href="/myprofile">
                  My Profile
                </CDropdownItem>
                <CDropdownItem href="/help">
                  Help
                </CDropdownItem>
                <CDropdownItem href='/headadminlogout'>
                  Logout
                </CDropdownItem>
                <CDropdownItem href="/deactivateaccount">
                  Deactivate Account
                </CDropdownItem>
              </CDropdownMenu>
            </CForm>
          </CDropdown>
          <CNavLink href='/headadmin' className='b-color show-on-desktop' >
            Dashboard &emsp; &emsp; &emsp; &emsp;
          </CNavLink>
          <CNavLink href='/myprofile' className='b-color show-on-desktop' >
            My Profile &emsp; &emsp; &emsp; &emsp;
          </CNavLink> 
          <CNavLink href='/help' className='b-color show-on-desktop' >
            Help &emsp; &emsp; &emsp; &emsp;
          </CNavLink>
          <CNavLink href='/headadminlogout' className='b-color show-on-desktop' >
            Logout &emsp; &emsp; &emsp; &emsp;
          </CNavLink>
          <CNavLink href='/deactivateaccount' className='b-color show-on-desktop' >
            Deactivate Account &emsp; &emsp; &emsp; &emsp;
          </CNavLink>
        </CNav>
 
  )
}

export default HeadAdminBreadcrumb
