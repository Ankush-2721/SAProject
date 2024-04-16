import React from 'react'
import StudentContent from 'src/components/student/StudentContent'
import StudentHeader from 'src/components/student/StudentHeader'

const StudentLayout = () => {
  return (
    <div>
      <StudentHeader />
      <div>
        <StudentContent />
      </div>
    </div>
  )
}

export default StudentLayout
