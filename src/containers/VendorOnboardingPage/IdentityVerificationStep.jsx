import React from 'react';
import './VendorOnboardingPage.css';
import identityImage from '../../assets/identity.svg';
import stripeLogo from '../../assets/Stripe_Logo.png';
import checkCircle from '../../assets/check-circle.svg';
const IdentityVerificationStep = ({ onNext }) => {
  return (
    <div className="welcomeLayout">
      <div className="welcomeSidebar">
        <ul>
          <li className="completed"><span>Welcome</span></li>
          <li className="completed"><span>Business Profile</span></li>
          <li className="completed"><span>Fulfillment & Delivery</span></li>
          <li className="completed"><span>Universal Policies</span></li>
          <li className="active"><span>Identity / Payout Verification</span></li>
          <li><span>Completion</span></li>
        </ul>
      </div>

      <div className="welcomeContent verificationContent">


        <div className="verificationCard">
            <img
              src={stripeLogo}
              alt="Stripe"
              className="stripeLogo"
            />
          <img
            src={identityImage}
            alt="Identity Verification"
            className="verificationImage"
          />

          <h2>Identity / Payout Verification</h2>

          <p>
            Identity and payout details are required before you can receive
            payments. This is handled securely through Stripe.
          </p>

          <div className="verificationItems">

            <div className="verificationItem">
              <img src={checkCircle} alt="" />
              <span>Legal Name</span>
            </div>

            <div className="verificationItem">
              <img src={checkCircle} alt="" />
              <span>DOB</span>
            </div>

            <div className="verificationItem">
              <img src={checkCircle} alt="" />
              <span>SSN (last 4)</span>
            </div>

            <div className="verificationItem">
              <img src={checkCircle} alt="" />
              <span>Bank or Debit Card</span>
            </div>

          </div>

          <button
            className="stripeBtn"
            onClick={onNext}
          >
            Continue to Stripe
          </button>

        </div>

      </div>
    </div>
  );
};

export default IdentityVerificationStep;