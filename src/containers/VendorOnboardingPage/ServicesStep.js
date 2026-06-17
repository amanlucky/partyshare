import React from 'react';

const ServicesStep = ({ onNext, onBack }) => {
  return (
    <div className="onboarding-page">
      <div className="onboarding-content">

        <h1 className="page-title">
          Dashboard
        </h1>

        <div className="page-subtitle">
          Bookings, earnings and activity overview
        </div>

        <div className="vendor-toggle">
          <button>Renter</button>
          <button className="active">Vendor</button>
        </div>

        <div className="stepper">

          <div className="step-complete">✓</div>

          <div className="step-label complete">
            Business Profile
          </div>

          <div className="step-label active">
            Services
          </div>

          <div className="step-label">
            Pricing
          </div>

          <div className="step-label">
            Payout
          </div>

          <div className="step-label">
            Complete
          </div>

        </div>

        <div className="section-card">

          <div className="section-header">
            Services Offered
          </div>

          <div className="services-grid">

            <label  className="service-item">
              <input type="checkbox" />
              <span> Tents & Canopies</span>
            </label>

            <label className="service-item">
              <input type="checkbox" />
             <span> Tables & Chairs</span>
            </label>

            <label className="service-item">
              <input type="checkbox" />
              <span>Lighting</span>
            </label>

            <label className="service-item">
              <input type="checkbox" />
              <span>Audio Equipment</span>
            </label>

            <label className="service-item">
              <input type="checkbox" />
              <span>Staging</span>
            </label>

            <label className="service-item">
              <input type="checkbox" />
              <span>Catering Equipment</span>
            </label>

          </div>

        </div>

        <div className="bottom-actions">

          <button
            className="back-btn"
            onClick={onBack}
          >
            Back
          </button>

          <button
            className="continue-btn"
            onClick={onNext}
          >
            Continue
          </button>

        </div>

      </div>
    </div>
  );
};

export default ServicesStep;