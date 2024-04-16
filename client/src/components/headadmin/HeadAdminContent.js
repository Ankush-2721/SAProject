import { CAlert, CButton, CCard, CCardBody, CCol, CContainer, CFormInput, CImage, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Multiselect from 'multiselect-react-dropdown';

import Axios from 'axios';

import { fetchAdmin, fetchSchool, editAdminByHD, deleteAdmin, editSchoolByHD, deleteSchool } from 'src/api/APIHeadAdmin'; 


const HeadAdminContent = () => {

  const userId = "90";

  const [school, setSchool] = useState([])
  const [admin, setAdmin] = useState([])

  const [schoolList, setSchoolList] = useState([]);

  const [visible, setVisible] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [updatedAdminName, setUpdatedAdminName] = useState('');
  const [updatedAdminEmail, setUpdatedAdminEmail] = useState('');
  const [updatedAdminContact, setUpdatedAdminContact] = useState('');
  const [updatedAdminSchool, setUpdatedAdminSchool] = useState('');
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [deleteadminConfirmationVisible, setDeleteAdminConfirmationVisible] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  const [visible1, setVisible1] = useState(false);
  const [editingSchoolId, setEditingSchoolId] = useState(null);
  const [updatedSchoolName, setUpdatedSchoolName] = useState('');
  const [updatedSchoolReg, setUpdatedSchoolReg] = useState('');
  const [updatedSchoolBoard, setUpdatedSchoolBoard] = useState('');
  const [updatedSchoolAddress, setUpdatedSchoolAddress] = useState('');
  const [updatedSchoolPin, setUpdatedSchoolPin] = useState('');
  const [updatedSchoolCity, setUpdatedSchoolCity] = useState('');
  const [updatedSchoolState, setUpdatedSchoolState] = useState('');
  const [updatedSchoolCountry, setUpdatedSchoolCountry] = useState('');
  const [updatedSchoolEmail, setUpdatedSchoolEmail] = useState('');
  const [updatedSchoolContact, setUpdatedSchoolContact] = useState('');
  const [deleteschoolConfirmationVisible, setDeleteSchoolConfirmationVisible] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  useEffect(() => {
    const fetchAdmindata = async () => {
      try {
        const fetchedAdmin = await fetchAdmin(); 
        setAdmin(fetchedAdmin.data);
      } catch (error) {
        console.log('error fetching admins for headadmin');
      }
    };

    fetchAdmindata();
  }, []);

  useEffect(() => {
    const fetchSchooldata = async () => {
      try {
        const fetchedSchools = await fetchSchool(); 
        setSchool(fetchedSchools.data);
        setSchoolList(fetchedSchools.data);
      } catch (error) {
        console.log('error fetching schools for headadmin');
      }
    };

    fetchSchooldata();
  }, []);


  //  Admin

  const handleAdminEditClick = (adminId, adminName, adminEmail, adminContact, adminSchool) => {
    setEditingAdminId(adminId);
    setVisible(true);
    setUpdatedAdminName(adminName);
    setUpdatedAdminEmail(adminEmail);
    setUpdatedAdminContact(adminContact);
    setUpdatedAdminSchool(adminSchool);
  };

  const handleAdminNameChange = (e) => {
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setUpdatedAdminName(e.target.value);
    }
  };

  const handleAdminNumberChange = (e) => {
    const regex = /^\d{0,10}$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setUpdatedAdminContact(e.target.value);
    }
  };

  const handleAdminSchoolChange = (e) => {
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setUpdatedAdminSchool(e.target.value);
    }
  };

  const isAdminFormValid = () => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedAdminEmail);
    const validNumber = /^\d{10}$/.test(updatedAdminContact);
    return updatedAdminName.trim() !== '' && validEmail && validNumber && updatedAdminSchool.trim() !== '';
  };
  


  const handleAdminSaveClick = () => {
    if (!isAdminFormValid()) {
      setErrorMessage('Please fill in all the required fields.');
      return;
    }
  
  
    const selectedSchool = schoolList.find((school) => school.school_name === updatedAdminSchool);

    editAdminByHD( editingAdminId, {
      admin_name: updatedAdminName,
      admin_email_id: updatedAdminEmail,
      admin_contact: updatedAdminContact,
      admin_school_id : selectedSchool.school_id,
    }).then((response) => {
      console.log(response);
      setSuccessMessage('Admin edited successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }).catch((error) => {
      console.error('Error editing admin:', error);
      setErrorMessage('Error editing admin. Please try again later.');
    });
  };
  

  const handleAdminDeleteClick = (adminId) => {
    setDeleteAdminConfirmationVisible(true);
    setAdminToDelete(adminId);
  };



  const handleAdminConfirmDelete = () => {
    deleteAdmin( adminToDelete)
      .then((response) => {
        console.log(response);
        setDeleteAdminConfirmationVisible(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting admin:", error);
        setDeleteAdminConfirmationVisible(false);
      });
  };


  
  const handleAdminCancelDelete = () => {
    setDeleteAdminConfirmationVisible(false);
  };


  //  School


  const handleSchoolEditClick = (schoolId, schoolName, schoolReg, schoolBoard, schoolAddress, schoolPin, schoolCity, schoolState, schoolCountry, schoolEmail, schoolContact) => {
    setEditingSchoolId(schoolId);
    setVisible1(true);
    setUpdatedSchoolName(schoolName);
    setUpdatedSchoolReg(schoolReg);
    setUpdatedSchoolBoard(schoolBoard);
    setUpdatedSchoolAddress(schoolAddress);
    setUpdatedSchoolPin(schoolPin);
    setUpdatedSchoolCity(schoolCity);
    setUpdatedSchoolState(schoolState);
    setUpdatedSchoolCountry(schoolCountry)
    setUpdatedSchoolEmail(schoolEmail);
    setUpdatedSchoolContact(schoolContact);
  };

  const handleSchoolNameChange = (e) => {
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setUpdatedSchoolName(e.target.value);
    }
  };

  const handleSchoolRegChange = (e) => {
    const regex = /^\d+$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setUpdatedSchoolReg(e.target.value);
    }
  };

  const handleSchoolBoardChange = (e) => {
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setUpdatedSchoolBoard(e.target.value);
    }
  };

  const handleSchoolPinChange = (e) => {
    const regex = /^\d{0,6}$/; 
    if (regex.test(e.target.value) || e.target.value === '') {
      setUpdatedSchoolPin(e.target.value);
    }
  };

  const handleSchoolCityChange = (e) => {
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setUpdatedSchoolCity(e.target.value);
    }
  };

  const handleSchoolStateChange = (e) => {
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setUpdatedSchoolState(e.target.value);
    }
  };

  const handleSchoolCountryChange = (e) => {
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setUpdatedSchoolCountry(e.target.value);
    }
  };

  const handleSchoolNumberChange = (e) => {
    const regex = /^\d{0,10}$/;
    if (regex.test(e.target.value) || e.target.value === '') {
      setUpdatedSchoolContact(e.target.value);
    }
  };

  const isSchoolFormValid = () => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedSchoolEmail);
    const validPincode = /^\d{6}$/.test(updatedSchoolPin);
    const validNumber = /^\d{10}$/.test(updatedSchoolContact);
    return updatedSchoolName.trim() !== '' && updatedSchoolReg.trim() !== '' && updatedSchoolBoard.trim() !== '' && updatedSchoolAddress.trim() !== '' && validPincode && updatedSchoolCity.trim() !== '' && updatedSchoolState.trim() !== '' && updatedSchoolCountry.trim() !== '' && validEmail && validNumber ;
  };


  const handleSchoolSaveClick = () => {


    if (!isSchoolFormValid()) {
      setErrorMessage('Please fill in all the required fields.');
      return;
    }


    editSchoolByHD( editingSchoolId, {
      schoolName: updatedSchoolName,
      registrationNo: updatedSchoolReg,
      boardType: updatedSchoolBoard,
      location: {address: updatedSchoolAddress,
        pincode: updatedSchoolPin,
        city: updatedSchoolCity,
        state: updatedSchoolState,
        country: updatedSchoolCountry}, 
      schoolEmail: updatedSchoolEmail,
      contactNo: updatedSchoolContact,
    }).then((response) => {
      console.log(response);
      setSuccessMessage('School edited successfully!');
      setErrorMessage('');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }).catch((error) => {
      console.error('Error editing school:', error);
      setErrorMessage('Error editing school. Please try again later.');
    });
    
  };

  const handleSchoolDeleteClick = (schoolId) => {
    setDeleteSchoolConfirmationVisible(true);
    setSchoolToDelete(schoolId);
  };

  const handleSchoolConfirmDelete = () => {

    deleteSchool( schoolToDelete)
      .then((response) => {
        console.log(response);
        setDeleteSchoolConfirmationVisible(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting school:", error);
        setDeleteSchoolConfirmationVisible(false);
      });
    
  };

  const handleSchoolCancelDelete = () => {
    setDeleteSchoolConfirmationVisible(false);
  };




  return (
    <>
    <CContainer >
      <CButton className='h-a-contentSchool' href='/addschool' size="lg"  >
        Add School
      </CButton>
      <CButton className='h-a-contentAdmin' href='/addadmin' size="lg" >
        Add Admin
      </CButton>


      

    </CContainer>
    <CContainer className='d-flex'>
      <div><br/>
        <h2>Added School</h2>

          {school.map((school) => (
            <div key={school.school_id} className="">
              <CCardBody>
                {editingSchoolId === school.school_id && visible1 ? (
                  <>
                    <CAlert color='white' dismissible visible1={visible} onClose={() => setVisible1(false)}>
                      <strong>Name:</strong> 
                      <CInputGroup className="mb-4">
                        <CFormInput
                          type="name"
                          required
                          tooltipFeedback
                          value={updatedSchoolName}
                          onChange={handleSchoolNameChange}
                        />
                      </CInputGroup>
                      <strong>School Registration Number:</strong>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          type="tel"
                          required
                          tooltipFeedback
                          value={updatedSchoolReg}
                          onChange={handleSchoolRegChange}
                        />
                      </CInputGroup>
                      <strong>Board Type:</strong>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          type="name"
                          required
                          tooltipFeedback
                          value={updatedSchoolBoard}
                          onChange={handleSchoolBoardChange}
                        />
                      </CInputGroup>
                      <strong>Address:</strong>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          type="name"
                          required
                          tooltipFeedback
                          value={updatedSchoolAddress}
                          onChange={(e) => setUpdatedSchoolAddress(e.target.value)}
                        />
                      </CInputGroup>
                      <strong>Pincode:</strong>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          type="tel"
                          required
                          tooltipFeedback
                          value={updatedSchoolPin}
                          onChange={handleSchoolPinChange}
                        />
                      </CInputGroup>
                      <strong>City:</strong>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          type="name"
                          required
                          tooltipFeedback
                          value={updatedSchoolCity}
                          onChange={handleSchoolCityChange}
                        />
                      </CInputGroup>
                      <strong>State:</strong>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          type="name"
                          required
                          tooltipFeedback
                          value={updatedSchoolState}
                          onChange={handleSchoolStateChange}
                        />
                      </CInputGroup>
                      <strong>Country:</strong>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          type="name"
                          required
                          tooltipFeedback
                          value={updatedSchoolCountry}
                          onChange={handleSchoolCountryChange}
                        />
                      </CInputGroup>
                      <strong>Email:</strong>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          type="email"
                          required
                          tooltipFeedback
                          value={updatedSchoolEmail}
                          onChange={(e) => setUpdatedSchoolEmail(e.target.value)}
                        />
                      </CInputGroup>
                      <strong>Contact:</strong>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          type="tel"
                          required
                          tooltipFeedback
                          value={updatedSchoolContact}
                          onChange={handleSchoolNumberChange}
                        />
                      </CInputGroup>
                    </CAlert>
                    <CRow>
                      <CCol xs={12} className="text-center">
                        <CButton 
                          className="px-4" 
                          type="button" 
                          shape="rounded-pill" 
                          onClick={() => handleSchoolSaveClick(editingSchoolId)}
                          disabled={!isSchoolFormValid()}
                        >
                          Save
                        </CButton>
                        {errorMessage && <div className="text-danger">{errorMessage}</div>}
                        {successMessage && <div className="text-success">{successMessage}</div>}
                        {!isSchoolFormValid() && <div className="text-danger">Please fill in all the required fields.</div>}
                      </CCol>
                    </CRow>
                  </>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      <strong>Name:</strong> {school.school_name}<br/>
                      <strong>School Registration Number:</strong> {school.school_reg_no}<br/>
                      <strong>Board Type:</strong> {school.board_type}<br/>
                      <strong>School Address:</strong> {school.school_address}<br/>
                      <strong>Pincode:</strong> {school.school_pincode}<br/>
                      <strong>City:</strong> {school.school_city}<br/>
                      <strong>State:</strong> {school.school_state}<br/>
                      <strong>Country:</strong> {school.school_country}<br/>
                      <strong>Email:</strong> {school.school_email_id}<br/>
                      <strong>Contact:</strong> {school.school_contact_no}<br/>
                    </span>
                    <div>
                      <Link className="ls-grp" onClick={() => handleSchoolEditClick(school.school_id, school.school_name, school.school_reg_no, school.board_type, school.school_address, school.school_pincode, school.school_city, school.school_state, school.school_country, school.school_email_id, school.school_contact_no)}>
                        Edit
                      </Link><br/>
                      <Link className="ls-grp" onClick={() => handleSchoolDeleteClick(school.school_id)}>
                        Delete
                      </Link>
                    </div>
                  </div>
                )}
                {deleteschoolConfirmationVisible && schoolToDelete === school.school_id && (
                  <CAlert dismissible visible={deleteschoolConfirmationVisible} onClose={handleSchoolCancelDelete}>
                    <strong>Confirm Delete</strong>
                    <p>Are you sure you want to delete admin ?</p>
                    <CButton color="danger" onClick={handleSchoolConfirmDelete}>
                      Yes, delete
                    </CButton>
                    <CButton color="secondary" onClick={handleSchoolCancelDelete}>
                      Cancel
                    </CButton>
                  </CAlert>
                )}
              </CCardBody><br/>
            </div>
          ))}

      </div>
      <div><br/>
        <h2>Added Admin</h2>

                {admin.map((admin) => (
                  <div key={admin.admin_id} className="">
                    <CCardBody>
                      {editingAdminId === admin.admin_id && visible ? (
                        <>
                          <CAlert color='white' dismissible visible={visible} onClose={() => setVisible(false)}>
                            <strong>Name:</strong> 
                            <CInputGroup className="mb-4">
                              <CFormInput
                                type="name"
                                required
                                tooltipFeedback
                                value={updatedAdminName}
                                onChange={handleAdminNameChange}
                              />
                            </CInputGroup>
                            <strong>Email:</strong>
                            <CInputGroup className="mb-4">
                              <CFormInput
                                type="email"
                                required
                                tooltipFeedback
                                value={updatedAdminEmail}
                                onChange={(e) => setUpdatedAdminEmail(e.target.value)}
                              />
                            </CInputGroup>
                            <strong>Contact:</strong>
                            <CInputGroup className="mb-4">
                              <CFormInput
                                type="tel"
                                required
                                tooltipFeedback
                                value={updatedAdminContact}
                                onChange={handleAdminNumberChange}
                              />
                            </CInputGroup>
                            {/* <strong>School:</strong> */}

                            {/* <Multiselect
                              id="school"
                              className='multi-select'
                              selectedValues={[{ school_id: admin.school_id, school_name: admin.school_name }]}
                              onSelect={(selectedList, selectedItem) => setSelectedSchools(selectedList)} 
                              onRemove={(selectedList, removedItem) => setSelectedSchools(selectedList)} 
                              options={school} 
                              displayValue={"school_name"}
                              isObject={true}
                              style={{
                                chips: {
                                  background: '#1D60AE'
                                },
                                searchBox: {
                                  borderRadius: '25px',
                                },
                              }}
                              placeholder=''
                            /> */}


                            <strong>Select School : </strong>
                            <select
                                className="form-control borderRadius"
                                value={updatedAdminSchool}
                                onChange={handleAdminSchoolChange}
                            >
                                <option value="">Choose School</option>
                                {schoolList.map(school => (
                                    <option key={school.school_id} value={school.school_name}>{school.school_name}</option>
                                ))}
                            </select>


                          </CAlert>
                          <CRow>
                            <CCol xs={12} className="text-center">
                              <CButton 
                                className="px-4" 
                                type="button" 
                                shape="rounded-pill" 
                                onClick={() => handleAdminSaveClick(editingAdminId)}
                                disabled={!isAdminFormValid()}
                              >
                                Save
                              </CButton>
                              {errorMessage && <div className="text-danger">{errorMessage}</div>}
                              {successMessage && <div className="text-success">{successMessage}</div>}
                              {!isAdminFormValid() && <div className="text-danger">Please fill in all the required fields.</div>}
                            </CCol>
                          </CRow>
                        </>
                      ) : (
                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            <strong>Name:</strong> {admin.admin_name}<br/>
                            <strong>Email:</strong> {admin.admin_email_id}<br/>
                            <strong>Contact:</strong> {admin.admin_contact_no}<br/>
                            <strong>School Name:</strong> {admin.school_name}
                          </span>
                          <div>
                            <Link className="ls-grp" onClick={() => handleAdminEditClick(admin.admin_id, admin.admin_name, admin.admin_email_id, admin.admin_contact_no, admin.school_name)}>
                              Edit
                            </Link><br/>
                            <Link className="ls-grp" onClick={() => handleAdminDeleteClick(admin.admin_id)}>
                              Delete
                            </Link>
                          </div>
                        </div>
                      )}
                      {deleteadminConfirmationVisible && adminToDelete === admin.admin_id && (
                        <CAlert dismissible visible={deleteadminConfirmationVisible} onClose={handleAdminCancelDelete}>
                          <strong>Confirm Delete</strong>
                          <p>Are you sure you want to delete admin ?</p>
                          <CButton color="danger" onClick={handleAdminConfirmDelete}>
                            Yes, delete
                          </CButton>
                          <CButton color="secondary" onClick={handleAdminCancelDelete}>
                            Cancel
                          </CButton>
                        </CAlert>
                      )}
                    </CCardBody><br/>
                  </div>
                ))}

      </div>
    

    </CContainer>
    </>
  )
}

export default HeadAdminContent

