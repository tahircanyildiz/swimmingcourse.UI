import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="social-links">
            <a href="https://twitter.com/Tahiir307" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.facebook.com/tahircany.99" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://www.instagram.com/mrpurposeless/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
          <p className="follow-text">Follow us on social media</p>
          <p className="rights-text">© 2024 MyWebsite. All Rights Reserved.</p>
        </div>
      </div>    
    </footer>
  );
}

export default Footer;