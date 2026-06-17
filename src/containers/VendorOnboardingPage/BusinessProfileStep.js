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

        <div className="welcomeLayout">

            <div className="welcomeSidebar">
              <ul>
                <li className="completed">
                  <span>Welcome</span>
                </li>

                <li className="active">
                  <span>Business Profile</span>
                </li>

                <li><span>Fulfillment & Delivery</span></li>

                <li><span>Universal Policies</span></li>

                <li><span>Identity / Payout Verification</span></li>

                <li><span>Completion</span></li>
              </ul>
            </div>

            <div className="welcomeContent businessProfileContent">

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
                  Store logo or brand icon
                </div>
              </div>

              <div className="logo-upload">

                <div className="logo-preview">
                  +
                </div>

                <button className="upload-btn">
                  Upload
                </button>

                <button className="delete-btn">
                  Delete
                </button>

              </div>

            </div>
            <div className="form-row">

                <div className="form-label">
                  Business Category *
                </div>

                <div className="form-input">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option>Tents & Structures</option>
                    <option>Tables & Chairs</option>
                    <option>Decorations</option>
                  </select>
                </div>

              </div>


              <div className="form-row">

                  <div>
                    <div className="form-label">
                      Position *
                    </div>

                    <div className="form-help">
                      Job title or role at this business
                    </div>
                  </div>

                  <div className="form-input">
                    <select
                      name="position"
                      value={formData.position || ''}
                      onChange={handleChange}
                    >
                      <option>Owner / Co-owner</option>
                      <option>Manager</option>
                      <option>Employee</option>
                    </select>
                  </div>

                </div>
                </div>

           {/* contatc detail */}
           <div className="section-card">
            <div className="section-header">
              Contact Details
            </div>

            <div className="form-row">
              <div>
                <div className="form-label">Contact Name *</div>
                <div className="form-help">Primary account contact</div>
              </div>

              <div className="form-input">
                <input
                  name="contactName"
                  value={formData.contactName || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div>
                <div className="form-label">Phone Number *</div>
              </div>

              <div className="form-input">
                <input
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div>
                <div className="form-label">Business Email *</div>
                <div className="form-help">Primary email</div>
              </div>

              <div className="form-input">
                <input
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
              {/* Add Location Card */}
              <div className="section-card">
                  <div className="section-header">
                    Location
                  </div>

                  <div className="form-row">
                    <div>
                      <div className="form-label">Address *</div>
                    </div>

                    <div className="form-input">
                      <input
                        name="address"
                        value={formData.address || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div>
                      <div className="form-label">Country *</div>
                    </div>

                    <div className="form-input">
                      <input
                        name="country"
                        value={formData.country || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div>
                      <div className="form-label">State *</div>
                    </div>

                    <div className="form-input">
                      <input
                        name="state"
                        value={formData.state || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div>
                      <div className="form-label">City *</div>
                    </div>

                    <div className="form-input">
                      <input
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div>
                      <div className="form-label">Postcode *</div>
                    </div>

                    <div className="form-input">
                      <input
                        name="postcode"
                        value={formData.postcode || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>


                {/* continue button */}
                <div className="businessFooter">
                  <button
                    className="continueBtn"
                    onClick={onNext}
                  >
                    Continue
                  </button>
                </div>
      </div> {/* welcomeContent */}
    </div> {/* welcomeLayout */}  
    </>
  );
};

export default BusinessProfileStep;