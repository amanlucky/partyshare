import React from 'react';
import '../../../containers/VendorOnboardingPage/VendorOnboardingPage.css';
import logo from '../../../assets/logo.png';
import bellIcon from "../../../assets/vendor/notification-bell.png";
import msgIcon from "../../../assets/vendor/msg-icon.png";
import searchIcon from '../../../assets/vendor/search-icon.png';
const OnboardingHeader = ({ currentUser }) => {
  const firstName = currentUser?.attributes?.profile?.firstName || '';
const lastName = currentUser?.attributes?.profile?.lastName || '';


const initials =
`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <header className="onboardingHeaderBar">
      <div className="headerLogo">
        <img src={logo} alt="PartyShare" className="onboardingLogo" />
      </div>

      <div className="searchArea">
        <div className="searchBarContainer">

          <div className="categoryDropdown">
            <span>All Categories</span>
            <span>⌄</span>
          </div>

          <div className="searchInputWrap">
            <img
              src={searchIcon}
              alt="Search"
              className="searchIcon"
            />

            <input
              type="text"
              placeholder="Search"
              className="dashboardSearch"
            />
          </div>

        </div>
      </div>

      <div className="headerActions">
        <span><img src={bellIcon} alt="Notifications" className="headerIcon" /></span>
        <span><img src={msgIcon} alt="Messages" className="headerIcon" /></span>

        <div className="avatarWrapper">
          {currentUser?.profileImage?.attributes?.variants?.["square-small"]?.url ? (
            <img
              src={
                currentUser.profileImage.attributes.variants["square-small"].url
              }
              alt="Profile"
              className="userAvatarImage"
            />
          ) : (
            <div className="userAvatar">
              {initials}
            </div>
          )}

          <span className="onlineDot"></span>
        </div>
      </div>
    </header>
  );
};

export default OnboardingHeader;