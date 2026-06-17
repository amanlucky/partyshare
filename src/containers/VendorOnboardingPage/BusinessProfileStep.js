import React from 'react';
import './VendorOnboardingPage.css';

const BusinessProfileStep = ({
  formData,
  setFormData,
  onNext,
}) => {

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
    <div className="vendorHeader">

      <div className="logo">
        PartyShare
      </div>

      <div className="searchBox">
        <input
          type="text"
          placeholder="Search listings..."
        />
      </div>

      <div className="headerRight">
        <span>🔔</span>
        <span>💬</span>

        <div className="avatar">
          Hello, Aman
        </div>
      </div>

    </div>
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

          <div className="step-complete">
            ✓
          </div>

          <div className="step-label active">
            Business Profile
          </div>

          <div className="step-label">
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

        {/* Business Information */}

        <div className="section-card">

          <div className="section-header">
            Business Information
          </div>

          <div className="form-row">
            <div>
              <div className="form-label">
                Business Name *
              </div>
              <div className="form-help">
                Name displayed in store header
              </div>
            </div>

            <div className="form-input">
              <input
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">

            <div>
              <div className="form-label">
                Profile Image
              </div>
              <div className="form-help">
                Store logo
              </div>
            </div>

            <div className="logo-upload">
              <div className="logo-upload">

                  <div className="logo-preview">
                    +
                  </div>

                  <button className="upload-btn">
                    Upload Logo
                  </button>

                </div>
            </div>

          </div>

          <div className="form-row">
            <div className="form-label">
              Business Category *
            </div>

            <div className="form-input">
              <select>
                <option>Tents & Structures</option>
              </select>
            </div>
          </div>

        </div>

        {/* Contact */}

        <div className="section-card">

          <div className="section-header">
            Contact Details
          </div>

          <div className="form-row">
            <div className="form-label">
              Contact Name *
            </div>

            <div className="form-input">
              <input
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-label">
              Phone Number *
            </div>

            <div className="form-input">
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-label">
              Business Email *
            </div>

            <div className="form-input">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

        </div>

        {/* Location */}

        <div className="section-card">

          <div className="section-header">
            Location
          </div>

          <div className="form-row">
            <div className="form-label">
              Address *
            </div>

            <div className="form-input">
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-label">
              Country *
            </div>

            <div className="form-input">
              <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
            </div>
          </div>

          <div className="form-row">
            <div className="form-label">
              State *
            </div>

            <div className="form-input">
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-label">
              City *
            </div>

            <div className="form-input">
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-label">
              Postcode *
            </div>

            <div className="form-input">
              <input
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
              />
            </div>
          </div>

        </div>

        <div className="bottom-actions">
          <button
            className="continue-btn"
            onClick={onNext}
          >
            Continue
          </button>
        </div>

      </div>
    </div>

    </>
  );
};

export default BusinessProfileStep;