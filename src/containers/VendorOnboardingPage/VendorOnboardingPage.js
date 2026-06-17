import React, { useState } from 'react';
import { connect } from 'react-redux';
import WelcomeStep from './WelcomeStep';
import BusinessProfileStep from './BusinessProfileStep';
import ServicesStep from './ServicesStep';
import PricingStep from './PricingStep';
import PayoutStep from './PayoutStep';
import CompleteStep from './CompleteStep';
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
        <ServicesStep
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {currentStep === 4 && (
        <PricingStep
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {currentStep === 5 && (
          <PayoutStep
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

      {currentStep === 6 && (
          <CompleteStep />
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