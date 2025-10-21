import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FloneFooter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail('');
    }
  };

  return (
    <>
      <style>{`
        .flone-footer {
          background-color: #f5f5f5;
          padding: 60px 0 40px;
          font-family: Arial, sans-serif;
        }

        .brand-title {
          font-weight: bold;
          font-size: 2rem;
          margin-bottom: 20px;
          color: #333;
        }

        .copyright-text {
          color: #666;
          font-size: 14px;
          margin: 0;
          line-height: 1.6;
        }

        .footer-heading {
          font-weight: 600;
          margin-bottom: 20px;
          font-size: 16px;
          letter-spacing: 0.5px;
          color: #333;
        }

        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-list li {
          margin-bottom: 12px;
        }

        .footer-link {
          color: #666;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #333;
          text-decoration: none;
        }

        .subscribe-section {
          border-top: 1px solid #ddd;
          padding-top: 30px;
          max-width: 500px;
        }

        .subscribe-text {
          color: #666;
          font-size: 14px;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .subscribe-form {
          width: 100%;
        }

        .subscribe-input {
          border-radius: 0 !important;
          border: 1px solid #ddd !important;
          padding: 12px 15px;
          font-size: 14px;
          flex: 1;
          margin-right: 10px;
        }

        .subscribe-input:focus {
          border-color: #333 !important;
          box-shadow: none !important;
        }

        .subscribe-btn {
          background-color: #333 !important;
          border: none !important;
          border-radius: 0 !important;
          padding: 12px 25px;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          transition: background-color 0.3s ease;
        }

        .subscribe-btn:hover {
          background-color: #000 !important;
        }

        @media (max-width: 767px) {
          .subscribe-form .d-flex {
            flex-direction: column;
          }

          .subscribe-input {
            margin-right: 0;
            margin-bottom: 10px;
            width: 100%;
          }

          .subscribe-btn {
            width: 100%;
          }
        }
      `}</style>

      <footer className="flone-footer">
        <Container>
          <Row>
            {/* Brand Column */}
            <Col lg={3} md={6} className="mb-2">
              <h2 className="brand-title">Flone.</h2>
              <p className="copyright-text">© 2025 Flone.</p>
              <p className="copyright-text">All Rights Reserved</p>
            </Col>

            {/* About Us Column */}
            <Col lg={3} md={6} className="mb-2">
              <h5 className="footer-heading">ABOUT US</h5>
              <ul className="footer-list">
                <li><a href="#about" className="footer-link">About us</a></li>
                <li><a href="#location" className="footer-link">Store location</a></li>
                <li><a href="#contact" className="footer-link">Contact</a></li>
                <li><a href="#tracking" className="footer-link">Orders tracking</a></li>
              </ul>
            </Col>

            {/* Useful Links Column */}
            <Col lg={3} md={6} className="mb-2">
              <h5 className="footer-heading">USEFUL LINKS</h5>
              <ul className="footer-list">
                <li><a href="#returns" className="footer-link">Returns</a></li>
                <li><a href="#support" className="footer-link">Support Policy</a></li>
                <li><a href="#size" className="footer-link">Size guide</a></li>
                <li><a href="#faqs" className="footer-link">FAQs</a></li>
              </ul>
            </Col>

            {/* Follow Us Column */}
            <Col lg={3} md={6} className="mb-2">
              <h5 className="footer-heading">FOLLOW US</h5>
              <ul className="footer-list">
                <li><a href="#facebook" className="footer-link">Facebook</a></li>
                <li><a href="#twitter" className="footer-link">Twitter</a></li>
                <li><a href="#instagram" className="footer-link">Instagram</a></li>
                <li><a href="#youtube" className="footer-link">Youtube</a></li>
              </ul>
            </Col>
          </Row>

         
        </Container>
      </footer>
    </>
  );
};

export default FloneFooter;
