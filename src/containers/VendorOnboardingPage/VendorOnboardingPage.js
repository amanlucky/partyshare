import React, { useState } from 'react';
import { connect } from 'react-redux';
import WelcomeStep from './WelcomeStep';
import BusinessProfileStep from './BusinessProfileStep';
import FulfillmentDeliveryStep from './FulfillmentDeliveryStep';
import UniversalPoliciesStep from './UniversalPoliciesStep';
import IdentityVerificationStep from './IdentityVerificationStep';
import CompletionStep from './CompletionStep';
import OnboardingHeader from '../../components/vendor/onboarding/OnboardingHeader';

const VendorOnboardingPage = props => {

  const { currentUser } = props;

  const [currentStep, setCurrentStep] = useState(1);
const [activePage, setActivePage] = useState('Overview');
const [formData, setFormData] = useState({
  businessName: '',
  category: '',
  contactName: '',
  phone: '',
  email: '',

  address: '',
  country: '',
  state: '',
  city: '',
  postcode: '',

  cancellationPolicy:
    'Orders cancelled more than 72 hours before the event date receive a full refund.',

  cleaningExpectations:
    'All rental items must be returned in the same condition they were received.',

  damageResponsibility:
    'The renter is responsible for any damage to rental items.',

  lateReturnPolicy:
    'Items must be returned by the agreed return date and time.',

  additionalPolicyNotes:
    'Rental items remain the property of the vendor at all times.',
});

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

return (
  <>
    <div className="announcementBar">
      🔥 Browse Event Rentals From Trusted Local Vendors
    </div>


    <OnboardingHeader currentUser={currentUser} />

          <div className="onboardingTopBar">

            <div className="onboardingTitle">
              <h2>Onboarding</h2>
              <p>Bookings, earnings and activity overview</p>
            </div>

            <div className="vendorSwitcher">
              <button className="switchBtn">Renter</button>
              <button className="switchBtn active">Vendor</button>
            </div>

          </div>

      {currentStep === 1 && (
        <WelcomeStep onNext={nextStep} />
      )}

      {currentStep === 2 && (
          <BusinessProfileStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

      {currentStep === 3 && (
        <FulfillmentDeliveryStep
          formData={formData}
          setFormData={setFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

        {currentStep === 4 && (
          <UniversalPoliciesStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

      {currentStep === 5 && (
  <IdentityVerificationStep
    onNext={nextStep}
  />
)}

{currentStep === 6 && (
  <CompletionStep />
)}
    </>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(
  mapStateToProps
)(VendorOnboardingPage);