/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button, Container } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import useInput from '../hooks/useInput';

const axios = require('axios');

const FormContainer = styled(Container)`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .form-label {
    color: #fff;
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

const FormWrapper = styled.div`
  width: 400px;
  height: 100%;
  background-color: #222222;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #fff;
  span {
    display: flex;
    justify-content: center;
    font-weight: 700;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
`;

const LinkContainer = styled(Container)`
  padding: 0;
  margin-top: 2em;
  .register {
    float: right;
  }
  a {
    color: #fff;
    text-decoration: none;
    :hover {
      color: #3772ff;
    }
  }
`;

const StyledForm = styled(Form)`
  margin-top: 2rem;
`;

const AlertContainer = styled(Container)`
  position: absolute;
  top: 130%;
  transform: translate(-50%, -50%);
  left: 50%;
  width: 400px;
  p {
    margin-top: 1rem;
  }
`;

const AlertStyle = styled(Alert)`
  p {
    font-size: 18px;
    text-align: center;
    margin-bottom: 0;
  }
`;

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
    <FormContainer>
      <FormWrapper>
        <span>LOGIN</span>
        <StyledForm onSubmit={handleLogin}>
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
        <LinkContainer>
          <Link to='/forgotpassword'>Forgot Password?</Link>
          <Link to='/register' className='register'>
            Register
          </Link>
        </LinkContainer>
      </FormWrapper>
      <AlertContainer>
        <AlertStyle show={showAlert} variant='danger' transition>
          <Alert.Heading>
            <p>Credentials Invalid</p>
          </Alert.Heading>
        </AlertStyle>
        <AlertStyle show={showSuccessAlert} variant='success' transition>
          <Alert.Heading>
            <p>Success! You will now be redirected</p>
          </Alert.Heading>
        </AlertStyle>
      </AlertContainer>
    </FormContainer>
  );
};

export default Login;
