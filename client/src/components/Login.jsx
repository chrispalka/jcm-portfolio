/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/Login.module.css';
import { Form, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import useInput from '../hooks/useInput';

const axios = require('axios');

const Login = () => {
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (emailValue.length === 0 || passwordValue.length === 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      axios
        .post('login', {
          email: emailValue.toLowerCase(),
          password: passwordValue,
        })
        .then((response) => {
          if (response.data !== 'Success') {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            resetPasswordValue();
          } else {
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 2000);
            setTimeout(() => (window.location = '/login'), 2000);
            resetEmailValue();
            resetPasswordValue();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span>LOGIN</span>
        <Form onSubmit={handleLogin} className={styles.formStyle}>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email</Form.Label>
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
        <div className={styles.linkContainer}>
          <Link to='/forgotpassword'>Forgot Password?</Link>
          <Link to='/register' className='register'>
            Register
          </Link>
        </div>
      </div>
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
            <p>Success! You will now be redirected</p>
          </Alert.Heading>
        </Alert>
      </div>
    </div>
  );
};

export default Login;
