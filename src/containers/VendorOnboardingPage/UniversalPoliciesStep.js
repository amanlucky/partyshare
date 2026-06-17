import React, { useState } from 'react';
import './VendorOnboardingPage.css';

const UniversalPoliciesStep = ({
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
const [editingPolicy, setEditingPolicy] = useState(null);

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

            <li className="completed">
              <span>Fulfillment & Delivery</span>
            </li>

            <li className="active">
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
        <div className="welcomeContent universalPoliciesContent">

          <div className="section-card">

            <div className="section-header">
              Instructions
            </div>

            {/* Cancellation */}
            <div className="policyRow">
              <div className="policyTitle">
                Cancellation policy
              </div>

              <div className="policyContent">

                {editingPolicy === 'cancellation' ? (
                  <>
                    <textarea
                      name="cancellationPolicy"
                      value={formData.cancellationPolicy || ''}
                      onChange={handleChange}
                    />

                    <div className="policyActions">
                      <button
                        className="cancelBtn"
                        onClick={() => setEditingPolicy(null)}
                      >
                        Cancel
                      </button>

                      <button
                        className="saveBtn"
                        onClick={() => setEditingPolicy(null)}
                      >
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="policyText">
                      {formData.cancellationPolicy}
                    </div>

                    <button
                        className="policyEditBtn"
                        onClick={() => setEditingPolicy('cancellation')}
                      >
                        ✎ Edit
                      </button>
                  </>
                )}

              </div>
            </div>

            {/* Cleaning */}
            <div className="policyRow">
              <div className="policyTitle">
                Cleaning expectations
              </div>

              <div className="policyContent">
                <textarea
                  name="cleaningExpectations"
                  value={formData.cleaningExpectations || ''}
                  onChange={handleChange}
                />

                <button className="policyEditBtn">
                  ✎ Edit
                </button>
              </div>
            </div>

            {/* Damage */}
            <div className="policyRow">
              <div className="policyTitle">
                Damage responsibility
              </div>

              <div className="policyContent">
                <textarea
                  name="damageResponsibility"
                  value={formData.damageResponsibility || ''}
                  onChange={handleChange}
                />

                <button className="policyEditBtn">
                  ✎ Edit
                </button>
              </div>
            </div>

            {/* Late Return */}
            <div className="policyRow">
              <div className="policyTitle">
                Late return policy
              </div>

              <div className="policyContent">
                <textarea
                  name="lateReturnPolicy"
                  value={formData.lateReturnPolicy || ''}
                  onChange={handleChange}
                />

                <button className="policyEditBtn">
                  ✎ Edit
                </button>
              </div>
            </div>

            {/* Additional */}
            <div className="policyRow">
              <div className="policyTitle">
                Additional policy notes
              </div>

              <div className="policyContent">
                <textarea
                  name="additionalPolicyNotes"
                  value={formData.additionalPolicyNotes || ''}
                  onChange={handleChange}
                />

                <button className="policyEditBtn">
                  ✎ Edit
                </button>
              </div>
            </div>

          </div>

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

export default UniversalPoliciesStep;