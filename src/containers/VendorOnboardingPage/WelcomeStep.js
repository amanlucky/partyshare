import React from 'react';
import './VendorOnboardingPage.css';

const WelcomeStep = ({ onNext }) => {
  return (
   <>

      <div className="welcomeLayout">
        <div className="welcomeSidebar">
          <ul>
              <li className="active"><span>Welcome</span></li>
              <li><span>Business Profile</span></li>
              <li><span>Fulfillment & Delivery</span></li>
              <li><span>Universal Policies</span></li>
              <li><span>Identity / Payout Verification</span></li>
              <li><span>Completion</span></li>
            </ul>
        </div>

        <div className="welcomeContent">

          <img
              src="/images/hand.png"
              alt="welcome"
              className="welcomeImage"
            />

          <h2>
            Welcome to PartyShare — let's get your business listed
          </h2>

          <p>
            You're a few steps away from reaching thousands of event planners
            looking for exactly what you offer. We'll guide you through setting
            up your business profile, services, pricing, and payout details.
          </p>

          <button
            className="startSetupBtn"
            onClick={onNext}
          >
            Start Setup
          </button>

        </div>

    </div>
</>
  );
};

export default WelcomeStep;