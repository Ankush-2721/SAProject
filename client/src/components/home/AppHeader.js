// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import {
//   CContainer,
//   CHeader,
//   CHeaderBrand,
//   CHeaderDivider,
//   CHeaderNav,
//   CHeaderToggler,
//   CNavLink,
//   CNavItem,
//   CButton,
//   CImage,
//   CNavTitle,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

// import { AppBreadcrumb } from './index'
// import { AppHeaderDropdown } from './header/index'
// import { logo } from 'src/assets/brand/logo'
// import salogo from '../../assets/brand/SAlogo.png'

// import image from 'src/assets/images/Home/image.png'

// import "src/scss/_custom.scss"

// const AppHeader = () => {


//   return (
//     <CHeader position="sticky" className="mb-4" style={{border:'none', boxShadow:'0 0 0 0'}}>
//       <CContainer fluid>

//         <CImage src={image} className='image1' />

//         <CHeaderNav className="d-none d-md-flex me-auto">
//           <CNavItem>
//             <CNavLink to="/" component={NavLink} className='d-flex'>
//               <CImage src={salogo} height={48} />
//               <CNavItem className="header-brand"> &nbsp; Schedular Application</CNavItem>
//             </CNavLink>
//           </CNavItem>
//         </CHeaderNav>
//         <CHeaderNav style={{position:"relative"}}> 
//           <CNavItem>
//             <CNavLink href="#">
//               Home
//             </CNavLink>
//           </CNavItem>
//           <CNavItem>
//             <CNavLink href="#">
//               Features
//             </CNavLink>
//           </CNavItem>
//           <CNavItem>
//             <CNavLink href="#">
//               Tutorial
//             </CNavLink>
//           </CNavItem>
//           <CNavItem>
//             <CNavLink href="#">
//               Pricing
//             </CNavLink>
//           </CNavItem>
//           <CNavItem>
//             <CNavLink href="#">
//               Contact Us
//             </CNavLink>
//           </CNavItem>
//           <CNavItem>
//             <CButton shape="rounded-pill" href='/login'>Signin</CButton>
//           </CNavItem>
//         </CHeaderNav>
//         <CHeaderNav className="ms-3">
//         </CHeaderNav>
//       </CContainer>

//     </CHeader>
//   )
// }

// export default AppHeader




import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CContainer, CHeader, CHeaderNav, CNavItem, CNavLink, CButton, CImage } from '@coreui/react';
import salogo from '../../assets/brand/SAlogo.png';
import image from 'src/assets/images/Home/image.png';
import "src/scss/_custom.scss";

const AppHeader = () => {
  const [hideImage, setHideImage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 100) {
        setHideImage(true);
      } else {
        setHideImage(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <CHeader position="sticky" className="mb-4" style={{ border: 'none', boxShadow: '0 0 0 0' }}>
      <CContainer fluid>
        {!hideImage && <CImage src={image} className='image1' />}
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/" component={NavLink} className='d-flex'>
              <CImage src={salogo} height={48} />
              <CNavItem className="header-brand"> &nbsp; Scheduler Application</CNavItem>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav style={{ position: "relative" }}>
          <CNavItem>
            <CNavLink href="#">Home</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Features</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Tutorial</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Pricing</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Contact Us</CNavLink>
          </CNavItem>
          <CNavItem>
            <CButton shape="rounded-pill" href='/login'>Signin</CButton>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;

