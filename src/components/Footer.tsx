import React from 'react';
import '../css/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
            </div>
            <div className="footer-bottom">
                <p style={{textAlign:"center"}}>© 2024, Kvadur Powered by <span>SYP-Team</span><a href="/impressum">Impressum</a> <a
                    href="/datenschutzerklaerung">Datenschutzerklärung</a></p>
            </div>
        </footer>
    );
};

export default Footer;
