import React from 'react'
import HeadAdminContent from 'src/components/headadmin/HeadAdminContent'
import HeadAdminHeader from 'src/components/headadmin/HeadAdminHeader'


const HeadAdmin = () => {
  return (
    <div>
      <HeadAdminHeader/>
      <div>
        <HeadAdminContent />
      </div>
    </div>
  )
}

export default HeadAdmin
