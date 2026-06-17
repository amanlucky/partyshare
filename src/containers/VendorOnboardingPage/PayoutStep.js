import React from 'react';

const PayoutStep = ({ onNext, onBack }) => {
  return (
    <div className="onboarding-container">

      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Bookings, earnings and activity overview</p>
      </div>

      <div className="step-navigation">
        <div className="step completed">✓ Business Profile</div>
        <div className="step completed">✓ Services</div>
        <div className="step completed">✓ Pricing</div>
        <div className="step active">Payout</div>
        <div className="step">Complete</div>
      </div>

      <div className="form-card">

        <div className="section-header">
          Payout Information
        </div>

        <div className="form-row">
          <label>Bank Name</label>
          <input type="text" />
        </div>

        <div className="form-row">
          <label>Account Holder Name</label>
          <input type="text" />
        </div>

        <div className="form-row">
          <label>Account Number</label>
          <input type="text" />
        </div>

        <div className="form-row">
          <label>Routing Number</label>
          <input type="text" />
        </div>

        <div className="form-row">
          <label>Tax ID / EIN</label>
          <input type="text" />
        </div>

      </div>

      <div className="button-row">
        <button onClick={onBack}>Back</button>

        <button className="primary-btn" onClick={onNext}>
          Continue
        </button>
      </div>

    </div>
  );
};

export default PayoutStep;