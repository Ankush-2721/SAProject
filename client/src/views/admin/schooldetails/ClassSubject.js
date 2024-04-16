import { cilArrowThickLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from 'src/components/admin/AdminHeader'

import 'src/scss/_custom.scss'

const ClassSubject = () => {
    const userId = "45"; 
    const [classes, setClasses] = useState([]);
  
    useEffect(() => {
      const fetchClass = async () => {
        try {
          // Assuming your API endpoint accepts the user ID as a query parameter
          const result = await fetch(`http://192.168.1.39:3005/getClass_Subject/${userId}`);
          const jsonClass = await result.json();
  
          setClasses(jsonClass.data); // Update to setClasses(jsonClass.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchClass();
    }, [userId]);
  
    return (
      <div>
        <AdminHeader />
        <div className='add-div'>
          <Link to='/schooldetails'>
            <CIcon icon={cilArrowThickLeft} /> Back
          </Link>
          <CRow>
            <CCol className='d-flex flex-column justify-content-center align-items-center'>
              <h2 className='text-center defaultcolor'>Class Subject</h2>
              <CCard className='w-75 shadow middle-card'>
                <CCardBody>
                  {Array.isArray(classes) && classes.length > 0 ? (
                    classes.map((classItem, index) => (
                      <div key={index}>
                        <h5>Class: {classItem.class_name}</h5>
                        <p>Subject: {classItem.subject_name}</p>
                        <hr />
                      </div>
                    ))
                  ) : (
                    <p>No data available</p>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </div>
    );
  };
  
  export default ClassSubject;
  