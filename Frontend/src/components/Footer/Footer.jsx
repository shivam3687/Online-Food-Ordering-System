import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  // ✅ Home → always scroll to top (most reliable)
  const goToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ✅ Delivery → scroll to food list / menu
  const goToDelivery = () => {
    const section = document.getElementById("food-display");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ About Us → open in new tab
  const openAbout = () => {
    window.open(`${window.location.origin}/about`, "_blank");
  };

  // ✅ Privacy Policy → open in new tab
  const openPrivacy = () => {
    window.open(`${window.location.origin}/privacy-policy`, "_blank");
  };

  return (
    <div className="footer" id="footer">
      <div className="footer-content">

        {/* LEFT SECTION */}
        <div className="footer-content-left">
          <img
            src={assets.logo}
            alt="logo"
            style={{ cursor: "pointer" }}
            onClick={goToHome}
          />

          <p>
            Discover great food, exciting flavors, and fast delivery with
            BiteHub — your trusted online food ordering platform.
          </p>

          <div className="footer-social-icons">
            <img
              src={assets.facebook_icon}
              alt="facebook"
              onClick={() => window.open("https://facebook.com", "_blank")}
            />
            <img
              src={assets.twitter_icon}
              alt="twitter"
              onClick={() =>
                window.open("https://x.com/shivambaba31", "_blank")
              }
            />
            <img
              src={assets.linkedin_icon}
              alt="linkedin"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/shivam-kumar-3876972b6/",
                  "_blank"
                )
              }
            />
          </div>
        </div>

        {/* CENTER SECTION */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li onClick={goToHome}>Home</li>
            <li onClick={openAbout}>About Us</li>
            <li onClick={goToDelivery}>Delivery</li>
            <li onClick={openPrivacy}>Privacy Policy</li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>
              <a href="tel:+912124567890">+91-212-456-7890</a>
            </li>
            <li>
              <a href="mailto:contact@bitehub.com">contact@bitehub.com</a>
            </li>
          </ul>
        </div>

      </div>

      <hr />

      <p className="footer-copyright">
        Copyright 2026 © BiteHub.com – All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
