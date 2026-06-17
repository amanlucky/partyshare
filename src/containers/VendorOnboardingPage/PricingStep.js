import React from 'react';

const PricingStep = ({ onNext, onBack }) => {
  return (
    <div className="onboarding-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Bookings, earnings and activity overview</p>
      </div>
      <div className="step-navigation">

        <div className="step completed">
          ✓ Business Profile
        </div>

        <div className="step completed">
          ✓ Services
        </div>

        <div className="step active">
          Pricing
        </div>

        <div className="step">
          Payout
        </div>

        <div className="step">
          Complete
        </div>

      </div>
      <div className="form-card">

        <div className="section-header">
          Payout Information
        </div>

        <div className="form-row">
          <label>Hourly Rate</label>
          <input type="number" />
        </div>

        <div className="form-row">
          <label>Daily Rate</label>
          <input type="number" />
        </div>

        <div className="form-row">
          <label>Minimum Booking Amount</label>
          <input type="number" />
        </div>

        <div className="form-row">
          <label>Security Deposit</label>
          <input type="number" />
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

export default PricingStep;