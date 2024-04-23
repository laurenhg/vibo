import React from 'react';
import '../../pages/Footer/Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h1>Company<span>Name</span></h1>
                    <p>
                        CompanyName is a dedicated platform aimed at providing the best
                        online reading experience. Our mission is to empower every person
                        to enhance their knowledge and explore new worlds through reading.
                    </p>
                    <div className="contact">
                        <span><i className="fas fa-phone"></i>&nbsp; 123-456-7890</span>
                        <span><i className="fas fa-envelope"></i>&nbsp; info@companyname.com</span>
                    </div>
                    <div className="socials">
                        <a href="https://facebook.com"><i className="fab fa-facebook"></i></a>
                        <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
                        <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                    </ul>
                </div>
                <div className="footer-section newsletter">
                    <h2>Newsletter</h2>
                    <p>Stay update with our latest</p>
                    <div className="form-element">
                        <input type="text" placeholder="Email" /><button>Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 CompanyName | Designed by CompanyName
            </div>
        </footer>
    );
};

export default Footer;