import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
const axios = require('axios');


const Container = styled.div`
text-align: center;
div {
  padding: 10px;
}
input {
  width: 100%;
}
`;

const Admin = ({ isAdmin }) => {
  const [registrationToken, setRegistrationToken] = useState('');
  const generateNewRegistrationToken = () => {
    axios('/newRegistrationToken').then((response) => {
      const token = response.data
      setRegistrationToken(`${process.env.DOMAIN}register/${token}`);
    });

  };
  return (
    <Container>
      {isAdmin ? (
        <>
          <div>
            <Button onClick={() => generateNewRegistrationToken()}>
              Generate Token
            </Button>
          </div>
          <div>
            {registrationToken !== '' && (
              <input type='text' value={registrationToken} />
            )}
          </div>
        </>
      ) : (
        <h2>Oops! You dont have access to this page</h2>
      )}
    </Container>
  );
};

export default Admin;
