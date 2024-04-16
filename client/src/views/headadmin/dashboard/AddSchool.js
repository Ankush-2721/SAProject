import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import HeadAdminHeader from 'src/components/headadmin/HeadAdminHeader';
import Axios from 'axios';

import { fetchInstitute, addSchool } from 'src/api/APIHeadAdmin';


const AddSchool = () => {
    const userId = "90";

    const [institute, setInstitute] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [schoolRegName, setSchoolRegName] = useState("");
    const [boardtype, setBoardType] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const [schoolError, setSchoolError] = useState('');
    const [regError, setRegError] = useState('');
    const [boardError, setBoardError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [pincodeError, setPincodeError] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [CountryError, setCountryError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [numberError, setNumberError] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateSchoolName = () => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(schoolName);
    };

    const validateRegNumber = () => {
        const regex = /^\d+$/;
        return regex.test(schoolRegName);
    };

    const validateBoard = () => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(boardtype);
    };

    const validateAddress = () => {
        const regex = /^[A-Za-z0-9\s.,\/-]+$/;
        return regex.test(address);
    };

    const validatePincode = () => {
        const regex = /^\d{6}$/; 
        return regex.test(pincode);
    };

    const validateCity = () => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(city);
    };

    const validateState = () => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(state);
    };

    const validateCountry = () => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(country);
    };

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateNumber = () => {
        const regex = /^\d{10}$/;
        return regex.test(number);
    };

    useEffect(() => {
        const fetchAdmindata = async () => {
          try {
            const fetchedInstitute = await fetchInstitute(); 
            setInstitute(fetchedInstitute.data[0].name);
          } catch (error) {
            console.log('error fetching institute for headadmin');
          }
        };
    
        fetchAdmindata();
    }, []);




    const AddSchool = async () => {


        if (!validateSchoolName()) {
            setSchoolError('Please enter a valid school name.');
            return;
        }

        if (!validateRegNumber()) {
            setRegError('Please enter a valid school registration number.');
            return;
        }

        if (!validateBoard()) {
            setBoardError('Please enter a valid board type.');
            return;
        }

        if (!validateAddress()) {
            setAddressError('Please enter a valid address.');
            return;
        }

        if (!validatePincode()) {
            setPincodeError('Please enter a valid pincode.');
            return;
        }

        if (!validateCity()) {
            setCityError('Please enter a valid city name.');
            return;
        }

        if (!validateState()) {
            setStateError('Please enter a valid state name.');
            return;
        }

        if (!validateCountry()) {
            setCountryError('Please enter a valid country name.');
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

        try {
            await addSchool(userId, schoolName, schoolRegName, boardtype, address, pincode, city, state, country, email, number);
            setSuccessMessage('School added successfully!');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error("Error adding school:", error);
            setErrorMessage('Error adding school. Please try again later.');
        }

      
    };

    const handleSchoolNameChange = (e) => {
        const regex = /^[A-Za-z\s]+$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setSchoolName(e.target.value);
            setSchoolError('');
        }
    };


    const handleRegChange = (e) => {
        // Allow only 10 digits
        const regex = /^\d+$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setSchoolRegName(e.target.value);
            setRegError('');
        }
    };

    const handleBoardChange = (e) => {
        const regex = /^[A-Za-z\s]+$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setBoardType(e.target.value);
            setBoardError('');
        }
    };

    const handlePincodeChange = (e) => {
        const regex = /^\d{0,6}$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setPincode(e.target.value);
            setPincodeError('');
        }
    };

    const handleCityChange = (e) => {
        const regex = /^[A-Za-z\s]+$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setCity(e.target.value);
            setCityError('');
        }
    };

    const handleStateChange = (e) => {
        const regex = /^[A-Za-z\s]+$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setState(e.target.value);
            setStateError('');
        }
    };
    
    const handleCountryChange = (e) => {
        const regex = /^[A-Za-z\s]+$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setCountry(e.target.value);
            setCountryError('');
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
                                <h2 className="text-center defaultcolor">Add School</h2>
                                Institution Name
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        style={{ borderRadius: "25px" }}
                                        type="text"
                                        disabled
                                        value={institute}
                                    />
                                </CInputGroup>
                                School Name
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        value={schoolName}
                                        onChange={handleSchoolNameChange}
                                        style={{ borderRadius: "25px" }}
                                        type="text"
                                    />
                                </CInputGroup>
                                {schoolError && <div className="text-danger mb-2">{schoolError}</div>}
                                School Registration Number
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        value={schoolRegName}
                                        onChange={handleRegChange}
                                        style={{ borderRadius: '25px' }}
                                        type="tel"
                                    />
                                </CInputGroup>
                                {regError && <div className="text-danger mb-2">{regError}</div>}
                                Board Type
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        value={boardtype}
                                        onChange={handleBoardChange}
                                        style={{ borderRadius: '25px' }}
                                        type="text"
                                    />
                                </CInputGroup>
                                {boardError && <div className="text-danger mb-2">{boardError}</div>}
                                Address
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        value={address}
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                            setAddressError('');
                                        }}
                                        style={{ borderRadius: '25px' }}
                                        type="text"
                                    />
                                </CInputGroup>
                                {addressError && <div className="text-danger mb-2">{addressError}</div>}
                                Pincode
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        value={pincode}
                                        onChange={handlePincodeChange}
                                        style={{ borderRadius: '25px' }}
                                        type="tel"
                                    />
                                </CInputGroup>
                                {pincodeError && <div className="text-danger mb-2">{pincodeError}</div>}
                                City
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        value={city}
                                        onChange={handleCityChange}
                                        style={{ borderRadius: '25px' }}
                                        type="text"
                                    />
                                </CInputGroup>
                                {cityError && <div className="text-danger mb-2">{cityError}</div>}
                                State
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        value={state}
                                        onChange={handleStateChange}
                                        style={{ borderRadius: '25px' }}
                                        type="text"
                                    />
                                </CInputGroup>
                                {stateError && <div className="text-danger mb-2">{stateError}</div>}
                                Country
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        value={country}
                                        onChange={handleCountryChange}
                                        style={{ borderRadius: '25px' }}
                                        type="text"
                                    />
                                </CInputGroup>
                                {CountryError && <div className="text-danger mb-2">{CountryError}</div>}
                                Email Id
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailError('');
                                        }}
                                        style={{ borderRadius: '25px' }}
                                        type="email"
                                    />
                                </CInputGroup>
                                {emailError && <div className="text-danger mb-2">{emailError}</div>}
                                Contact Number
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        value={number}
                                        onChange={handleNumberChange}
                                        style={{ borderRadius: '25px' }}
                                        type="tel"
                                    />
                                </CInputGroup>
                                {numberError && <div className="text-danger mb-2">{numberError}</div>}
                                <CRow>
                                    <CCol xs={12} className="text-center">
                                        <CButton
                                            className="px-4"
                                            type="button"
                                            shape="rounded-pill"
                                            onClick={AddSchool}
                                        >
                                            Add School
                                        </CButton>
                                        {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                        {successMessage && <div className="text-success">{successMessage}</div>}
                                    </CCol>
                                </CRow>
                                <br />
                            </CForm>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </div>
    );
};

export default AddSchool;

