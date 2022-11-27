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
  width: 15%;
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

const ButtonContainer = styled.div`
  margin-top: 1rem;
`;

const LinkContainer = styled(Container)`
  padding: 0;
  margin-top: 1em;
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

const StyledForm = styled(Form)``;

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
          } else {
            window.location = '/';
            resetEmailValue();
            resetPasswordValue();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <FormContainer>
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
        <AlertContainer>
          <AlertStyle show={showAlert} variant='danger' transition>
            <Alert.Heading>
              <p>Credentials Invalid</p>
            </Alert.Heading>
          </AlertStyle>
        </AlertContainer>
      </FormContainer>
    </>
  );
};

export default Login;
