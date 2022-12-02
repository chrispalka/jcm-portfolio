import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Button, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios');

const Wrapper = styled.div``;

const AlertStyle = styled(Alert)`
  p {
    font-size: 18px;
    text-align: center;
    margin-bottom: 0;
  }
`;
const AlertContainer = styled(Container)`
  position: absolute;
  top: 40%;
  transform: translate(-50%, -50%);
  left: 50%;
  width: 400px;
  p {
    margin-top: 1rem;
  }
`;

const InputContainer = styled(Container)`
  justify-content: center;
  display: flex;
  align-items: center;
  width: 400px;
  height: 100%;
  background-color: #222222;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #fff;
`;

const Admin = ({ isAdmin }) => {
  const [registrationToken, setRegistrationToken] = useState('');
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);

  const generateNewRegistrationToken = () => {
    axios('/newRegistrationToken').then((response) => {
      const token = response.data;
      setRegistrationToken(`${DOMAIN}register/${token}`);
    });
  };
  const handleCopy = (link) => {
    setShowCopiedAlert(true);
    setTimeout(() => setShowCopiedAlert(false), 2000);
    navigator.clipboard.writeText(link);
  };
  return (
    <Wrapper>
      <AlertContainer>
        <AlertStyle show={showCopiedAlert} variant='success' transition>
          <Alert.Heading>
            <p>Copied!</p>
          </Alert.Heading>
        </AlertStyle>
      </AlertContainer>
      {isAdmin ? (
        <InputContainer>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button onClick={() => generateNewRegistrationToken()}>
              Generate Token
            </Button>
            {registrationToken !== '' && (
              <>
                <div>
                  <input type='text' value={registrationToken} />
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faClipboard}
                    style={{
                      color: '#ffffff',
                      cursor: 'pointer',
                      display: 'block',
                    }}
                    onClick={() => handleCopy(registrationToken)}
                  />
                </div>
              </>
            )}
          </div>
        </InputContainer>
      ) : (
        <h2>Oops! You dont have access to this page</h2>
      )}
    </Wrapper>
  );
};

export default Admin;
