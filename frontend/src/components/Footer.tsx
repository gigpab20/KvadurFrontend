import React from 'react';
import '../css/Footer.css';
import { FaApplePay, FaGooglePay, FaInstagram } from "react-icons/fa";
import { Mastercard, Visa, Paypal, Amex, Maestro, Unionpay } from 'react-payment-logos/dist/flat';
import { SiKlarna } from "react-icons/si";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
            </div>
            <div className="footer-bottom">
                <p style={{ textAlign: "center" }}>© 2024, Kvadur Powered by <span>SYP-Team</span>
                    <a href="/impressum">Impressum</a>
                    <a href="/datenschutzerklaerung">Datenschutzerklärung</a>
                </p>
            </div>
            <div className="footer-right">
                <a href="https://www.instagram.com/kvadur/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
            </div>
            <div className="payment-logos">
                <Amex />
                <FaApplePay />
                <FaGooglePay />
                <SiKlarna />
                <Maestro />
                <Mastercard />
                <Paypal />
                <Unionpay />
                <Visa />
            </div>
        </footer>
    );
};

export default Footer;