import React from 'react';
import './VendorOnboardingPage.css';
import completionImage from '../../assets/identity2.svg';
const CompletionStep = () => {
  return (
    <div className="welcomeLayout">

      <div className="welcomeSidebar">
        <ul>
          <li className="completed"><span>Welcome</span></li>
          <li className="completed"><span>Business Profile</span></li>
          <li className="completed"><span>Fulfillment & Delivery</span></li>
          <li className="completed"><span>Universal Policies</span></li>
          <li className="completed"><span>Identity / Payout Verification</span></li>
          <li className="active"><span>Completion</span></li>
        </ul>
      </div>

      <div className="welcomeContent completionContent">
  
        <div className="completionCard">

          <img
              src={completionImage}
              alt="complete"
              className="completionImage"
            />

          <h2 className="completionTitle">
            You're all set — your vendor profile is live!
          </h2>

          <p className="completionDescription">
            Identity and payout details are required before you can receive
            payments. This is handled securely through Stripe.
          </p>

          <div className="completionButtons">

            <button className="completionCreateBtn">
              Create Listing
            </button>

            <button className="completionDashboardBtn">
              Go to Dashboard
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CompletionStep;