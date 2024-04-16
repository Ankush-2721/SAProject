import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import HeadAdminHeader from 'src/components/headadmin/HeadAdminHeader'
import Multiselect from 'multiselect-react-dropdown';

import { fetchSchool, registerAdmin } from 'src/api/APIHeadAdmin';

const AddAdmin = () => {
    const userId = "90";

    const [adminName, setAdminName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [selectedSchools, setSelectedSchools] = useState([]);
    const [schoolList, setSchoolList] = useState([{'school_name':'','school_id':''}]);

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [numberError, setNumberError] = useState('');
    const [SchoolError, setSchoolError] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    
    const validateName = () => {
        return adminName.trim() !== ''; 
    };

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateNumber = () => {
        const regex = /^\d{10}$/;
        return regex.test(number);
    };

    const validateSchool = (selectedSchools) => {
        return selectedSchools.length > 0;
    }
    

    useEffect(() => {
        const fetchSchooldata = async () => {
          try {
            const fetchedSchools = await fetchSchool(); 
            setSchoolList(fetchedSchools.data);
          } catch (error) {
            console.log('error fetching schools for headadmin');
          }
        };
    
        fetchSchooldata();
      }, []);

    const admin = async () => {

        if (!validateName()) {
            setNameError('Please enter a name.');
            return;
        }

        if (!validateEmail()) {
            setEmailError('Please enter a valid email id.');
            return;
        }

        if (!validateNumber()) {
            setNumberError('Please enter a valid 10-digit phone number.');
            return;
        }

        if (!validateSchool(selectedSchools)) {
            setSchoolError('Please select school name.')
            return;
        }

        try {
            const response = await registerAdmin(adminName, email, number, selectedSchools);
            console.log(response);
            setSuccessMessage('Admin registered successfully!');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error("Error registering admin:", error);
            setErrorMessage('Error registering admin. Please try again later.');
        }

    };


    const handleNameChange = (e) => {
        const regex = /^[A-Za-z\s]+$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setAdminName(e.target.value);
            setNameError('');
        }
    };


    const handleNumberChange = (e) => {
        const regex = /^\d{0,10}$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setNumber(e.target.value);
            setNumberError('');
        }
    };

    return (
        <div>
            <HeadAdminHeader />
            <div>
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={6}>
                            <CForm>
                                <h2 className='text-center defaultcolor'>Add Admin</h2>
                                Name
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        value={adminName}
                                        onChange={handleNameChange}
                                        style={{borderRadius:'25px'}}
                                        type="text"
                                    />
                                </CInputGroup>
                                {nameError && <div className="text-danger mb-2">{nameError}</div>}
                                Email Id
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailError('');
                                        }}
                                        style={{borderRadius:'25px'}}
                                        type="email"
                                    />
                                </CInputGroup>
                                {emailError && <div className="text-danger mb-2">{emailError}</div>}
                                Contact Number
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        value={number}
                                        onChange={handleNumberChange}
                                        style={{borderRadius:'25px'}}
                                        type="tel"
                                    />
                                </CInputGroup>
                                {numberError && <div className="text-danger mb-2">{numberError}</div>}
                                <div className="mb-2">
                                    <label htmlFor="school" className="form-label">School Name</label>
                                    <Multiselect
                                        id="school"
                                        className='multi-select'
                                        selectedValues={selectedSchools}
                                        onSelect={setSelectedSchools}
                                        onRemove={setSelectedSchools}
                                        options={schoolList}
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
                                    />
                                    {selectedSchools.length === 0 && SchoolError && <div className="text-danger">{SchoolError}</div>}

                                </div>
                                <CRow>
                                    <CCol xs={12} className='text-center'>
                                        <CButton
                                            className="px-4"
                                            type='button'
                                            shape="rounded-pill"
                                            onClick={admin}
                                        >
                                            Register Admin
                                        </CButton>
                                        {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                        {successMessage && <div className="text-success">{successMessage}</div>}
                                    </CCol>
                                </CRow><br/>
                            </CForm>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </div>
    )
}

export default AddAdmin;

