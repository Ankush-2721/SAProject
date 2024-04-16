import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/home/index'
import { CImage } from '@coreui/react'
import image from 'src/assets/images/Home/image.png'
import "src/scss/_custom.scss"


const DefaultLayout = () => {
  return (
      <div>
        <div>
          <AppHeader />
          <div>
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
  )
}

export default DefaultLayout
