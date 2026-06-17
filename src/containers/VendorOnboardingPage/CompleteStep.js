import React from 'react';
import { useHistory } from 'react-router-dom';
const CompleteStep = () => {
  const history = useHistory();
  return (
    <div className="onboardingContainer">
      <div className="successCard">
        <h2>🎉 Vendor Setup Complete</h2>

        <p>
          Your vendor profile has been created successfully.
        </p>

       <button
          className="primaryBtn"
          onClick={() => history.push('/vendor-dashboard')}
        >
          Go To Dashboard
        </button>
      </div>
    </div>
  );
};

export default CompleteStep;