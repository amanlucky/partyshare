import React, { useState } from 'react';
import './VendorOnboardingPage.css';

const FulfillmentDeliveryStep = ({
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

  const [deliveryEnabled, setDeliveryEnabled] = useState(true);
  const [pickupEnabled, setPickupEnabled] = useState(true);
  const [availabilityEnabled, setAvailabilityEnabled] = useState(true);

  return (
    <>
      <div className="welcomeLayout">

        {/* Sidebar */}
        <div className="welcomeSidebar">
          <ul>

            <li className="completed">
              <span>Welcome</span>
            </li>

            <li className="completed">
              <span>Business Profile</span>
            </li>

            <li className="active">
              <span>Fulfillment & Delivery</span>
            </li>

            <li>
              <span>Universal Policies</span>
            </li>

            <li>
              <span>Identity / Payout Verification</span>
            </li>

            <li>
              <span>Completion</span>
            </li>

          </ul>
        </div>

        {/* Content */}
        <div className="welcomeContent fulfillmentContent">

          {/* DELIVERY */}
          <div className="section-card">

            <div className="section-header">

              <label className="toggleSwitch">
                <input
                  type="checkbox"
                  checked={deliveryEnabled}
                  onChange={() => setDeliveryEnabled(!deliveryEnabled)}
                />
                <span className="toggleSlider"></span>
              </label>

                <span>Delivery</span>

              </div>

            <div className="form-row">
              <div>
                <div className="form-label">
                  Delivery zip codes
                </div>

                <div className="form-help">
                  Areas you deliver to
                </div>
              </div>

              <div className="form-input">
                <input
                  name="deliveryZipCodes"
                  placeholder="Add zip code"
                  value={formData.deliveryZipCodes || ''}
                  onChange={handleChange}
                />
                <div className="zipTags">
                <span>20001 ✕</span>
                <span>20005 ✕</span>
                <span>20009 ✕</span>
                <span>20013 ✕</span>
              </div>
              </div>
            </div>

            <div className="form-row">
              <div>
                <div className="form-label">
                  Minimum lead time *
                </div>

                <div className="form-help">
                  How far in advance orders must be placed
                </div>
              </div>

              <div className="form-input">
                <select
                  name="leadTime"
                  value={formData.leadTime || ''}
                  onChange={handleChange}
                >
                  <option>1 day</option>
                  <option>2 days</option>
                  <option>3 days</option>
                  <option>7 days</option>
                </select>
              </div>
            </div>

          </div>

          {/* PICKUP */}
          <div className="section-card">

            <div className="section-header">

              <label className="toggleSwitch">
                <input
                  type="checkbox"
                  checked={pickupEnabled}
                  onChange={() => setPickupEnabled(!pickupEnabled)}
                />
                <span className="toggleSlider"></span>
              </label>

              <span>Pickup</span>

            </div>

            <div className="form-row">
              <div>
                <div className="form-label">
                  Pickup address / location
                </div>
              </div>

              <div className="form-input">
                <input
                  name="pickupAddress"
                  value={formData.pickupAddress || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>

          {/* AVAILABILITY */}
          <div className="section-card">

            <div className="section-header">

                <label className="toggleSwitch">
                  <input
                    type="checkbox"
                    checked={availabilityEnabled}
                    onChange={() => setAvailabilityEnabled(!availabilityEnabled)}
                  />
                  <span className="toggleSlider"></span>
                </label>

                <span>Availability</span>

              </div>

            <div className="form-row">
              <div>
                <div className="form-label">
                  Operating hours
                </div>
              </div>

              <div className="form-input">
                <input
                  name="operatingHours"
                  placeholder="Add date"
                  value={formData.operatingHours || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div>
                <div className="form-label">
                  Blackout dates
                </div>
              </div>

              <div className="form-input">
                <input
                  name="blackoutDates"
                  placeholder="Add date"
                  value={formData.blackoutDates || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>

          {/* PRICING THRESHOLDS */}
          <div className="section-card">

            <div className="section-header">
              Pricing Thresholds
            </div>

            <div className="form-row">
              <div>
                <div className="form-label">
                  Minimum delivery fee *
                </div>

                <div className="form-help">
                  Flat minimum charged per delivery
                </div>
              </div>

              <div className="form-input">
                <input
                  name="deliveryFee"
                  value={formData.deliveryFee || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div>
                <div className="form-label">
                  Minimum order amount for delivery *
                </div>

                <div className="form-help">
                  How far in advance orders must be placed
                </div>
              </div>

              <div className="form-input">
                <select
                  name="minimumOrderAmount"
                  value={formData.minimumOrderAmount || ''}
                  onChange={handleChange}
                >
                  <option>$50</option>
                  <option>$100</option>
                  <option>$200</option>
                  <option>$500</option>
                </select>
              </div>
            </div>

          </div>

          {/* INSTRUCTIONS */}
          <div className="section-card">

            <div className="section-header">
              Instructions
            </div>

            <div className="form-row">
              <div>
                <div className="form-label">
                  Delivery notes
                </div>

                <div className="form-help">
                  Shown to renters at checkout
                </div>
              </div>

              <div className="form-input">
                <textarea
                  name="deliveryNotes"
                  rows="4"
                  placeholder="e.g. Driver will call 30 min before arrival"
                  value={formData.deliveryNotes || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div>
                <div className="form-label">
                  Pickup instructions
                </div>

                <div className="form-help">
                  Shown when renter selects pickup
                </div>
              </div>

              <div className="form-input">
                <textarea
                  name="pickupInstructions"
                  rows="4"
                  placeholder='e.g. "Use side entrance, ask for Jake"'
                  value={formData.pickupInstructions || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>

          {/* BUTTON */}
          <div className="businessFooter">
            <button
              className="continueBtn"
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

export default FulfillmentDeliveryStep;