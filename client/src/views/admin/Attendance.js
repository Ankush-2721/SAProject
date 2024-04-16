import { CCol, CContainer, CRow, CTable } from '@coreui/react'
import React from 'react'
import AdminHeader from 'src/components/admin/AdminHeader'

const Attendance = () => {
    const columns = [
        {
          key: 'id',
          label: 'Sr No',
          _props: { scope: 'col' },
        },
        {
          key: 'name',
          _props: { scope: 'col' },
        },
        {
            key: 'class',
            label: 'Class',
            _props: { scope: 'col' },
        },
        {
            key: 'day',
            label: 'Day',
            _props: { scope: 'col' },
        },
        {
          key: 'lecture',
          label: 'Lecture No',
          _props: { scope: 'col' },
        },
        {
            key: 'time',
            label: 'Time',
            _props: { scope: 'col' },
        },
      ]
      const items = [
        {
          id: 1,
          name: 'Mark',
          class: '3A',
          lecture: '1',
          day: 'Monday',
          time: '00:00',
          _cellProps: { id: { scope: 'row' } },
        },
        {
          id: 2,
          name: 'Jacob',
          class: '8B',
          lecture: '2',
          day: 'Tuesday',
          time: '00:00',
          _cellProps: { id: { scope: 'row' } },
        },
        {
          id: 3,
          name: 'Larry',
          class: '10',
          lecture: '3',
          day: 'Tuesday',
          time: '00:00',
          _cellProps: { id: { scope: 'row' } },
        },
        {
            id: 4,
            name: 'Rock',
            class: '6D',
            lecture: '5',
            day: 'Wednesday',
            time: '00:00',
            _cellProps: { id: { scope: 'row' }},
        },
      ]
  return (
    <div>
        <AdminHeader />
      <div>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={10}>
              <h2 className='text-center defaultcolor' > Attendance </h2>
               <CTable columns={columns} items={items} />
 
            </CCol>
          </CRow>
          
        </CContainer>
      </div>
    </div>
  )
}

export default Attendance
