import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
} from '@coreui/react'
import {
  cilSettings,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar from '../../../assets/images/avatars/10.png'
import { Link, useNavigate } from 'react-router-dom'

import { Auth } from 'src/auth/AuthUser';


const AppHeaderDropdown = () => {


  const navigate = useNavigate();

  const logout = () => {
    Auth.logout();
    navigate('/login');
  };


  return (
    <CDropdown variant="nav-item">
      <CForm className="d-flex">
        <CFormInput type="search" className="me-4" placeholder="Search.." style={{borderRadius:'25px'}} />
          
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <Link to='/myprofile'><CAvatar src={avatar} size="lg" /></Link>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
          <CDropdownItem href="#">
            <CIcon icon={cilUser} className="me-2" />
            My Profile
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilSettings} className="me-2" />
            Settings
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem href='' onClick={logout} >
            <CIcon icon={cilAccountLogout} className="me-2" />
            Logout
          </CDropdownItem>
        </CDropdownMenu>
      </CForm>
    </CDropdown>
   
  )
}

export default AppHeaderDropdown
