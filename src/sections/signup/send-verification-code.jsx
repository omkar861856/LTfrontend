import React, { useState } from 'react';
import { user_api } from 'src/services/userapi';

const SendVerificationCode = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [verified, setVerified] = useState(false);

  const sendVerificationCode = async () => {
    try {
      const response = await fetch(`${user_api}/send-verification-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Verification code sent to your email.');
      } else {
        setMessage('Error sending verification code.');
      }
      alert(message);
    } catch (error) {
      setMessage('Error sending verification code.');
      alert(message)
    }
  };

  const verifyCode = async () => {
    try {
      const response = await fetch(`${user_api}/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, email_verificationCode: verificationCode }),
      });

      if (response.ok) {
        setMessage('Email verified successfully.');
        setVerified(!verified)
      } else {
        setMessage('Invalid verification code.');
        alert(message);
      }
      
    } catch (error) {
      setMessage('Error verifying code.');
      alert(error.message);
    }
  };

  return (
    <div>
        {verified?<>Verified</>:null}
      <h1>Email Verification</h1>
      
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="button" onClick={sendVerificationCode}>
        Send Verification Code
      </button>

      <input
        type="text"
        placeholder="Enter verification code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button type="button" onClick={verifyCode}>
        Verify Code
      </button>

      <p>{message}</p>
    </div>
  );
};

export default SendVerificationCode;
