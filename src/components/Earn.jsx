import React from "react";
import "./earn.css";

import logo from "../assets/logo.png";
import illustration from "../assets/people.png";
import timer from "../assets/timer.svg";
import message from "../assets/message-notify.svg";
import wallet from "../assets/wallet.svg";
import delivery from "../assets/delivery.svg";
const Earn = () => {
  return (
    <div className="earn-wrapper">

      <div className="earn-top">

        {/* LEFT CONTENT */}
        <div className="earn-left">
          <h2>Earn with PartyShare</h2>

          <p className="highlight">
            Have event rental equipment sitting unused?
          </p>

          <p className="desc">
            List create listings in minutes, offer pickup or delivery, and manage your rentals from one simple dashboard.
            Your inventory on PartyShare and start earning from local events in your area.
          </p>

          {/* FEATURES */}
          <div className="features">
            <div className="etimer"><img src={timer} alt="timer" /> List your rentals in minutes</div>
            <div className="emessage"><img src={message} alt="message" /> Reach local event planners and hosts</div>
            <div className="edelivery"><img src={delivery} alt="delivery" /> Offer pickup or delivery options</div>
            <div className="ewallet"><img src={wallet} alt="wallet" />Get paid securely through the platform</div>
          </div>

          {/* BUTTONS */}
          <div className="buttons">
            <button className="btn light">Become a Vendor</button>
            <button className="btn primary">List a Rental</button>
          </div>
        </div>

        {/* RIGHT LOGO */}
        <div className="earn-right">
          <div className="secton-logo"><img src={logo} alt="PartyShare" /></div>
          <div className="earn-poople"><img src={illustration} alt="illustration" /></div>
        </div>
      </div>
    </div>
  );
};

export default Earn;