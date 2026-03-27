import React from "react";
import "./steps.css";

import stepsImage from "../assets/steps-line.png";
import checkCircle from "../assets/check-circle.svg";


const Steps = () => {
  return (
    <div className="steps-wrapper">

      <div className="steps-inner">

        {/* LEFT TEXT */}
        <div className="steps-left">
          <h2>
            <span className="orange">Simple.</span> Fast. <br />
            <span className="blue">Professional.</span> Secure.
          </h2>

          <ul className="steps-list">
            <li><img src={checkCircle} alt="check" />Secure payments</li>
            <li><img src={checkCircle} alt="check" />Verified vendors</li>
            <li><img src={checkCircle} alt="check" />Clear rental terms and waivers</li>
          </ul>
        </div>

        {/* RIGHT IMAGE */}
        <div className="steps-right">
          <img src={stepsImage} alt="steps" />
        </div>

      </div>

    </div>
  );
};

export default Steps;