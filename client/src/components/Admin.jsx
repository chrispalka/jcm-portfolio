import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import styles from '../assets/Admin.module.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios');

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
    <div>
      <div className={styles.alertContainer}>
        <Alert
          className={styles.alertStyle}
          show={showCopiedAlert}
          variant='success'
          transition
        >
          <Alert.Heading>
            <p>Copied!</p>
          </Alert.Heading>
        </Alert>
      </div>
      {isAdmin ? (
        <div className={styles.inputContainer}>
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
        </div>
      ) : (
        <h2>Oops! You dont have access to this page</h2>
      )}
    </div>
  );
};

export default Admin;
