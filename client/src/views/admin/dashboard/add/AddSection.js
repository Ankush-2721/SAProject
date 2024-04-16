import React, { useState } from 'react';
import { cilArrowThickLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react';
import { Link } from 'react-router-dom';
import AdminHeader from 'src/components/admin/AdminHeader';
import Axios from 'axios';
import 'src/scss/_custom.scss';

import { addSection } from 'src/api/APIAdmin';

const AddSection = () => {


    const [sectionName, setSectionName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [nameError, setNameError] = useState('');

    const validateName = () => {
        const regex = /^[A-Za-z0-9\s]+$/;
        return regex.test(sectionName);
    };


    const section = () => {

        if (!validateName()) {
            setNameError('Please enter a valid section name.');
            return;
        }

        addSection( {
            sectionName: sectionName.trim(),
        })
            .then((response) => {
                console.log(response);
                setSuccessMessage('Section added successfully!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((error) => {
                console.error('Error adding section.', error);
                setErrorMessage('Error adding section. Please try again later.');
            });
    };

    return (
        <div>
            <AdminHeader />
            <div>
                <CContainer>
                    <Link to="/add">
                        <CIcon icon={cilArrowThickLeft} /> Back
                    </Link>
                    <CRow className="justify-content-center">
                        <CCol md={4}>
                            <CForm>
                                <h2 className="text-center defaultcolor">Add Section </h2>
                                <p>Section Name</p>
                                <CInputGroup className="mb-2">
                                    <CFormInput
                                        value={sectionName}
                                        onChange={(e) => {
                                            setSectionName(e.target.value);
                                            setNameError('');
                                        }}
                                        className="borderRadius"
                                        type="text"
                                        required
                                        tooltipFeedback
                                    />
                                </CInputGroup>
                                {nameError && <div className="text-danger mb-2">{nameError}</div>}
                                <CRow>
                                    <CCol xs={12} className="text-center">
                                        <CButton
                                            className="px-4"
                                            type="button"
                                            shape="rounded-pill"
                                            onClick={section}
                                        >
                                            Add Section
                                        </CButton>
                                        {errorMessage && (
                                            <div className="text-danger">{errorMessage}</div>
                                        )}
                                        {successMessage && (
                                            <div className="text-success">{successMessage}</div>
                                        )}
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

export default AddSection;
