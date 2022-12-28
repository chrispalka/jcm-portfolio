/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../assets/Register.module.css';
import { Form, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import useInput from '../hooks/useInput';

const axios = require('axios');

const Register = ({ isAdmin }) => {
  const { token } = useParams();
  const [registrationFound, setRegistrationFound] = useState(false);
  useEffect(() => {
    if (token) {
      axios('/confirmNewRegistrationToken', {
        params: {
          registrationToken: token,
        },
      }).then((response) => {
        if (response.data === 'Found') {
          setRegistrationFound(true);
        }
      });
    }
  }, []);
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
      <div className={styles.formContainer}>
        {isAdmin || registrationFound ? (
          <div className={styles.formWrapper}>
            <span>REGISTER</span>
            <Form onSubmit={handleRegister} className={styles.formStyle}>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label className={styles.formLabel}>Email</Form.Label>
                <Form.Control
                  type='email'
                  {...bindEmailValue}
                  placeholder='Enter email'
                />
              </Form.Group>
              <Form.Group controlId='formBasicPassword'>
                <Form.Label className={styles.formLabel}>Password</Form.Label>
                <Form.Control
                  type='password'
                  {...bindPasswordValue}
                  placeholder='Password'
                />
              </Form.Group>
              <div className={styles.buttonContainer}>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </div>
            </Form>
            <div className={styles.alertContainer}>
              <Alert
                show={showAlert}
                variant='danger'
                transition
                className={styles.alertStyle}
              >
                <Alert.Heading>
                  <p>Credentials Invalid</p>
                </Alert.Heading>
              </Alert>
              <Alert
                show={showSuccessAlert}
                variant='success'
                transition
                className={styles.alertStyle}
              >
                <Alert.Heading>
                  <p>Success! You will now be redirected to the login page</p>
                </Alert.Heading>
              </Alert>
            </div>
          </div>
        ) : (
          <h2>Ooops! Not a valid registration link!</h2>
        )}
      </div>
    </>
  );
};

export default Register;
