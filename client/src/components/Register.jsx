/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button, Container } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import useInput from '../hooks/useInput';

const axios = require('axios');

const FormContainer = styled(Container)`
  width: 15%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .form-label {
    color: #cfdbd5;
  }
  button {
    background-color: #3772ff;
    color: #fff;
    border: none;
  }
  div {
    padding-bottom: 10px;
  }
`;

const StyledForm = styled(Form)``;

const ButtonContainer = styled.div`
  margin-top: 1rem;
`;

const AlertContainer = styled(Container)`
  position: absolute;
  top: 130%;
  transform: translate(-50%, -50%);
  left: 50%;
  width: 100%;
`;

const AlertStyle = styled(Alert)`
  p {
    font-size: 18px;
    text-align: center;
    margin-bottom: 0;
  }
`;

const Register = () => {
  const { token } = useParams();
  const [registrationFound, setRegistrationFound] = useState(false);
  // useEffect(() => {
  //   axios('/newRegistration', {
  //     params: {
  //       registrationToken: token,
  //     },
  //   }).then((response) => {
  //     if (response.data === 'Found') {
  //       setRegistrationFound(true);
  //     }
  //   });
  // });
  const {
    value: emailValue,
    bind: bindEmailValue,
    reset: resetEmailValue,
  } = useInput('');
  const {
    value: passwordValue,
    bind: bindPasswordValue,
    reset: resetPasswordValue,
  } = useInput('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (emailValue.length === 0 || passwordValue.length === 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      axios
        .post('/register', {
          email: emailValue,
          password: passwordValue,
        })
        .then((response) => {
          if (response.data !== 'Success') {
            console.log(response.data);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
          } else {
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 2000);
            setTimeout(() => (window.location = '/login'), 2000);
          }
          resetEmailValue();
          resetPasswordValue();
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <FormContainer>
        {!registrationFound ? (
          <>
            <StyledForm onSubmit={handleRegister}>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  {...bindEmailValue}
                  placeholder='Enter email'
                />
              </Form.Group>
              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  {...bindPasswordValue}
                  placeholder='Password'
                />
              </Form.Group>
              <ButtonContainer>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </ButtonContainer>
            </StyledForm>
            <AlertContainer>
              <AlertStyle show={showAlert} variant='danger' transition>
                <Alert.Heading>
                  <p>Credentials Invalid</p>
                </Alert.Heading>
              </AlertStyle>
              <AlertStyle show={showSuccessAlert} variant='success' transition>
                <Alert.Heading>
                  <p>Success! You will now be redirected to the login page</p>
                </Alert.Heading>
              </AlertStyle>
            </AlertContainer>
          </>
        ) : (
          <h2>Ooops! Not a valid registration link!</h2>
        )}
      </FormContainer>
    </>
  );
};

export default Register;
